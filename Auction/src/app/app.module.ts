import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
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
import {RegisterComponent} from './security/register/register.component';
import {ResetPasswordComponent} from './security/reset-password/reset-password.component';
import {AuctionRequestComponent} from './component/auction-request/auction-request.component';
import {ProductDetailComponent} from './component/product/product-detail/product-detail.component';
import {VerificationComponent} from './security/verification/verification.component';
import {VerifyResetPasswordComponent} from './security/verify-reset-password/verify-reset-password.component';
import {AuctionComponent} from './component/auction/auction.component';
import {AuctionProductDetailComponent} from './component/auction/auction-product-detail/auction-product-detail.component';
import {InfomationAuctionBuyerComponent} from './component/auction/infomation-auction-buyer/infomation-auction-buyer.component';
import {InfomationAuctionSellerComponent} from './component/auction/infomation-auction-seller/infomation-auction-seller.component';
import { PaymentCartComponent } from './component/payment-cart/payment-cart.component';
import { AccountForgotPassComponent } from './component/account-forgot-pass/account-forgot-pass.component';
import { AccountResetPassComponent } from './component/account-reset-pass/account-reset-pass.component';
import { AddressPaymentComponent } from './component/payment/address-payment/address-payment.component';
import { MethodPaymentComponent } from './component/payment/method-payment/method-payment.component';
import { PaymentReceiptComponent } from './component/payment-receipt/payment-receipt.component';
import { TransactionComponent } from './component/transaction/transaction.component';
<<<<<<< HEAD
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
=======
>>>>>>> 7231c158a9e231f26c0d00a489fc0e266ad52c53
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuctionProductAddComponent } from './component/auction/auction-product-add/auction-product-add.component';
import { LoginComponent } from './component/security/login/login.component';
import { ChatUserComponent } from './component/chat/chat-user/chat-user.component';
import { ChatAdminComponent } from './component/chat/chat-admin/chat-admin.component';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserUpdateComponent} from "./component/user/user-update/user-update.component";
import { RegisterWithGoogleComponent } from './security/register-with-google/register-with-google.component';
import {UserCreateComponent} from "./component/user/user-create/user-create.component";


=======
import {SocialLoginModule} from "angularx-social-login";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ChatVisitorComponent } from './component/chat/chat-visitor/chat-visitor.component';
>>>>>>> 7231c158a9e231f26c0d00a489fc0e266ad52c53
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
    ResetPasswordComponent,
    AuctionRequestComponent,
    ProductDetailComponent,
    VerificationComponent,
    VerifyResetPasswordComponent,
    RegisterWithGoogleComponent,
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
    AuctionProductAddComponent,
    PaymentReceiptComponent,
    TransactionComponent,
    ChatUserComponent,
    ChatAdminComponent,
<<<<<<< HEAD
    UserCreateComponent,
    UserUpdateComponent,
    UserCreateComponent
=======
    ChatVisitorComponent
>>>>>>> 7231c158a9e231f26c0d00a489fc0e266ad52c53
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
<<<<<<< HEAD
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SocialLoginModule
=======
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    SocialLoginModule,
    CKEditorModule
>>>>>>> 7231c158a9e231f26c0d00a489fc0e266ad52c53
  ],
        providers: [
<<<<<<< HEAD
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
=======
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}
>>>>>>> 7231c158a9e231f26c0d00a489fc0e266ad52c53
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
