import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

//Firebase backend
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  fullName = '';
  email = '';

  //Firebase backend variables
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public toastCtrl: ToastController
  ) {

    //Get data from Firebase
    this.items = af.list('/userFeedback', {
      query: {
        limitToLast: 50
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  //Send feedback data to Firebase
  sendFeedback(desc: string) {

    if (desc) {
      this.items.push({ message: desc});
      this.msgVal = '';
    }

  }
}
