import { Component } from '@angular/core';
import { User, Auth } from '@ionic/cloud-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// import * as io from "socket.io-client";

@Component({
  selector: 'page-question',
  templateUrl: 'question.html'
})
export class QuestionPage {
  // socket = io(process.env.SOCKETIO || 'http://localhost:8080') ;

  msg = 'Type here..';
  categories = ['Math'];
  currentCategory = this.categories[0];
  messageType = 'all';

  //auth
  id = this.user.id;
  img = this.user.details.image;

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

  handleMsg(){
    if(this.msg === 'Type here..') {
      this.msg = '';
    }
  }

  getColor(question) {
    return question.closed ? 'green' : 'black';
  }

  onSubmitMsg(){

    this.sendQuestion({
      user_id: this.id,
      likes: 0,
      dislikes: 0,
      image: this.img,
      question: this.msg,
      category: this.currentCategory,
      open_date:  Date.now(),
      closed_date: '',
      closed: false,
      userid_closed: this.id + false
    });

    this.msg = '';

  }
  
  sendQuestion(question) {
    this.questions.push( question );
  }

  sendQuestionUpdate(question, status){

    if(status === 'likes') {
      this.questions.update(question.$key, {likes: question.likes+1});
    } else if (status === 'dislikes') {
      this.questions.update(question.$key, {dislikes: question.dislikes+1});
    } else if(status === 'closed') {
        this.questions.update(question.$key, {closed: !question.closed});
        this.questions.update(question.$key, {userid_closed: this.id + !question.closed});
        this.questions.update(question.$key, {date_closed: Date.now()});
    }
      
  }

  sendQuestionDelete(id) {

    this.questions.remove(id);

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
