import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import {IonTagsInputModule} from "ionic-tags-input";
import { Camera } from '@ionic-native/camera';

import { StreamData } from '../providers/questions-stream';
import { UtilityHelpers } from '../providers/utility-helpers';

//Imports for firebase DB
import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { UserProfilePage } from '../pages/userprofile/userprofile';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { AskQuestionPage } from '../pages/home/ask-question/ask-question';
import { PreviewQuestionPage } from '../pages/home/ask-question/preview-question/preview-question';
import { AskedQuestionPage } from '../pages/home/ask-question/asked-question/asked-question';
import { DraftsPage } from '../pages/home/drafts/drafts';
import { QuestionArchivePage } from '../pages/home/questionarchive/questionarchive';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { AnswerPage } from '../pages/answer/answer';
import { LearningSubjectsPage } from '../pages/learning-subjects/learning-subjects';
import { TeachingSubjectsPage } from '../pages/teaching-subjects/teaching-subjects';

export const firebaseConfig = {
  apiKey: "AIzaSyD-p5kimWSiFWZorVKEUNfuscpbC_bW4oc",
  authDomain: "einstein-981c4.firebaseapp.com",
  databaseURL: "https://einstein-981c4.firebaseio.com",
  projectId: "einstein-981c4",
  storageBucket: "einstein-981c4.appspot.com",
  messagingSenderId: "780646176835"
};

class CameraMock extends Camera {
  getPicture(options) {
    //Append 'data:image/gif;base64,' to the front of the resolve value to display in HTML
    return new Promise((resolve, reject) => {
      resolve("R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7");
    })
  }
};



const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'a3b9d8c7'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    AboutPage,
    UserProfilePage,
    ForgotPasswordPage,
    AnswerPage,
    AskQuestionPage,
    PreviewQuestionPage,
    AskedQuestionPage,
    DraftsPage,
    QuestionArchivePage,
    LearningSubjectsPage,
    TeachingSubjectsPage
  ],
  imports: [
    IonTagsInputModule,
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: TabsPage, name: 'TabsPage', segment: 'home' },
        { component: AboutPage, name: 'AboutPage', segment: 'about' },
        { component: UserProfilePage, name: 'UserProfilePage', segment: 'userprofile' },
        { component: AnswerPage, name: 'AnswerPage', segment: 'answer' }
      ]
    }),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SignupPage,
    LoginPage,
    AboutPage,
    UserProfilePage,
    ForgotPasswordPage,
    AnswerPage,
    AskQuestionPage,
    PreviewQuestionPage,
    AskedQuestionPage,
    DraftsPage,
    QuestionArchivePage,
    LearningSubjectsPage,
    TeachingSubjectsPage
  ],
  providers: [
    StreamData,
    UtilityHelpers,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: Camera, useClass: CameraMock }
  ]
})
export class AppModule {}
