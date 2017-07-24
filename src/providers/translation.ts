import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class TranslateService {
  constructor(
    private db: AngularFireDatabase
  ) {

  }

  createTranslation(text: string): FirebaseObjectObservable<any> {
    const data = {'english': text}
    const key = this.db.list('/translations').push(data).key
    return this.db.object(`translations/${key}`)
  }
}
