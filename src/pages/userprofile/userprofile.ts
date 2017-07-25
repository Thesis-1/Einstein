import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserProfilePage {

  country = 'Country';
  language = 'Language';
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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
    let user = this.afAuth.auth.currentUser;
    if ( user != null ) {
      //Get logged in user from af database by matching user id
      this.loggedInUser = this.af.list('/users',  {
        query: {
          orderByChild: 'user_id',
          equalTo: user.uid //Currently logged in user
        }
      });
      console.log('user id is: ', user.uid, user.uid == "Uniaj6st9eNPlrt4HuUwDxGETeb2");
      console.log('loggedInUser set to: ', this.loggedInUser);
    }

  }

  updatePicture() {
    console.log('Clicked to update picture');
  }


  onChangeName () {

  }

  // onChangeName() {
  //   // console.log('in onChangeName');
  //
  //   this.showPromptAlert('Name', (info) => {
  //
  //   });
  //
  // }
  //
  //
  // Prompt Alert Function:
  // will be called by some wrapper method to supply the
  // right data for inputs and string interpolation
  //
  // showPromptAlert(field, cb) {
  //
  //   let alert = this.alertCtrl.create({
  //     title: 'Update ' + field,
  //     inputs: [
  //       {
  //         name: field,
  //         placeholder: field
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           console.log('Saved clicked');
  //           console.log('data[field] on line 200', data[field]);
  //
  //           console.log('type of data[field]', typeof data[field]);
  //           console.log('this.user in callback', this.user);
  //           cb(data[field]);
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
  //
  //
  //
  // onChangeCountry() {
  //
  // }
  //
  //
  // onChangeCountry() {
  //   // console.log('first line of onChangeCountry');
  //
  //   var countries = ['USA', 'Canada', 'India', 'Bangladesh', 'UK', 'France'];
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

  onChangeLanguage() {

  }

  // onChangeLanguage() {
  //   var languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Korean', 'Russian'];
  //
  //   this.showRadioAlert('Language', languages, (info) => {
  //     this.language = info;
  //     this.user.set('language', info);
  //     this.user.save();
  //   });
  //   console.log('this.user after setting country', this.user);
  // }
  //

  onChangeSubjects() {

  }

  // onChangeSubjects() {
  //
  // }
  //
  // // radio alert function:
  //
  // showRadioAlert(field, choices, cb) {
  //
  //     let alert = this.alertCtrl.create();
  //     alert.setTitle('Country');
  //
  //     choices.forEach((choice) => {
  //       alert.addInput({
  //         type: 'radio',
  //         label: choice,
  //         value: choice
  //       });
  //     });
  //
  //     alert.addButton('Cancel');
  //     alert.addButton({
  //       text: 'OK',
  //       handler: data => {
  //         console.log('data', data);
  //         cb(data);
  //       }
  //     });
  //     alert.present();
  // }

}
