import { Component } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'page-question',
  templateUrl: 'question.html'
})
export class QuestionPage {
  msg = 'Type here..';
  messages = [];
  categories = ['Math', 'Science', 'Art', 'History'];
  currentCategory = this.categories[0];
  socket = io(process.env.SOCKETIO || 'http://localhost:8080') ;
  bestAnswerPicked = false;
  
  constructor(){

    this.socket.on('message', (data) => {
      this.messages.push(data);
    })
  }

  toggleBestAnswerPicked() {
    this.bestAnswerPicked = !this.bestAnswerPicked;
    console.log(this.bestAnswerPicked);
  }

  handleMsg(){
    if(this.msg === 'Type here..') {
      this.msg = '';
    }
  }

  getColor(message) {
    return message.bestAnswer ? 'green' : 'black';
  }

  onSubmitMsg(){
    this.messages.push({
      message: this.msg,
      category: this.currentCategory,
      username: 'Peter',
      likes: 5,
      img: 'http://static.srcdn.com/wp-content/uploads/Neo-stops-bullets-in-the-Matrix.jpg',
      bestAnswer: false      
    });
    this.socket.emit('message', this.messages[this.messages.length-1]);
    this.msg = ''
  }

  toggleAcceptAsBestAnswer(message) {
    message.bestAnswer = !message.bestAnswer;
    console.log('Best answer set to: ', message.bestAnswer);
  }

  handleLike(message) {
    message.likes++;
  }

}
