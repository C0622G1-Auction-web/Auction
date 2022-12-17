import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../../model/product/category";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) {}

  getListCategory():Observable<Category[]> {
    return this._httpClient.get<Category[]>(environment.api_url_list_category);
  }
}
