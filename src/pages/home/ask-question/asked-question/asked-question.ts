import { Component, OnInit } from '@angular/core'
import { ViewController, NavController, NavParams } from 'ionic-angular'

@Component({
    selector: 'asked-question',
    templateUrl: './asked-question.html'

})

export class AskedQuestionPage implements OnInit{

    constructor(private navCtrl: NavController, 
        private viewCtrl: ViewController,
        private params: NavParams) { }

    questionData: any
    
    ngOnInit () {
        this.questionData = this.params.data.question
    }
    
    onClickClose () {
        this.navCtrl.remove(0)
        this.viewCtrl.dismiss()
    }
}

