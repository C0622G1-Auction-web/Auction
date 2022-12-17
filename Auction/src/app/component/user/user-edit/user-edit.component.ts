import {Component, OnInit} from '@angular/core';
import {UserType} from "../../../model/user/user-type";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserEditDto} from "../../../dto/user-edit-dto";

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
              private _router: Router) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      console.log("Id:" + this.id)
      this.getById(this.id);
    });
  }

  getById(id: number) {
    return this._userService.findUserById(id).subscribe(data => {
      console.log(data)
      this.rfUser = this._formBuilder.group({
        id: [data.id],
        firstName: [data.firstName],
        lastName: [data.lastName],
        email: [data.email],
        phone: [data.phone],
        detailAddress: [data.address.detailAddress],
        town: [data.address.town],
        district: [data.address.district],
        city: [data.address.city],
        country: [data.address.country],
        username: [data.account.username],
        birthDay: [data.birthDay],
        idCard: [data.idCard],

      });
    });
  }

  saveUser(id) {
    this.user = this.rfUser.value;
    this._userService.updateByAdim(id, this.user).subscribe(data => {
      this._router.navigate(['/user/list']);
    });
  }

  reset(id) {

    this.ngOnInit();
    this.getById(id);
  }
}
