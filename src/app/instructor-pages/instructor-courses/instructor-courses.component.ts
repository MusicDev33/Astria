import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { PersonService } from '@services/person.service';
import { JwtService } from '@services/jwt.service';
import { CourseService } from '@services/course.service';

import { ICourse } from '@models/course.model';
import { IPerson } from '@models/person.model';

import { icons } from '@globals/fa.icons';
import { colors } from '@globals/icon.colors';

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

  colorOffset = 0;
  icons = icons;
  colors = colors;
  selectedColor: any;
  selectedColorIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private jwtService: JwtService,
    private cookieService: CookieService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.createCourseMode = false;
    this.selectedIcon = this.icons[0];
    this.selectedColor = this.colors[0];
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
      introText: '',
      icon: this.selectedIcon,
      iconColor: this.selectedColor.main,
      iconBgColor: this.selectedColor.bg,
      image: '',
      instructors: [instructor.name],
      instructorIDs: [instructor.profileURL],
      courseCode: '',
      schoolID: instructor.schoolID,
      tags: [],
      syllabus: '',
      active: true
    };

    this.courseService.createCourse(course).subscribe((res: any) => {
      this.courseNameField = '';
      this.courseDescField = '';
      this.selectedIcon = this.icons[0];
      this.personService.getInstructorCourses(this.schoolID, this.instructorID).subscribe((courseRes: any) => {
        this.courses = courseRes.courses;
      });
    });
  }

  getCourseLink(courseID: string) {
    const person = this.jwtService.decodeCookieByName('jwt');
    let url = '/instructor/';

    if (person && person.personType === 'instructor') {
      url += `${person.schoolID}/${person.profileURL}/${courseID}`;
      return url;
    }

    return '/dashboard';
  }

  getColorOffset() {
    const end = this.colorOffset + 3;

    if (end >= this.colors.length - 1) {
      return this.colors.slice(this.colorOffset);
    }
    return this.colors.slice(this.colorOffset, end + 1);
  }

  setColor(index: number) {
    this.selectedColorIndex = index;
    this.selectedColor = this.colors[index];
  }
}
