import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILayout } from '@models/layout.model';
import { IAssignSubmission } from '@models/assign-submission.model';

import { AssignmentService } from '@services/assignment.service';
import { JwtService } from '@services/jwt.service';

import { IResponse } from '@interfaces/response.interface';

import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-assignment-layout',
  templateUrl: './assignment-layout.component.html',
  styleUrls: ['./assignment-layout.component.scss']
})
export class AssignmentLayoutComponent implements OnInit {

  obsDictionary: Map<string, Subscription> = new Map();

  @Input()
  layout: ILayout;

  @Input()
  submission: IAssignSubmission;

  @Output()
  emitAutosave = new EventEmitter<IAssignSubmission>();

  constructor(
    private assignmentService: AssignmentService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    if (!this.layout.hasOwnProperty('autosaved')) {
      this.layout.objects.forEach((object: any) => {
        object['flagged'] = false;
      });
    }
  }

  flagClicked(object: any) {
    object.flagged = !object.flagged;
  }

  // This is grossly inefficient
  autosaveTrigger(questionID: string) {
    const key = `${this.layout._id}:${questionID}`;
    if (this.obsDictionary.has(key)) {
      this.obsDictionary.get(key).unsubscribe();
    }
    this.obsDictionary.set(key, timer(2000).subscribe(() => {
      console.log(`Timer ${key} is up!`);
      const user = this.jwtService.getIDToken();
      const sub: IAssignSubmission = {
        autosaved: true,
        userID: user._id,
        timeSubmitted: new Date(),
        objects: this.layout.objects,
        assignmentID: this.layout.assignmentID
      };

      if (this.layout.hasOwnProperty('autosaved')) {
        sub['_id'] = this.layout._id;
      }

      const assignmentID = this.layout.assignmentID;
      console.log(sub);

      this.assignmentService.autosaveAssignmentSubmission(assignmentID, user._id, sub).subscribe((res: IResponse<IAssignSubmission>) => {
        console.log(res);
        if (res.success) {
          this.emitAutosave.emit(res.payload);
        }
      });
    }));
  }
}
