import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { StreamData } from '../../../providers/questions-stream';
import { AnswerPage } from '../../answer/answer';

@Component({
  selector: 'page-questionarchive',
  templateUrl: 'questionarchive.html'
})
export class QuestionArchivePage {

  categories = ['Math'];
  currentCategory = this.categories[0];
  messageType = 'all';
  count = {};

  //firebase
  questions: FirebaseListObservable<any[]>;
  views: FirebaseListObservable<any[]>;
  answers: FirebaseListObservable<any []>;
  loggedInUser: any;
  displayName: any;
  photoUrl: any;
  user: any;
  viewCountRunning: any;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public streamData: StreamData,
    public storage: Storage,
    private http: Http
  ){
    this.views = this.streamData.fetchViewed();
    this.answers = this.streamData.fetchAnswers();
    this.displayName = '';
    this.photoUrl = '';
    this.viewCountRunning = false;
  }

  ionViewDidLoad() {
    this.user = this.afAuth.auth.currentUser;

    if ( this.user != null ) {
      
      //Get logged in user from af database by matching user id
      this.http.get('https://einstein-981c4.firebaseio.com/users.json?orderBy="user_id"&equalTo="' + this.user.uid + '"')
      .subscribe( (user_info) => {

        let userObject = user_info.json();
        for(var key in userObject){

          if(userObject[key].user_id === this.user.uid) {
            this.loggedInUser = userObject[key];
          }

          this.displayName = this.loggedInUser['displayName'];
          this.photoUrl = this.loggedInUser['photoUrl'];
        }
      });

      //fetch questions
      this.fetchQuestions('all');

      //watches updates from the answers table and updates view count
      this.answers.$ref
      .limitToLast(1)
      .on("child_added", (child) => {
        this.getViewCount();
      });    

      //watches updates from the view table and updates view count
      this.views.$ref
      .limitToLast(1)
      .on("child_added", (child) => {
        this.getViewCount();
      });     
    } else {
      this.navCtrl.setRoot('LoginPage');
    }
  }

  getColor(question) {
    return question.isClosed ? 'green' : 'black';
  }
  
  fetchQuestions(messageType) {
    //TODO Refactor
    if(messageType === 'all') {
      this.questions = this.af.list('/userQuestions',  {
        query: {
          limitToLast: 50,
          orderByChild: 'userId',
          equalTo: this.user.uid
        }
      });

    } else if (messageType === 'open') {
      this.questions = this.af.list('/userQuestions',  {
        query: {
          limitToLast: 50,
          orderByChild: 'userClosed',
          equalTo: this.user.uid+false
        }
      });

    } else if (messageType === 'closed') {
      this.questions = this.af.list('/userQuestions',  {
        query: {
          limitToLast: 50,
          orderByChild: 'userClosed',
          equalTo: this.user.uid+true
        }
      });

    }
  }

  getViewCount() {
    //TODO Refactor

    if(!this.viewCountRunning) {
      this.viewCountRunning = true;

      this.questions.forEach( ( questions ) => {
        questions.forEach( (question) => {
          this.http.get('https://einstein-981c4.firebaseio.com/userAnswers.json?orderBy="question_id"&equalTo="' + question.$key + '"')
          .subscribe( (answers) => {

            let objAnswers = answers.json();
            this.count[question.$key] = 0;

            Object.keys(objAnswers).forEach( (answer) => {
              this.http.get('https://einstein-981c4.firebaseio.com/answerViews.json?orderBy="user_answer_id"&equalTo="' + this.user.uid + answer + '"')
              .subscribe( (view) => {
                if(Object.keys(view.json()).length === 0) {
                  this.count[question.$key]++;
                }
              });
            });
            this.viewCountRunning = false;
          });
        });
      });
    }
  }

  sendQuestionDelete(id) {
    this.questions.remove(id);
  }

  onQuestionClick(question) {
    let storeObj = question;
    storeObj.key = question.$key;
    this.storage.set('answerPageCurrQuestion', storeObj);

    this.streamData.updateViewedAnswers(question);
    this.getViewCount();

    this.navCtrl.push(AnswerPage);
  }
}