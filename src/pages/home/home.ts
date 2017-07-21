import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { User, Auth } from '@ionic/cloud-angular';
import { App, Refresher, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { QuestionPage } from '../question/question';
import { AnswerPage } from '../answer/answer';
import { StreamData } from '../../providers/questions-stream';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  questions: any = [];
  tester = 'unanswered';
  constructor(
    public navCtrl: NavController,
    public user: User,
    public auth: Auth,
    public app: App,
    public streamData: StreamData,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {

  }
  ionViewDidLoad() {
    this.app.setTitle('Questions');
    this.updateQuestionStream();
  }

  updateQuestionStream () {
    this.streamData.load()
      .subscribe ((data: any) => {
        this.questions = data;
        console.log(this.questions)
    });

  }

  onGoToQuestion() {
    this.navCtrl.push(QuestionPage);
  }

  onQuestionClick(question) {
    this.storage.set('answerPageCurrQuestion', question);
    this.navCtrl.push(AnswerPage);
  }

  getUserFullName() {
    if(this.auth.isAuthenticated()) {
      return this.user.get('name', 'young Einstein');
    } else {
      return 'young Einstein';
    }
  }

<<<<<<< HEAD
  // doRefresh(refresher: Refresher) {
  //   this.streamData.load()
  //     .subscribe ((data: any) => {
  //       this.questions = data;
  //       refresher.complete ();
  //       const toast = this.toastCtrl.create({
  //         message: 'Questions have been updated.',
  //         duration: 3000
  //       });
  //       toast.present();
  //       console.log('content updated');
  //   });

  // }
=======
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
>>>>>>> 19f7b1fa0a584fae92c08aa17a8323bf9fca549a
}
