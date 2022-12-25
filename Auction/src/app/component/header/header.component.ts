import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user/user";
import {TokenService} from "../../service/security/token.service";
import {Router} from "@angular/router";
import {PaymentService} from "../../service/payment/payment.service";
import {PaymentDto} from "../../dto/payment-dto";
import {NotificationServiceByUserService} from "../../service/user/notification-service-by-user.service";
import {Nofication} from "../../model/user/nofication";

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
  nofications: Nofication[];
  notificationSize = 0;
  display: string = 'none';

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private _paymentService: PaymentService,
    private _noficationByUserService: NotificationServiceByUserService) {}

  ngOnInit(): void {
    this.checkLogined();
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

  checkLogined() {
    if (this.tokenService.isLogged()) {
      this.checkLogin = true;
      this.currentUser = JSON.parse(this.tokenService.getUser());
      this.nameUser = this.currentUser.firstName + ' ' + this.currentUser.lastName;
      this._noficationByUserService.getAllNoficationByUser(this.currentUser?.id).subscribe(data => {
        this.nofications = data;
        this.countNofication(data);
      });
      const roles = this.tokenService.getRole();
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === "ROLE_ADMIN") {
          this.accountRole = "ROLE_ADMIN";
          this._noficationByUserService.getAllNoficationByAdmin().subscribe(data => {
            this.nofications = data;
            this.countNofication(data);
          });
        }
      }
    }
  }

  countNofication(nofications: any) {
    this.notificationSize = 0;
    nofications.forEach(value => {
      if (value.status == 1) {
        this.notificationSize += 1;
      }
    })
  }

  logOut() {
    this.tokenService.logOut();
    this.router.navigateByUrl('/home').then(() => {
      location.reload();
    })
  }

  showNofication() {
    this.checkLogined();
    if(this.display == 'none') {
      this.display = 'block';
    } else if(this.display == 'block') {
      this.display = 'none';
    }
  }

  noficationed(notification: Nofication) {
    this.countNofication(this.nofications);
    if (notification.status != 2) {
      this._noficationByUserService.setNoficationed(notification).subscribe(data => {
        console.log('reding nofication');
      });
    }
  }

}
