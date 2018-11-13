import {Component} from '@angular/core';
import {Contentsearch} from "../providers/contentsearch";
import {SearchResult} from "../search-result";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTerm: string;

  resultList: Array<SearchResult> = [];

  constructor(public contentSearch: Contentsearch) {
  }

  searchForTerm() {
    console.log("will search for ", this.searchTerm);
    this.contentSearch.searchContent(this.searchTerm).then((r:Array<SearchResult>)=> {
      this.resultList = r;
    });
  }
}
