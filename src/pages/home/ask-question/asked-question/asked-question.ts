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

    pageData: any
    
    ngOnInit () {
        this.pageData = this.params.data.question
    }

    // ionViewWillEnter () {
    //     console.log(this.params.data.question.questionBody)
    //     this.pageData = this.params.data.question
        
    // }
    ionViewDidEnter () {
        console.log(this.pageData)
        // console.log(this.params.data)
        
    }
    onClickClose () {
        this.navCtrl.remove(0)
        this.viewCtrl.dismiss()
    }
}

