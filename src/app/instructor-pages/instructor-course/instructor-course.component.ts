import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JwtService } from '@services/jwt.service';
import { CourseService } from '@services/course.service';

import { ICourse } from '@interfaces/course.interface';

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
}
