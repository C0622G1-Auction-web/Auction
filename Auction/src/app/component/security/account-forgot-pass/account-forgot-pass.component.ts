import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from "../../../service/account/account.service";
import {ToastrService} from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-forgot-pass',
  templateUrl: './account-forgot-pass.component.html',
  styleUrls: ['./account-forgot-pass.component.css']
})
export class AccountForgotPassComponent implements OnInit {
  forgetPassForm: FormGroup;
  email: String = '';
  username: String = '';
  message: String = '';
  isDisplay: boolean = false;


  constructor(private _formBuilder: FormBuilder,
              private _accountService: AccountService,
              private _toastrService: ToastrService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.forgetPassForm = this._formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    })
  }

  submit() {
    this.email = this.forgetPassForm.controls['email'].value;
    this.username = this.forgetPassForm.controls['username'].value;
    this._accountService.verify(this.email, this.username).subscribe(data=>{
      this.message = data;
      this._accountService.showSuccessNotification(<string>this.message);
      this.isDisplay = true;
    }, err => {
      this._accountService.showErrorNotification("Email hoặc username không đúng, vui lòng kiểm tra lại")
    }, () => {
      console.log("done");
    })

  }


}
