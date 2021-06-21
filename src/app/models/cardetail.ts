import { CarImage } from "./carImage";

export class CarDetail {
  carId: number;
  brandId:number;
  colorId:number;
  carName: string;
  brandName: string;
  colorName: string;
  dailyPrice: number;
  imagePath:CarImage[]
}
