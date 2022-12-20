import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Guide } from "src/app/model/guide/guide";
import { PageGuide } from "src/app/model/guide/page-guide";
import { GuideService } from "src/app/service/guide/guide.service";

@Component({
  selector: "app-guide-list",
  templateUrl: "./guide-list.component.html",
  styleUrls: ["./guide-list.component.css"],
})
export class GuideListComponent implements OnInit {
  pageGuide: PageGuide;
  rfGuide: FormGroup;
  guide: Guide;

  constructor(
    private _guideService: GuideService,
    private _formBuilde: FormBuilder,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.rfGuide = this._formBuilde.group({
      title: [""],
    });
    this.onSearchAndPage();
  }

  onSearchAndPage() {
    this._guideService
      .searchByContent(this.rfGuide.value.title, 0)
      .subscribe((data) => {
        this.pageGuide = data;
        console.log('123123');
        
        console.log(this.pageGuide);
      });
  }

  goToPage(pageNumber: number) {
    this._guideService
      .searchByContent(this.rfGuide.value, pageNumber)
      .subscribe(
        (data) => {
          console.log(data.content);
          this.pageGuide = data;
        },
        (error) => {
          this._toast.error("Không thể kết nối đến Server");
        }
      );
  }
}
