import {HttpClient} from "@angular/common/http";
import {SearchResult} from "../search-result";

export class Contentsearch {

  private SEARCH_CONTENT_PATH: string = "rest/api/content/search";

  constructor(public httpClient:HttpClient) {
  }

  searchContent(searchstring: string):Promise<Array<SearchResult>>  {
    let searchValue = searchstring;

    let resultList:Array<SearchResult> = [];

    let url = this.getBaseUrl() + this.SEARCH_CONTENT_PATH + "?start=0&limit=20"
      + "&cql=" + encodeURI("siteSearch ~\"" + searchValue + "\"&includeArchivedSpaces=false");
    console.log("search-query: ", url);

    return this.httpClient.get(url).toPromise().then((response:any) => {
      console.log("reponse", response.results);

      for(let r of response.results) {
        console.log("rrr, ", r);
        resultList.push(new SearchResult(r.title));
      }
      return resultList;
    });
  }

  private getBaseUrl() {
    let context:string = AJS.Data.get("context-path");
    if(!context.endsWith("/"))
      context+="/";
    return context;
  }
}
