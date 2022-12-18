import {Component, OnInit} from '@angular/core';
import {UserType} from "../../../model/user/user-type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserEditDto} from "../../../dto/user-edit-dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: number;
  user: UserEditDto
  rfUser: FormGroup;

  constructor(private _userService: UserService,
              private _activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _toast: ToastrService,
              private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      console.log("Id:" + this.id)
      this.getById(this.id);
    });
  }

  getById(id: number) {
    return this._userService.findUserEditById(id).subscribe(data => {
      console.log(data)
      this.rfUser = this._formBuilder.group({
        id: [data.id],
        firstName: [data.firstName,
          [Validators.required]],
        lastName: [data.lastName,
          [Validators.required]],
        email: [data.email,
          [Validators.required]],
        phone: [data.phone,
          [Validators.required]],
        detailAddress: [data.address.detailAddress,
          [Validators.required]],
        town: [data.address.town,
          [Validators.required]],
        district: [data.address.district,
          [Validators.required]],
        city: [data.address.city,
          [Validators.required]],
        country: [data.address.country,
          [Validators.required]],
        username: [data.account.username,
          [Validators.required]],
        birthDay: [data.birthDay,
          [Validators.required]],
        idCard: [data.idCard,
          [Validators.required]],
      });
    });
  }

  saveUser(id) {
    this.user = this.rfUser.value;
    this._userService.updateByAdim(id, this.user).subscribe(data => {
      this._router.navigate(['/user/list']);
      this._toast.success("Chỉnh sửa thành công")
    });
  }

  reset(id) {
    this.ngOnInit();
    this.getById(id);
  }
}
