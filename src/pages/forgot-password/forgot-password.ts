import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User, Auth } from '@ionic/cloud-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  emailAddress = '';
  resetInProgress = false;
  pwResetCode = 0;
  password = '';
  passwordTwo = '';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: User,
    public auth: Auth,
    public toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  sendReset() {
    this.auth.requestPasswordReset(this.emailAddress).then( (res)=> {
      //On success
      this.resetInProgress = true;

      //Pop some toast
      let toast = this.toastCtrl.create({
        message: 'A password reset email has been sent.  Check your inbox!',
        duration: 3000
      });
      toast.present();
    }, (rej)=> {
      //Pop some toast
      let toast = this.toastCtrl.create({
        message: 'There was a problem resetting your password.  Please try again!',
        duration: 3000
      });
      toast.present();

      console.log('Error resetting password: ', rej);
    });

  }

  setNewPassword() {
    this.auth.confirmPasswordReset(this.pwResetCode, this.password).then( (res)=> {
      //On success

      //Pop some toast
      let toast = this.toastCtrl.create({
        message: 'Thank You, your password has been reset!',
        duration: 3000
      });
      toast.present();

      this.resetInProgress = false;
    }, (rej)=> {
      //Pop some toast
      let toast = this.toastCtrl.create({
        message: 'There was a problem resetting your password.  Please try again!',
        duration: 3000
      });
      toast.present();

      console.log('Error resetting password: ', rej);
    });

  }

}
