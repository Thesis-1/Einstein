import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Platform, ToastController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateService } from './translate';

@Injectable()
export class UtilityHelpers {
  _questionKey = 'unknown';
  // currentTranslation;
  // translationTest = 'Hello world';

  // camOptions: CameraOptions = {
  // quality: 100,
  // destinationType: this.camera.DestinationType.DATA_URL,
  // encodingType: this.camera.EncodingType.JPEG,
  // mediaType: this.camera.MediaType.PICTURE
  //
  // }

    constructor(
      public http: Http,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      private camera: Camera,
      private translateSvc: TranslateService
    ) {


    }

    getPicture() {
      this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }).then( (imageData) => {
        return 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        this.popToast('Error grapping photo with web mock.')
        return null;
      });
    }

    setQuestionKey(k) {
      console.log('setQuestionKey called');
      this._questionKey = k;
    }

    getQuestionKey() {
      return this._questionKey;
    }

    popToast(s) {
      let toast = this.toastCtrl.create({
        message: s,
        duration: 2500
      });
      toast.present();
    }

    //takes in an int = ms since epoch
    //returns a string of human readable time format
    humanReadableTime (t) {
      let tCurrent = Date.now();
      let msDifference = tCurrent - t;

      //very recently posted
      if (msDifference < 30000) {
        return 'just now';
      }

      //posted around 30 seconds ago
      if (msDifference < 60000) {
        return '30 seconds ago';
      }
      //posted at least 1 minute ago (main algorithm)
      //mS in a minute= 60000
      const MS_IN_MINUTE = 60000;
      //mS in an hour= 3600000
      const MS_IN_HOUR = 3600000;
      //mS in a day= 86400000
      const MS_IN_DAY = 86400000;
      //mS in a week= 604800000
      const MS_IN_WEEK = 604800000;
      //mS in a year= 31536000000
      const MS_IN_YEAR = 31536000000;

      let time = '';

      if (msDifference > MS_IN_YEAR) {
        let years = Math.floor(msDifference / MS_IN_YEAR);
        msDifference = msDifference - (years * MS_IN_YEAR);

        //Handle single or plural cases
        let ending = years == 1 ? 'year' : 'years';
        time = time + `${years} ${ending} `;
      }

      if (msDifference > MS_IN_WEEK) {
        let weeks = Math.floor(msDifference / MS_IN_WEEK);
        msDifference = msDifference - (weeks * MS_IN_WEEK);

        //Handle single or plural cases
        let ending = weeks == 1 ? 'week' : 'weeks';
        time = time + `${weeks} ${ending} `;
      }

      if (msDifference > MS_IN_DAY) {
        let days = Math.floor(msDifference / MS_IN_DAY);
        msDifference = msDifference - (days * MS_IN_DAY);

        //Handle single or plural cases
        let ending = days == 1 ? 'day' : 'days';
        time = time + `${days} ${ending} `;
      }

      if (msDifference > MS_IN_HOUR) {
        let hours = Math.floor(msDifference / MS_IN_HOUR);
        msDifference = msDifference - (hours * MS_IN_HOUR);

        //Handle single or plural cases
        let ending = hours == 1 ? 'hour' : 'hours';
        time = time + `${hours} ${ending} `;
      }

      if (msDifference > MS_IN_MINUTE) {
        let minutes = Math.floor(msDifference / MS_IN_MINUTE);
        msDifference = msDifference - (minutes * MS_IN_MINUTE);

        //Handle single or plural cases
        let ending = minutes == 1 ? 'minute' : 'minutes';
        time = time + `${minutes} ${ending} `;
      }

      time = time + 'ago'

      return time;

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

    // Radio Alert Function:
    // Will be given the field for a user to change, the array of
    // choices, and a callback to pass the data to firebase by a
    // wrapper function.
    showRadioAlert(field, choices, cb) {

        let alert = this.alertCtrl.create();
        alert.setTitle(field);

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

    handleTranslation(userText) {
      // The createTranslation microservice takes a string as an argument and saves
      // each translation in the array of supported languages under a key in Firebase at
      // the '/translations' endpoint.

      // `this.translationTest` should be the question/answer string passed to
      // createTranslation.
      this.translateSvc.createTranslation(userText);
    }

    // defaultMessage() {
    //   if (!this.currentTranslation) {
    //     return "Enter text and click Translate";
    //   } else {
    //     return "Running translation in the cloud ...";
    //   }
    // }
}
