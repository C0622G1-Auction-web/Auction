import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';
import { ProductAddComponent } from './component/product/product-add/product-add.component';
import { ProductDeleteComponent } from './component/product/product-delete/product-delete.component';
import { ProductEditComponent } from './component/product/product-edit/product-edit.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import { UserEditComponent } from './component/user/user-edit/user-edit.component';
import { UserDeleteComponent } from './component/user/user-delete/user-delete.component';
import { UserAddComponent } from './component/user/user-add/user-add.component';
import { GuideAddComponent } from './component/guide/guide-add/guide-add.component';
import { GuideEditComponent } from './component/guide/guide-edit/guide-edit.component';
import { GuideDeleteComponent } from './component/guide/guide-delete/guide-delete.component';
import { GuideListComponent } from './component/guide/guide-list/guide-list.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';
import { AuctionRequestComponent } from './component/auction-request/auction-request.component';
import { ProductDetailComponent } from './component/product/product-detail/product-detail.component';
import { VerificationComponent } from './security/verification/verification.component';
import { VerifyResetPasswordComponent } from './security/verify-reset-password/verify-reset-password.component';
import { TransactionComponent } from './component/transaction/transaction.component';

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
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
