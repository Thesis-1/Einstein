import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

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

  //firebase
  answers: FirebaseListObservable<any[]>;

  constructor(
    public storage: Storage,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public toastCtrl: ToastController,
    public utils: UtilityHelpers
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
    //Get the question from local storage
    this.storage.get('answerPageCurrQuestion').then( (q)=> {
      // for (let key in q) {
      //   this.question[key] = q[key];
      // }
      this.question = q;

      //Get the answers for current question from DB via provider
      this.updateAnswerStream();
    });
  }

  updateAnswerStream () {
    this.answers = this.af.list('/userAnswers', {
      query: {
        limitToLast: 50,
        orderByChild: 'question_id',
        equalTo: this.question.key
      }
    });
  }

  onSubmitAnswer() {
    let user = this.afAuth.auth.currentUser;
    if (user != null) {
      this.answers.push({
        answer: this.answer.answer,
        created_at: Date.now(),
        user: user.displayName,
        image: user.photoURL,
        question_id: this.question.key,
        isBest: false,
        likes: 0,
        likedFromUsers: {isJoin: 'yes'}
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
