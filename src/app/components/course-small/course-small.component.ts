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

  constructor() { }

  ngOnInit(): void {
  }

}
