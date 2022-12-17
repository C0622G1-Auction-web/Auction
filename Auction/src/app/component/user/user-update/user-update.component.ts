import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  updateUserForm:FormGroup
  id: number;

  constructor(private _userService: UserService,
              private _activatedRoute: ActivatedRoute,
              private _builder: FormBuilder,) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getUser(this.id);
    });
  }

  getUser(id: number) {
    return this._userService.findUserByIdServer(id).subscribe(value => {
      this.updateUserForm = this._builder.group({
        id: [id],
        firstName: [value.firstName],
        lastName: [value.lastName],
        username: [value.account.username],
        avatar: [value.avatar],
        email: [value.email],
        phone: [value.phone],
        birthDay: [value.birthDay],
        city: [value.address.city],
        district: [value.address.district],
        town: [value.address.town],
        country: ["viet nam"],
        idCard: [value.idCard],
        password: [value.account.password],
        pointDedication: [10.0],
        statusLock: [true],
        deleteStatus: [true],
        userTypeId: [5]
      })
    })
  }

  updateUser(id: number) {
    const user = this.updateUserForm.value;
    this._userService.updateUser(id, user).subscribe(value => {
    })
  }
}
