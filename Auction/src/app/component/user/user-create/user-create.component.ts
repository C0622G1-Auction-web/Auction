import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {UserService} from "../../../service/user/user.service";
import {Router} from '@angular/router';
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from '@angular/fire/storage';
import {City} from 'src/app/model/address/city';
import {District} from 'src/app/model/address/district';
import {Ward} from 'src/app/model/address/ward';
import {AddressService} from "../../../service/address/address.service";
import {ToastrService} from "ngx-toastr";
import {User} from 'src/app/model/user/user';

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
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  selectedImages: any[] = [];
  imgs: any;
  userList: User[];
  userCreateForm: FormGroup;
  captchaString: string;
  cities: City[] = [];
  districts: District[];
  wards: Ward[];
  cityIdSelected: number;
  districtIdSelected: number;
  wardIdSelected: number;
  currentCity: string;
  currentDistrcit: string;
  currentWard: string;
  usr_input: string;
  result: boolean = false;
  btn: boolean=false;
  status: boolean=false;

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private _storage: AngularFireStorage,
              private addressService: AddressService,
              private _toast: ToastrService) {
  }

  /**
   * Create by: TruongLH
   * Date created: 13/12/2022
   * Function: to create component user
   */
  ngOnInit(): void {
    this.status=false;
    this.getCreateForm();

    this.addressService.getAllCities();

    this.cities = this.addressService.cities
  }

  getCreateForm() {
    this.userService.findAllUser().subscribe(data => {
      this.userList = data;
      this.userCreateForm = this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$"),Validators.minLength(2),Validators.maxLength(50)]],
          lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$"),Validators.minLength(2),Validators.maxLength(50)]],
          username: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
          avatar: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
          phone: ['', [Validators.required, Validators.pattern("[0][9][0]\\d{7}")]],
          birthDay: ['', [Validators.required]],
          city: ['', [Validators.required]],
          district: ['', [Validators.required]],
          town: ['', [Validators.required]],
          country: ["viet nam"],
          idCard: ['', [Validators.required, Validators.pattern("\\d{9}")]],
          password: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
          confirmPassword: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
          pointDedication: [10.0],
          statusLock: [true],
          deleteStatus: [false],
          detailAddress: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
        }, {validators: [this.areEqual, this.isExist, reConfirmPass,checkBirthDay]},
      );
    });
  }

  submitCreateUser() {
    this.userCreateForm.controls.city.setValue(this.currentCity);
    this.userCreateForm.controls.district.setValue(this.currentDistrcit);
    this.userCreateForm.controls.town.setValue(this.currentWard);

    this.userService.createUser(this.userCreateForm.value).subscribe(data => {
      this._toast.success("Đăng Ký Thành Công")
      this.router.navigateByUrl('/home');
    });
  }

  selectCity() {
    this.cityIdSelected = this.userCreateForm.value.city;
    this.addressService.getAllAddress().subscribe(data => {
      this.districts = [];
      for (let i = 0; i < data[this.cityIdSelected].Districts.length; i++) {
        this.districts.push(new District(i, data[this.cityIdSelected].Districts[i].Name));
      }
      this.currentCity = data[this.cityIdSelected].Name;
    });
  }

  selectDistrict() {
    this.districtIdSelected = this.userCreateForm.value.district;
    this.addressService.getAllAddress().subscribe(data => {
      this.wards = [];
      for (let i = 0; i < data[this.cityIdSelected].Districts[this.districtIdSelected].Wards.length; i++) {
        this.wards.push(new Ward(i, data[this.cityIdSelected].Districts[this.districtIdSelected].Wards[i].Name));
      }


      this.currentDistrcit = data[this.cityIdSelected].Districts[this.districtIdSelected].Name;
    });
  }

  selectWard() {
    this.wardIdSelected = this.userCreateForm.value.town;
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
              this.userCreateForm.patchValue({avatar: url})
              this.imgs = url;
              document.getElementById('avartar__my').classList.add('alo');
              document.getElementById('avartar__my').setAttribute('style', 'background-image: url("' + url + '")');
            });
          })
        ).subscribe(() => {
        });
      }
    }
  }

  generate() {
    let captcha;
    document.getElementById("submit").setAttribute('value', '');
    captcha = document.getElementById("image");
    this.captchaString = "";
    const random =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i < 6; i++) {
      this.captchaString += random.charAt(
        Math.random() * random.length)
    }
    captcha.innerHTML = this.captchaString;
  }

  printd() {
    // @ts-ignore
    const usr_input = $('#submit').val();
    this.usr_input = usr_input;
    if (usr_input == this.captchaString) {
      this.result = true;
      let s = document.getElementById("key")
        .innerHTML = "Mã chính xác";
      this.generate();
    } else {
      this.result = false;
      let s = document.getElementById("key")
        .innerHTML = "Mã không chính xác";
      this.generate();
    }
  }

  render(event: any) {
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

  onchangeStautus() {
    this.status= !this.status;
  }

}
