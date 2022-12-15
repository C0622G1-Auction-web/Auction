import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddressPaymentComponent} from './component/payment/address-payment/address-payment.component';


const routes: Routes = [
  {path: 'confirmAddress', component : AddressPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
