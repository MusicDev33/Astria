import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { RegisterService } from '@services/register.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mode = 'login';

  nameField = 'Shelby McCowan';
  emailField = 'itsme@shelbymccowan.com';
  schoolIDField = 'usu';
  passwordField = 'password';
  confirmPassField = 'password';

  loginField = 'itsme@shelbymccowan.com';
  loginPassField = 'password';

  constructor(
    private registerService: RegisterService,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendRegister() {
    const newPerson = {
      name: this.nameField,
      email: this.emailField,
      schoolID: this.schoolIDField,
      password: this.passwordField,
      personType: 'student',
      profileURL: '',
      enrolledCourses: [],
      taughtCourses: [],
      bio: ''
    };

    this.registerService.sendRegistration(newPerson).subscribe((res: any) => {
      console.log(res);
    });
  }

  sendLogin() {
    console.log('test');
    this.authService.sendLogin(this.loginField, this.loginPassField).subscribe((res: any) => {
      if (res.success) {
        this.cookieService.set('jwt', res.jwt);
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
