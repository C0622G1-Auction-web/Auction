import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddressPaymentComponent} from './component/payment/address-payment/address-payment.component';
import {MethodPaymentComponent} from './component/payment/method-payment/method-payment.component';


const routes: Routes = [
  {path: 'confirmAddress', component : AddressPaymentComponent},
  {path: 'methodPayment', component : MethodPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
