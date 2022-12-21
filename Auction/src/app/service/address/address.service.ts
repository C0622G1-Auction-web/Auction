import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {City} from '../../model/address/city';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  cities: City[] = [];

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Create by: VietNQ
   */
  getAllAddress(): Observable<any> {
    return this.httpClient.get<any>(environment.DIA_GIOI_VIETNAM_API);
  }

  /**
   * Create by: VietNQ
   */
  getAllCities() {
    this.getAllAddress().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.cities.push(new City(i, data[i].Name));
      }
      console.log(this.cities);
    });
  }
}
