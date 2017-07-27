import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { NgForm, EmailValidator } from '@angular/forms';
//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';

//Utility helpers contains useful helpers for common tasks to keep code DRY
import { UtilityHelpers } from '../../providers/utility-helpers';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // @ViewChild(Nav) nav: Nav;

  details= {
    email: '',
    password: ''
  };

  submitted = false;

  constructor(
    public navCtrl: NavController,
    public nav: Nav,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public utils: UtilityHelpers
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(this.details.email, this.details.password)
      .then( ()=> {
        //redirect user to correct page
        this.navCtrl.setRoot(TabsPage);
      })
      .catch( (err)=> {
        //Display error message
        this.utils.popToast('Invalid Login, please try again.');
      });
    }
  }

  onSignup() {
    this.navCtrl.setRoot('SignupPage');
  }
  onForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

}
