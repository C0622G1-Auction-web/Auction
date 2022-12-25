import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user/user";
import {TokenService} from "../../service/security/token.service";
import {Router} from "@angular/router";
import {PaymentService} from "../../service/payment/payment.service";
import {PaymentDto} from "../../dto/payment-dto";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nameUser: string;
  checkLogin = false;
  accountRole: string;
  currentUser: User;
  paymentList: PaymentDto[];
  cartSize: number;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private _paymentService: PaymentService
  ) {
  }

  ngOnInit(): void {

    if (this.tokenService.isLogged()) {
      this.checkLogin = true;
      this.currentUser = JSON.parse(this.tokenService.getUser());
      this.nameUser = this.currentUser.firstName + ' ' + this.currentUser.lastName
      const roles = this.tokenService.getRole();
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === "ROLE_ADMIN") {
          this.accountRole = "ROLE_ADMIN"
        }
      }
    }

    this._paymentService.getPaymentList(String(this.currentUser?.id)).subscribe(data => {
      this.paymentList = data;
      if (this.paymentList != undefined) {
        this.cartSize = this.paymentList.length;
      }
    }, err => {
      console.log(err);
    }, () => {
      console.log('done');
    });
    if (this.paymentList === undefined) {
      this.cartSize = 0;
    }
  }

  logOut() {
    this.tokenService.logOut();
    this.router.navigateByUrl('/home').then(() => {
      location.reload();
    })
  }

  topTop() {
    document.getElementById('top').click();
  };



}
