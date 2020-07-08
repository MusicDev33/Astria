import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders, BaseHeaderFunc } from '@globals/network.headers';
import { IAnnouncement } from '@models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient, private cookie: CookieService) {

  }

  getCourseAnnouncements(courseID: string) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}announcements/param/courseID/${courseID}`;

    return this.http.get(url, authObject).pipe(map(res => res));
  }

  createCourseAnnouncement(announcement: IAnnouncement) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}announcements/create`;

    return this.http.post(url, announcement, authObject).pipe(map(res => res));
  }

  getStudentAnnouncements(studentID: string) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}announcements/student/${studentID}`;

    return this.http.get(url, authObject).pipe(map(res => res));
  }
}
