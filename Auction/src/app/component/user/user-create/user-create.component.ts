import { Component, OnInit } from "@angular/core";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
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
               ) {

  }
  /**
   * Create by: TruongLH
   * Date created: 13/12/2022
   * Function: to create component user
   */
  ngOnInit(): void {
    this.userCreateForm= this.formBuilder.group({
      // avatar:["",[Validators.required]],
      // firstName:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
      // lastName:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{3,30}$")]],
      // username:["",[Validators.required]],
      // email:["",[Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
      // phone:["",[Validators.required,Validators.pattern("[0][9][0]\\d{7}")]],
      // birthDay:["",[Validators.required]],
      // city:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
      // district:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
      // town:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
      // idCard:["",[Validators.required,Validators.pattern("\\d{9}")]],
      // password:["",[Validators.required]]
      firstName:[],
      lastName:[],
      username:[],
      avatar:[],
      email:[],
      phone:[],
      birthDay:[],
      city:[],
      district:[],
      town:[],
      country:["viet nam"],
      idCard:[],
      password:[],
      pointDedication:[10.0],
      statusLock:[true],
      deleteStatus:[true]
    })
  }

  submitCreateUser() {
    if(this.userCreateForm.valid){
      console.log(this.userCreateForm.value)
      this.userService.createUser(this.userCreateForm.value).subscribe(value => {
        this.router.navigateByUrl('');
      })
    }
  }
}
