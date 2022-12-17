import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../service/user/user.service';
import {Router} from '@angular/router';
import {Address} from "../../../model/user/address";
import {UserType} from "../../../model/user/user-type";


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
  addAddress: Address[];
  addUserType: UserType[];
  addAcountUser: Account[];

  addUser: FormGroup;
  constructor(private userSevice: UserService, private router: Router, private builder: FormBuilder) {
  }

  ngOnInit(): void {

  }


}

