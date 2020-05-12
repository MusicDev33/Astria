import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { PersonService } from '@services/person.service';
import { JwtService } from '@services/jwt.service';
import { CourseService } from '@services/course.service';

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
  selectedIcon = '';

  sub: any;

  courses: ICourse[] = [];

  createCourseMode: boolean;

  availableIcons = ['fas fa-graduation-cap', 'fas fa-chalkboard', 'fas fa-bone', 'fas fa-skull'];

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private jwtService: JwtService,
    private cookieService: CookieService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.createCourseMode = false;
    this.selectedIcon = this.availableIcons[0];
    this.sub = this.route.params.subscribe(params => {
       this.schoolID = params['schoolID'];
       this.instructorID = params['instructorID'];

       this.personService.getInstructorCourses(this.schoolID, this.instructorID).subscribe((res: any) => {
         if (res.success) {
           this.courses = res.courses;
         }
       });
    });

    this.personService.getInstructorCourses(this.schoolID, this.instructorID).subscribe((res: any) => {
      this.courses = res.courses;
      console.log(res);
    });
  }

  changeCourseMode(createCourseMode: boolean) {
    this.createCourseMode = createCourseMode;
  }

  cancelAddCourse() {
    this.createCourseMode = false;

    this.courseNameField = '';
    this.courseDescField = '';
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }

  sendNewCourse() {
    const instructor: IPerson = this.jwtService.decodeJwt(this.cookieService.get('jwt'));

    const course: ICourse = {
      name: this.courseNameField,
      description: this.courseDescField,
      icon: this.selectedIcon,
      iconColor: '#3472fe',
      iconBgColor: '#c4f8ff',
      image: '',
      instructors: [instructor.name],
      instructorIDs: [instructor.profileURL],
      courseCode: '',
      schoolID: instructor.schoolID,
      tags: []
    };

    this.courseService.createCourse(course).subscribe((res: any) => {
      console.log(res);
      this.courseNameField = '';
      this.courseDescField = '';
      this.selectedIcon = this.availableIcons[0];
      this.personService.getInstructorCourses(this.schoolID, this.instructorID).subscribe((courseRes: any) => {
        this.courses = courseRes.courses;
      });
    });
  }
}
