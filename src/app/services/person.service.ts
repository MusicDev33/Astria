import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders } from '@globals/network.headers';
import { IPerson } from '@interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {

  }

  createInstructor(person: IPerson) {
    const headers = BaseHeaders;
    return this.http.post(environment.apiURL + 'persons/add', person, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getSchoolInstructors(schoolID: string) {
    const headers = BaseHeaders;
    return this.http.get(environment.apiURL + 'person/schoolID/' + schoolID, {headers, withCredentials: true})
      .pipe(map(res => res));
  }
}
