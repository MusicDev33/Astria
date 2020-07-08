import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders, BaseHeaderFunc } from '@globals/network.headers';
import { ICourse } from '@interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private cookie: CookieService) {

  }

  createCourse(course: ICourse) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    console.log(course);
    return this.http.post(environment.apiURL + 'courses/add', course, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getOneCourseForInstructor(schoolID: string, instructorID: string, courseCode: string) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    const url = `${environment.apiURL}courses/course/${schoolID}/${instructorID}/${courseCode}`;
    return this.http.get(url, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getOneCourseForStudent(schoolID: string, instructorID: string, courseCode: string) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    const url = `${environment.apiURL}courses/course/${schoolID}/${instructorID}/${courseCode}`;
    return this.http.get(url, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  saveCourseParam(schoolID: string, instructorID: string, courseCode: string, param: string, paramValue: any) {
    const headers = BaseHeaderFunc(this.cookie.get('jwt'));
    const url = `${environment.apiURL}courses/course/${schoolID}/${instructorID}/${courseCode}/${param}`;
    return this.http.post(url, {paramValue}, {headers, withCredentials: true})
      .pipe(map(res => res));
  }
}
