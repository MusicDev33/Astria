import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { AnnouncementService } from '@services/announcement.service';
import { JwtService } from '@services/jwt.service';

import { IPerson } from '@models/person.model';
import { IAnnouncement } from '@models/announcement.model';
import { IResponse } from '@interfaces/response.interface';

@Component({
  selector: 'app-p-c-announcements',
  templateUrl: './p-c-announcements.component.html',
  styleUrls: ['./p-c-announcements.component.scss']
})
export class PCAnnouncementsComponent implements OnInit {

  announcements: IAnnouncement[] = [];

  constructor(
    private cookieService: CookieService,
    private jwtService: JwtService,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit(): void {
    const jwt = this.cookieService.get('jwt');
    console.log(jwt);
    const person: IPerson = this.jwtService.decodeJwt(jwt);

    this.announcementService.getStudentAnnouncements(person._id).subscribe((res: IResponse<IAnnouncement[]>) => {
      if (res.success) {
        this.announcements = res.payload;
      }
    });
  }

}
