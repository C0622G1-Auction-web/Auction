import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from '../../service/account/account.service';

@Component({
  selector: 'app-account-forgot-pass',
  templateUrl: './account-forgot-pass.component.html',
  styleUrls: ['./account-forgot-pass.component.css']
})
export class AccountForgotPassComponent implements OnInit {
  forgetPassForm: FormGroup;
  // tslint:disable-next-line:ban-types
  email: String = '';
  // tslint:disable-next-line:ban-types
  username: String = '';
  // tslint:disable-next-line:ban-types
  message: String = '';
  isDisplay = false;



  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder,
              // tslint:disable-next-line:variable-name
              private _accountService: AccountService,
              // tslint:disable-next-line:variable-name
              private _toastrService: ToastrService,
              // tslint:disable-next-line:variable-name
              private _activatedRoute: ActivatedRoute,
              // tslint:disable-next-line:variable-name
              private _router: Router) {
  }

  ngOnInit(): void {
    this.forgetPassForm = this._formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.isDisplay = true;
    this.email = this.forgetPassForm.controls.email.value;
    this.username = this.forgetPassForm.controls.username.value;
    this._accountService.verify(this.email, this.username).subscribe(data => {
      this.message = data;
      this._accountService.showSuccessNotification(this.message as string);
      this._router.navigateByUrl('/home');
    }, err => {
      this.isDisplay = false;
      this._accountService.showErrorNotification('Email hoặc tài khoản không đúng, vui lòng kiểm tra lại.');
    }, () => {
      console.log('done');
    });

  }


}
