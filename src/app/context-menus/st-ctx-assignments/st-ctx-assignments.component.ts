import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-st-ctx-assignments',
  templateUrl: './st-ctx-assignments.component.html',
  styleUrls: ['./st-ctx-assignments.component.scss']
})
export class StCtxAssignmentsComponent implements OnInit {

  @Input()
  percentCompleted = 0;

  // We need this to get flagged questions
  @Input()
  questions: any[];

  @Output()
  emitIDClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  questionClicked(id: string) {
    this.emitIDClicked.emit(id);
  }
}
