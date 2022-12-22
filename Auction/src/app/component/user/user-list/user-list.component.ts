import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user/user";
import {UserType} from "../../../model/user/user-type";
import {UserService} from "../../../service/user/user.service";
import {UserListDto} from "../../../dto/user-list-dto";
import {PageUsers} from "../../../model/user/page-users";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  pageUsers: PageUsers
  rfSearch: FormGroup;
  userTypeList: UserType[] = [];

  constructor(private _userService: UserService,
              private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {

    this._userService.findAllUserType().subscribe(
      data => {
        this.userTypeList = data

        this.rfSearch = this._formBuilder.group({
          idSearch: [''],
          nameSearch: [''],
          addressSearch: [''],
          emailSearch: [''],
          userTypeSearch: [''],
        });
        console.log(this.rfSearch.value)
        this.onSearchAndPage();
        console.log(this.onSearchAndPage())
      });

  }


  onSearchAndPage() {
    this._userService.searchBy(this.rfSearch.value, 0).subscribe(data => {
      this.pageUsers = data;
      console.log(this.pageUsers)
    });
  }

  goToPage(pageNumber: number) {
    this._userService.searchBy(this.rfSearch.value, pageNumber).subscribe(data => {
      console.log(data.content);
      this.pageUsers = data;
    })
  }
}
