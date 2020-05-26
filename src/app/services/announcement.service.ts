import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders } from '@globals/network.headers';
import { IAnnouncement } from '@models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) {

  }

  getCourseAnnouncements(courseID: string) {
    const authObject = {headers: BaseHeaders, withCredentials: true};
    const url = `${environment.apiURL}/announcements/param/courseID/${courseID}`;

    return this.http.get(url, authObject).pipe(map(res => res));
  }

  createCourseAnnouncement(announcement: IAnnouncement) {
    const authObject = {headers: BaseHeaders, withCredentials: true};
    const url = `${environment.apiURL}/announcements/create`;

    return this.http.post(url, announcement, authObject).pipe(map(res => res));
  }
}
