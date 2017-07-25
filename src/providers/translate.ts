import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class TranslateService {
  constructor(
    public afDB: AngularFireDatabase
  ) {

  }
  // push user text to firebase and return an object observable to
  // update the view asynchronously
  createTranslation(text: string): FirebaseObjectObservable<any> {
    const data = {'english': text}
    const key = this.afDB.list('/translations').push(data).key
    return this.afDB.object(`translations/${key}`)
  }
}
