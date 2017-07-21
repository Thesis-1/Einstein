import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import { DraftsPage } from "../home/drafts/drafts";
import { QuestionArchivePage } from "../home/questionarchive/questionarchive";

@Component({
   selector: "page-tabs",
   templateUrl: "tabs.html"
})

export class TabsPage {
    homePage = HomePage;
    questionArchivePage = QuestionArchivePage;
    draftsPage = DraftsPage;

}