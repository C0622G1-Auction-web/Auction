<<<<<<< HEAD
import { Injectable } from '@angular/core';
import {City} from "../../model/address/city";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
=======
import {Injectable} from '@angular/core';
import {City} from "../../model/address/city";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
>>>>>>> 9bb85f5b61a2d8d1cb5d064c0ea7a3395d0340f3
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
<<<<<<< HEAD
  cities: City[] = [];
​

  constructor(private _httpClient: HttpClient) {
  }

  getAllAddress(): Observable<any> {
    return this._httpClient.get<any>(environment.DIA_GIOI_VIETNAM_API);
  }

  getAllCities() {
    this.getAllAddress().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.cities.push(new City(i, data[i].Name));
      }
    })
  }
=======

  cities: City[] = [];

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllAdress(): Observable<any> {
    return this.httpClient.get<any>(environment.DIA_GIOI_VIETNAM_API);
  }

  getAllCities() {
    this.getAllAdress().subscribe(data => {

      for (let i = 0; i < data.length; i++) {

        this.cities.push(new City(i, data[i].Name));
      }

      console.log(this.cities);
    })

  }

>>>>>>> 9bb85f5b61a2d8d1cb5d064c0ea7a3395d0340f3
}
