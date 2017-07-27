import { Component } from '@angular/core'
import { ModalController, ViewController, NavController } from 'ionic-angular'

import { PreviewQuestionPage } from './preview-question/preview-question'
import { AskedQuestionPage } from './asked-question/asked-question'
import { StreamData } from '../../../providers/questions-stream'


@Component({
    selector: "page-ask-question",
    templateUrl: "ask-question.html"
})

export class AskQuestionPage  {
    constructor (private modalCtrl: ModalController, private viewCtrl: ViewController, private navCtrl: NavController, private service: StreamData) { }
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
    hideAddMoreDetails: boolean = true
    questionBody: string = ''
    questionDetails: string = ''
    tags = []
    user_name = ''
    user_id= ''
    preview: boolean = false
    
    onClickDismiss () {
        this.hideTip = true
    }

    onClickAddDetails () {
        this.hideAddMoreDetails = false
        console.log(this.hideAddMoreDetails)
    }

    onClickPreview () {
        this.preview = true
        console.log(this.preview)
        this.service.getUser(this.postQuestion.bind(this))
    }

    onClickAsk () {
        // post data to firebase
        // get posted data and pass as params to modal
        // modal will render that data
        this.preview = false
        this.service.getUser(this.postQuestion.bind(this))
    }

    postQuestion (user) {
        let question: any = {
            subject: 'Math',
            topic: this.selectedTopic,
            tags: this.tags,
            questionBody: this.questionBody,
            questionDetails: this.questionDetails,
            isClosed: false,
            closedOn: '',
            createdOn: Date.now(),
            userName: user.displayName,
            userPhotoURL: user.photoURL,
            userId: user.uid,
            userClosed: user.uid+false
        }
        if (this.preview === false) { // save in db
            this.service.postQuestion(question)
                .then((item:any)=> {
                    this.showSubmittedQuestion(question, item.key)
                })
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