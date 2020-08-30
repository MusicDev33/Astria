import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders } from '@globals/network.headers';

import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { IIdentification } from '@interfaces/identification.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private jwtHelper = new JwtHelperService();

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) { }

  getAuthLevel(): string {
    const jwt = this.cookieService.get('jwt');
    return this.jwtHelper.decodeToken(jwt);
  }

  authRequest() {
    const headers = BaseHeaders;

    return this.http.get(environment.apiURL + 'persons/auth/request', {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  decodeJwt(jwt: string) {
    return this.jwtHelper.decodeToken(jwt);
  }

  decodeCookieByName(name: string): any {
    return this.jwtHelper.decodeToken(this.cookieService.get(name));
  }

  getIDToken(): IIdentification {
    return this.jwtHelper.decodeToken(this.cookieService.get('jwt'));
  }

  tokenExpired() {
    return this.jwtHelper.isTokenExpired(this.cookieService.get('jwt'));
  }
}
