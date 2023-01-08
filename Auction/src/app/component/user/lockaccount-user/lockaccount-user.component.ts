import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../service/account/account.service";
import {Title} from "@angular/platform-browser";
import {NotificationService} from "../../../service/notification/notification.service";
import {Account} from "../../../model/account/account";

export const checkStartDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startDay = new Date(control.get('startDay').value).getTime();
  console.log(startDay);
  const dateNow = new Date().getTime();
  console.log(dateNow);
  const a = dateNow - startDay;
  console.log(a);
  if (a > 0) {
    return {checkStartDay: true};
  } else {
    return null;
  }
};
export const checkendDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startDay = new Date(control.get('startDay').value).getTime();
  console.log(startDay);
  const endDay = new Date(control.get('endDay').value).getTime();
  console.log(endDay);
  const a = startDay - endDay;
  console.log(a);
  if (a > 0) {
    return {checkendDay: true};
  } else {
    return null;
  }
};

@Component({
  selector: 'app-lockaccount-user',
  templateUrl: './lockaccount-user.component.html',
  styleUrls: ['./lockaccount-user.component.css']
})
export class LockaccountUserComponent implements OnInit {
  idList: any;
  idListR: any;
  lockAccountId: number;
  account: Account;
  rfLockAccount: FormGroup;

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _accountService: AccountService,
    private builder: FormBuilder,
    private router: Router,
    private tileSevice: Title,
    private _notificationSevice: NotificationService,
  ) {
    this.tileSevice.setTitle('Khóa thành viên');
  }

  ngOnInit(): void {
    this.getAddLockAccount();
    this.idList = this._activatedRouter.snapshot.params.id;
    console.log(this.idList);
    this.idListR = this.idList.split(',');
  }

  hanDlerLock(event: any) {
    this.lockAccountId = event.target.value;
    console.log(this.lockAccountId);
    this._accountService.getAccountById(this.lockAccountId).subscribe(data => {
      this.account = data;
      this.getAddLockAccount();
      console.log(data);
    }, error => {
      this._notificationSevice.showErrorNotification('Tài khoản có ID này đã bị khóa');
      this.checkLength();
    });

  }

  checkLength() {
    this.idListR.splice(this.idListR.indexOf(this.lockAccountId), 1);
    if (this.idListR.length === 0) {
      this.router.navigateByUrl('/user/list');
    } else {
      this.getAddLockAccount();
    }
  }

  getAddLockAccount() {
    this.rfLockAccount = this.builder.group({
      startDay: ['', Validators.required],
      endDay: ['', Validators.required],
      accountId: [this.lockAccountId],
      reason: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]]
    }, {validators: [checkStartDay, checkendDay]});
  }

  lockAccountUser() {
    if (this.rfLockAccount.valid) {
      console.log(this.rfLockAccount.value,"okok");
      this._accountService.saveLockAcountUser(this.rfLockAccount.value).subscribe(data => {
        this._notificationSevice.showSuccessNotification('Khóa thành công ');
        this.checkLength();
      }, error => {
        this._notificationSevice.showSuccessNotification('Khóa thành công ');
        this.checkLength();
      });
    }
  }
}
