import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { App, Refresher, ToastController, ModalController } from 'ionic-angular';
//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(
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
