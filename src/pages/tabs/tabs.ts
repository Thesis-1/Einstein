import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import { DraftsPage } from "../home/drafts/drafts";

@Component({
   selector: "page-tabs",
   templateUrl: "tabs.html"
})

export class TabsPage {
    homePage = HomePage;
    draftsPage = DraftsPage;
}