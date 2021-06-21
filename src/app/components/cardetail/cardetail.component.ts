import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetail';
import { CardetailService } from 'src/app/services/cardetail.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  defaultImage = 'default.png';
  car: CarDetail;

  constructor(
    private carDetailService: CardetailService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param['carId']) {
        this.getCarDetail(param['carId']);
      }
    });
  }
  getCarDetail(id: number) {
    this.carDetailService.getCarDetail(id).subscribe((response) => {
      this.car = response.data;
    });
  }
  
  isFirstImage(index:number){
    if(index==0){
      return "carousel-item active";
    }else{
      return "carousel-item";
    }
  }
}
