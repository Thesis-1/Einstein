import { Component } from "@angular/core";
import { ModalController, ViewController, NavController } from 'ionic-angular'
import { AskQuestionPage } from '../ask-question/ask-question'
import { StreamData } from '../../../providers/questions-stream'

@Component({
    selector: "drafts-page",
    templateUrl: "drafts.html"
})

export class DraftsPage {
    constructor( private service: StreamData, private modalCtrl: ModalController, private viewCtrl:ViewController, private navCtrl:NavController ){}

    currentUser = this.service.getUser()
    questions:any

    ionViewDidLoad() {
        this.service.getDrafts(this.currentUser)
            .subscribe((questions:any) => {
                this.questions = questions
            })
    }

    onClickQuestion (question) {
        let askQuestionModal = this.modalCtrl.create(AskQuestionPage, question);
        askQuestionModal.present();
    }
}