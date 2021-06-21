import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/cardetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44381/api/';

  constructor(private httpClient: HttpClient) {}

  getCarsWithDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getwithdetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsWithBrandId(id: number) {
    let newPath = this.apiUrl + 'cars/getbybrandid?id=' + id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsWithColordId(id: number) {
    let newPath = this.apiUrl + 'cars/getbycolorid?id=' + id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
