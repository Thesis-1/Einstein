import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { User, Auth } from '@ionic/cloud-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public user: User,
    public auth: Auth
  ) {

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
}
