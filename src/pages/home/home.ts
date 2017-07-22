import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User, Auth } from '@ionic/cloud-angular';
import { App, Refresher, ToastController } from 'ionic-angular';

import { QuestionPage } from '../question/question';
import { StreamData } from '../../providers/questions-stream';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  questions: any = [];
  queryText = '';
  tester = 'unanswered';
  filter = 'all';

  constructor(
    public navCtrl: NavController,
    public user: User,
    public auth: Auth,
    public app: App,
    public streamData: StreamData,
    public toastCtrl: ToastController
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

  getUserFullName() {
    if(this.auth.isAuthenticated()) {
      return this.user.get('name', 'young Einstein');
    } else {
      return 'young Einstein';
    }
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
