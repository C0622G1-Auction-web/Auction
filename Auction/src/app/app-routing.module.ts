import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuideListComponent} from "./component/guide/guide-list/guide-list.component";
import {AuctionProductDetailComponent} from "./component/auction/auction-product-detail/auction-product-detail.component";
import {ProductAddComponent} from "./component/product/product-add/product-add.component";
import {ProductEditComponent} from "./component/product/product-edit/product-edit.component";
import {TransactionComponent} from "./component/transaction/transaction.component";
import {HomeComponent} from "./component/home/home.component";
import {UserListComponent} from "./component/user/user-list/user-list.component";
import {UserEditComponent} from "./component/user/user-edit/user-edit.component";
import {AddressPaymentComponent} from './component/payment/address-payment/address-payment.component';
import {MethodPaymentComponent} from './component/payment/method-payment/method-payment.component';
import { AuctionProductAddComponent } from './component/auction/auction-product-add/auction-product-add.component';
import { LoginComponent } from './component/security/login/login.component';

const routes: Routes = [
  {
    path: 'product/create',
    component: ProductAddComponent
  },
  {
    path: 'product/edit',
    component: ProductEditComponent
  },
  {path: 'aa', component: TransactionComponent},

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user/list',
    component: UserListComponent
  },
  {
    path: 'user/edit',
    component: UserEditComponent
  },
  {
    path: 'product/add',
    component: ProductAddComponent
  }, {
    path: 'guide',
    component: GuideListComponent
  },
  {
    path: 'auction/product/add',
    component: AuctionProductAddComponent
  }, {
    path: 'guide',
    component: GuideListComponent
  },
  {
    path: 'auction/:productId', 
    component: AuctionProductDetailComponent,
  },
  {
    path: 'confirmAddress', 
    component: AddressPaymentComponent
  },

  {
    path: 'methodPayment', 
    component: MethodPaymentComponent
  },  
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

