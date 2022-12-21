import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user/user";
import {UserType} from "../../../model/user/user-type";
import {UserService} from "../../../service/user/user.service";
import {UserListDto} from "../../../dto/user-list-dto";
import {PageUsers} from "../../../model/user/page-users";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UnlockUsers} from 'src/app/model/user/unlock-users';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {NotificationService} from 'src/app/service/notification/notification.service';
import {Title} from "@angular/platform-browser";

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

  unlockUsers: UnlockUsers[];
  unlockIds: number[];
  checkedAll: boolean;


  constructor(private _userService: UserService,
              private _formBuilder: FormBuilder,
              private _toast: ToastrService,
              private _notificationService: NotificationService,
              private _titleService: Title,
              private _router: Router,
  ) {
    this._titleService.setTitle("Quản lý thành viên");
  }

  ngOnInit(): void {
    this._userService.findAllUserType().subscribe(
      data => {
        this.userTypeList = data
        this.rfSearch = this._formBuilder.group({
          idSearch: ['',
            [Validators.pattern("^([0-9]{0,10})")]],
          nameSearch: ['',
            [Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{1,30}$")]],
          addressSearch: ['',
            [Validators.pattern("^[a-zA-Z0-9,_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{1,30}$")]],
          emailSearch: ['',
            [Validators.pattern("^[a-zA-Z0-9,_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{1,30}$")]],
          userTypeSearch: [''],
        });
        this.unlockIds = [];
        console.log("sonTN" + this.rfSearch.value);
        this.onSearchAndPage();
        console.log(this.onSearchAndPage())
      });
  }


  onSearchAndPage() {
    this._userService.searchBy(this.rfSearch.value, 0).subscribe(data => {
      this.pageUsers = data;
      console.log("list" + this.pageUsers.content)
      for (let i = 0; i <this.pageUsers.content.length ; i++) {
        console.log("list:" + this.pageUsers.content[i].account.username)
      }
    });
  }

  goToPage(pageNumber: number) {
    this._userService.searchBy(this.rfSearch.value, pageNumber).subscribe(data => {
      console.log(data);
      this.pageUsers = data;
      console.log(this.pageUsers)
    }, error => {
      this._toast.error('Không thể kết nối đến Server');
    });
  }


  addToUnlock(id: any) {
    const index = this.unlockIds.indexOf(id, 0);
    index > -1 ? this.unlockIds.splice(index, 1) : this.unlockIds.push(id);
  }


  addAllToUnlock() {
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

  sendToUnlockGroupModal() {
    this.unlockUsers = [];
    this._userService.findByListId(this.unlockIds).subscribe(data => {
      this.unlockUsers = data;
    });
  }

  modalById(id: number): void {
    this._userService.findUserEditById(id).subscribe(data => {
      this.user = data;
    })
    console.log(id)
    this.unlockIds = [id];
    console.log(this.unlockUsers)
    this.sendToUnlockGroupModal();
    console.log(this.unlockUsers)
  }


  unlock() {
    this._userService.unlock(this.unlockIds).subscribe(data => {
      this._notificationService.showSuccessNotification('Mở khoá thành công!');
    }, () => {
      this.ngOnInit();
    });
  }

  resetFormAndData() {
    this.ngOnInit()
  }

  lockUser() {
    let idString =  this.unlockIds.join(',');
    console.log(idString);
    this._router.navigate(['/user/lock', idString]);
  }
}
