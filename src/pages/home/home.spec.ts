import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HomePage } from './home';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock, UserMock, AuthMock } from '../../../test-config/mocks-ionic';

import { Auth, User} from '@ionic/cloud-angular';
import { App, Refresher, ToastController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { StreamData } from '../../providers/questions-stream';

class QuestionPageMock extends QuestionPage {

}

class StreamDataMock extends StreamData {

}
describe('HomePage', () => {
  let de: DebugElement;
  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [
        NavController,
        // QuestionPage,
        // StreamData,
        { provide: StreamData, useClass: StreamDataMock },
        { provide: QuestionPage, useClass: QuestionPageMock },
        { provide: User, useClass: UserMock },
        { provide: Auth, useClass: AuthMock },
        { provide: Platform, useClass: PlatformMock},
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h3'));
  });

  it('should create component', () => expect(comp).toBeDefined());

//   it('should have expected <h3> text', () => {
//     fixture.detectChanges();
//     const h3 = de.nativeElement;
//     expect(h3.innerText).toMatch(/ionic/i,
//       '<h3> should say something about "Ionic"');
//   });
});