import { Component, OnInit, HostListener } from '@angular/core';
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

  nameField = '';
  emailField = '';
  schoolIDField = '';
  passwordField = '';
  confirmPassField = '';

  loginField = '';
  loginPassField = '';

  constructor(
    private registerService: RegisterService,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.mode === 'login') {
      this.sendLogin();
    } else {
      this.sendRegister();
    }
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
    this.authService.sendLogin(this.loginField, this.loginPassField).subscribe((res: any) => {
      if (res.success) {
        this.cookieService.set('jwt', res.jwt);
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
