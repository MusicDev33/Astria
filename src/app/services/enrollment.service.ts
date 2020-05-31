import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders } from '@globals/network.headers';
import { IEnrollment } from '@models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) {

  }

  getCourseEnrollments(courseID: string) {
    const authObject = {headers: BaseHeaders, withCredentials: true};
    const url = `${environment.apiURL}enrollments/courseID/${courseID}`;

    return this.http.get(url, authObject).pipe(map(res => res));
  }

  createCourseEnrollment(enrollment: IEnrollment) {
    const authObject = {headers: BaseHeaders, withCredentials: true};
    const url = `${environment.apiURL}enrollments/create`;

    return this.http.post(url, enrollment, authObject).pipe(map(res => res));
  }
}
