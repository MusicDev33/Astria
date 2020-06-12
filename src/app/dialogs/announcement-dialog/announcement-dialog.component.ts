import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { months } from '@globals/date';

import { IAnnouncement } from '@models/announcement.model';

@Component({
  selector: 'app-announcement-dialog',
  templateUrl: './announcement-dialog.component.html',
  styleUrls: ['./announcement-dialog.component.scss']
})
export class AnnouncementDialogComponent implements OnInit {

  @Input()
  timePosted = '';

  constructor(
    public dialogRef: MatDialogRef<AnnouncementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAnnouncement
  ) { }

  ngOnInit(): void {
    const date = new Date(this.data.time);
    this.timePosted = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  close() {
    this.dialogRef.close();
  }

}
