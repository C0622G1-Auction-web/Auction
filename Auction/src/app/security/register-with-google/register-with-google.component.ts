import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {District} from "../../model/address/district";
import {Ward} from "../../model/address/ward";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../../service/address/address.service";
import {UserService} from "../../service/user/user.service";
import {ToastrService} from 'ngx-toastr';
import {City} from "../../model/address/city";

@Component({
  selector: 'app-register-with-google',
  templateUrl: './register-with-google.component.html',
  styleUrls: ['./register-with-google.component.css']
})
export class RegisterWithGoogleComponent implements OnInit {

  rfRegisterGoogle: FormGroup;
  emailGoogle: string;
  cities: City[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  cityIdSeleted: number;
  districtIdSeleted: number;
  wardIdSeleted: number;
  currentCity: string;
  currentDistrict: string;
  currentWard: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.emailGoogle = params.get('email');
    });

    this.getCreateForm();

    this.addressService.getAllCities();

    this.cities =  this.addressService.cities;

    // console.log(this.cities);
  }

  getCreateForm() {
    this.rfRegisterGoogle = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{3,30}$')]],
      username: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      email: [this.emailGoogle],
      phone: ['', [Validators.required, Validators.pattern('[0][9][0]\\d{7}')]],
      birthDay: ['', [Validators.required]],
      city: ['',Validators.required],
      district: ['',Validators.required],
      town: ['',Validators.required],
      country: ['Việt Nam'],
      idCard: ['', [Validators.required, Validators.pattern('\\d{9}')]],
      password: ['', [Validators.required]],
      pointDedication: [10.0],
      statusLock: [true],
      deleteStatus: [true],
      userTypeId: [5],
      detailAddress: ['', [Validators.required]]
    })
  }

  submitCreateUser() {
    this.rfRegisterGoogle.controls.city.setValue(this.currentCity);
    this.rfRegisterGoogle.controls.district.setValue(this.currentDistrict);
    this.rfRegisterGoogle.controls.town.setValue(this.currentWard);

    this.userService.createUser(this.rfRegisterGoogle.value).subscribe(data => {

      this.toastr.success('Đăng ký thành công, mời bạn đăng nhập')
      this.router.navigateByUrl('login')

    })
  }

  selectCity() {
    this.cityIdSeleted = this.rfRegisterGoogle.value.city;

    this.addressService.getAllAdress().subscribe(data => {

      this.districts = [];

      for (let i = 0; i < data[this.cityIdSeleted].Districts.length; i++) {

        this.districts.push(new District(i, data[this.cityIdSeleted].Districts[i].Name));

      }

      this.currentCity = data[this.cityIdSeleted].Name;
    });
  }

  selectDistrict() {
    this.districtIdSeleted = this.rfRegisterGoogle.value.district;

    this.addressService.getAllAdress().subscribe(data => {

      this.wards = [];

      for (let i = 0; i < data[this.cityIdSeleted].Districts[this.districtIdSeleted].Wards.length; i++) {

        this.wards.push(new Ward(i, data[this.cityIdSeleted].Districts[this.districtIdSeleted].Wards[i].Name));

      }

      this.currentDistrict = data[this.cityIdSeleted].Districts[this.districtIdSeleted].Name;
    });
  }

  selectWard() {
    this.wardIdSeleted = this.rfRegisterGoogle.value.town;

    this.addressService.getAllAdress().subscribe(data => {

      this.currentWard = data[this.cityIdSeleted].Districts[this.districtIdSeleted].Wards[this.wardIdSeleted].Name;
    });
  }

}
