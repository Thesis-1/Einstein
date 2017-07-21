import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User, Auth } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the AnswerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {
  //Mock data for a question
  question = {
    image: 'https://assets.merriam-webster.com/mw/images/article/art-wap-article-main/pi-mathematical-value-135@1x.jpg',
    closed: false,
    category: 'algebra',
    open_date: Date.now(),
    question: 'Where does the constant pi come from?',
    likes: 0,
    dislikes: 0,
    user_id: 'unknown'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
    this.storage.get('answerPageCurrQuestion').then( (q)=> {
      for (let key in q) {
        this.question[key] = q[key];
      }
    });

    console.log('this.question ',this.question);
  }

  getColor(question) {
    return question.closed ? 'green' : 'black';
  }

  sendQuestionUpdate(question, status){

    if(status === 'likes') {
      // this.questions.update(question.$key, {likes: question.likes+1});
      //update mock data
      this.question.likes++;
    } else if (status === 'dislikes') {
      //this.questions.update(question.$key, {dislikes: question.dislikes+1});
      //update mock data
      this.question.dislikes++;
    }

  }





}
