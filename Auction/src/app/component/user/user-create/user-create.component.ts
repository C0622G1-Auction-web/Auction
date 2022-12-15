import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import {UserType} from "../../../model/user/user-type";
import {UserService} from "../../../service/user/user.service";
import {UserTypeService} from "../../../service/user/user-type.service";
import {Address} from "../../../model/user/address";
import {AccountService} from "../../../service/account/account.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userCreateForm: FormGroup;
  userTypeCreateList: UserType[] = [];
  userAddressCreateList: Address[] = [];
  userAccountCreateList: Account[] = [];
  constructor( private userService:UserService,
               private userTypeService:UserTypeService,
               private userAccountService:AccountService,
               private router: Router,
               private formBuilder: FormBuilder
               ) { }

  ngOnInit(): void {
   this.userCreateForm= this.formBuilder.group({
     avatar:["",[]],
     firstName:["",[]],
     lastName:["",[]],
     username:["",[]],
     email:["",[]],
     phone:["",[]],
     birthDay:["",[]],
     city:["",[]],
     district:["",[]],
     town:["",[]],
     detailAddress:["",[]],
     idCard:["",[]],
     password:["",[]]
   })
  }
  submitCreateUser() {
    if (this.userCreateForm.valid) {
      this.userService.createUser(this.userCreateForm.value).subscribe(data => {
        this.router.navigateByUrl("");
      })
    }
  }

}
