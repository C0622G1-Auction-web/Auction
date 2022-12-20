import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../../service/security/token.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.tokenService.getToken()) {

      const roles = this.tokenService.getRole();

      for (let i = 0; i < roles.length; i++) {

        if (roles[i] === 'ROLE_ADMIN') {
          return true
        }

      }

      this.toastr.error('Bạn không có quyền vào trang này.')
      this.router.navigateByUrl('/home')

    } else {
      this.toastr.error('Yêu cầu đăng nhập.')
      this.router.navigateByUrl('/login')
    }


  }

}
