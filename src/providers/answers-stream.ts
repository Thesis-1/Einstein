import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class AnswerStreamData {
    data: FirebaseListObservable<any[]>;
    constructor(public http: Http, public afDB: AngularFireDatabase) { }

    load(id): any {
        // if (this.data) {
        //     console.log('i got fired')
        //     return this.data;
        // } else {
            this.data = this.afDB.list('/userAnswers', {
              query: {
                  limitToLast: 50,
                  orderByChild: 'question_id',
                  equalTo: id
                }
            });
            return this.data;
        // }
    }


}
