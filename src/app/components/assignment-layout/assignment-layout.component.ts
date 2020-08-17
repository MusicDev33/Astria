import { Component, OnInit, Input } from '@angular/core';
import { ILayout } from '@models/layout.model';

@Component({
  selector: 'app-assignment-layout',
  templateUrl: './assignment-layout.component.html',
  styleUrls: ['./assignment-layout.component.scss']
})
export class AssignmentLayoutComponent implements OnInit {

  @Input()
  layout: ILayout;

  constructor() { }

  ngOnInit(): void {
  }

}
