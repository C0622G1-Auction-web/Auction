import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import {ProductReviewComponent} from './component/product/product-review/product-review.component';
import {VerificationComponent} from './security/verification/verification.component';
import {VerifyResetPasswordComponent} from './security/verify-reset-password/verify-reset-password.component';
import {AuctionComponent} from './component/auction/auction.component';
import {
  AuctionProductDetailComponent
} from './component/auction/auction-product-detail/auction-product-detail.component';
import {
  InfomationAuctionBuyerComponent
} from './component/auction/infomation-auction-buyer/infomation-auction-buyer.component';
import {
  InfomationAuctionSellerComponent
} from './component/auction/infomation-auction-seller/infomation-auction-seller.component';
import {AddressPaymentComponent} from './component/payment/address-payment/address-payment.component';
import {MethodPaymentComponent} from './component/payment/method-payment/method-payment.component';
import {ListProductsComponent} from './component/product/list-products/list-products.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {TransactionComponent} from './component/transaction/transaction.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {AuctionProductAddComponent} from './component/auction/auction-product-add/auction-product-add.component';
import {ChatUserComponent} from './component/chat/chat-user/chat-user.component';
import {ChatAdminComponent} from './component/chat/chat-admin/chat-admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserUpdateComponent} from "./component/user/user-update/user-update.component";
import {RegisterWithGoogleComponent} from './security/register-with-google/register-with-google.component';
import {UserCreateComponent} from "./component/user/user-create/user-create.component";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {LoginComponent} from "./security/login/login.component";
import {PaymentCartComponent} from "./component/payment/payment-cart/payment-cart.component";
import {PaymentReceiptComponent} from "./component/payment/payment-receipt/payment-receipt.component";
import { AccountForgotPassComponent } from './security/account-forgot-pass/account-forgot-pass.component';
import {CustomPipePipe} from "./component/product/product-list/pipe";
import { AuctionProductHistoryComponent } from './component/auction/auction-product-history/auction-product-history.component';
import {LockaccountUserComponent} from "./component/user/lockaccount-user/lockaccount-user.component";
import { ChatVisitorComponent } from './component/chat/chat-visitor/chat-visitor.component';

const googleLoginOptions = {
  scope: 'profile email',
  plugin_name: 'login'
};

// @ts-ignore
// @ts-ignore
// @ts-ignore
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
    RegisterComponent,
    ResetPasswordComponent,
    AuctionRequestComponent,
    ProductReviewComponent,
    VerificationComponent,
    VerifyResetPasswordComponent,
    TransactionComponent,
    RegisterWithGoogleComponent,
    AuctionComponent,
    AuctionProductDetailComponent,
    InfomationAuctionBuyerComponent,
    InfomationAuctionSellerComponent,
    AddressPaymentComponent,
    MethodPaymentComponent,
    TransactionComponent,
    ListProductsComponent,
    AuctionProductAddComponent,
    TransactionComponent,
    ChatUserComponent,
    ChatAdminComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserCreateComponent,
    LoginComponent,
    PaymentCartComponent,
    PaymentReceiptComponent,
    AccountForgotPassComponent,
    CustomPipePipe,
    AuctionProductHistoryComponent,
    LockaccountUserComponent,
    UserAddComponent,
    ChatVisitorComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SocialLoginModule,
    CKEditorModule
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
export class AppModule { }
