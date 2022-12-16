import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user/user";
import {Address} from "../../../model/user/address";
import {UserType} from "../../../model/user/user-type";
import {UserService} from "../../../service/user/user.service";
import {UserListDto} from "../../../dto/userListDto";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserListDto[] = [];
  user: User;
  userTypeList: UserType[] = [];
  indexPagination: number = 1;

  idSearch: string;
  nameSearch: string;
  addressSearch: string;
  emailSearch: string;
  userTypeSearch: string;
  index: number;
  totalPages: number;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

    this.idSearch = '';
    this.nameSearch = '';
    this.addressSearch = '';
    this.emailSearch = '';
    this.userTypeSearch = '';
    this.index = 0;

    this.userService.getList().subscribe(
      data => {
        this.users = data
      });

    this.userService.findAllUserType().subscribe(
      data => {
        this.userTypeList = data
      })

    this.userService.getList().subscribe(
      data => {
        this.users = data
        if ((this.users.length % 5) != 0) {
          this.totalPages = (Math.round(this.users.length / 5) + 1)
          console.log(this.totalPages)
        }
      });

  }

  search() {
    this.userService.searchBy(this.idSearch, this.nameSearch, this.addressSearch,
      this.emailSearch, this.userTypeSearch, this.index)
  }


  findPaginnation() {
    this.index = (this.indexPagination * 5) -5
    this.userService.searchBy(this.idSearch, this.nameSearch, this.addressSearch,
      this.emailSearch, this.userTypeSearch, this.index).subscribe((data: UserListDto[]) => {
      this.users = data;
    })
  }


  indexPaginationChage(value: number) {
    this.indexPagination = value;
  }


  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPages) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.userService.searchBy(this.idSearch, this.nameSearch, this.addressSearch,
      this.emailSearch, this.userTypeSearch, this.index).subscribe((data: UserListDto[]) => {
      this.users = data;
    })
  }

  prviousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.ngOnInit();
    } else {
      this.userService.searchBy(this.idSearch, this.nameSearch, this.addressSearch,
        this.emailSearch, this.userTypeSearch, this.index).subscribe((data: UserListDto[]) => {
        this.users = data;
      })
    }
  }

}
