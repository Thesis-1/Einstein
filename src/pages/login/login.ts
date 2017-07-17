import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { SignupPage } from '../signup/signup';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: Auth, 
    public user: User
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSignup() {
    console.log('signup clicked');
    this.navCtrl.push(SignupPage);
  }

}
