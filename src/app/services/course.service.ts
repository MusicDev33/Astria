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
}
