import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicModule, Platform, NavController, NavParams } from 'ionic-angular';
import { User, Auth } from '@ionic/cloud-angular';

//Firebase backend
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

export class PlatformMock {
  public ready(): Promise<{String}> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class NavControllerMock extends NavController {
  hide() {
    return;
  }
}

// export class UserMock extends User {
//   hide() {
//     return;
//   }
// }

export class AuthMock {
  auth = false;
  isAuthenticated() {
    return auth;
  }
}

export class NavParamsMock {
  data = {

  };

  get(param){
    return this.data[param];
  }
}

export class UserMock {
  details = {

  };

  get(param){
    return this.details[param];
  }
}

export class AngularFireAuthMock extends AngularFireAuth {

}

export class FirebaseAppMock {

}

export class AngularFireDatabaseMock {

}

export class FirebaseListObservableMock {

}
