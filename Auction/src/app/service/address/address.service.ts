import {Injectable} from '@angular/core';
import {City} from "../../model/address/city";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

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

}
