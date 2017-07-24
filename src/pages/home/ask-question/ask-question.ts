import { Component } from '@angular/core';

@Component({
    selector: "page-ask-question",
    templateUrl: "ask-question.html"
})

export class AskQuestionPage  {
    hideTip = false;
    selectedSubject = "Maths";
    subjects = ["Maths", "Biology"];

    onClickDismiss () {
        this.hideTip = true;
    }
}