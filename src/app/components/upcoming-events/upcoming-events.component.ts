import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAnnouncement } from '@models/announcement.model';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

  @Input() announcements: IAnnouncement[];

  @Output() outAnnouncementClicked = new EventEmitter<IAnnouncement>();

  constructor() { }

  ngOnInit(): void {
  }

  onAnnouncementClicked(announcement: IAnnouncement) {
    this.outAnnouncementClicked.emit(announcement);
  }

}
