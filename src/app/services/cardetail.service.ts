import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/cardetail';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CardetailService {
  
  apiUrl = 'https://localhost:44381/api/cars/cardetails?id=';
  
  constructor(private httpClient: HttpClient) {}
  getCarDetail(id: number): Observable<ItemResponseModel<CarDetail>> {
    return this.httpClient.get<ItemResponseModel<CarDetail>>(this.apiUrl + id);
  }
}
