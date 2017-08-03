import { Component, ViewChild, ElementRef } from '@angular/core';
import { PopoverController, NavParams, ViewController  } from 'ionic-angular';

@Component({
  selector: 'page-filterpopover',
  templateUrl: 'filterpopover.html',
})
export class FilterpopoverPage {
  topicFilter: any;
  questions: any;
  topics = [
      '#All',
      'Algebra',
      'Calculus',
      'Geometry',
      'Trigonometry',
      'Combinatorics',
      'Topography',
      'Statistics'
  ];

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController
  ) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.topicFilter = this.navParams.data.topic;
    }
  }

  changeFilterTopic() {
    //handles onload
    if(this.topicFilter !== this.navParams.data.topic) {
      this.viewCtrl.dismiss(this.topicFilter);
    }
  }
}
