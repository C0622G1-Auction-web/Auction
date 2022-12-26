import { Injectable } from '@angular/core';
import { City } from 'src/app/model/address/city';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import {InterceptorSkipHeader} from "../security/auth.interceptor";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  httpOptions = {
    headers: new HttpHeaders().set(InterceptorSkipHeader, '')
  };

  cities: City[] = [];

  constructor(private _httpClient: HttpClient) {
  }

  getAllAddress(): Observable<any> {
    return this._httpClient.get<any>(environment.DIA_GIOI_VIETNAM_API, this.httpOptions);
  }

  getAllCities() {
    this.getAllAddress().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.cities.push(new City(i, data[i].Name));
      }
    })
  }

}
