import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders } from '@globals/network.headers';
import { ISchool } from '@interfaces/school.interface';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) {

  }

  createSchool(school: ISchool) {
    const headers = BaseHeaders;
    console.log(school);
    return this.http.post(environment.apiURL + 'schools/add', school, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getAllSchools() {
    const headers = BaseHeaders;
    return this.http.get(environment.apiURL + 'schools/', {headers, withCredentials: true})
      .pipe(map(res => res));
  }
}
