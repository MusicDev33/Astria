import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-st-ctx-assignments',
  templateUrl: './st-ctx-assignments.component.html',
  styleUrls: ['./st-ctx-assignments.component.scss']
})
export class StCtxAssignmentsComponent implements OnInit {

  @Input()
  percentCompleted = 0;

  constructor() { }

  ngOnInit(): void {
  }
}
