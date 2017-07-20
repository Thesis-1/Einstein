import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';

import { StreamData } from '../providers/questions-stream';

//Imports for firebase DB
import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyD-p5kimWSiFWZorVKEUNfuscpbC_bW4oc",
  authDomain: "einstein-981c4.firebaseapp.com",
  databaseURL: "https://einstein-981c4.firebaseio.com",
  projectId: "einstein-981c4",
  storageBucket: "einstein-981c4.appspot.com",
  messagingSenderId: "780646176835"
};


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { QuestionPage } from '../pages/question/question';
import { AboutPage } from '../pages/about/about';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'a3b9d8c7'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    QuestionPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: HomePage, name: 'HomePage', segment: 'home' },
        { component: AboutPage, name: 'AboutPage', segment: 'about' }
      ]
    }),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    QuestionPage,
    AboutPage
  ],
  providers: [
    StreamData,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
