import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  details: UserDetails = {
    email: '',
    password: ''
  };
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: Auth,
    public user: User
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
        this.navCtrl.push(HomePage);
      }, (err: IDetailedError<string[]>)=> {
        //On Error, log error
        for (let e of err.details) {
          console.log('Error logging in: ',e);
        }
      });

    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

}
