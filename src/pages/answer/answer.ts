import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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
    imageURL:'',
    userImageURL: '',
    question_id:'',
    isBest: false,
    likes: 0,
    likedFromUsers: ['users:'],

  };

  //firebase
  answers: FirebaseListObservable<any[]>;
  questions: FirebaseListObservable<any[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public toastCtrl: ToastController,
    public utils: UtilityHelpers,
    private camera: Camera
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
    //Get the question key from our utility library
    this.questionKey = this.utils.getQuestionKey();

    this.updateQuestion();
    this.updateAnswerStream();
  }

  updateAnswerStream () {
    this.answers = this.af.list('/userAnswers', {
      query: {
        limitToLast: 50,
        orderByChild: 'question_id',
        equalTo: this.questionKey
      }
    })  //This will sort answers by # of likes descending - have to explicitly cast as FirebaseListObservable
    .map(answers => answers.sort( (a,b) => b.likes - a.likes)) as FirebaseListObservable<any[]>;
  }

  isQuestionOwner(q) {
    let user = this.afAuth.auth.currentUser;
    if (user != null) {
      if (q.userId == user.uid) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onCloseClick(q) {
    this.questions.update(q.$key, {
      isClosed: true,
      closedOn: Date.now()
    });
  }


  updateQuestion () {
    this.questions= this.af.list('/userQuestions', {
      query: {
        orderByKey: true,
        equalTo: this.questionKey
      }
    });
  }

  closeButtonLabel (q) {
    return q.isClosed ? 'Closed' : 'Close Question';
  }

  onSubmitAnswer() {
    let user = this.afAuth.auth.currentUser;
    if (user != null) {
      this.answers.push({
        answer: this.answer.answer,
        created_at: Date.now(),
        user: user.displayName,
        userImageURL: user.photoURL,
        imageURL: this.answer.imageURL,
        question_id: this.questionKey,
        isBest: false,
        likes: 0,
        likedFromUsers: {isJoin: 'yes'}
      })
      // call handleTranslation utility helper to save translation
      // of user text to firebase under `translations` endpoint
      this.utils.handleTranslation(this.answer.answer);
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

  onImageClick() {
    //Refactor to use action sheet for selecting gallery or camera
    this.utils.getPicture({}, (imageData) => {
      if (imageData != null) {
        this.answer.imageURL = imageData;
        this.utils.popToast('Image Uploaded.  Submit your answer to view it!');
      } else {
        this.utils.popToast('Null Image Data Error');
      }
    });
  }


}
