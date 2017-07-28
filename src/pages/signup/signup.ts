import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { NgForm, EmailValidator } from '@angular/forms';
//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

//Utility helpers contains a few helper functions for maintaining DRY code.
import { UtilityHelpers } from '../../providers/utility-helpers';
import { TabsPage } from '../tabs/tabs';



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

  //firebase
  usersList: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nav: Nav,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public utils: UtilityHelpers
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.usersList = this.af.list('/users');

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

              //Create entry in realtime database for user data
              this.usersList.push( {
                displayName: this.details.name,
                user_id: user.uid,
                hasSeenAskInstructions: false,
                photoURL: '../../assets/img/einstein-main.jpeg',
                bio: 'I am a master of the abacus.',
                learningSubjects: {
                  'Algebra': false,
                  'Calculus': false,
                  'Geometry': false,
                  'Trigonometry': false,
                  'Combinatorics': false,
                  'Topography': false,
                  'Statistics': false
                },
                teachingSubjects: {
                  'Algebra': false,
                  'Calculus': false,
                  'Geometry': false,
                  'Trigonometry': false,
                  'Combinatorics': false,
                  'Topography': false,
                  'Statistics': false
                },
                language: 'English',
                country: 'United States'
              });

              //send email for account verification
              user.sendEmailVerification().then( ()=> {
                this.utils.popToast('Account verification email sent.  Check your inbox!');
                //Redirect to home Page
                this.nav.setRoot(TabsPage);
              }, (err)=> {
                this.utils.popToast('Error sending Account Verification Email.');
              });
            }, (err)=> {
              // An error happened.  present toast.
              this.utils.popToast('Error Initializing user profile.');
              return false;
            });;
          }

        }, (err)=> {
          //on error, present toast
          this.utils.popToast('Error creating user, please try again.');
          return false;
        });
    }
  }



}
