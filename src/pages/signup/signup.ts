import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { NgForm, EmailValidator } from '@angular/forms';
import { ToastController } from 'ionic-angular';
//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  details = {
    name: '',
    email: '',
    password: ''
  };

  submitted = false;
  validSignup = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nav: Nav,
    public toastCtrl: ToastController,
    public afAuth: AngularFireAuth
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  //Authentication code for new user sign up
  authNewAccount(form: NgForm) {
    if (form.valid) {
      //Call firebase auth create user method
      this.afAuth.auth.createUserWithEmailAndPassword(this.details.email, this.details.password)
        .then ( ()=> {
          //on success, set up user profile object
          let user = this.afAuth.auth.currentUser;

          if (user != null) {
            user.updateProfile({
              displayName: this.details.name,
              photoURL: '../../assets/img/einstein-main.jpeg'
              // bio: 'I like to count with my fingers.',
              // learningSubjects: '',
              // teachingSubjects: '',
              // language: 'English',
              // country: 'United States'
            }).then( ()=> {
              // Update successful.
              //Note: User is auto logged in on account creation in Firebase
              this.validSignup = true;
              //TODO: send acct. verification email.
              user.sendEmailVerification().then( ()=> {
                let toast = this.toastCtrl.create({
                  message: 'Account verification email sent.  Check your inbox!',
                  duration: 2500
                });
                toast.present();

                //Redirect to home Page
                this.nav.setRoot(HomePage);
              }, (err)=> {
                let toast = this.toastCtrl.create({
                  message: 'Error sending Account Verification Email.',
                  duration: 2500
                });
                toast.present();
              });
            }, (err)=> {
              // An error happened.  present toast.
              let toast = this.toastCtrl.create({
                message: 'Error Initializing user profile.',
                duration: 2500
              });
              toast.present();
              return false;
            });;
          }

        }, (err)=> {
          //on error, present toast
          let toast = this.toastCtrl.create({
            message: 'Error creating user, please try again.',
            duration: 2500
          });
          toast.present();
          return false;
        });
    }
  }



}
