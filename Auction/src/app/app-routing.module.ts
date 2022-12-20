<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuideListComponent} from './component/guide/guide-list/guide-list.component';
import {AuctionProductDetailComponent} from './component/auction/auction-product-detail/auction-product-detail.component';
=======
import {NgModule} from '@angular/core';
<<<<<<< HEAD
import {Routes, RouterModule} from '@angular/router';
import {RegisterWithGoogleComponent} from "./security/register-with-google/register-with-google.component";
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
import {GuideAddComponent} from "./component/guide/guide-add/guide-add.component";
import {GuideEditComponent} from "./component/guide/guide-edit/guide-edit.component";
import {ChatUserComponent} from "./component/chat/chat-user/chat-user.component";
import {ChatAdminComponent} from "./component/chat/chat-admin/chat-admin.component";
import {UserCreateComponent} from "./component/user/user-create/user-create.component";
import {UserUpdateComponent} from "./component/user/user-update/user-update.component";
import {ProductListComponent} from "./component/product/product-list/product-list.component";
import {AuctionProductHistoryComponent} from "./component/auction/auction-product-history/auction-product-history.component";
=======
import {RouterModule, Routes} from '@angular/router';
import {GuideListComponent} from './component/guide/guide-list/guide-list.component';
import {
  AuctionProductDetailComponent
} from './component/auction/auction-product-detail/auction-product-detail.component';
>>>>>>> 1c04260d79ced8bb06fc31fbbc4f0d73d4a42edc
import {ProductAddComponent} from './component/product/product-add/product-add.component';
import {ProductEditComponent} from './component/product/product-edit/product-edit.component';
import {TransactionComponent} from './component/transaction/transaction.component';
import {HomeComponent} from './component/home/home.component';
import {UserListComponent} from './component/user/user-list/user-list.component';
import {UserEditComponent} from './component/user/user-edit/user-edit.component';
<<<<<<< HEAD
=======
import {AddressPaymentComponent} from './component/payment/address-payment/address-payment.component';
import {MethodPaymentComponent} from './component/payment/method-payment/method-payment.component';
import {LoginComponent} from "./component/security/login/login.component";
>>>>>>> 1c04260d79ced8bb06fc31fbbc4f0d73d4a42edc
>>>>>>> 5714c40573654cb9aae9819492ecce425c282eee

const routes: Routes = [
  {
    path: "product/create",
    component: ProductAddComponent
  },
  {
    path: "product/edit",
    component: ProductEditComponent
  },
<<<<<<< HEAD

  {path: "aa", component: TransactionComponent},
=======
<<<<<<< HEAD

=======
>>>>>>> 1c04260d79ced8bb06fc31fbbc4f0d73d4a42edc
  {path: 'aa', component: TransactionComponent},
>>>>>>> 5714c40573654cb9aae9819492ecce425c282eee

  {
    path: "home",
    component: HomeComponent

  },
  {
    path: "user/list",
    component: UserListComponent
  },
  {
    path: "user/edit",
    component: UserEditComponent
  },
  {
<<<<<<< HEAD
    path: 'auction/:productId', component: AuctionProductDetailComponent,
=======
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
>>>>>>> 1c04260d79ced8bb06fc31fbbc4f0d73d4a42edc

  {
    path: 'methodPayment',
    component: MethodPaymentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'methodPayment', component: MethodPaymentComponent
  }, {path: 'login', component: LoginComponent},
{
  path: 'product/add',
  component: ProductAddComponent
},
  {
  path: 'guide',
  component: GuideListComponent
},
  {
    path: 'guide/edit/:id',
    component: GuideEditComponent
  },
  {
    path:'guide/add',
    component:GuideAddComponent
  },
  {
    path: "auction/:productId", component: AuctionProductDetailComponent,

  },
  {
    path:'auction/chat/user',
    component: ChatUserComponent
  },
  {
    path:'auction/chat/support',
    component: ChatAdminComponent
  },
  {
    path: "auction/:productId", component: AuctionProductDetailComponent},
  {
    path:"user/create",component:UserCreateComponent
  },
  {path:'user/update/:id', component: UserUpdateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registerWithGoogle/:email', component: RegisterWithGoogleComponent},

  {path:'user/product/list', component:ProductListComponent},
  {path: 'user/auction/pruduct/list',component:AuctionProductHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
