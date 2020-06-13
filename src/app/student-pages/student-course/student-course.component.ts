import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from '@models/course.model';
import { IResponse } from '@interfaces/response.interface';
import { CourseService } from '@services/course.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.scss']
})
export class StudentCourseComponent implements OnInit {

  sub: any;

  selectedNavIndex = 0;
  topNavOptions = ['Home', 'Announcements', 'Syllabus', 'Assignments'];

  course: ICourse;

  schoolID: string;
  instructorID: string;
  courseID: string;

  keyIsDown = false;

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

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.schoolID = params['schoolID'];
      this.instructorID = params['instructorID'];
      this.courseID = params['courseCode'];

      this.courseService.getOneCourseForStudent(this.schoolID, this.instructorID, this.courseID)
        .subscribe((res: IResponse<ICourse>) => {
          if (res.success) {
            this.course = res.payload;
            this.topNavOptions[0] = this.course.name;
          }
        });
    });
  }

}
