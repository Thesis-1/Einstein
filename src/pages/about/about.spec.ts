import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { User, Auth } from '@ionic/cloud-angular';

import { AboutPage } from './about';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
  // NavControllerMock,
  // NavParamsMock,
} from '../../../test-config/mocks-ionic';

describe('AboutPage Component', () => {
  let fixture;
  let componentAboutPage: AboutPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPage],
      imports: [
        IonicModule.forRoot(AboutPage)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
        // { provide: NavController, useClass: NavControllerMock },
        // { provide: NavParams, useClass: NavParamsMock}
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage);
    componentAboutPage = fixture.componentInstance;
  });

  it('should be sane', () => {
    expect(true).toBe(true);
  });

  it('should be created', () => {
    expect(component instanceof AboutPage).toBe(true);
  });

});
