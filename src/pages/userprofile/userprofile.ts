import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserProfilePage {

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
    console.log('this.user.details.email', this.user.details.email);
    // ionic 3 makes you have your email as your e
    console.log('this.user.details.name', this.user.details.name);
    // console.log('this.details.password', this.details.password);

  }
  // ngAfterViewInit() {
  //   this.getUsername();
  // }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  onChangeName() {
    // console.log('in onChangeName');

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
            console.log('Saved clicked');
            console.log('data[field] on line 200', data[field]);

            console.log('type of data[field]', typeof data[field]);
            console.log('this.user in callback', this.user);
            cb(data[field]);
          }
        }
      ]
    });
    alert.present();
  }


  onChangeCountry() {
    // console.log('first line of onChangeCountry');

    var countries = ['USA', 'Canada', 'India', 'Bangladesh', 'UK', 'France'];

    this.showRadioAlert('Country', countries, (info) => {
      this.country = info;
      this.user.set('country', info);
      this.user.save();
    });
    console.log('this.user after setting country', this.user);
    // country attribute is accessible under this.user.data.data.country
    // (NOT in the details object under `this.user.details`)
  }

  onChangeLanguage() {
    var languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Korean', 'Russian'];

    this.showRadioAlert('Language', languages, (info) => {
      this.language = info;
      this.user.set('language', info);
      this.user.save();
    });
    console.log('this.user after setting country', this.user);
  }

  onChangeSubjects() {

  }

  // radio alert function:

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
