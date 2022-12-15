import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Address} from '../../../model/user/address';
import {UserType} from '../../../model/user/user-type';
import {UserService} from '../../../service/user/user.service';
import {Router} from '@angular/router';
import {Builder} from 'protractor';
import {User} from '../../../model/user/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  addUser: User[];
  addAddress: Address[];
  addUserType: UserType[];
  addAcountUser: Account[];

  constructor(private userSevice: UserService, private router: Router, private builder: FormBuilder) {
  }

  ngOnInit(): void {
    this.userSevice.getAllUser().subscribe(data => {
      this.addUser = data;
      // Viet doing...
      // this.addUser = this.builder.group({
      //   fisrtName: [],
      //   lastName: [],
      //   accountUser: [],
      //   birthDay: [],
      //   phone: [],
      //   email: [],
      //   idCard: [],
      //   avatar: [],
      //   pointDedication: [10.0],
      //   username: [],
      //   password: ['12345678'],
      //   detailAddress: [],
      //   town: [],
      //   district: [],
      //   city: [],
      //   country: [],
      //   statusLock: ['1'],
      //   deleteStatus: ['1'],
      // });
    });
  }
}
