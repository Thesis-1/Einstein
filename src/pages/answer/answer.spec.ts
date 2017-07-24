import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { Http } from '@angular/http'
import { IonicModule, Platform} from 'ionic-angular/index'
import { Storage } from '@ionic/storage'
import { PlatformMock, StorageMock, UserMock, AuthMock, HttpMock } from '../../../test-config/mocks-ionic'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Auth, User} from '@ionic/cloud-angular'
import { App, ToastController } from 'ionic-angular'


import { AnswerPage } from './answer'
import { AnswerStreamData } from '../../providers/answers-stream'

// Mocking AnswerStreamData, it's unused in comp and should be tested seperately
class AnswerStreamDataMock {
  load () {
    return;
  }
}

// Moving FireBase Auth stuff in component to the provider(recomended) should make the tests pass -or- create mocks for firebase services here to make the tests pass

class AngularFireAuthMock {
    list () {
        return;
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
                { provide: AnswerStreamData, useClass: AnswerStreamDataMock },
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
    })
    it('should have updateAnswerStream defined', () => {
        expect(comp.updateAnswerStream).toBeDefined()
    })

})

