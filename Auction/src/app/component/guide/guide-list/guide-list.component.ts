import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {Guide} from "src/app/model/guide/guide";
import {GuideService} from "src/app/service/guide/guide.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {ImgUrlGuideDto} from "src/app/model/guide/img-url-guide";
import {TokenService} from "../../../service/security/token.service";

@Component({
  selector: "app-guide-list",
  templateUrl: "./guide-list.component.html",
  styleUrls: ["./guide-list.component.css"],
})
export class GuideListComponent implements OnInit {
  rfGuide: FormGroup;
  guide: Guide[];
  imageGuide: ImgUrlGuideDto[];
  title: string = "";
  id: number;
  error: string;
  checkNumber: number;
  checkLogged = false;
  accountRole: string;

  constructor(
    private _guideService: GuideService,
    private _formBuilde: FormBuilder,
    private _toast: ToastrService,
    private _titleService: Title,
    private _tokenService: TokenService
  ) {
    this._titleService.setTitle("Hướng dẫn");
  }

  ngOnInit(): void {

    if (this._tokenService.isLogged()) {
      this.checkLogged = true;

      const role = this._tokenService.getRole();

      for (let i = 0; i < role.length; i++) {
        if (role[i] === 'ROLE_ADMIN') {
          this.accountRole = 'ROLE_ADMIN';
        }
      }

    }

    this._guideService.searchByContent(this.title).subscribe((data) => {
      this.guide = data;
    });
    this._guideService.findImageGuide(this.id).subscribe((data) => {
      this.imageGuide = data;
    });
  }

  generateIdForAccordion(index: number) {
    return `heading${index}`;
  }

  searchAll() {
    this._guideService.searchByContent(this.title).subscribe(
      (data) => {
        this.guide = data;
      },
      (error) => {
        this._toast.error("Không tìm thấy hướng dẫn nào phù hợp");
      }
    );
  }

  showImage(id: number) {
    this.checkNumber = id;
    this._guideService.findImageGuide(id).subscribe((data => {
      this.imageGuide = data;
      console.log(this.imageGuide[0].url);
    }))
  }
}
