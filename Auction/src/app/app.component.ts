import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TokenService} from "./service/security/token.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    if (this._tokenService.isLogged()) {
      this.checklogged = true;

      const roles = this._tokenService.getRole();

      for (let i = 0; i < roles.length; i++) {

        if (roles[i] === 'ROLE_ADMIN') {
          this.accountRole = 'ROLE_ADMIN'
        }

      }
    }
  }

  checklogged = false;
  accountRole: string;

  title = 'Auction';

  // tslint:disable-next-line:variable-name
  constructor(
    private _toastService: ToastrService,
    private _tokenService: TokenService
  ) {
  }


  showMessage() {
    console.log('alo');
    this._toastService.success('hello', 'info', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }
}
