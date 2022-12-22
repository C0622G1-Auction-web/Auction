import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AccountService} from "../../service/account/account.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  errorMessage: String = '';
  account: String = '';
  token: String = '';
  password: String = '';
  isDisplay = true;

  constructor(private _accountService: AccountService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const reconfirmPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const newPassword = control.get('newPassword');
      const confirmPassword = control.get('confirmPassword');
      if (newPassword && confirmPassword && newPassword.touched && (newPassword.value !== confirmPassword.value)) {
        return {reconfirmPassword: true};
      } else {
        return null;
      }
    };
    this.resetPassForm = this._formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      confirmPassword: ['']
    }, {validators: reconfirmPassword});


    this._activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
      this.account = params.account;
      if (this.token !== undefined && this.account !== undefined) {
        this._accountService.checkToken(this.token, this.account).subscribe(data => {
        }, error => {
          this._accountService.showErrorNotification('Lỗi xác thực, vui lòng kiểm tra lại');
          this.errorMessage = error.error + '. Vui lòng thử lại';
          console.log(this.errorMessage);
          this.isDisplay = false;

        });
      } else {
        this._accountService.showWarningNotification('Không thể truy cập vì chưa xác thực');
        this.errorMessage = 'Bạn cần truy cập vào link reset mật khẩu để có thể tiến hành đặt lại mật khẩu';
        this.isDisplay = false;

      }


    });
  }

  submit() {
    this.password = this.resetPassForm.controls.newPassword.value;
    this._accountService.updatePass(this.account, this.token, this.password).subscribe(data => {
      this._accountService.showSuccessNotification('Đã cập nhật mật khẩu thành công!');
      this._router.navigateByUrl('/login');
    }, error => {
      this._accountService.showErrorNotification('Cập nhật mật khẩu không thành công!');
      this.errorMessage = error.error + '\nVui lòng thử lại';
    });
  }

  display(x: HTMLInputElement) {
    if (x.type == 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }

  }
}
