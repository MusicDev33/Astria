import { Component, OnInit, Input } from '@angular/core';

import { ICourse } from '@models/course.model';

@Component({
  selector: 'app-p-c-courses',
  templateUrl: './p-c-courses.component.html',
  styleUrls: ['./p-c-courses.component.scss']
})
export class PCCoursesComponent implements OnInit {

  @Input()
  courses: ICourse[];

  @Input()
  taughtCourses: ICourse[];

  smallView = false;

  constructor() { }

  ngOnInit(): void {
  }

}
