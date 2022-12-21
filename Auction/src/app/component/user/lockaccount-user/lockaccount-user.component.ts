import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account/account.service';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/service/notification/notification.service';

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
    this.idList = this._activatedRouter.snapshot.params.id;
    this.idListR = this.idList.split(',');
    this.getAddLockAccount();
  }

  getAddLockAccount() {
    this.rfLockAccount = this.builder.group({
      startDay: ['', Validators.required],
      endDay: ['', Validators.required],
      accountId: [this.lockAccountId],
      reason: ['', Validators.required]
    });
  }

  lockccountUser() {
    if (this.rfLockAccount.valid) {
      this._accountService.saveLockAcountUser(this.rfLockAccount.value).subscribe(data => {
        if (this.idListR.length == 0) {
          this.router.navigateByUrl('/user/list');
        }
      });
      this._notificationSevice.showSuccessNotification('Khóa thành công');
    }
  }

  hanDlerLock(event: any) {
    this.lockAccountId = event.target.value;
    this._accountService.getAccountById(this.lockAccountId).subscribe(data => {
      this.account = data;
      this.getAddLockAccount();
      console.log(data);
    }, error => {
      this._notificationSevice.showErrorNotification("Tài khoản này đã khóa");
      this.lock();

    });
  }
  lock() {
    this.lockccountUser();
    this.idListR.splice(this.idListR.indexOf(this.lockAccountId), 1);
  }
}
