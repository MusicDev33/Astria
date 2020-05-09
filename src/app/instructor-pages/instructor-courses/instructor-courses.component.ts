import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonService } from '@services/person.service';

import { ICourse } from '@interfaces/course.interface';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {

  schoolID: string;
  instructorID: string;

  sub: any;

  courses: ICourse[];

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
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

}
