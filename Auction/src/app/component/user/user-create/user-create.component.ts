import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../../service/user/user.service";
import {Router} from '@angular/router';
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  selectedImages: any[] = [];
  imgs: any;
  userCreateForm: FormGroup;
  captchaString: string;
  // cities: City[] = [];
  // districts: District[];
  // wards: Ward[];
  // cityIdSelected: number;
  // districtIdSelected: number;
  // wardIdSelected: number;
  // currentCity: string;
  // currentDistrcit: string;
  // currentWard: string;

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private _storage: AngularFireStorage) {

  }

  /**
   * Create by: TruongLH
   * Date created: 13/12/2022
   * Function: to create component user
   */
  ngOnInit(): void {
    this.userCreateForm = this.formBuilder.group({
      // avatar:["",[Validators.required]],
      // firstName:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
      // lastName:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{3,30}$")]],
      // username:["",[Validators.required]],
      // email:["",[Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
      // phone:["",[Validators.required,Validators.pattern("[0][9][0]\\d{7}")]],
      // birthDay:["",[Validators.required]],
      // city:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
      // district:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
      // town:["",[Validators.required,Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
      // idCard:["",[Validators.required,Validators.pattern("\\d{9}")]],
      // password:["",[Validators.required]]
      firstName: [],
      lastName: [],
      username: [],
      avatar: [],
      email: [],
      phone: [],
      birthDay: [],
      city: [],
      district: [],
      town: [],
      country: ["viet nam"],
      idCard: [],
      password: [],
      pointDedication: [10.0],
      statusLock: [true],
      deleteStatus: [true],
      userTypeId: [5]
    });
  }

  submitCreateUser() {
    this.userService.saveaddAcountUser(this.userCreateForm.value).subscribe(data => {
      this.router.navigateByUrl('');
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
    console.log(usr_input);
    if (usr_input == this.captchaString) {
      let s = document.getElementById("key")
        .innerHTML = "Mã chính xác";
      this.generate();
    } else {
      let s = document.getElementById("key")
        .innerHTML = "Mã không chính xác";
      this.generate();
    }
  }
}
