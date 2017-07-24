import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable() 
export class StreamData {
    data: FirebaseListObservable<any[]>;
    constructor(public afDB: AngularFireDatabase) { }
    
    load(): any {
        // if (this.data) {
        //     console.log('i got fired')
        //     return this.data;
        // } else {
            this.data = this.afDB.list('/userQuestions');
            return this.data;
        // }
    }

    filterItems(queryText){
        return this.data.map((items)=>{
            return items.filter((item) => {
            return item.question.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
            });     
        });
    }

    filterAnswerUnanswer(text){
        return this.data.map((items)=>{
            return items.filter((item) => {
                return item.closed.toString() === text;
            });     
        });
    }    
}