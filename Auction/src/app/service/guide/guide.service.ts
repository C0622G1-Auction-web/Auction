import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Guide } from "../../model/guide/guide";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GuideService {
  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {}

  create(guide: Guide): Observable<Guide> {
    return this._httpClient.post<Guide>(
      "http://localhost:8080/auction/api/guide",
      guide
    );
  }

  searchByContent(title: string, pageNumber: number) {
    const a = this._httpClient.get<any>(
      'http://localhost:8080/api/guide?page=' + pageNumber + '&title=' + title
    );
    console.log('123123okok');
    console.log(a);
    return a;
  }
}
