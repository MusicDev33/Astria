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

  // WTF is this for?
  getSchoolInstructors(schoolID: string) {
    const headers = BaseHeaders;
    return this.http.get(environment.apiURL + 'persons/schoolID/' + schoolID, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getInstructorCourses(schoolID: string, instructorID: string) {
    const headers = BaseHeaders;
    return this.http.get(environment.apiURL + `persons/${schoolID}/${instructorID}/courses`, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getEnrolledCourses(studentID: string) {
    const headers = BaseHeaders;
    return this.http.get(environment.apiURL + `enrollments/studentID${studentID}`, {headers, withCredentials: true})
      .pipe(map(res => res));
  }
}
