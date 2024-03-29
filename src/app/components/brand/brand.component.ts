import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import * as $ from "jquery";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand:Brand;
  filterText="";
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }
  getCurrentBrandClass(brand:Brand){
      if(this.currentBrand==brand){
        return "list-group-item active";
        
      }else{
        return "list-group-item";
      }
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  toggleClass(){
      $(".brand-list").slideToggle();
  }
}
