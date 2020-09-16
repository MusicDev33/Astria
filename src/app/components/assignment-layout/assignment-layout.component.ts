import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    private assignmentService: AssignmentService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.layout.objects.forEach((object: any) => {
      object['flagged'] = false;
    });
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
      this.assignmentService.autosaveAssignmentSubmission(this.layout.assignmentID, user._id, sub).subscribe((res: IResponse<ILayout>) => {
        console.log(res);
      });
    }));
  }
}
