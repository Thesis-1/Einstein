import { Component } from '@angular/core';
import { User, Auth } from '@ionic/cloud-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-questionarchive',
  templateUrl: 'questionarchive.html'
})
export class QuestionArchivePage {

  categories = ['Math'];
  currentCategory = this.categories[0];
  messageType = 'all';

  //auth
  id = this.user.id;

  //firebase
  questions: FirebaseListObservable<any[]>;

  constructor(
    public user: User,
    public auth: Auth,
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase
  ){

    this.fetchQuestions('all');

    this.questions.forEach((question)=>{
      console.log(question);
    })

  }

  getColor(question) {
    return question.closed ? 'green' : 'black';
  }
  
  fetchQuestions(messageType) {
    if(messageType === 'all') {
      this.questions = this.af.list('/userQuestions',  {
        query: {
          limitToLast: 50,
          orderByChild: 'user_id',
          equalTo: this.id
        }
      });
    } else if (messageType === 'open') {
      this.questions = this.af.list('/userQuestions',  {
        query: {
          limitToLast: 50,
          orderByChild: 'userid_closed',
          equalTo: this.id + false
        }
      });
    } else if (messageType === 'closed') {
      this.questions = this.af.list('/userQuestions',  {
        query: {
          limitToLast: 50,
          orderByChild: 'userid_closed',
          equalTo: this.id + true
        }
      });
    }
  }
}