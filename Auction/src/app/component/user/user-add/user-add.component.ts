import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../service/user/user.service';
import {Router} from '@angular/router';
import {User} from '../../../model/user/user';
import {Address} from '../../../model/user/address';
import {UserType} from '../../../model/user/user-type';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  /**
   * Create by: NguyenNQ
   * Date created: 13/12/2022
   * Add account user
   */

  addUser: FormGroup;

  constructor(private userSevice: UserService, private router: Router, private builder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAddUserform();

  }

  getAddUserform() {
    this.addUser = this.builder.group({
      fisrtName: [],
      lastName: [],
      birthDay: [],
      phone: [],
      email: [],
      idCard: [],
      avatar: ['ok'],
      pointDedication: [10.0],
      username: [],
      password: ['12345678'],
      detailAddress: [],
      town: [],
      district: [],
      city: [],
      country: ['Viet Nam'],
      statusLock: [true],
      deleteStatus: [true]
    });
  }

  addAccountUser() {
    if (this.addUser.valid) {
      this.userSevice.saveaddAcountUser(this.addUser.value).subscribe(() =>
        this.router.navigateByUrl(''));
    }
  }
}
