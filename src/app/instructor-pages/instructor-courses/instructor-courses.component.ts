import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { PersonService } from '@services/person.service';
import { JwtService } from '@services/jwt.service';
import { CourseService } from '@services/course.service';

import { ICourse } from '@models/course.model';
import { IPerson } from '@models/person.model';

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

  availableIcons = [
    'fas fa-graduation-cap', 'fas fa-chalkboard', 'fas fa-bone', 'fas fa-skull', 'fas fa-flask', 'fas fa-sitemap',
    'fas fa-dna', 'fas fa-paw', 'fas fa-network-wired', 'fas fa-database', 'fas fa-server', 'fas fa-tv',
    'fas fa-robot', 'fas fa-prescription-bottle', 'fas fa-prescription-bottle-alt', 'fas fa-pills',
    'fas fa-calculator', 'fas fa-superscript', 'fas fa-square-root-alt', 'fas fa-horse', 'fas fa-hat-cowboy-side',
    'fas fa-industry', 'far fa-smile-beam', 'fas fa-wallet', 'fas fa-dollar-sign', 'fas fa-comments-dollar',
    'fas fa-euro-sign', 'fas fa-pound-sign', 'fas fa-rupee-sign', 'fas fa-funnel-dollar', 'fas fa-brain',
    'fas fa-user-tie', 'fas fa-chart-bar', 'fas fa-table', 'fas fa-briefcase', 'fas fa-seedling', 'fas fa-leaf',
    'fas fa-tree', 'far fa-handshake', 'fas fa-wind', 'fas fa-globe', 'fas fa-globe-europe', 'fas fa-globe-americas',
    'fas fa-globe-asia', 'fas fa-globe-africa', 'fas fa-water', 'fas fa-music', 'fas fa-headphones', 'fas fa-drum',
    'fas fa-guitar', 'fas fa-palette', 'fas fa-paint-brush', 'fas fa-brush', 'fas fa-book', 'fas fa-book-open',
    'fas fa-bookmark', 'fas fa-atlas', 'fas fa-vote-yea', 'fas fa-comment-dots', 'fas fa-utensils',
    'fas fa-comments', 'fas fa-atom', 'fas fa-biohazard', 'fas fa-bezier-curve'
  ];

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
      introText: '',
      icon: this.selectedIcon,
      iconColor: '#3472fe',
      iconBgColor: '#c4f8ff',
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
      console.log(res);
      this.courseNameField = '';
      this.courseDescField = '';
      this.selectedIcon = this.availableIcons[0];
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
}
