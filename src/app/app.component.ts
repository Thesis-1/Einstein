import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Deploy} from '@ionic/cloud-angular';


import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  signupPage:any = SignupPage;

  loginBtnText: 'Log In';

  loginClick(event) {
    console.log('Log in Clicked!');
  }

  constructor(public deploy: Deploy, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
