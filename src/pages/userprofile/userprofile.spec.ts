import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { IonicModule, Platform, NavController, AlertController} from 'ionic-angular/index'
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { PlatformMock, UserMock, AuthMock } from '../../../test-config/mocks-ionic';
import { UserProfilePage } from "./userprofile"

describe('UserProfilePage', () => {
    let comp: UserProfilePage
    let fixture: ComponentFixture<UserProfilePage>
    let de: DebugElement
    let el: HTMLElement

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            declarations: [UserProfilePage],
            imports: [
                IonicModule.forRoot(UserProfilePage)
            ],
            providers: [
                NavController,
                AlertController,
                { provide: User, useClass: UserMock },
                { provide: Auth, useClass: AuthMock },
                { provide: Platform, useClass: PlatformMock}
            ]
        })
    }))

    beforeEach( ()=> {
        fixture = TestBed.createComponent(UserProfilePage)
        comp = fixture.componentInstance
        // de = fixture.debugElement.query(By.css('p'))
        // el = de.nativeElement
    })

    it('should create component', () => {
        expect(comp).toBeDefined()
    })
    it('should have onChangeName defined', () => {
        expect(comp.onChangeName).toBeDefined()
    })
    // it('should display tip on the ask question page', () => {
    //     fixture.detectChanges()
    //     expect(el.textContent).toContain('You can continue using')
    // })

})
