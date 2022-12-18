import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {ProductListComponent} from './component/product/product-list/product-list.component';
import {ProductAddComponent} from './component/product/product-add/product-add.component';
import {ProductDeleteComponent} from './component/product/product-delete/product-delete.component';
import {ProductEditComponent} from './component/product/product-edit/product-edit.component';
import {UserListComponent} from './component/user/user-list/user-list.component';
import {UserEditComponent} from './component/user/user-edit/user-edit.component';
import {UserDeleteComponent} from './component/user/user-delete/user-delete.component';
import {UserAddComponent} from './component/user/user-add/user-add.component';
import {GuideAddComponent} from './component/guide/guide-add/guide-add.component';
import {GuideEditComponent} from './component/guide/guide-edit/guide-edit.component';
import {GuideDeleteComponent} from './component/guide/guide-delete/guide-delete.component';
import {GuideListComponent} from './component/guide/guide-list/guide-list.component';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/security/login/login.component';
import {RegisterComponent} from './component/security/register/register.component';
import {AuctionRequestComponent} from './component/auction-request/auction-request.component';
import {ProductDetailComponent} from './component/product/product-detail/product-detail.component';
import {VerificationComponent} from './component/security/verification/verification.component';
import {AuctionComponent} from './component/auction/auction.component';
import {
  AuctionProductDetailComponent
} from './component/auction/auction-product-detail/auction-product-detail.component';
import {
  InfomationAuctionBuyerComponent
} from './component/auction/infomation-auction-buyer/infomation-auction-buyer.component';
import {AccountResetPassComponent} from './component/security/account-reset-pass/account-reset-pass.component';

import {AddressPaymentComponent} from './component/payment/address-payment/address-payment.component';
import {MethodPaymentComponent} from './component/payment/method-payment/method-payment.component';
import {PaymentReceiptComponent} from './component/payment/payment-receipt/payment-receipt.component';
import {TransactionComponent} from './component/transaction/transaction.component';
// @ts-ignore
import {GoogleLoginProvider, SocialAuthServiceConfig} from 'angularx-social-login';
import {InfomationAuctionSellerComponent} from "./component/auction/infomation-auction-seller/infomation-auction-seller.component";
import {PaymentCartComponent} from "./component/payment/payment-cart/payment-cart.component";
import {AccountForgotPassComponent} from "./component/security/account-forgot-pass/account-forgot-pass.component";

const googleLoginOptions = {
  scope: 'profile email',
  plugin_name: 'login'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductDeleteComponent,
    ProductEditComponent,
    UserListComponent,
    UserEditComponent,
    UserDeleteComponent,
    UserAddComponent,
    GuideAddComponent,
    GuideEditComponent,
    GuideDeleteComponent,
    GuideListComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AuctionRequestComponent,
    ProductDetailComponent,
    VerificationComponent,
    AuctionComponent,
    AuctionProductDetailComponent,
    InfomationAuctionBuyerComponent,
    InfomationAuctionSellerComponent,
    PaymentCartComponent,
    AccountForgotPassComponent,
    AccountResetPassComponent,
    AddressPaymentComponent,
    MethodPaymentComponent,
    PaymentReceiptComponent,
    TransactionComponent,
    PaymentReceiptComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '360980124241-cu5j4vb8mfob7il8h62oa320t8ldoi7l.apps.googleusercontent.com',
              googleLoginOptions
            )
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
