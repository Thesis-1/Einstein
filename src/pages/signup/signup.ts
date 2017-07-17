import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
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
    console.log('ionViewDidLoad SignupPage');
  }

  //Authentication code for new user sign up
  authNewAccount(form: NgForm) {

    if (form.valid) {
      this.auth.signup(this.details).then(() => {
        // On successful Signup, Immediately log in user
        return this.auth.login('basic',
        this.details);
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
