import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: '',pathMatch:'full', component: CarComponent},
  { path: 'cars/brand/:brandId', component: CarComponent},
  { path: 'cars/color/:colorId', component: CarComponent},
  { path: 'car/cardetail/:carId', component:CardetailComponent},
  { path: 'payment', component:PaymentComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
