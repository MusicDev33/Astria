import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from '@models/course.model';
import { IPerson } from '@models/person.model';
import { IAnnouncement } from '@models/announcement.model';

import { IResponse } from '@interfaces/response.interface';

import { PersonService } from '@services/person.service';
import { JwtService } from '@services/jwt.service';
import { CookieService } from 'ngx-cookie-service';
import { AnnouncementService } from '@services/announcement.service';
import { SharedRouteService } from '@services/shared-route.service';

import { AnnouncementDialogComponent } from '@dialogs/announcement-dialog/announcement-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  smallView = false;

  selectedModule = 'calendar';
  enrolledCourses: ICourse[] = [];
  taughtClasses: ICourse[] = [];
  allAnnouncements: IAnnouncement[] = [];

  pgComponent = '';
  sub: any;

  constructor(
    private personService: PersonService,
    private jwtService: JwtService,
    private cookieService: CookieService,
    private announcementService: AnnouncementService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private sharedRoute: SharedRouteService
  ) { }

  ngOnInit(): void {
    const jwt = this.cookieService.get('jwt');
    const person: IPerson = this.jwtService.decodeJwt(jwt);

    this.sub = this.route.params.subscribe(params => {
      this.sharedRoute.emitParamChange(params['mode']);
      this.pgComponent = params['mode'];
    });

    this.personService.getEnrolledCourses(person._id).subscribe(
      (res: IResponse<ICourse[]>) => {
        if (res.success) {
          this.enrolledCourses = res.payload;
        }
      },

      (err: Error) => {
        throw Error('dashboard.component.ts: PersonService.getEnrolledCourses - 404 Error');
      }
    );

    this.personService.getInstructorCourses(person.schoolID, person.profileURL).subscribe(
      (res: any) => {
        if (res.success) {
          this.taughtClasses = res.courses;
        }
      },
      (err: Error) => {
        throw Error('dashboard.component.ts: PersonService.getInstructorCourses - 404 Error');
      }
    );

    this.announcementService.getStudentAnnouncements(person._id).subscribe((res: IResponse<IAnnouncement[]>) => {
      if (res.success) {
        this.allAnnouncements = res.payload;
      }
    });
  }

  openAnnouncementDialog(announcement: IAnnouncement) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = announcement;
    dialogConfig.width = '600px';
    dialogConfig.panelClass = 'mt-dialog';

    const position: DialogPosition = {top: '200px'};
    dialogConfig.position = position;
    this.dialog.open(AnnouncementDialogComponent, dialogConfig);
  }
}
