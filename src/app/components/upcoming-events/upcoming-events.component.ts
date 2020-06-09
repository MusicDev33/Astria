import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from '@interfaces/event.interface';
import { IAnnouncement } from '@models/announcement.model';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

  @Input() announcements: IAnnouncement[];

  constructor() { }

  ngOnInit(): void {
  }

}
