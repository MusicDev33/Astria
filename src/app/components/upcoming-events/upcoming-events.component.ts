import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from '@interfaces/event.interface';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

  @Input() events: IEvent[];

  constructor() { }

  ngOnInit(): void {
  }

}
