import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders } from '@globals/network.headers';
import { IPerson } from '@interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  sendLogin(login: string, password: string) {
    const headers = BaseHeaders;

    return this.http.post(environment.apiURL + 'persons/auth', {email: login, password}, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  authRequest(scope: string) {
    const headers = BaseHeaders;

    return this.http.get(environment.apiURL + 'persons/auth/request/' + scope, {headers, withCredentials: true})
      .pipe(map(res => res));
  }
}
