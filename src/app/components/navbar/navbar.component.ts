import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { JwtService } from '@services/jwt.service';

import { IPerson } from '@interfaces/person.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: IPerson;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.user = this.jwtService.decodeJwt(this.cookieService.get('jwt'));
  }

  logOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

}
