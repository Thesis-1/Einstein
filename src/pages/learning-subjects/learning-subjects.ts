import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-learning-subjects',
  templateUrl: 'learning-subjects.html',
})
export class LearningSubjectsPage {

  subjects = [
    'Algebra',
    'Calculus',
    'Geometry',
    'Trigonometry',
    'Combinatorics',
    'Topography',
    'Statistics'
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LearningSubjectsPage');
  }

}
