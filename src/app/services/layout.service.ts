import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BaseHeaders, BaseHeaderFunc } from '@globals/network.headers';
import { ILayout } from '@models/layout.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAssignmentLayout(assignmentID: string) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}assignments/${assignmentID}/layout`;

    return this.http.get(url, authObject).pipe(map(res => res));
  }

  createAssignmentLayout(layout: ILayout, assignmentID: string) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}assignments/${assignmentID}/new/layout`;

    return this.http.post(url, layout, authObject).pipe(map(res => res));
  }

  autosaveAssignmentLayout(layout: ILayout, assignmentID: string) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}assignments/${assignmentID}/autosave/layout`;

    return this.http.post(url, layout, authObject).pipe(map(res => res));
  }

  finalSaveAssignmentLayout(layout: ILayout, assignmentID: string) {
    const authObject = {headers: BaseHeaderFunc(this.cookie.get('jwt')), withCredentials: true};
    const url = `${environment.apiURL}assignments/${assignmentID}/finalsave/layout`;

    return this.http.post(url, layout, authObject).pipe(map(res => res));
  }
}
