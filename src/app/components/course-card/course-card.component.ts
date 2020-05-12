import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ICourse } from '@interfaces/course.interface';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: ICourse;

  @Output() createCourseClicked = new EventEmitter<boolean>();

  iconHovered = false;

  constructor() { }

  ngOnInit(): void {
  }

  sendCreateCourseClicked() {
    this.createCourseClicked.emit(true);
  }

}
