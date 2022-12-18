import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Auction';
  // tslint:disable-next-line:variable-name
  constructor(private _toastService: ToastrService) {
  }

  showMessage() {
    console.log('alo');
    this._toastService.success('hello', 'info', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }
}
