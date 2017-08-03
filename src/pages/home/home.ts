import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { App, Refresher, ToastController, ModalController } from 'ionic-angular';
//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AskQuestionPage } from './ask-question/ask-question';
import { AnswerPage } from '../answer/answer';
import { StreamData } from '../../providers/questions-stream';
import { UtilityHelpers } from '../../providers/utility-helpers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  questions: any = [];
  queryText = '';
  tester = 'unanswered';
  filter = 'all';
  currentUser = this.streamData.getUser()
  currentLanguage;
  translatedQuestions: any = []
  languages = {
    'English': 'english',
    'Spanish': 'es',
    'French': 'fr',
    'German': 'de',
    'Hindi': 'hi',
    'Russian': 'ru',
    'Mandarin': 'zh-TW'
  }

  constructor(
    public afDB: AngularFireDatabase,
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public app: App,
    public streamData: StreamData,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public utils: UtilityHelpers
  ) {
    this.updateQuestionStream();
  }
  ionViewDidLoad() {
    this.app.setTitle('Questions');
    this.updateQuestionStream();
    if ( this.currentUser != null ) {

      this.streamData.getLanguage();
    }
  }

  updateQuestionStream () {
    this.streamData.load()
      .subscribe ((data: any) => {
        this.questions = data;
    });
  }

  getTranslatedQuestions(question) {
    // query '/translations' endpoint by question.$key
    // get currently logged in user's id
    // get translated string out of the data returned by
    // the query to '/translations' (based on currentLanguage)
      // return string
    console.log('this.currentUser', this.currentUser);
    console.log('question.translation_id', question.translation_id);
    // If the question clicked doesn't have a translation_id because
    // it was saved to the database before the `translation_id` property
    // was added to questions and answers, the query to the '/translations'
    // endpoint will return all objects in '/translations'
    this.afDB.list('/translations', {
      query: {
        orderByKey: true,
        equalTo: question.translation_id
      }
    }).subscribe((data) => {

      console.log('data translations', data);
      let user = this.afAuth.auth.currentUser;

      if (user !== null) {
        this.afDB.list('/users', {
          query: {
            orderByChild: 'user_id',
            equalTo: user.uid
          }
        }).subscribe((user) => {
          console.log('user users', user);
          // The console.log is returning the right user object
        })
      }
    });




    // html
    // bind getTranslatedQuestions in <h3></h3>
  }

  onAskQuestion() {
    let user = this.afAuth.auth.currentUser;
    if(user != null) {
      // don't show tabs on the Ask Question Page (works but animation is lost)
      // this.app.getRootNavs()[0].setRoot(AskQuestionPage)
      let askQuestionModal = this.modalCtrl.create(AskQuestionPage);
        askQuestionModal.present();
      // this.navCtrl.push(AskQuestionPage);
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please Log In to Post Questions.',
        duration: 2500
      });
      toast.present();
    }

  }

  onQuestionClick(q) {
    console.log('question clicked');
    this.utils.setQuestionKey(q.$key);
    this.streamData.updateViewedAnswers(q);
    this.navCtrl.push(AnswerPage);
  }

  doRefresh(refresher: Refresher) { // to avoid refresh errors for now
    this.streamData.load()
      .subscribe ((data: any) => {
        this.questions = data;
        refresher.complete ();
        // const toast = this.toastCtrl.create({
        //   message: 'Questions have been updated.',
        //   duration: 3000
        // });
        // toast.present();
        console.log('content updated');
    });

  }

  search() {
    this.streamData.filterItems(this.queryText)
      .subscribe ((data: any) => {
        this.questions = data;
        console.log(this.questions)
    });
  }

  filterQuestions() {
    if(this.filter === 'all'){
      this.updateQuestionStream();
    } else {
      this.streamData.filterAnswerUnanswer(this.filter)
        .subscribe ((data: any) => {
          this.questions = data;
          console.log(this.questions)
      });
    }
  }
}
