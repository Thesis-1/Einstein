import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { NgForm, EmailValidator } from '@angular/forms';
import { ToastController } from 'ionic-angular';
//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';


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
    public toastCtrl: ToastController
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
        this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
      })
      .catch( (err)=> {
        //Display error message
        let toast = this.toastCtrl.create({
          message: 'Invalid Login, please try again.',
          duration: 2500
        });
        toast.present();
      });

      //OLD code for Ionic Auth
      // console.log('details: ', this.details);
      // this.auth.login('basic', this.details).then ( () => {
      //   //On Success, send to home page
      //   this.nav.setRoot('TabsPage');
      // }, ()=> {
      //   //On Error, log error
      //   let toast = this.toastCtrl.create({
      //     message: 'Invalid Login, please try again.',
      //     duration: 2500
      //   });
      //   toast.present();
      // });

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
