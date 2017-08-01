import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//Useful helper functions
import { UtilityHelpers } from '../../providers/utility-helpers';

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {
  //Mock data for a question
  question = {
    key: 'unknown',
    image: '',
    closed: false,
    category: 'algebra',
    open_date: Date.now(),
    question: 'Where does the constant pi come from?',
    likes: 0,
    dislikes: 0,
    user_id: 'unknown',
    user: 'Unknown'
  };

  questionKey = "unknown";

  answer = {
    answer: '',
    created_at: 0,
    user: 'Unknown',
    imageURL:'',
    userImageURL: '',
    question_id:'',
    isBest: false,
    likes: 0,
    likedFromUsers: ['users:'],

  };

  //firebase
  answers: FirebaseListObservable<any[]>;
  questions: FirebaseListObservable<any[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public toastCtrl: ToastController,
    public utils: UtilityHelpers,
    private camera: Camera
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
    //Get the question key from our utility library
    this.questionKey = this.utils.getQuestionKey();

    this.updateQuestion();
    this.updateAnswerStream();
  }

  updateAnswerStream () {
    this.answers = this.af.list('/userAnswers', {
      query: {
        limitToLast: 50,
        orderByChild: 'question_id',
        equalTo: this.questionKey
      }
    });
  }

  updateQuestion () {
    this.questions= this.af.list('/userQuestions', {
      query: {
        orderByKey: true,
        equalTo: this.questionKey
      }
    });
  }

  onSubmitAnswer() {
    let user = this.afAuth.auth.currentUser;
    if (user != null) {
      this.answers.push({
        answer: this.answer.answer,
        created_at: Date.now(),
        user: user.displayName,
        userImageURL: user.photoURL,
        imageURL: this.answer.imageURL,
        question_id: this.questionKey,
        isBest: false,
        likes: 0,
        likedFromUsers: {isJoin: 'yes'}
      })
    } else {
      //Show a toast notification if not logged in
      this.utils.popToast('Please Log In to Post Answers.')
    }
    //clear input field
    this.answer.answer = '';

  }

  onLikeClick(a) {
    let user = this.afAuth.auth.currentUser;
    if (user != null) {
      let uid = user.uid;
      let tempObj = {...a};

      if (!a.likedFromUsers.hasOwnProperty(uid)){
        this.answers.update(a.$key, {likes: a.likes + 1});
        tempObj.likedFromUsers[uid] = true;
        this.answers.update(a.$key, {likedFromUsers: {...tempObj.likedFromUsers} });
        a.likes++;
      } else {
        //we already liked the thing, take it back now
        this.answers.update(a.$key, {likes: a.likes - 1});
        delete tempObj.likedFromUsers[uid];
        this.answers.update(a.$key, {likedFromUsers: {...tempObj.likedFromUsers} });
      }
    } else {
      //Show a toast notification if not logged in
      this.utils.popToast('Please Log In to Like Answers.')
    }

  }

  onImageClick() {
    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 240,
      targetWidth: 240
    }).then( (imageData) => {
    //  let dataURL = `data:image/jpeg;base64,${imageData}`; //use for DATA_URL type
      this.answer.imageURL = imageData;
      this.utils.popToast('Image Uploaded.  Submit your Answer to view it!');
    }, (err) => {
      this.utils.popToast('Camera is a native feature.  Cannot use in web.')
    });
  }


}
