import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { Http } from '@angular/http'
import { IonicModule, Platform} from 'ionic-angular/index'
import { Storage } from '@ionic/storage'
import { PlatformMock, StorageMock, UserMock, AuthMock, HttpMock } from '../../../test-config/mocks-ionic'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Auth, User} from '@ionic/cloud-angular';
import { App, ToastController } from 'ionic-angular';


import { AnswerPage } from './answer';
import { UtilityHelpers } from '../../providers/utility-helpers';


class UtilityHelpersMock {
  load () {
    return;
  }
}

// Moving FireBase Auth stuff in component to the provider(recomended) should make the tests pass -or- create mocks for firebase services here to make the tests pass

class AngularFireAuthMock {
    auth = {
      currentUser: () => { return 'Albert Einstein'; }
    }
}

class AngularFireDatabaseMock {

}
class FirebaseListObservableMock {

}

describe('AnswerPage', () => {
    let comp: AnswerPage
    let fixture: ComponentFixture<AnswerPage>
    let de: DebugElement
    let el: HTMLElement

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            declarations: [AnswerPage],
            imports: [
                IonicModule.forRoot(AnswerPage)
            ],
            providers: [
                { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
                { provide: FirebaseListObservable, useClass: FirebaseListObservableMock },
                { provide: AngularFireAuth, useClass: AngularFireAuthMock },
                { provide: UtilityHelpers, useClass: UtilityHelpersMock },
                { provide: Storage, useClass: StorageMock },
                { provide: Http, useClass: HttpMock },
                { provide: User, useClass: UserMock },
                { provide: Auth, useClass: AuthMock },
                { provide: Platform, useClass: PlatformMock}
            ]
        })
    }))

    beforeEach( ()=> {
        fixture = TestBed.createComponent(AnswerPage)
        comp = fixture.componentInstance
    })

    it('should create component', () => {
        expect(comp).toBeDefined()
    });

    it('should have updateAnswerStream defined', () => {
        expect(comp.updateAnswerStream).toBeDefined()
    });

    it('should have a mock question object', () => {
        expect(comp.question).toBeDefined();

        let cnt = 0;
        for (let k in comp.question) {
          cnt++;
        }

        expect(cnt).toEqual(10);
    });

    it('should have a mock answer object', () => {
        expect(comp.answer).toBeDefined();

        let cnt = 0;
        for (let k in comp.answer) {
          cnt++;
        }

        expect(cnt).toEqual(8);
    });

    it('onSubmitAnswer should be defined', () => {
        expect(comp.onSubmitAnswer).toBeDefined()
    });

    it('onSubmitAnswer should be a function', () => {
        expect(comp.onSubmitAnswer).toEqual(jasmine.any(Function))
    });

    it(`onSubmitAnswer should set the answer model .answer property
    to an empty string`, () => {
        let answerMock = {
          answer: { answer: '32 quadzillion' },
          question: { key: 'a13rtgD'},
          answers: ['just a mock'],
          afAuth: {
            auth: {
              currentUser: () => {
                return 'Albert Einstein';
              }
            }
          }
        };

        comp.onSubmitAnswer.call(answerMock);
        expect(answerMock.answer.answer).toEqual('');
    });

    it('onLikeClick should be defined', () => {
        expect(comp.onLikeClick).toBeDefined()
    });

    it('onLikeClick should be a function', () => {
        expect(comp.onLikeClick).toEqual(jasmine.any(Function))
    });

})