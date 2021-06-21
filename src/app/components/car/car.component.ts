import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetail';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[];
  defaultImage=environment.defaultImage;
  imageUrl=environment.ImageUrl;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      
      if (params['brandId']) {
        this.getCarsWithBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsWithColordId(params['colorId']);
      } else {
        this.getCarsWithDetails();
        
      }
    });
  }
  getCarsWithDetails() {
    this.carService.getCarsWithDetails().subscribe((response) => {
      this.cars = response.data;
      console.log(this.cars);
    });
  }
  getCarsWithBrandId(id: number) {
    this.carService.getCarsWithBrandId(id).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsWithColordId(id: number) {
    this.carService.getCarsWithColordId(id).subscribe((response) => {
      this.cars = response.data;
    });
  }
}
