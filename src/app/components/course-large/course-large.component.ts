import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from '@interfaces/course.interface';

@Component({
  selector: 'app-course-large',
  templateUrl: './course-large.component.html',
  styleUrls: ['./course-large.component.scss']
})
export class CourseLargeComponent implements OnInit {

  @Input() course: ICourse;
  titleHovered = false;
  instructorHovered = false;
  iconHovered = false;

  url: string;

  constructor() { }

  ngOnInit(): void {
    const course = this.course;
    this.url = `/student/${course.schoolID}/${course.instructorIDs[0]}/${course.courseCode}`;
  }

  onClick() {
    console.log('Clicked');
  }

  testClick() {
    console.log('tiny');
  }
}
