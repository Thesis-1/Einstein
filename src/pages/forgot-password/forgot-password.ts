import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//Utility helpers contains useful helpers for common tasks to keep code DRY
import { UtilityHelpers } from '../../providers/utility-helpers';
//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  emailAddress = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public utils: UtilityHelpers
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  sendReset() {
    this.afAuth.auth.sendPasswordResetEmail(this.emailAddress)
    .then( ()=> {
      this.utils.popToast('A password reset email has been sent.  Check your inbox!')
    }, (err) => {
        this.utils.popToast('There was an error.  Is your email address correct?');
    });

  }



}
