import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { BaseHeaders, BaseHeaderFunc } from '@globals/network.headers';
import { IPerson } from '@interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, private cookie: CookieService) {

  }

  createInstructor(person: IPerson) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    return this.http.post(environment.apiURL + 'persons/add', person, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  // WTF is this for?
  getSchoolInstructors(schoolID: string) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    return this.http.get(environment.apiURL + 'persons/schoolID/' + schoolID, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getInstructorCourses(schoolID: string, instructorID: string) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    return this.http.get(environment.apiURL + `persons/${schoolID}/${instructorID}/courses`, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getEnrolledCourses(studentID: string) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    return this.http.get(environment.apiURL + `enrollments/courses/${studentID}`, {headers, withCredentials: true})
      .pipe(map(res => res));
  }
}
