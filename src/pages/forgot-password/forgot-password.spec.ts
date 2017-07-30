import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { Http } from '@angular/http'
import { IonicModule, Platform} from 'ionic-angular/index'
import { App, ToastController, NavController, NavParams } from 'ionic-angular'

//Mocks from mock file
import { PlatformMock, UserMock, AuthMock, HttpMock } from '../../../test-config/mocks-ionic'
import { AngularFireAuth } from 'angularfire2/auth';



import { ForgotPasswordPage } from './forgot-password'
import { UtilityHelpers } from '../../providers/utility-helpers';

class UtilityHelpersMock {
  load () {
    return;
  }
}

// Moving FireBase Auth stuff in component to the provider(recomended) should make the tests pass -or- create mocks for firebase services here to make the tests pass

class AngularFireAuthMock {
    signInWithEmailAndPassword (email, password) {
      return;
    }
}


//Mocks for nav stuff
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

class ToastControllerMock {
  create(obj) {
    return;
  }
}


describe('ForgotPasswordPage', () => {
    let comp: ForgotPasswordPage
    let fixture: ComponentFixture<ForgotPasswordPage>
    let de: DebugElement
    let el: HTMLElement

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            declarations: [ForgotPasswordPage],
            imports: [
                IonicModule.forRoot(ForgotPasswordPage)
            ],
            providers: [
                { provide: AngularFireAuth, useClass: AngularFireAuthMock },
                { provide: Http, useClass: HttpMock },
                { provide: Platform, useClass: PlatformMock},
                { provide: NavController, useClass: NavControllerMock},
                { provide: NavParams, useClass: NavParamsMock},
                { provide: ToastController, useClass: ToastControllerMock},
                { provide: UtilityHelpers, useClass: UtilityHelpersMock }
            ]
        })
    }))

    beforeEach( ()=> {
        fixture = TestBed.createComponent(ForgotPasswordPage)
        comp = fixture.componentInstance
    })

    it('should be sane', () => {
      expect(true).toEqual(true);
    });

    it('should create component', () => {
        expect(comp).toBeDefined();
    });

    it('sendReset should exist', () => {
      expect(comp.sendReset).toBeDefined();
    });

    it('sendReset should be a function', () => {
      expect(comp.sendReset).toEqual(jasmine.any(Function));
    });

    it('emailAddress should exist', () => {
      expect(comp.emailAddress).toBeDefined();
    });

    it('emailAddress should initialize to an empty string', () => {
      expect(comp.emailAddress).toEqual('');
    });
})
