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

// Imports for Google Translate API
import { TranslateService } from '../providers/translate';

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
import { FilterpopoverPage } from '../pages/home/filterpopover/filterpopover';

//custom pipes
import { ReversePipe } from '../pipes/reversepipe';

export const firebaseConfig = {
  apiKey: "AIzaSyD-p5kimWSiFWZorVKEUNfuscpbC_bW4oc",
  authDomain: "einstein-981c4.firebaseapp.com",
  databaseURL: "https://einstein-981c4.firebaseio.com",
  projectId: "einstein-981c4",
  storageBucket: "einstein-981c4.appspot.com",
  messagingSenderId: "780646176835"
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
    TeachingSubjectsPage,
    FilterpopoverPage,
    ReversePipe
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
    TeachingSubjectsPage,
    FilterpopoverPage
  ],
  providers: [
    StreamData,
    UtilityHelpers,
    StatusBar,
    SplashScreen,
    TranslateService,
    FilterpopoverPage,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    //{ provide: Camera, useClass: CameraMock }
  ]
})
export class AppModule {}
