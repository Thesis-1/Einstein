import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { Http } from '@angular/http'
import { IonicModule, Platform} from 'ionic-angular/index'
import { App, ToastController, NavController, NavParams } from 'ionic-angular'

//Mocks from mock file
import { PlatformMock, UserMock, AuthMock, HttpMock } from '../../../test-config/mocks-ionic'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';



import { AboutPage } from './about'




// Moving FireBase Auth stuff in component to the provider(recomended) should make the tests pass -or- create mocks for firebase services here to make the tests pass

class AngularFireAuthMock {
    list () {
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

//Mocks for nav stuff (no need to test using these mocks)
//mocks must be defined for test to run
class NavControllerMock {

}

class NavParamsMock {

}

describe('AboutPage', () => {
    let comp: AboutPage
    let fixture: ComponentFixture<AboutPage>
    let de: DebugElement
    let el: HTMLElement

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            declarations: [AboutPage],
            imports: [
                IonicModule.forRoot(AboutPage)
            ],
            providers: [
                { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
                { provide: FirebaseListObservable, useClass: FirebaseListObservableMock },
                { provide: AngularFireAuth, useClass: AngularFireAuthMock },
                { provide: Http, useClass: HttpMock },
                { provide: Platform, useClass: PlatformMock},
                { provide: NavController, useClass: NavControllerMock},
                { provide: NavParams, useClass: NavParamsMock}
            ]
        })
    }))

    beforeEach( ()=> {
        fixture = TestBed.createComponent(AboutPage)
        comp = fixture.componentInstance
    })

    it('should be sane', () => {
      expect(true).toEqual(true);
    });

    it('should create component', () => {
        expect(comp).toBeDefined();
    })

    it('sendFeedback should exist', () => {
      expect(comp.sendFeedback).toBeDefined();
    });

    it('sendFeedback should be a function', () => {
      expect(comp.sendFeedback).toEqual(jasmine.any(Function));
    });

    it('sendFeedback should reset msgVal string and push to items array', () => {
      let testData = {
        msgVal: '',
        items: [{message: 'none yet'}]
      };

      testData.msgVal = 'wow awesome';
      comp.sendFeedback.call(testData, 'wow awesome');
      expect(testData.msgVal).toEqual('');
      expect(testData.items[1].message).toEqual('wow awesome');
    });


})
