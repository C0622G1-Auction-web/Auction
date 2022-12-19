import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from "../../../service/account/account.service";
import {ToastrService} from "ngx-toastr";

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

  constructor(private _formBuilder: FormBuilder,
              private _accountService: AccountService,
              private _toastrService: ToastrService) {
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
      this.forgetPassForm.disable();
    }, err => {
      console.log(err);
    }, () => {
      console.log("done");
    })

  }
}
