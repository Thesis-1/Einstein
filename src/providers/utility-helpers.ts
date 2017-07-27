import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Platform, ToastController } from 'ionic-angular';


@Injectable()
export class UtilityHelpers {
    constructor(
      public http: Http,
      public toastCtrl: ToastController
    ) {


    }

    popToast(s) {
      let toast = this.toastCtrl.create({
        message: s,
        duration: 2500
      });
      toast.present();
    }

}
