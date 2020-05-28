import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JwtService } from '@services/jwt.service';
import { CourseService } from '@services/course.service';
import { AnnouncementService } from '@services/announcement.service';

import { ICourse } from '@models/course.model';
import { IAnnouncement } from '@models/announcement.model';

import { shortMonths } from '@globals/time';

@Component({
  selector: 'app-instructor-course',
  templateUrl: './instructor-course.component.html',
  styleUrls: ['./instructor-course.component.scss']
})
export class InstructorCourseComponent implements OnInit {

  sub: any;

  schoolID: string;
  instructorID: string;
  courseCode: string;

  course: ICourse;
  compiledIntroText: string;

  selectedNavIndex = 0;

  topNavOptions = ['Home', 'Announcements', 'Syllabus', 'Assignments', 'Students'];

  keyIsDown = false;

  announcements: IAnnouncement[] = [];
  newAnnouncementHeading = '';
  newAnnouncementDetails = '';

  constructor(
    private jwtService: JwtService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private announcementService: AnnouncementService
  ) { }

  @HostListener('document:keydown.arrowright', ['$event'])
  onArrowRightHandler(event: KeyboardEvent) {
    if (this.keyIsDown) {
      return;
    }
    if (this.selectedNavIndex === this.topNavOptions.length - 1) {
      this.selectedNavIndex = 0;
    } else {
      this.selectedNavIndex += 1;
    }
    this.keyIsDown = true;
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  onArrowLeftHandler(event: KeyboardEvent) {
    if (this.keyIsDown) {
      return;
    }
    if (this.selectedNavIndex === 0) {
      this.selectedNavIndex = this.topNavOptions.length - 1;
    } else {
      this.selectedNavIndex -= 1;
    }
    this.keyIsDown = true;
  }

  @HostListener('document:keyup.arrowright', ['$event'])
  @HostListener('document:keyup.arrowleft', ['$event'])
  onKeyUp() {
    this.keyIsDown = false;
  }

  ngOnInit(): void {
    const person = this.jwtService.decodeCookieByName('jwt');

    if (person && person.personType === 'instructor') {
      this.sub = this.route.params.subscribe(params => {
         this.schoolID = params['schoolID'];
         this.instructorID = params['instructorID'];
         this.courseCode = params['courseCode'];

         this.courseService.getOneCourseForInstructor(this.schoolID, this.instructorID, this.courseCode)
          .subscribe((res: any) => {
            if (res.success) {
              this.course = res.course;
              this.topNavOptions[0] = this.course.name;
            }
          });
         this.getAnnouncements();
      });
    }
  }

  // Function is a little messy
  getInstructors(): string {
    const instructors = this.course.instructors;
    if (this.course.instructors.length === 1) {
      return `Taught by ${instructors[0]}`;
    } else if (instructors.length > 1) {
      let returnString = `Taught by ${instructors[0]}`;
      for (let i = 1; i < instructors.length; i++) {
        if (i === instructors.length - 1) {
          returnString += `, and ${instructors[i]}`;
          continue;
        }
        returnString += `, ${instructors[i]}`;
      }
      return returnString;
    }

    return 'This course seems to have no instructors. That shouldn\'t be possible. Darn.';
  }

  changeCourseIntroText(text: string) {
    this.course.introText = text;
  }

  saveCourseIntroText(text: string) {
    this.courseService.saveCourseParam(this.schoolID, this.instructorID, this.courseCode, 'introText', text)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  changeCourseSyllabus(text: string) {
    this.course.syllabus = text;
  }

  saveCourseSyllabus(text: string) {
    this.courseService.saveCourseParam(this.schoolID, this.instructorID, this.courseCode, 'syllabus', text)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  changeAnnouncementHeaderText(text: string) {
    this.newAnnouncementHeading = text;
  }

  changeAnnouncementDescText(text: string) {
    this.newAnnouncementDetails = text;
  }

  sendNewAnnouncement(data: string[]) {
    const user = this.jwtService.decodeCookieByName('jwt');
    const newAnnouncement: IAnnouncement = {
      header: data[0],
      description: data[1],
      author: user.name,
      authorID: user._id,
      courseID: this.courseCode,
      time: new Date()
    };

    this.announcementService.createCourseAnnouncement(newAnnouncement).subscribe((res: any) => {
      if (res.success) {
        this.announcements.unshift(res.announcement);
        this.newAnnouncementDetails = '';
        this.newAnnouncementHeading = '';
        return;
      }
      console.log(res);
    });
  }

  getAnnouncements() {
    this.announcementService.getCourseAnnouncements(this.courseCode).subscribe((res: any) => {
      if (res.success) {
        this.announcements = res.announcements;
      }
    });
  }

  getAnnouncementDate(passedDate: Date) {
    const date = new Date(passedDate);
    let dateString = 'On ';
    dateString += `${shortMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    // dateString += ` at ${date.get}`;
    return dateString;
  }
}
