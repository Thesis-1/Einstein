import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { IonicModule, Platform, NavController} from 'ionic-angular/index'

import { AskQuestionPage } from "./ask-question"

describe('AskQuestionPage', () => {
    let comp: AskQuestionPage
    let fixture: ComponentFixture<AskQuestionPage>
    let de: DebugElement
    let el: HTMLElement

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            declarations: [AskQuestionPage],
            imports: [
                IonicModule.forRoot(AskQuestionPage)
            ]
        })
    }))

    beforeEach( ()=> {
        fixture = TestBed.createComponent(AskQuestionPage)
        comp = fixture.componentInstance
        de = fixture.debugElement.query(By.css('p'))
        el = de.nativeElement
    })

    it('should create component', () => {
        expect(comp).toBeDefined()
    })
    it('should have onClickDismiss defined', () => {
        expect(comp.onClickDismiss).toBeDefined()
    })
    it('should display tip on the ask question page', () => {
        fixture.detectChanges()
        expect(el.textContent).toContain('You can continue using')
    })

})
