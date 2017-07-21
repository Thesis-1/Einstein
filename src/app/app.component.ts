import { Component, ViewChild } from '@angular/core';

//Imports for Firebase backend
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

//Added imports for using ion-menu etc.
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth, User, Deploy } from '@ionic/cloud-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { UserProfilePage } from '../pages/userprofile/userprofile';
import { AnswerPage } from '../pages/answer/answer';
import { TabsPage } from '../pages/tabs/tabs';


//Use this page interface when writing new pages below in
//loggedOutPages or LoggedInPages arrays.
export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' },
    { title: 'Questions', name: 'HomePage', component: HomePage, icon: 'ios-help'},
    { title: 'About', name: 'AboutPage', component: AboutPage, icon: 'ios-hammer'}
  ];

  loggedInPages: PageInterface[] = [
    //Place pages either here or in the loggedOutPages above
    //to work in our app nav.
    { title: 'Logout', name: 'LoginPage', component: LoginPage, icon: 'ios-log-out', logsOut: true },
    { title: 'Questions', name: 'TabsPage', component: TabsPage, icon: 'ios-help'},
    { title: 'About', name: 'AboutPage', component: AboutPage, icon: 'ios-hammer'},
    { title: 'User Profile', name: 'UserProfilePage', component: UserProfilePage, icon: 'person'}
  ];

  // rootPage:any = HomePage;
  rootPage:any = TabsPage;

  constructor(
    public deploy: Deploy,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    public menu: MenuController,
    public user: User,
    public auth: Auth,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //Decide how to show menu based on login status
    // if( this.auth.isAuthenticated() ) {
    //   this.enableMenu(true);
    // } else {
    //   this.enableMenu(false);
    // }
    this.listenToLoginEvents();

  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs() && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    // Set the root of the nav with params if it's a tab index
  } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    //If logout button was clicked, we want to additionally log out user
    if (page.logsOut === true) {
      this.logout();
    }

  }

  isActive(page: PageInterface) {
    //For Logout menu icon, we don't care what the active page is
    //We always want logout to be 'danger' color
    if (page.logsOut) {
      return 'danger';
    }

    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  isLoggedIn() {
    console.log('is authenticated? ',this.auth.isAuthenticated());
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  logout() {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
    }
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

}
