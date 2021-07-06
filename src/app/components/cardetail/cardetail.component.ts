import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { Rental } from 'src/app/models/rental';
import { CardetailService } from 'src/app/services/cardetail.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  rentalFormCheck: FormGroup;
  defaultImage = 'default.png';
  car: CarDetail;
  isVisible = environment.isVisible;
  rentDate: Date;
  returnDate: Date;
  carId: number;
  rental:Rental;
  constructor(
    private carDetailService: CardetailService,
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private routeRedirect: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param['carId']) {
        this.getCarDetail(param['carId']);
        this.carId=param['carId'];
      }
    });
  }
  getCarDetail(id: number) {
    this.carDetailService.getCarDetail(id).subscribe((response) => {
      this.car = response.data;
    });
  }

  isFirstImage(index: number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
  rentCheckCorrect() {
    this.rentalService
      .checkCarHasRent(this.carId, this.rentDate, this.returnDate)
      .subscribe(
        (response) => {
          this.toastrService.info(
            'Yönlendir',
            'Güzel'
          );

          let rental = Object.assign({carId:this.carId,customerId:1,rentDate:this.rentDate,returnDate:this.returnDate})
          window.localStorage.setItem('rentModel',JSON.stringify(rental));
         this.routeRedirect.navigate(['/payment']);
         
        },
        (error) => {
          this.toastrService.error('Uyari111', error);
        }
      );
  }
}
