import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {City} from "../../../model/address/city";
import {District} from "../../../model/address/district";
import {Ward} from "../../../model/address/ward";
import {AddressService} from "../../../service/address/address.service";
import {User} from "../../../model/user/user";
import {ToastrService} from "ngx-toastr";

export const checkBirthDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const birthday = new Date(control.get("birthDay").value).getTime();
  console.log(birthday)
  const dateNow = new Date().getTime();
  console.log(dateNow)
  if (dateNow - birthday < 18 * 365 * 24 * 60 * 60 * 1000) {
    return {"checkBirthDay": true};
  } else {
    return null;
  }
}

export const reConfirmPass: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");
  if (password && confirmPassword && password.touched && password.value != confirmPassword.value) {
    return {"reConfirmPass": true}
  } else {
    return null;
  }
}

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  selectedImages: any[] = [];
  updateUserForm: FormGroup
  id: number;
  imgs: any;
  userList: User[];
  cities: City[] = [];
  districts: District[];
  wards: Ward[];
  cityIdSelected: number;
  districtIdSelected: number;
  wardIdSelected: number;
  currentCity: string;
  currentDistrcit: string;
  currentWard: string;
  diachi: string;
  status: number;
  user: User;
  avt: string;


  constructor(
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _builder: FormBuilder,
    private _storage: AngularFireStorage,
    private _router: Router,
    private addressService: AddressService,
    private _toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.status = 0;
    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getUserUpdate(this.id);
    });
    this.addressService.getAllCities();
    this.cities = this.addressService.cities
  }

  getUserUpdate(id: number) {
    this._userService.findAllUser().subscribe(data => {
      this.userList = data;
      return this._userService.findUserByIdServer(id).subscribe(value => {
        this.user = value;
        this.avt = value.avatar;
        this.updateUserForm = this._builder.group({
          id: [id],
          firstName: [value.firstName, [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$"),Validators.minLength(2),Validators.maxLength(50)]],
          lastName: [value.lastName, [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$"),Validators.minLength(2),Validators.maxLength(50)]],
          username: [value.account.username, [Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
          avatar: [value.avatar, [Validators.required]],
          email: [value.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
          phone: [value.phone, [Validators.required, Validators.pattern("[0][9][0]\\d{7}")]],
          birthDay: [value.birthDay, [Validators.required]],
          city: [value.address.city, [Validators.required]],
          district: [value.address.district, [Validators.required]],
          town: [value.address.town, [Validators.required]],
          country: ["viet nam"],
          idCard: [value.idCard, [Validators.required, Validators.pattern("\\d{9}")]],
          password: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
          confirmPassword: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
          pointDedication: [10.0],
          statusLock: [true],
          deleteStatus: [false],
          detailAddress: [value.address.detailAddress, [Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
          userTypeId: [5]
        },{validators: [this.areEqual, this.isExist, reConfirmPass,checkBirthDay]});
      });
    });
  }

  updateUser(id: number) {
    this.updateUserForm.controls.city.setValue(this.currentCity);
    this.updateUserForm.controls.district.setValue(this.currentDistrcit);
    this.updateUserForm.controls.town.setValue(this.currentWard);

    const user = this.updateUserForm.value;
    this._userService.updateUser(id, user).subscribe(value => {
      this._toast.success("Cập Nhật Thành Công")
      this._router.navigateByUrl('/home');
    })
  }

  selectCity() {
    this.cityIdSelected = this.updateUserForm.value.city;
    this.addressService.getAllAddress().subscribe(data => {
      this.districts = [];
      for (let i = 0; i < data[this.cityIdSelected].Districts.length; i++) {
        this.districts.push(new District(i, data[this.cityIdSelected].Districts[i].Name));
      }
      this.currentCity = data[this.cityIdSelected].Name;
      console.log(this.currentCity);
    });
  }

  selectDistrict() {
    this.districtIdSelected = this.updateUserForm.value.district;
    this.addressService.getAllAddress().subscribe(data => {
      this.wards = [];
      for (let i = 0; i < data[this.cityIdSelected].Districts[this.districtIdSelected].Wards.length; i++) {
        this.wards.push(new Ward(i, data[this.cityIdSelected].Districts[this.districtIdSelected].Wards[i].Name));
      }

      this.currentDistrcit = data[this.cityIdSelected].Districts[this.districtIdSelected].Name;
    });
  }

  selectWard() {
    this.wardIdSelected = this.updateUserForm.value.town;
    this.addressService.getAllAddress().subscribe(data => {
      this.currentWard = data[this.cityIdSelected].Districts[this.districtIdSelected].Wards[this.wardIdSelected].Name;
    });
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
              this.avt = url;
              document.getElementById('avartar__my').classList.add('alo');
              document.getElementById('avartar__my').setAttribute('style', 'background-image: url("' + url + '")');
            });
          })
        ).subscribe(() => {
        });
      }
    }
  }

  resetForm() {
    this.ngOnInit();
  }

  changStatusCity1() {
    this.status = 1;
    this.selectCity();
  }

  changStatusDistrict1() {
    this.status = 1;
    this.selectDistrict();
  }

  changStatusTown1() {
    this.status = 1;
    this.selectWard();
  }

  render($event: any) {
    console.log('aaaa', document.getElementById('inputGroupFile01'));
    document.getElementById('inputGroupFile01').click();
  }
  areEqual: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let username = control.get("username").value;
    console.log(username);
    let result = null;
    this.userList.forEach(value => {
      if (username === value.account.username) {
        result = {areEqual: true};
      }
    })
    return result;
  }
  isExist: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let email = control.get("email").value;
    console.log(email);
    let result = null;
    this.userList.forEach(value => {
      if (email === value.email) {
        result = {isExist: true};
      }
    })
    return result;
  }
}
