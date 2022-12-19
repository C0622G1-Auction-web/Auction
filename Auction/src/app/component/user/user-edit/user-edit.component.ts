import {Component, OnInit} from '@angular/core';
import {UserType} from "../../../model/user/user-type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserEditDto} from "../../../dto/user-edit-dto";
import {ToastrService} from "ngx-toastr";
import {City} from 'src/app/model/address/city';
import {District} from 'src/app/model/address/district';
import {Ward} from 'src/app/model/address/ward';
import {AddressService} from 'src/app/service/address/address.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: number;
  user: UserEditDto;
  rfUser: FormGroup;

  cities: City[] = [];
  districts: District[];
  wards: Ward[];
  cityIdSelected: number;
  districtIdSelected: number;
  wardIdSelected: number;
  currentCity: string;
  currentDistrcit: string;
  currentWard: string;

  status: number;


  constructor(private _userService: UserService,
              private _activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _toast: ToastrService,
              private _router: Router,
              private _addressService: AddressService,
  ) {
  }

  ngOnInit(): void {

    this.status = 0;
    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      console.log("Id:" + this.id)
      this.getById(this.id);
    });
    this._addressService.getAllCities();
    this.cities = this._addressService.cities
  }

  getById(id: number) {
    return this._userService.findUserEditById(id).subscribe(data => {
      console.log(data)
      this.rfUser = this._formBuilder.group({
        id: [data.id],
        firstName: [data.firstName,
          [Validators.required,
            Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
        lastName: [data.lastName,
          [Validators.required,
            Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
        email: [data.email,
          [Validators.required,
            Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
        phone: [data.phone,
          [Validators.required,
            Validators.pattern("[0][9][0]\\d{7}")]],
        detailAddress: [data.address.detailAddress,
          [Validators.required,
            Validators.pattern("^[a-zA-Z0-9,_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{2,30}$")]],
        town: [data.address.town,
          [Validators.required]],
        district: [data.address.district,
          [Validators.required]],
        city: [data.address.city,
          [Validators.required]],
        country: [data.address.country,
          [Validators.required]],
        username: [data.account.username,
          [Validators.required]],
        birthDay: [data.birthDay,
          [Validators.required]],
        idCard: [data.idCard,
          [Validators.required,
            Validators.pattern("\\d{9}")]],
      });
    });
  }

  saveUser(id) {
    this.rfUser.controls.city.setValue(this.currentCity);
    this.rfUser.controls.district.setValue(this.currentDistrcit);
    this.rfUser.controls.town.setValue(this.currentWard);
    this.user = this.rfUser.value;
    this._userService.updateByAdim(id, this.user).subscribe(data => {
      this._router.navigate(['/user/list']);
      this._toast.success("Chỉnh sửa thành công")
    });
  }

  reset(id) {
    this.ngOnInit();
    this.getById(id);
  }


  selectCity() {
    this.cityIdSelected = this.rfUser.value.city;
    this._addressService.getAllAddress().subscribe(data => {
      this.districts = [];
      for (let i = 0; i < data[this.cityIdSelected].Districts.length; i++) {
        this.districts.push(new District(i, data[this.cityIdSelected].Districts[i].Name));
      }
      this.currentCity = data[this.cityIdSelected].Name;
      console.log(this.currentCity);
    });
  }

  selectDistrict() {
    this.districtIdSelected = this.rfUser.value.district;
    this._addressService.getAllAddress().subscribe(data => {
      this.wards = [];
      for (let i = 0; i < data[this.cityIdSelected].Districts[this.districtIdSelected].Wards.length; i++) {
        this.wards.push(new Ward(i, data[this.cityIdSelected].Districts[this.districtIdSelected].Wards[i].Name));
      }
      console.log(this.wards);
      this.currentDistrcit = data[this.cityIdSelected].Districts[this.districtIdSelected].Name;
    });
  }

  selectWard() {
    this.wardIdSelected = this.rfUser.value.town;
    this._addressService.getAllAddress().subscribe(data => {
      this.currentWard = data[this.cityIdSelected].Districts[this.districtIdSelected].Wards[this.wardIdSelected].Name;
    });
  }

  changStatusCity1() {
    this.status = 1;
    this.selectCity();
  }

  changStatusDistrict1() {
    this.status = 1;
  }

  changStatusTown1() {
    this.status = 1;
  }
}
