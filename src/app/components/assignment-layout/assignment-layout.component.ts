import { Component, OnInit, Input } from '@angular/core';
import { ILayout } from '@models/layout.model';

import { AssignmentService } from '@services/assignment.service';

import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-assignment-layout',
  templateUrl: './assignment-layout.component.html',
  styleUrls: ['./assignment-layout.component.scss']
})
export class AssignmentLayoutComponent implements OnInit {

  obsDictionary: Record<string, Subscription> = {};

  @Input()
  layout: ILayout;

  constructor() { }

  ngOnInit(): void {
    this.layout.objects.forEach((object: any) => {
      object['flagged'] = false;
    });
  }

  flagClicked(object: any) {
    object.flagged = !object.flagged;
  }

  autosaveTrigger(questionID: string) {
    const key = `${this.layout._id}:${questionID}`;
    this.obsDictionary[key] = timer(2000).subscribe(() => {
      console.log(`Timer ${key} is up!`);
    });
  }
}
