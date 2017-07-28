import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class StreamData {
    data: FirebaseListObservable<any[]>
    views: any;
    user: any;

    constructor(
        public afDB: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private http: Http)
        {
            //
        }

    load(): any {

        this.data = this.afDB.list('/userQuestions');
        return this.data;
    }

    getUser(): any {
        return this.afAuth.auth.currentUser
    }
   
    postQuestion(question) {
        this.data = this.afDB.list('/userQuestions')
        return this.data.push(question)
    }

    filterItems(queryText){
        return this.data.map((items)=>{
            return items.filter((item) => {
                return item.questionBody.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
            });
        });
    }

    closeOrOpenQuestion(question){
        this.user = this.afAuth.auth.currentUser;

        this.data.update(question.$key, {isClosed: !question.isClosed});
        this.data.update(question.$key, {userClosed: this.user.uid + !question.isClosed});
        this.data.update(question.$key, {closedOn: Date.now()});
    }

    filterAnswerUnanswer(text){
        return this.data.map((items)=>{
            return items.filter((item) => {
                return item.isClosed.toString() === text;
            });
        });
    }

    fetchAnswers(){
        return this.afDB.list('/userAnswers');
    }

    fetchViewed() {
        return this.afDB.list('/answerViews');
    }

    //Check if the answers are viewed by the user and if not mark as viewed
    updateViewedAnswers(question) {
        //TODO Refactor
        this.views = this.fetchViewed();
        this.user = this.afAuth.auth.currentUser;

        //If the user is logged in.
        if(this.user !== null) {

            //if this is the users question
            if(question.userId === this.user.uid) {

                //Grab all the answers for that question
                this.http.get('https://einstein-981c4.firebaseio.com/userAnswers.json?orderBy="question_id"&equalTo="' + question.$key + '"').subscribe( (answers) => {
                let objAnswers = answers.json();

                //iterate through each question
                Object.keys(objAnswers).forEach( (answer) => {

                    this.http.get('https://einstein-981c4.firebaseio.com/answerViews.json?orderBy="user_answer_id"&equalTo="' + this.user.uid + answer + '"').subscribe( (view) => {

                    //check to see if the answer has been viewed already
                    if(Object.keys(view.json()).length === 0) {
                        
                        //if not, push a entry to the table labeling it as viewed.
                        this.views.push({ user_answer_id: this.user.uid + answer, value: true });
                    }
                    });
                });
                }, (err) => {
                    console.log("Error: ", err);
                });
            }
        }

    }

}
