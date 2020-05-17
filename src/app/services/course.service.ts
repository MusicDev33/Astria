import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders } from '@globals/network.headers';
import { ICourse } from '@interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {

  }

  createCourse(course: ICourse) {
    const headers = BaseHeaders;
    console.log(course);
    return this.http.post(environment.apiURL + 'courses/add', course, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  getOneCourseForInstructor(schoolID: string, instructorID: string, courseCode: string) {
    const headers = BaseHeaders;
    const url = `${environment.apiURL}courses/course/${schoolID}/${instructorID}/${courseCode}`;
    return this.http.get(url, {headers, withCredentials: true})
      .pipe(map(res => res));
  }

  saveCourseParam(schoolID: string, instructorID: string, courseCode: string, param: string, paramValue: any) {
    const headers = BaseHeaders;
    const url = `${environment.apiURL}courses/course/${schoolID}/${instructorID}/${courseCode}/${param}`;
    return this.http.post(url, {paramValue}, {headers, withCredentials: true})
      .pipe(map(res => res));
  }
}
