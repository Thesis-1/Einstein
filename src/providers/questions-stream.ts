import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
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
        // if (this.data) {
        //     console.log('i got fired')
        //     return this.data;
        // } else {
            this.data = this.afDB.list('/userQuestions');
            return this.data
        // }
    }

    getUser(): any {
        return this.afAuth.auth.currentUser
    }

   getDrafts (user): any {
       // get questions for the current user
       // filter questions where a question is draft
    //    this.data.subscribe((data:any)=>{
    //        console.log(data)
    //    })
    return this.data.map((questions) => {
        return questions.filter((question) => {
            return question.userId === user.uid && question.isDraft === true
        })
    })
   }

    postQuestion(question) {
        this.data = this.afDB.list('/userQuestions')
        return this.data.push(question)
    }

    updateQuestion(question, key) {
        let ref = this.afDB.object('/userQuestions'+ key)
        // console.log('question is', question, 'and key is', question.$key)
        // this.data = this.afDB.list('/userQuestions')
        return this.data.update(key, question)
        // return ref.update(question)
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

    updateViewedAnswers(question) {
        //TODO Refactor
        //Check if the answers are viewed by the user and if not mark as viewed
        this.views = this.fetchViewed();
        this.user = this.afAuth.auth.currentUser;

        console.log('inside UpdatedViewedAnswers')
        if(this.user !== null) {
            if(question.userId === this.user.uid) {
                this.http.get('https://einstein-981c4.firebaseio.com/userAnswers.json?orderBy="question_id"&equalTo="' + question.$key + '"').subscribe( (answers) => {
                let objAnswers = answers.json();
                Object.keys(objAnswers).forEach( (answer) => {
                    this.http.get('https://einstein-981c4.firebaseio.com/answerViews.json?orderBy="user_answer_id"&equalTo="' + this.user.uid + answer + '"').subscribe( (view) => {
                    if(Object.keys(view.json()).length === 0) {
                        console.log('Message Viewed!')
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