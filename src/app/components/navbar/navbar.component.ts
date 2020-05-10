import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { JwtService } from '@services/jwt.service';
import { AuthService } from '@services/auth.service';

import { IPerson } from '@interfaces/person.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: IPerson;
  adminAuth = false;

  allowedPersonTypes = ['instructor', 'as-admin'];

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.jwtService.decodeJwt(this.cookieService.get('jwt'));
    this.authService.authRequest(['as-admin', 'instructor']).subscribe((res: any) => {
      if (res.success) {
        this.adminAuth = true;
      }
    });
  }

  navigateToInstructorCourses(): string {
    const instructor = this.jwtService.decodeJwt(this.cookieService.get('jwt'));

    if (!this.allowedPersonTypes.includes(instructor.personType)) {
      return '';
    }
    return `instructor/${instructor.schoolID}/${instructor.profileURL}`;
  }

  logOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
