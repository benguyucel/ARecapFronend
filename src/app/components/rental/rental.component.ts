import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentaldetail';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentalDetails: RentalDetail[] = [];
  constructor() {}

  ngOnInit(): void {

  }
 
}
