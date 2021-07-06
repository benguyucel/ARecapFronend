import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/cardetail';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44381/api/';
  asd = 'https://localhost:44381/api/cars/getByFilter?colorId=5&brandId=2';

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
  getCarsByFilter(colorId: number, brandId: number) {
    let newPath =
      this.apiUrl + 'cars/getByFilter?colorId=' + colorId + '&brandId=' + brandId;
      return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
      
  }
  getCarById(id:number){
    let newPath = this.apiUrl+'cars/getbyid?id='+id;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath);
  }
}
