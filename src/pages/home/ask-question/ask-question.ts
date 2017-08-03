import { Component } from '@angular/core'
import { ModalController, ViewController, NavController, NavParams } from 'ionic-angular'

import { PreviewQuestionPage } from './preview-question/preview-question'
import { AskedQuestionPage } from './asked-question/asked-question'
import { QuestionArchivePage } from '../questionarchive/questionarchive'
import { TabsPage } from '../../tabs/tabs'
import { StreamData } from '../../../providers/questions-stream'
import { UtilityHelpers } from '../../../providers/utility-helpers'


@Component({
    selector: "page-ask-question",
    templateUrl: "ask-question.html"
})

export class AskQuestionPage  {
    constructor (private modalCtrl: ModalController, private viewCtrl: ViewController, private navCtrl: NavController, private service: StreamData, private params: NavParams, private utils: UtilityHelpers) { }
    
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
    isDraft = true
    tags = []
    currentUser = this.service.getUser()

    ionViewDidLoad () {
        if (this.params.data.isDraft === true && this.params.data.questionBody !== '') {
            this.questionBody = this.params.data.questionBody
            this.questionDetails = this.params.data.questionDetails
        }
        // console.log(this.params.data)
    }

    onClickDismiss () {
        this.hideTip = true
    }

    onClickPreview_Ask (isPreview) {
        let question:any = this.getQuestion().question
        let key:any = this.getQuestion().key
        if(isPreview === false) {
            question.isDraft = false
            if (key !== undefined) {
                this.updateQuestion(question, key)
            } else {
                this.postQuestion(question)
            }
        } else {
            this.showPreview(question)
        }
    }

    getQuestion () {
        let question: any
        let key: any
        if (this.params.data.$key !== undefined) {
            key = this.params.data.$key
            question = {
                subject: this.params.data.subject,
                isClosed: this.params.data.isClosed,
                closedOn: this.params.data.closedOn,
                createdOn: this.params.data.createdOn,
                isDraft: this.params.data.isDraft,
                userName: this.params.data.userName,
                userPhotoURL: this.params.data.userPhotoURL,
                userId: this.params.data.userId,
                userClosed: this.params.data.userClosed
            }
        } else {
            question = { 
                subject: 'Math',
                isClosed: false,
                closedOn: '',
                createdOn: Date.now(),
                isDraft: this.isDraft,
                userName: this.currentUser.displayName,
                userPhotoURL: this.currentUser.photoURL,
                userId: this.currentUser.uid,
                userClosed: this.currentUser.uid+false
            }
        }
        question.tags = this.tags
        question.topic = this.selectedTopic
        question.questionBody = this.questionBody
        question.questionDetails = this.questionDetails
        question.updatedOn = Date.now()  

        return {'question': question, 'key': key}
    }

    postQuestion (question) {
        this.service.postQuestion(question)
            .then((item:any)=> {
                this.utils.popToast('Question asked successfully')
                this.viewCtrl.dismiss()
            })
    }

    updateQuestion (question, key) {
        this.service.updateQuestion(question, key)
            .then((item:any) => {
                this.utils.popToast('Question saved to drafts')
            })
    }

    showSubmittedQuestion () {
        this.utils.popToast('Question asked successfully')
        this.viewCtrl.dismiss()
        // console.log(this.tabCtrl)
        // this.navCtrl.setRoot(TabsPage)
        // this.navCtrl.push(AskedQuestionPage, { question: question, questionKey: key })
        // let askModal = this.modalCtrl.create(AskedQuestionPage, { question: question, questionKey: key });
        // askModal.present();

    }

    showPreview (question) {
        let previewModal = this.modalCtrl.create(PreviewQuestionPage, question);
        previewModal.present();
    }
 
    onClickClose () {
        let question:any = this.getQuestion().question
        let key:any = this.getQuestion().key
        if (key !== undefined) {
            this.updateQuestion(question, key)
            this.viewCtrl.dismiss()
        } else if (this.questionBody !== '' || this.questionDetails !== '') {
            this.postQuestion(question)
        } else {
            this.viewCtrl.dismiss()
        }
        
    }
}