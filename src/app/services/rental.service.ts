import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = environment.apiUrl;
  constructor(private htppClient: HttpClient) {}

  checkCarHasRent(
    carId: number,
    rentDate: Date,
    returnDate: Date
  ): Observable<ResponseModel> {
    return this.htppClient.get<ResponseModel>(
      this.apiUrl +
        'rentals/checkcanrent?carId=' +
        carId +
        '&rentDate=' +
        rentDate +
        '&returnDate=' +
        returnDate
    );
  }
  rentalAdd(rental: Rental): Observable<ResponseModel> {
    return this.htppClient.post<ResponseModel>(
      this.apiUrl + 'rentals/add',
      rental
    );
  }
}
