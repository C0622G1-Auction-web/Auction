import {Component, OnInit} from '@angular/core';
import {UserType} from "../../../model/user/user-type";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userTypes: UserType[] = [];
  id: number;

  rfUser: FormGroup;

  equals(o1: UserType, o2: UserType) {
    return o1.id === o2.id;
  }

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private formBuiler: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {


    this.userService.findAllUserType().subscribe(data => {
      this.userTypes = data;
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getById(this.id);
    });
  }

  getById(id: number) {
    return this.userService.findUserById(id).subscribe(data => {
      // console.log(data)
      // this.rfUser = this.formBuiler.group({
      //   id: [data.id],
      //   gia: [data.gia],
      //   diemDi: [data.diemDi],
      //   diemDen: [data.diemDen],
      //   ngayKhoiHanh: [data.ngayKhoiHanh],
      //   gioKhoiHanh: [data.gioKhoiHanh],
      //   soLuong: [data.soLuong],
      //   nhaXe: [data.nhaXe],
      // });
    });
  }


}
