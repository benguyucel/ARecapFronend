import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  car: Car;
  rental: Rental;
  amount: number = 0;
  paymentForm: FormGroup;
  constructor(
    private carService: CarService,
    private rentalService: RentalService,
    private forBuilder: FormBuilder,
    private toastrService:ToastrService,
    private routerService:Router
  ) {}

  ngOnInit(): void {
    this.rental = JSON.parse(localStorage.getItem('rentModel') || '{}');
    this.getCarById(this.rental.carId);
    this.createPayForm();
  }
  getCarById(id: number) {
    if (id==null) {
      this.routerService.navigate(['/']);
    }
    this.carService.getCarById(id).subscribe((resp) => {
      this.car = resp.data;
      this.calculatePrice();
    });
  }
  createPayForm() {
    this.paymentForm = this.forBuilder.group({
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expriy: ['', Validators.required],
      ccv: ['', Validators.required],
    });
  }
  pay() {
    if (this.paymentForm.valid) {
      this.saveTheRent();
      localStorage.removeItem("rentModel");

    }else{
      this.toastrService.error("Uyarı","Form Eksik")
    }
  }
  saveTheRent() {
    this.rentalService.rentalAdd(this.rental).subscribe((resp) => {
      this.toastrService.success("Başarılı ","Ödeme işlemi başarılı oldu");
      this.routerService.navigate(['/']);
    },(respError)=>{
      this.toastrService.error("Hata","Bir Hata Meydana geldi");
    });
  }
  calculatePrice() {
    let totalDay =
      (new Date(this.rental.returnDate).getTime() -
        new Date(this.rental.rentDate).getTime()) /
      (24 * 3600 * 1000);
    this.amount = totalDay * this.car.dailyPrice;
  }
}
