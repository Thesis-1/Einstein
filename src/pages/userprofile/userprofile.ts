import { Component } from '@angular/core';
import { AlertController, NavController, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

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
  trustedPhotoURL = '';
  loggedInUser: FirebaseListObservable<any[]>;
  translationTest = 'Hello world';
  currentTranslation;
  country = 'Country';
  language = 'Language';

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public utils: UtilityHelpers,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private sanitizer: DomSanitizer,
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


  updatePicture(key) {
    //Set cameraDirection to 1 (FRONT) since this is a profile picture
    let options = {
      cameraDirection: 1
    }

    this.utils.getPicture(options, (imageData) => {
      if (imageData != null) {
        this.loggedInUser.update(key, {photoURL: imageData});
        this.utils.popToast('Profile picture updated!');
      } else {
        this.utils.popToast('Null Image Data Error');
      }
    });
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


  onChangeName(u) {
    console.log('u in onChangeName', u);
    this.utils.showPromptAlert('Name', (info) => {
      console.log('u in onChangeName before updating in firebase', u);

      this.loggedInUser.update(u.$key, { displayName: info });
    });
  }

  onChangeBio(u) {
    this.utils.showPromptAlert('Bio', (info) => {
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
