import { Component, OnInit } from '@angular/core';

import { ICourse } from '@models/course.model';
import { IPerson } from '@models/person.model';
import { IAnnouncement } from '@models/announcement.model';

import { IResponse } from '@interfaces/response.interface';

import { AuthService } from '@services/auth.service';
import { PersonService } from '@services/person.service';
import { JwtService } from '@services/jwt.service';
import { CookieService } from 'ngx-cookie-service';
import { AnnouncementService } from '@services/announcement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  smallView = false;

  selectedModule = 'calendar';
  enrolledCourses: ICourse[] = [];
  allAnnouncements: IAnnouncement[] = [];

  constructor(
    private authService: AuthService,
    private personService: PersonService,
    private jwtService: JwtService,
    private cookieService: CookieService,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit(): void {
    const jwt = this.cookieService.get('jwt');
    console.log(jwt);
    const person: IPerson = this.jwtService.decodeJwt(jwt);

    this.personService.getEnrolledCourses(person._id).subscribe((res: IResponse<ICourse[]>) => {
      if (res.success) {
        this.enrolledCourses = res.payload;
      }
    });

    this.announcementService.getStudentAnnouncements(person._id).subscribe((res: IResponse<IAnnouncement[]>) => {
      if (res.success) {
        this.allAnnouncements = res.payload;
        console.log(res);
      }
    });
  }

}
