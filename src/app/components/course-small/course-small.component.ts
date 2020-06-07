import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from '@interfaces/course.interface';

@Component({
  selector: 'app-course-small',
  templateUrl: './course-small.component.html',
  styleUrls: ['./course-small.component.scss']
})
export class CourseSmallComponent implements OnInit {

  @Input() course: ICourse;

  nameHovered = false;
  instructorHovered = false;
  iconHovered = false;
  cardHovered = false;
  addButtonHovered = false;

  url: string;

  constructor() { }

  ngOnInit(): void {
    const course = this.course;
    this.url = `/student/${course.schoolID}/${course.instructorIDs[0]}/${course.courseCode}`;
  }

}
