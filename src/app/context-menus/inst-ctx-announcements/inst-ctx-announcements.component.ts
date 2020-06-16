import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inst-ctx-announcements',
  templateUrl: './inst-ctx-announcements.component.html',
  styleUrls: ['./inst-ctx-announcements.component.scss']
})
export class InstCtxAnnouncementsComponent implements OnInit {

  @Input()
  loading = false;

  @Input()
  headerField = '';

  @Input()
  descField = '';

  @Output()
  headerFieldChange = new EventEmitter<string>();

  @Output()
  descFieldChange = new EventEmitter<string>();

  @Output()
  sendNewAnnouncement = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onHeaderFieldChange(text: string) {
    this.headerFieldChange.emit(text);
  }

  onDescFieldChange(text: string) {
    this.descFieldChange.emit(text);
  }

  sendAnnouncementPressed() {
    this.sendNewAnnouncement.emit([this.headerField, this.descField]);
  }
}
