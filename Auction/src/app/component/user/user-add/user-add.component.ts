import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user/user.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {City} from '../../../model/address/city';
import {District} from '../../../model/address/district';
import {Ward} from '../../../model/address/ward';
import {AddressService} from '../../../service/address/address.service';
import {NotificationService} from "../../../service/notification/notification.service";
@Component({
  selector: 'UserAddComponent',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  /**
   * Create by: NguyenNQ
   * Date created: 13/12/2022
   * Add account user
   */
  rfAddUser: FormGroup;
  cities: City[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  cityIdSeleted: number;
  districtIdSeleted: number;
  wardIdSeleted: number;
  currentCity: string;
  currentDistrict: string;
  currentWard: string;

  constructor(private _userSevice: UserService, private router: Router, private builder: FormBuilder,
              private titleService: Title,
              private _notificationSevice: NotificationService,
              private addressService: AddressService) {
    this.titleService.setTitle("Thêm mới thành viên")
  }

  ngOnInit(): void {
    this.getAddUserform();

    this.addressService.getAllCities();

    this.cities =  this.addressService.cities;
  }
  getAddUserform() {
    this.rfAddUser = this.builder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      birthDay: ['',Validators.required],
      phone: ['',Validators.required],
      email: ['',Validators.required],
      idCard: ['',Validators.required],
      avatar: ['UPDATE SAU '],
      pointDedication: [10.0],
      username: [''],
      password: ['12345678'],
      detailAddress: ['',Validators.required],
      town: ['',Validators.required],
      district: ['',Validators.required],
      city: ['',Validators.required],
      country: ['Viet Nam'],
      statusLock: [false],
      deleteStatus: [false]
    });
  }

  addAccountUser() {
    if (this.rfAddUser.valid) {
      this._userSevice.saveaddAcountUser(this.rfAddUser.value).subscribe(() =>
          this.router.navigateByUrl('/user/list')
        , error => {
          this._notificationSevice.showErrorNotification("Không thêm được")
        });
      this._notificationSevice.showSuccessNotification("Thêm thành công.");
    }
  }
  selectCity() {
    this.cityIdSeleted = this.rfAddUser.value.city;

    this.addressService.getAllAddress().subscribe(data => {

      this.districts = [];

      for (let i = 0; i < data[this.cityIdSeleted].Districts.length; i++) {

        this.districts.push(new District(i, data[this.cityIdSeleted].Districts[i].Name));

      }

      this.currentCity = data[this.cityIdSeleted].Name;
    });
  }

  selectDistrict() {
    this.districtIdSeleted = this.rfAddUser.value.district;

    this.addressService.getAllAddress().subscribe(data => {

      this.wards = [];

      for (let i = 0; i < data[this.cityIdSeleted].Districts[this.districtIdSeleted].Wards.length; i++) {

        this.wards.push(new Ward(i, data[this.cityIdSeleted].Districts[this.districtIdSeleted].Wards[i].Name));

      }

      this.currentDistrict = data[this.cityIdSeleted].Districts[this.districtIdSeleted].Name;
    });
  }

  selectWard() {
    this.wardIdSeleted = this.rfAddUser.value.town;

    this.addressService.getAllAddress().subscribe(data => {

      this.currentWard = data[this.cityIdSeleted].Districts[this.districtIdSeleted].Wards[this.wardIdSeleted].Name;
    });
  }
}
