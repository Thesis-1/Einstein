import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserProfilePage {

  username: string = '';
  name: string = this.user.details.name;
  email: string = this.user.details.email;

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

  onChangeName(updatedName) {

  }

  onChangeCountry(updatedCountry) {

  }

  onChangeLanguage(updatedLanguage) {

  }


  onChangeSubjects(updatedSubjects) {

  }

  // method for displaying prompt alert box
  // will be called by some wrapper method to supply the
  // right data for inputs and string interpolation
  onChangeUserInfo() {
    let alert = this.alertCtrl.create({
      title: 'Update Name',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Name'
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
            console.log(JSON.stringify(data));
            console.log(data.Name);
            this.name = data.Name;
          }
        }
      ]
    });
    alert.present();
  }

  // onUpdateName(event: any) {
  //   this.name = event.target.value;
  // }
  //
  // changeName(newName) {
  //   this.user.set('name', newName);
  // }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  // changeUsername() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Change Username',
  //     buttons: [
  //       'Cancel'
  //     ]
  //   });
  //   alert.addInput({
  //     name: 'username',
  //     value: this.username,
  //     placeholder: 'username'
  //   });
  //   alert.addButton({
  //     text: 'Ok',
  //     handler: (data: any) => {
  //       this.user.set(data.username);
  //       this.getUsername();
  //     }
  //   });
  //
  //   alert.present();
  // }

  // getUsername() {
  //   this.userData.getUsername().then((username) => {
  //     this.username = username;
  //   });
  // }

  // changePassword() {
  //   console.log('Clicked to change password');
  // }


  // support() {
  //   this.navCtrl.push('SupportPage');
  // }
}
