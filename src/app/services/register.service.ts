import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders } from '@globals/network.headers';
import { IPerson } from '@interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {

  }

  sendRegistration(person: IPerson) {
    const headers = BaseHeaders;

    return this.http.post(environment.apiURL + 'persons/register', person, {headers})
      .pipe(map(res => res));
  }
}
