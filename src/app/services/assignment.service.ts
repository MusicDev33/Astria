import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders, BaseHeaderFunc } from '@globals/network.headers';
import { IAssignment } from '@models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  createCourseAssignment(assignment: IAssignment) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}assignments/${assignment.courseID}/new`;

    return this.http.post(url, assignment, authObject).pipe(map(res => res));
  }

  setAssignmentLayout(assignmentID: string, layout: any) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}assignments/${assignmentID}/new/layout`;

    return this.http.post(url, layout, authObject).pipe(map(res => res));
  }

  getAssignmentsForCourse(courseID: string) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}courses/course/${courseID}/assignments`;

    return this.http.get(url, authObject).pipe(map(res => res));
  }
}
