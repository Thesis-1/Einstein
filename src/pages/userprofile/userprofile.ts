import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { LearningSubjectsPage } from '../learning-subjects/learning-subjects';

@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserProfilePage {

  gravatar = 'http://www.gravatar.com/avatar?d=mm&s=140';
  // bio = 'Bio';
  // country = 'Country';
  // language = 'Language';
  loggedInUser: FirebaseListObservable<any[]>;
  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    /* user object will look like this:
    bio: "I like to add with my fingers"
    country: "United States"
    displayName: "Doug Lyford"
    language: "English"
    learningSubjects: ""
    photoURL: "../../assets/img/einstein-main.jpeg"
    teachingSubjects: ""
    user_id: "Uniaj6st9eNPlrt4HuUwDxGETeb2"


    Use this in HTML to access the propertiels like this:
    let u of loggedInUser {
      u.bio = " "
      u.country;
      etc
    }
    */
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeLearning = this.onChangeLearning.bind(this);
    this.onChangeTeaching = this.onChangeTeaching.bind(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
    let user = this.afAuth.auth.currentUser;
    if ( user != null ) {
      //Get logged in user from af database by matching user id
      this.loggedInUser = this.af.list('/users',  {
        query: {
          orderByChild: 'user_id',
          equalTo: user.uid
        }
      });
      console.log('user id is: ', user.uid, user.uid == "Uniaj6st9eNPlrt4HuUwDxGETeb2");
      console.log('loggedInUser set to: ', this.loggedInUser);
    }

  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  onChangeName(u) {
    console.log('u in onChangeName', u);
    this.showPromptAlert('Name', (info) => {
      console.log('u in onChangeName before updating in firebase', u);

      this.loggedInUser.update(u.$key, { displayName: info });
    });
  }

  // Prompt Alert Function:
  // will be called by some wrapper method to supply the
  // right data for inputs and string interpolation

  showPromptAlert(field, cb) {

    let alert = this.alertCtrl.create({
      title: 'Update ' + field,
      inputs: [
        {
          name: field,
          placeholder: field
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log('data[field] on line 200', data[field]);
            cb(data[field]);
          }
        }
      ]
    });
    alert.present();
  }

  onChangeBio(u) {
    this.showPromptAlert('Bio', (info) => {
      this.loggedInUser.update(u.$key, { bio: info });
    });
  }

  onChangeCountry(u) {
    let countries = ['USA', 'Canada', 'India', 'Bangladesh', 'UK', 'France'];

    this.showRadioAlert('Country', countries, (info) => {
      this.loggedInUser.update(u.$key, { country: info });
    });
    // this.showPromptAlert('Country', (info) => {
    //   console.log('u in onChangeCountry before updating in firebase', u);
    //   this.loggedInUser.update(u.$key, { country: info });
    // });
  }


  // onChangeCountry() {
  //   // console.log('first line of onChangeCountry');
  //
  //   let countries = ['USA', 'Canada', 'India', 'Bangladesh', 'UK', 'France'];
  //
  //   this.showRadioAlert('Country', countries, (info) => {
  //     this.country = info;
  //     this.user.set('country', info);
  //     this.user.save();
  //   });
  //   console.log('this.user after setting country', this.user);
  //   // country attribute is accessible under this.user.data.data.country
  //   // (NOT in the details object under `this.user.details`)
  // }
  //

  onChangeLanguage(u) {
    let languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Korean', 'Russian'];
    this.showRadioAlert('Language', languages, (info) => {
      this.loggedInUser.update(u.$key, { language: info });
    });
  }

  // onChangeLanguage() {
  //   let languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Korean', 'Russian'];
  //
  //   this.showRadioAlert('Language', languages, (info) => {
  //     this.language = info;
  //     this.user.set('language', info);
  //     this.user.save();
  //   });
  //   console.log('this.user after setting country', this.user);
  // }
  //

  onChangeLearning(u) {
    // this.showPromptAlert('Learning Subjects', (info) => {
    //   this.loggedInUser.update(u.$key, { learningSubjects: info });
    // });

    console.log('u in onChangeLearning', u);

    // rewrite to push a new learning subjects page instead of using
    // a prompt alert
    this.navCtrl.push(LearningSubjectsPage, { u });

    // LearningSubjectsPage should populate with user's learningSubjects
    // in firebase, and add or remove from that property as the user
    // clicks around
  }

  onChangeTeaching(u) {
    this.showPromptAlert('Teaching Subjects', (info) => {
      this.loggedInUser.update(u.$key, { teachingSubjects: info });
    });

    // rewrite to push a new teaching subjects page instead of using
    // a prompt alert
    // this.navCtrl.push(TeachingSubjectsPage);
  }

  // Radio Alert Function:

  showRadioAlert(field, choices, cb) {

      let alert = this.alertCtrl.create();
      alert.setTitle('Country');

      choices.forEach((choice) => {
        alert.addInput({
          type: 'radio',
          label: choice,
          value: choice
        });
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          console.log('data', data);
          cb(data);
        }
      });
      alert.present();
  }

}
