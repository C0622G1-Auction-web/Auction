import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user/user";
import {UserType} from "../../../model/user/user-type";
import {UserService} from "../../../service/user/user.service";
import {UserListDto} from "../../../dto/user-list-dto";
import {PageUsers} from "../../../model/user/page-users";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UnlockUsers} from 'src/app/model/user/unlock-users';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  pageUsers: PageUsers
  rfSearch: FormGroup;
  userTypeList: UserType[] = [];
  user: User

  // deleteProducts
  // deleteIds: number[];

  unlockUsers: UnlockUsers[];
  unlockIds: number[];
  checkedAll: boolean;


  constructor(private _userService: UserService,
              private _formBuilder: FormBuilder,
              private _toast: ToastrService,

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
    }, error => {
      this._toast.error('Không thể kết nối đến Server');
    });
  }

  modalById(id: number): void {
    this._userService.findUserEditById(id).subscribe(data => {
      this.user = data;
    })
  }

  unlock() {
    this._userService.unlock(this.unlockIds)
      // .subscribe(data => {
      // this._router.navigate(['/user/list']);
    // });
  }

  sendToUnlockGroupModal() {
    this.unlockUsers = [];
    this._userService.findByListId(this.unlockIds).subscribe(data => {
      this.unlockUsers = data;
    });
  }

  addToUnlock(id: any) {
    const index = this.unlockIds.indexOf(id, 0);
    index > -1 ? this.unlockIds.splice(index, 1) : this.unlockIds.push(id);
  }


  delete() {
    this._userService.delete(this.unlockIds)
  }

  sendToDeleteGroupModal() {
    this.unlockUsers = [];
    this._userService.findByListId(this.unlockIds).subscribe(data => {
      this.unlockUsers = data;
    });
  }

  addAllToDelete() {
    this.checkedAll = true;
    for (let value of this.pageUsers.content) {
      if (!this.unlockIds.includes(value.id)) {
        this.checkedAll = false;
        break;
      }
    }
    if (this.checkedAll) {
      for (let value of this.pageUsers.content) {
        const index = this.unlockIds.indexOf(value.id, 0);
        this.unlockIds.splice(index, 1);
      }
    } else {
      for (let value of this.pageUsers.content) {
        const index = this.unlockIds.indexOf(value.id, 0);
        if (index == -1) {
          this.unlockIds.push(value.id);
        }
      }
    }
  }

  addToDelete(id: number) {
    const index = this.unlockIds.indexOf(id, 0);
    index > -1 ? this.unlockIds.splice(index, 1) : this.unlockIds.push(id);
  }


}
