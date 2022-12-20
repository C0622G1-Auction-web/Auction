import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../service/security/auth.service";
import {TokenService} from "../../service/security/token.service";
import {MessageRespone} from "../../model/security/message-respone";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {Googletoken} from "../oauth2/googletoken";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rfLogin: FormGroup;
  socialUser: SocialUser;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private socialAuthService: SocialAuthService
  ) {
  }

  ngOnInit(): void {
    this.getFormLogin();
  }

  /**
   * Created by: DucDH
   * Date: 16/12/2022
   * Function: To get login form
   */

  getFormLogin() {
    this.rfLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    });
  }

  /**
   * Created by: DucDH
   * Date: 16/12/2022
   * Function: To login using User account
   */

  login() {
    this.authService.login(this.rfLogin.value).subscribe(data => {
      if (data.token != undefined) {

        if (this.rfLogin.value.rememberMe) {
          this.tokenService.rememberMe(data.token, data.account, data.roles, data.user)
        } else {
          this.tokenService.setAccountSession(data.account);
          this.tokenService.setTokenSession(data.token);
          this.tokenService.setUserSession(data.user);
          this.tokenService.setRoleSession(data.roles);
        }

        this.router.navigate(['/home']).then(() => {
          location.reload();
        });

      }
    }, error => {

      const messageRespone: MessageRespone = error;

      if (messageRespone.message) {
        this.toastr.error('Không tìm thấy người dùng');
        this.router.navigateByUrl('/login');
      } else {
        this.toastr.error('Đăng nhập thất bại');
        this.router.navigateByUrl('/login');
        console.log('Đăng nhập thất bại');
      }
    })
  }

  /**
   * Created by: DucDH
   * Date: 16/12/2022
   * Function: To login using google oauth2
   */

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;

      const googleToken = new Googletoken(this.socialUser.idToken);

      this.authService.googleLogin(googleToken).subscribe(req => {

        if (req.token == null) {
          const emailToRegister = req.email;

          this.router.navigateByUrl('/registerWithGoogle/' + emailToRegister);

        } else {

          this.tokenService.setAccountLocal(req.account);
          this.tokenService.setTokenLocal(req.token);
          this.tokenService.setUserLocal(req.user);
          this.tokenService.setRoleLocal(req.roles);

          this.router.navigate(['/home']).then(() => {
            location.reload();
          });

        }
      });
    });
  }

}
