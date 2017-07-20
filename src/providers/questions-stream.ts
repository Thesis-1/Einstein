import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable() 
export class StreamData {
    data: FirebaseListObservable<any[]>;
    constructor(public http: Http, public afDB: AngularFireDatabase) { }
    
    load(): any {
        if (this.data) {
            return this.data;
        } else {
            this.data = this.afDB.list('/userQuestions');
            return this.data;
        }
    }

}