import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionPage } from '../question/question';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onGoToQuestion() {
    this.navCtrl.push(QuestionPage);
  }
}
