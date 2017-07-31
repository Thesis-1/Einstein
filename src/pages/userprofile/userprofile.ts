import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';


//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Imports for Google Translate
import { TranslateService } from '../../providers/translate';

import { LearningSubjectsPage } from '../learning-subjects/learning-subjects';
import { TeachingSubjectsPage } from '../teaching-subjects/teaching-subjects';

import { UtilityHelpers } from '../../providers/utility-helpers';

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
  translationTest = 'Hello world';
  currentTranslation;
  country = 'Country';
  language = 'Language';
  //Camera Options
  // options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  //
  // }

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public utils: UtilityHelpers,
    private translateSvc: TranslateService
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
          equalTo: user.uid //Currently logged in user
        }
      });
      console.log('user id is: ', user.uid, user.uid == "Uniaj6st9eNPlrt4HuUwDxGETeb2");
      console.log('loggedInUser set to: ', this.loggedInUser);
    }

  }

  handleTranslation() {
    this.currentTranslation = this.translateSvc.createTranslation(this.translationTest);
  }

  defaultMessage() {
    if (!this.currentTranslation) {
      return "Enter text and click Translate";
    } else {
      return "Running translation in the cloud ...";
    }
  }

  updatePicture(u) {
    this.utils.getPicture( (s) => {
      u.photoURL = s;
    });
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

    this.utils.showRadioAlert('Country', countries, (info) => {
      this.loggedInUser.update(u.$key, { language: info });
    });

    // this.showRadioAlert('Country', countries, (info) => {
    //   this.loggedInUser.update(u.$key, { country: info });
    // });
    // this.showPromptAlert('Country', (info) => {
    //   console.log('u in onChangeCountry before updating in firebase', u);
    //   this.loggedInUser.update(u.$key, { country: info });
    // });
  }


  onChangeLanguage(u) {
    let languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Russian'];

    this.utils.showRadioAlert('Language', languages, (info) => {
      this.loggedInUser.update(u.$key, { language: info });
    });
  }

  onChangeLearning(u) {

    console.log('u in onChangeLearning', u);

    // rewrite to push a new learning subjects page instead of using
    // a prompt alert
    this.navCtrl.push(LearningSubjectsPage, { u });
  }

  onChangeTeaching(u) {

    this.navCtrl.push(TeachingSubjectsPage, { u });

  }

}
