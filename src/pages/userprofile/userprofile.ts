import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserProfilePage {

  gravatar = 'http://www.gravatar.com/avatar?d=mm&s=140';
  bio = 'Bio';
  country = 'Country';
  language = 'Language';

  constructor(
    public auth: Auth,
    public user: User,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
    console.log('this.user', this.user);
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  onChangeName() {
    this.showPromptAlert('Name', (info) => {
      this.user.details.name = info;
      this.user.save();
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
            cb(data[field]);
          }
        }
      ]
    });
    alert.present();
  }


  onChangeCountry() {
    var countries = ['USA', 'Canada', 'India', 'Bangladesh', 'UK', 'France'];

    this.showRadioAlert('Country', countries, (info) => {
      this.user.set('country', info);
      this.user.save();
    });

  }

  onChangeLanguage() {
    var languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Korean', 'Russian'];

    this.showRadioAlert('Language', languages, (info) => {
      this.user.set('language', info);
      this.user.save();
    });

  }

  onChangeSubjects() {

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
          cb(data);
        }
      });
      alert.present();
  }

  onChangeBio() {
    console.log('onChangeBio fired');
    this.showPromptAlert('Bio', (info) => {
      this.user.set('bio', info);
      this.user.save();
    });
  }


}
