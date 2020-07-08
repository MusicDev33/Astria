import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { CookieService } from 'ngx-cookie-service';
import { BaseHeaders, BaseHeaderFunc } from '@globals/network.headers';
import { ISchool } from '@interfaces/school.interface';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient, private cookie: CookieService) {

  }

  createSchool(school: ISchool) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    console.log(school);
    return this.http.post(environment.apiURL + 'schools/add', school, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getAllSchools() {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    return this.http.get(environment.apiURL + 'schools/', {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getSchoolInstructors(schoolID: string) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    return this.http.get(environment.apiURL + 'schools/' + schoolID + '/instructors', {headers, withCredentials: true})
      .pipe(map(res => res));
  }
}
