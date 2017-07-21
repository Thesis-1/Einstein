import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { NgForm, EmailValidator } from '@angular/forms';
import { Auth, User, UserDetails } from '@ionic/cloud-angular';
import { ToastController } from 'ionic-angular';


import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // @ViewChild(Nav) nav: Nav;

  details: UserDetails = {
    email: '',
    password: ''
  };

  submitted = false;

  constructor(
    public navCtrl: NavController,
    public nav: Nav,
    public navParams: NavParams,
    public auth: Auth,
    public user: User,
    public toastCtrl: ToastController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      console.log('details: ', this.details);
      this.auth.login('basic', this.details).then ( () => {
        //On Success, send to home page
        this.nav.setRoot('HomePage');
      }, ()=> {
        //On Error, log error
        let toast = this.toastCtrl.create({
          message: 'Invalid Login, please try again.',
          duration: 2500
        });
        toast.present();
      });

    }
  }

  // openQuestionsPage() {
  //   this.nav.setRoot('HomePage')
  // }

  onSignup() {
    this.navCtrl.setRoot('SignupPage');
  }
  onForgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

}
