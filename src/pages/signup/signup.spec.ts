import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { Http } from '@angular/http'
import { IonicModule, Platform} from 'ionic-angular/index'
import { App, ToastController, Nav, NavController, NavParams, MenuController } from 'ionic-angular'

//Mocks from mock file
import { PlatformMock, UserMock, AuthMock, HttpMock } from '../../../test-config/mocks-ionic'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';



import { SignupPage } from './signup'




// Moving FireBase Auth stuff in component to the provider(recomended) should make the tests pass -or- create mocks for firebase services here to make the tests pass

class AngularFireAuthMock {
    signInWithEmailAndPassword (email, password) {
      return;
    }
}
class AngularFireDatabaseMock {
  list () {
    return;
  }

}
class FirebaseListObservableMock {

}

//Do we need mocks for provided pages?
class HomePageMock {

}

class SignupPageMock {

}

class ForgotPasswordPageMock {

}

//Mocks for nav stuff (no need to test using these mocks)
//mocks must be defined for test to run
class NavMock {
  setRoot(s) {
    return;
  }
}

class NavControllerMock {
  push(s) {
    return;
  }

  setRoot(s) {
    return;
  }
}

class NavParamsMock {

}

class MenuControllerMock {

}

class ToastControllerMock {
  create(obj) {
    return;
  }
}


describe('SignupPage', () => {
    let comp: SignupPage
    let fixture: ComponentFixture<SignupPage>
    let de: DebugElement
    let el: HTMLElement

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            declarations: [SignupPage],
            imports: [
                IonicModule.forRoot(SignupPage)
            ],
            providers: [
                { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
                { provide: FirebaseListObservable, useClass: FirebaseListObservableMock },
                { provide: AngularFireAuth, useClass: AngularFireAuthMock },
                { provide: Http, useClass: HttpMock },
                { provide: Platform, useClass: PlatformMock},
                { provide: NavController, useClass: NavControllerMock},
                { provide: NavParams, useClass: NavParamsMock},
                { provide: MenuController, useClass: MenuControllerMock},
                { provide: ToastController, useClass: ToastControllerMock},
                { provide: Nav, useClass: NavMock},
                { provide: SignupPage, useClass: SignupPageMock},

            ]
        })
    }))

    beforeEach( ()=> {
        fixture = TestBed.createComponent(SignupPage)
        comp = fixture.componentInstance
    })

    it('should be sane', () => {
      expect(true).toEqual(true);
    });

    it('should create component', () => {
        expect(comp).toBeDefined();
    });
})
