import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jwtHelper = new JwtHelperService();

  constructor(private cookieService: CookieService) { }

  getAuthLevel(): string {
    const jwt = this.cookieService.get('jwt');
    return this.jwtHelper.decodeToken(jwt);
  }
}
