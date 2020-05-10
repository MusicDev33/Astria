import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { PersonService } from '@services/person.service';
import { JwtService } from '@services/jwt.service';

import { ICourse } from '@interfaces/course.interface';
import { IPerson } from '@interfaces/person.interface';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {

  schoolID: string;
  instructorID: string;

  courseNameField = '';
  courseDescField = '';

  sub: any;

  courses: ICourse[];

  createCourseMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private jwtService: JwtService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.createCourseMode = true;
    this.sub = this.route.params.subscribe(params => {
       this.schoolID = params['schoolID'];
       this.instructorID = params['instructorID'];

       this.personService.getInstructorCourses(this.schoolID, this.instructorID).subscribe((res: any) => {
         if (res.success) {
           this.courses = res.courses;
         }
       });
    });
  }

  changeCourseMode() {
    console.log('test');
  }

  sendNewCourse() {
    const instructor: IPerson = this.jwtService.decodeJwt(this.cookieService.get('jwt'));

    const course: ICourse = {
      name: this.courseNameField,
      description: this.courseDescField,
      _id: '',
      icon: 'fas fa-graduation-cap',
      iconColor: '#3472fe',
      iconBgColor: '#c4f8ff',
      image: '',
      instructors: [instructor.name],
      instructorIDs: [instructor.profileURL],
      courseCode: '',
      schoolID: instructor.schoolID,
      tags: []
    };

    console.log(course);
  }
}
