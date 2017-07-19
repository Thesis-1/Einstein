import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserProfilePage {

  // username: string = '';
  // name: string = this.user.details.name;
  // email: string = this.user.details.email;
  country = 'Country';

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
    console.log('in onChangeName');
    var field = 'Name';

    this.onChangeUserInfo(field, (info) => {
      this.user.details.name = info;
      this.user.save();
    });

    console.log('this.user.details object after setting newName', this.user.details);
    // ^ PROBLEM: this runs before the call to `onChangeUserInfo` returns the newName,
    // we need a callback
  }


    // prompt alert function:
    // will be called by some wrapper method to supply the
    // right data for inputs and string interpolation

  onChangeUserInfo(field, cb) {

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


  onChangeCountry(updatedCountry) {

  }

  onChangeLanguage(updatedLanguage) {

  }


  onChangeSubjects(updatedSubjects) {

  }

  // radio alert function:

  showRadio() {
      let alert = this.alertCtrl.create();
      alert.setTitle('Country');

      alert.addInput({
        type: 'radio',
        label: 'USA',
        value: 'USA',
        // checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Canada',
        value: 'Canada',
        // checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'India',
        value: 'India',
        // checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Bangladesh',
        value: 'Bangaldesh',
        // checked: true
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          console.log('data', data);
          this.country = data;
          this.user.set('country', data);
          this.user.save();
        }
      });
      alert.present();
  }

}
