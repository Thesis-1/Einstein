import { Component, OnInit } from '@angular/core'
import { ViewController, NavController, NavParams } from 'ionic-angular'

import { StreamData } from '../../../../providers/questions-stream'

@Component({
    selector: 'preview-question',
    templateUrl: './preview-question.html'
})

export class PreviewQuestionPage implements OnInit{
    questionData: any = {}
    
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, private service: StreamData, private params: NavParams) { }

    ngOnInit () {
        this.questionData = this.params.data
        console.log(this.questionData)
    }

    onClickClose () {
        this.viewCtrl.dismiss()
    }
}