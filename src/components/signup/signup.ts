import { Component } from '@angular/core';

/**
 * Generated class for the SignupComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {

  text: string;

  constructor() {
    console.log('Hello SignupComponent Component');
    this.text = 'Hello World';
  }

}
