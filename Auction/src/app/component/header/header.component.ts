import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user/user";
import {TokenService} from "../../service/security/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nameUser: string;
  checkLogin = false;
  accountRole: string;
  currentUser: User;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.checkLogin = true;
      this.currentUser = JSON.parse(this.tokenService.getUser());
      this.nameUser = this.currentUser.lastName + ' ' + this.currentUser.firstName;
      const roles = this.tokenService.getRole();
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === "ROLE_ADMIN") {
          this.accountRole = "ROLE_ADMIN"
        }
      }
    }
  }

  logOut() {
    this.tokenService.logOut();
    this.router.navigateByUrl('/home').then(() => {
      location.reload();
    })
  }

  topTop() {
    document.getElementById('top').click();
  };

}
