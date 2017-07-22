import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController,
  Platform, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User, Auth } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//Stream data for answers
import { AnswerStreamData } from '../../providers/answers-stream';

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
    user_id: 'unknown'
  };


  answer = {
    answer: '',
    created_at: 0,
    user: 'Unknown',
    image:'',
    question_id:'',
    isBest: false
  };

  //firebase
  answers: any = [];
  //answers: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public user: User,
    public auth: Auth,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public toastCtrl: ToastController,
    public answerStreamData: AnswerStreamData
  ) {

    // this.answers = this.af.list('/userAnswers',  {
    //   query: {
    //     limitToLast: 50,
    //     orderByChild: 'question_id',
    //     equalTo: this.question.key
    //   }
    // });
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
    this.answerStreamData.load(this.question.key)
      .subscribe ((data: any
      ) => {
        this.answers = data;
    });

  }

  onSubmitAnswer() {
    if (this.auth.isAuthenticated()) {
      this.answers.push({
        answer: this.answer.answer,
        created_at: Date.now(),
        user: this.user.details.name,
        image: 'https://s3.amazonaws.com/ionic-api-auth/users-default-avatar@2x.png',
        question_id: this.question.key,
        isBest: false,
      })
      // this.answer.created_at = Date.now();
      // this.answer.user = this.user.details.name;
      // this.answer.image = 'https://s3.amazonaws.com/ionic-api-auth/users-default-avatar@2x.png';
      // this.answer.question_id = this.question.key;
      // this.answer.isBest = false;
      // this.answers.push( this.answer );
      // this.answer.answer = '';
    } else {
      //Show a toast notification if not logged in
      let toast = this.toastCtrl.create({
        message: 'Please Log In to Post Answers.',
        duration: 2500
      });
      toast.present();
    }
    //clear input field
    this.answer.answer = '';

  }







}
