import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { NgForm, EmailValidator } from '@angular/forms';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  details: UserDetails = {
    name: '',
    email: '',
    password: ''
  };
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nav: Nav,
    public auth: Auth,
    public user: User
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  //Authentication code for new user sign up
  authNewAccount(form: NgForm) {

    if (form.valid) {
      this.auth.signup(this.details).then(() => {
        // On successful Signup, Immediately log in user
        this.auth.login('basic', this.details);
        this.nav.setRoot('HomePage');
      }, (err: IDetailedError<string[]>) => {
        //Handle errors here
        for (let e of err.details) {
          if (e === 'conflict_email') {
            alert('Email already exists.');
          } else {
            // handle other errors
            alert('Error: ' + e);
          }
        }
      });
    }
  }



}
