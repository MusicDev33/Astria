import { Component, OnInit, Input } from '@angular/core';

import { AssignmentType } from '@enums/assignment.enum';

@Component({
  selector: 'app-inst-ctx-assignments',
  templateUrl: './inst-ctx-assignments.component.html',
  styleUrls: ['./inst-ctx-assignments.component.scss']
})
export class InstCtxAssignmentsComponent implements OnInit {

  @Input()
  loading = false;

  @Input()
  assignNameField = '';

  @Input()
  assignDescField = '';

  graded = false;
  assignmentType = 'Assignment';

  assignmentTypes = [AssignmentType.ASSIGNMENT, AssignmentType.DISCUSSION, AssignmentType.QUIZ];

  constructor() { }

  ngOnInit(): void {
  }

  headerGenerator(): string {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (vowels.indexOf(this.assignmentType[0].toLowerCase()) !== -1) {
      return `Create an `;
    }

    return `Create a `;
  }

}
