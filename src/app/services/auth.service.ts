import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders, BaseHeaderFunc } from '@globals/network.headers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookie: CookieService) {

  }

  sendLogin(login: string, password: string) {
    const headers = BaseHeaders;

    return this.http.post(environment.apiURL + 'persons/auth', {email: login, password}, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  authRequest(scopes: string[]) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    const body = {scopes};
    return this.http.post(environment.apiURL + 'persons/auth/request', body, {headers, withCredentials: true})
      .pipe(map(res => res));
  }
}
