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

  constructor() { }

  ngOnInit(): void {

  }

}
