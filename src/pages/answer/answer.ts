import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// TranslateService
import { TranslateService } from '../../providers/translate'
//Useful helper functions
import { UtilityHelpers } from '../../providers/utility-helpers';

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {
  //Mock data for a question
  question = {
    key: 'unknown',
    image: '',
    closed: false,
    category: 'algebra',
    open_date: Date.now(),
    question: 'Where does the constant pi come from?',
    likes: 0,
    dislikes: 0,
    user_id: 'unknown',
    user: 'Unknown'
  };

  questionKey = "unknown";

  answer = {
    answer: '',
    created_at: 0,
    user: 'Unknown',
    image:'',
    question_id:'',
    isBest: false,
    likes: 0,
    likedFromUsers: ['users:']
  };

  languages = {
    'English': 'english',
    'Spanish': 'es',
    'French': 'fr',
    'German': 'de',
    'Hindi': 'hi',
    'Russian': 'ru',
    'Mandarin': 'zh-TW'
  };
  translatedQuestion = '';
  translationObject = {};

  //firebase
  answers: FirebaseListObservable<any[]>;
  questions: FirebaseListObservable<any[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public toastCtrl: ToastController,
    public translateSvc: TranslateService,
    public utils: UtilityHelpers
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
    //Get the question key from our utility library
    this.questionKey = this.utils.getQuestionKey();

    this.updateQuestion();
    this.updateAnswerStream();
  }

  updateAnswerStream() {
    // this.answers = this.af.list('/userAnswers', {
    //   query: {
    //     limitToLast: 50,
    //     orderByChild: 'question_id',
    //     equalTo: this.questionKey
    //   }
    // });
    this.af.list('/userAnswers', {
      query: {
        limitToLast: 50,
        orderByChild: 'question_id',
        equalTo: this.questionKey
      }
    }).subscribe((data) => {
      data.forEach((item) => {
        this.getTranslatedAnswers(item)
      })
    })
  }

  updateQuestion() {
    // this.questions = this.af.list('/userQuestions', {
    //   query: {
    //     orderByKey: true,
    //     equalTo: this.questionKey
    //   }
    // });
    this.af.list('/userQuestions', {
      query: {
        orderByKey: true,
        equalTo: this.questionKey
      }
    }).subscribe((data) => {
      data.forEach((item) => {
        this.getTranslatedQuestions(item);
      })
    })
  }

  getTranslatedQuestions(question) {
    console.log('question.translation_id', question.translation_id);
    this.af.list('/translations', {
      query: {
        orderByKey: true,
        equalTo: question.translation_id
      }
    }).subscribe((data) => {

      // console.log('data translations', data);
      let user = this.afAuth.auth.currentUser;

      if (user !== null) {
        this.af.list('/users', {
          query: {
            orderByChild: 'user_id',
            equalTo: user.uid
          }
        }).subscribe((user) => {
          // console.log('user users', user);
          // // The console.log is returning the right user object
          // console.log('question', question);
          // console.log('question.questionBody (first)', question.questionBody);
          // console.log('question data[0][this.languages[user[0].language]]', data[0][this.languages[user[0].language]]);
          console.log('question.translatedQuestion', question.translatedQuestion);
          this.translatedQuestion = data[0][this.languages[user[0].language]];
          console.log('this.translatedQuestion', this.translatedQuestion);
        })
      }
    });
  }

  getTranslatedAnswers(answer) {
    console.log('answer.translation_id', answer.translation_id);
    this.af.list('/translations', {
      query: {
        orderByKey: true,
        equalTo: answer.translation_id
      }
    }).subscribe((data) => {

      // console.log('data translations', data);
      let user = this.afAuth.auth.currentUser;

      if (user !== null) {
        this.af.list('/users', {
          query: {
            orderByChild: 'user_id',
            equalTo: user.uid
          }
        }).subscribe((user) => {
          // console.log('user users', user);
          // // The console.log is returning the right user object
          // console.log('answer', answer);
          // console.log('answer.answer (first)', answer.answer);
          // console.log('data[0][this.languages[user[0].language]]', data[0][this.languages[user[0].language]]);

          this.translationObject[answer.translation_id] = data[0][this.languages[user[0].language]];
          console.log('this.translationObject', this.translationObject);
        })
      }
    });
  }

  onSubmitAnswer() {
    let user = this.afAuth.auth.currentUser;
    if (user != null) {
      // call postTranslation to save translation of user text to
      // firebase under `translations` endpoint
      let userAnswer = this.answer.answer
      this.translateSvc.postTranslation(userAnswer)
        .then((item:any) => {
          this.answers.push({
            answer: userAnswer,
            created_at: Date.now(),
            user: user.displayName,
            image: user.photoURL,
            question_id: this.questionKey,
            isBest: false,
            likes: 0,
            likedFromUsers: {isJoin: 'yes'},
            translation_id: item.key
          })
        })

    } else {
      //Show a toast notification if not logged in
      this.utils.popToast('Please Log In to Post Answers.')
    }
    //clear input field
    this.answer.answer = '';

  }

  onLikeClick(a) {
    let user = this.afAuth.auth.currentUser;
    if (user != null) {
      let uid = user.uid;
      let tempObj = {...a};

      if (!a.likedFromUsers.hasOwnProperty(uid)){
        this.answers.update(a.$key, {likes: a.likes + 1});
        tempObj.likedFromUsers[uid] = true;
        this.answers.update(a.$key, {likedFromUsers: {...tempObj.likedFromUsers} });
        a.likes++;
      } else {
        //we already liked the thing, take it back now
        this.answers.update(a.$key, {likes: a.likes - 1});
        delete tempObj.likedFromUsers[uid];
        this.answers.update(a.$key, {likedFromUsers: {...tempObj.likedFromUsers} });
      }
    } else {
      //Show a toast notification if not logged in
      this.utils.popToast('Please Log In to Like Answers.')
    }

  }


}
