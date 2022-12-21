import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  selectedImages: any[] = [];
  updateUserForm: FormGroup
  id: number;
  imgs: any[] = [];

  constructor(
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _builder: FormBuilder,
    private _storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    console.log('ok1')
    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getUserUpdate(this.id);
    });
  }

  getUserUpdate(id: number) {
    console.log('ok2')
    return this._userService.findUserByIdServer(id).subscribe(value => {
      console.log('ok3')
      console.log(value);
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

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
    } else {
      this.selectedImages = [];
    }
    if (this.selectedImages.length !== 0) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        let selectedImage = this.selectedImages[i];
        const n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this._storage.ref(filePath);
        this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.updateUserForm.patchValue({avatar: url})
            });
          })
        ).subscribe(() => {
        });
      }
    }
  }
}
