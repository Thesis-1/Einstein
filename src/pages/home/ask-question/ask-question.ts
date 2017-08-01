import { Component } from '@angular/core'
import { ModalController, ViewController, NavController } from 'ionic-angular'

import { PreviewQuestionPage } from './preview-question/preview-question'
import { AskedQuestionPage } from './asked-question/asked-question'
import { StreamData } from '../../../providers/questions-stream'

import { UtilityHelpers } from '../../../providers/utility-helpers';
import 'rxjs';

@Component({
    selector: "page-ask-question",
    templateUrl: "ask-question.html"
})

export class AskQuestionPage {

    constructor (
      private modalCtrl: ModalController,
      private viewCtrl: ViewController,
      private navCtrl: NavController,
      private service: StreamData,
      private utils: UtilityHelpers
    ) {
    }

    hideTip = false
    selectedTopic = "Algebra"
    topics = [
        'Algebra',
        'Calculus',
        'Geometry',
        'Trigonometry',
        'Combinatorics',
        'Topography',
        'Statistics'
    ]
    questionBody: string = ''
    questionDetails: string = ''
    tags = []
    currentUser = this.service.getUser()
    currentLanguage

    ionViewDidLoad() {
      console.log('ionViewDidLoad AskQuestionPage');
      if ( this.currentUser != null ) {
        //Get logged in user from af database by matching user id
        this.currentLanguage = this.service.getLanguage().subscribe((data:any) => {
          data.map((datum) => {
            console.log('datum.language', datum.language);
          });
        });
        // this.currentLanguage = this.service.getLanguage();
        console.log('user language is: ', this.currentLanguage);
      }

    }

    onClickDismiss () {
        this.hideTip = true
    }

    onClickPreview_Ask (isPreview) {
        let question = this.getQuestion()
        this.postQuestion (isPreview, question)
    }

    getQuestion () {
        let question: any = {
            subject: 'Math',
            topic: this.selectedTopic,
            tags: this.tags,
            questionBody: this.questionBody,
            questionDetails: this.questionDetails,
            isClosed: false,
            closedOn: '',
            createdOn: Date.now(),
            userName: this.currentUser.displayName,
            userPhotoURL: this.currentUser.photoURL,
            userId: this.currentUser.uid,
            userClosed: this.currentUser.uid+false
        }
        return question
    }

    postQuestion (isPreview, question) {
        if (isPreview === false) { // save in db
            this.service.postQuestion(question)
                .then((item:any)=> {
                    this.showSubmittedQuestion(question, item.key)
                })
            // call handleTranslation utility helper to save translation
            // of user text to firebase under `translations` endpoint
            this.utils.handleTranslation(question.questionBody);
        } else { // pass question to preview
            this.showPreview(question)
        }
    }

    showSubmittedQuestion (question, key) {
        let askModal = this.modalCtrl.create(AskedQuestionPage, { question: question, questionKey: key });
        askModal.present();
    }

    showPreview (question) {
        let previewModal = this.modalCtrl.create(PreviewQuestionPage, question);
        previewModal.present();
    }

    onClickClose () {
        this.viewCtrl.dismiss()
    }
}
