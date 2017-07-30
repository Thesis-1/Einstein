import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { IonicModule, Platform} from 'ionic-angular/index'
import { App, NavController } from 'ionic-angular'
import { NgForm, EmailValidator } from '@angular/forms'
import { Http } from '@angular/http'

//Mocks from mock file
import { PlatformMock, UserMock, AuthMock, HttpMock } from '../../../test-config/mocks-ionic'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'



import { SignupPage } from './signup'
import { TabsPage } from '../tabs/tabs'
import { UtilityHelpers } from '../../providers/utility-helpers'



// Moving FireBase Auth stuff in component to the provider(recomended) should make the tests pass -or- create mocks for firebase services here to make the tests pass

class AngularFireAuthMock {
    signInWithEmailAndPassword (email, password) {
      return;
    }
}
class AngularFireDatabaseMock  extends AngularFireDatabase {


}

class FirebaseListObservableMock  extends FirebaseListObservable<any[]> {

}

//Do we need mocks for provided pages?
class TabsPageMock {

}

class SignupPageMock {

}

//Mocks for nav stuff (no need to test using these mocks)
//mocks must be defined for test to run

class NavControllerMock {
  push(s) {
    return;
  }

  setRoot(s) {
    return;
  }
}

class UtilityHelpersMock extends UtilityHelpers {
  popToast(s) {
    return s;
  }
}

class NgFormMock extends NgForm {

}

class EmailValidatorMock extends EmailValidator {

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
                { provide: NavController, useClass: NavControllerMock},
                { provide: SignupPage, useClass: SignupPageMock},
                { provide: Http, useClass: HttpMock },
                { provide: UtilityHelpers, useClass: UtilityHelpersMock},
                { provide: NgForm, useClass: NgFormMock},
                { provide: EmailValidator, useClass: EmailValidatorMock}
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
