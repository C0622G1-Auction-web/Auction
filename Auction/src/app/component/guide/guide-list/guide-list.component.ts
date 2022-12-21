import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Guide} from "../../../model/guide/guide";
import {GuideService} from "../../../service/guide/guide.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {TokenService} from "../../../service/security/token.service";

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css']
})
export class GuideListComponent implements OnInit {

  rfGuide: FormGroup;
  guide: Guide[];
  title: string = "";
  error: string;
  accountRole: string;
  checkLogged = false;

  constructor(
    private _guideService: GuideService,
    private _formBuilde: FormBuilder,
    private _toast: ToastrService,
    private _titleService: Title,
    private _tokenService: TokenService
  ) {
    this._titleService.setTitle("Hướng dẫn")
  }

  ngOnInit(): void {
    if (this._tokenService.isLogged()) {
      this.checkLogged = true;

      const roles = this._tokenService.getRole();
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'ROLE_ADMIN') {
          this.accountRole = 'ROLE_ADMIN';
        }
      }
    }

    this._guideService.searchByContent(this.title).subscribe(data => {
      this.guide = data;
    })
  }

  searchAll() {
    this._guideService.searchByContent(this.title).subscribe(data => {
      this.guide = data;
    }, error => {
      this._toast.error("Không tìm thấy hướng dẫn nào phù hợp")
    })
  }

}
