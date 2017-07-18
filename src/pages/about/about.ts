import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User, Auth } from '@ionic/cloud-angular';
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
  afUser: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: User,
    public auth: Auth,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public toastCtrl: ToastController
  ) {
    this.fullName = this.user.details.name ? this.user.details.name
    : 'Not Logged In.';
    this.email = this.user.details.email ? this.user.details.email
    : 'Not Logged In.';

    //Get data from Firebase
    this.items = af.list('/userFeedback', {
      query: {
        limitToLast: 50
      }
    });

    //Firebase backend currently uses anonymous login
    //Auth is done through ionic service
    //check user auth before allowing db access
    this.afAuth.auth.signInAnonymously();
    this.afUser = this.afAuth.authState;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  //Send feedback data to Firebase
  sendFeedback(desc: string) {
    if (this.auth.isAuthenticated()) {
      if (desc) {
        this.items.push({ message: desc});
        this.msgVal = '';
      }
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please Log in to leave feedback.',
        duration: 2500
      });
      toast.present();
    }
  }
}
