import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/cardetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[];
  defaultImage = environment.defaultImage;
  imageUrl = environment.ImageUrl;
  filterText = '';
  isVisible = environment.isVisible;
  brands: Brand[] = [];
  colors: Color[] = [];
  selectedColor: number = 0;
  selectedBrand: number = 0;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.route.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsWithBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsWithColordId(params['colorId']);
      } else if (params['colorId'] && params['brandId']) {
        console.log('here');
        this.filterColorAndBrand();
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
    this.isVisible = true;
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
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getSelectedColor() {
    return this.selectedColor;
  }
  getSelectedBrand() {
    return this.selectedBrand;
  }
  filterColorAndBrand() {
    this.carService
      .getCarsByFilter(this.selectedColor, this.selectedBrand)
      .subscribe((response) => {
        if (response.data.length > 0) {
          this.cars = response.data;
        }else{
          this.toastrService.error("Her Hangi Bir Kayıt Bulunamadı","Opps")
        }
      });
  }
}
