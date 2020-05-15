import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JwtService } from '@services/jwt.service';
import { CourseService } from '@services/course.service';

import { ICourse } from '@models/course.model';

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

  selectedNavOption = 'Home';

  constructor(
    private jwtService: JwtService,
    private courseService: CourseService,
    private route: ActivatedRoute,
  ) { }

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
            }
          });
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
    } else {
      return 'This course seems to have no instructors. That shouldn\'t be possible. Darn.';
    }
  }
}
