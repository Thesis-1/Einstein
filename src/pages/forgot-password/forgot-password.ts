import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//Refactoring Auth to Firebase
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  emailAddress = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  sendReset() {
    this.afAuth.auth.sendPasswordResetEmail(this.emailAddress)
    .then( ()=> {
      let toast = this.toastCtrl.create({
        message: 'A password reset email has been sent.  Check your inbox!',
        duration: 3000
      });
      toast.present();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'There was an error.  Is your email address correct?',
        duration: 3000
      });
      toast.present();
    });

  }



}
