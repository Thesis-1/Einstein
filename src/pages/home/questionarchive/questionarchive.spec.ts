import { IonicModule } from 'ionic-angular/index';
import { NavController } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { QuestionArchivePage } from './questionarchive';
import { StreamData } from '../../../providers/questions-stream';

describe('Question Archive Page', () => {

    let fixture: ComponentFixture<QuestionArchivePage>;
    let page: QuestionArchivePage;

    const firebaseConfig = {
        apiKey: "AIzaSyD-p5kimWSiFWZorVKEUNfuscpbC_bW4oc",
        authDomain: "einstein-981c4.firebaseapp.com",
        databaseURL: "https://einstein-981c4.firebaseio.com",
        projectId: "einstein-981c4",
        storageBucket: "einstein-981c4.appspot.com",
        messagingSenderId: "780646176835"
    };

    beforeEach(async(() => {
        // TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

        TestBed.configureTestingModule({
            declarations: [QuestionArchivePage],
            imports: [ 
                BrowserModule,
                HttpModule,
                IonicModule.forRoot(QuestionArchivePage),
                AngularFireModule.initializeApp(firebaseConfig),
                IonicStorageModule.forRoot()
             ],
            providers: [ 
                NavController, 
                AngularFireAuth, 
                AngularFireDatabase, 
                StreamData
             ]
        })
        .compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(QuestionArchivePage);
        page = fixture.componentInstance;

    });

    describe('Page/Jasmine Tests', () => {

        it('should be sane', () => {
        expect(true).toEqual(true);
        });

        it('should create page', () => {
            expect(page).toBeDefined();
        });

    });

    describe('Test for getColor()', () => {

        it('should return black if question isClosed is false', () => {
            expect(page.getColor({'isClosed': false})).toBe('black');
        });   

        it('should return green if question isClosed is true', () => {
            expect(page.getColor({'isClosed': true})).toBe('green');
        }); 

        it('should return null if isClosed is null', () => {
            expect(page.getColor({'isClosed': null})).toBeNull;
        }); 

    });
    
});