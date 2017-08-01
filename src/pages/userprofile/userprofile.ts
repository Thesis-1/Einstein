import { Component } from '@angular/core';
import { AlertController, NavController, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
  // bio = 'Bio';
  // country = 'Country';
  // language = 'Language';
  loggedInUser: FirebaseListObservable<any[]>;

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
    public utils: UtilityHelpers,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private sanitizer: DomSanitizer
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

  //Data grabbed from camera stored in DB is considered unsafe by Angular
  //Have to bypass security to trust the data
  trustURL(data) {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  updatePicture(key) {
    console.log(key);
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 200,
      targetWidth: 200,
      cameraDirection: this.camera.Direction.FRONT
    }).then( (imageData) => {
      let dataURL = `data:image/jpeg;base64,${imageData}`;
      this.loggedInUser.update(key, {photoURL: dataURL});
      this.utils.popToast('Profile picture updated!');
    }, (err) => {
      //Attempt to simulate a camera on web
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select a Photo',
        buttons: [
          {
            text: 'Einstein',
            handler: () => {
              this.loggedInUser.update(key, {photoURL: 'assets/img/einstein-main.jpeg'})
            }
          },{
            text: 'Basic user Image Base64',
            handler: () => {
              this.loggedInUser.update(key, {photoURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAMFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaPxwLAAAAD3RSTlMAECAwT19gj5C/wM/Q3+9FZnYJAAAAjklEQVR4Ae3SSw7DIAwEUOOkxS6fuf9tu2hVKZ8As0Nq3tqTMAaZ101jAlJUGWT4ijIk4ycR3/8w6VJsKPcDwMYaMC2wwwfII2W+NL9W/uKIFpl8fCaD1DKQTeVvhDW6F6C4xzVIzzNhIz3a4wUH5TqijlOucmqpuFCX/nw/ESoa6nFdLzS57KFjxsBUbm81lh3paNio7AAAAABJRU5ErkJggg=='});
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();

      // this.utils.popToast('Error grapping photo with web mock.')
      // return null;
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

    this.showRadioAlert('Country', countries, (info) => {
      this.loggedInUser.update(u.$key, { country: info });
    });
    // this.showPromptAlert('Country', (info) => {
    //   console.log('u in onChangeCountry before updating in firebase', u);
    //   this.loggedInUser.update(u.$key, { country: info });
    // });
  }


  onChangeLanguage(u) {
    let languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Korean', 'Russian'];
    this.showRadioAlert('Language', languages, (info) => {
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
