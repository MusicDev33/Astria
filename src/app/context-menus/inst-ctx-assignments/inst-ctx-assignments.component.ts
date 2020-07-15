import { Component, OnInit, Input } from '@angular/core';

import { AssignmentType } from '@enums/assignment.enum';
import { ITime, getJsHour } from '@interfaces/time.interface';

import { MONTHS_SHORT, getMeridiemTime } from '@globals/date';

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

  dateMode = 'open';

  graded = false;
  assignmentType = 'Assignment';
  points = '';

  assignmentTypes = [AssignmentType.ASSIGNMENT, AssignmentType.DISCUSSION, AssignmentType.QUIZ];

  openDate: Date;
  dueDate: Date;
  closeDate: Date;

  openTime: ITime = {hour: 11, minute: 57, meridiem: 'PM'};
  dueTime: ITime = {hour: 11, minute: 56, meridiem: 'PM'};
  closeTime: ITime = {hour: 11, minute: 55, meridiem: 'PM'};

  sameAsDue = false;

  constructor() { }

  ngOnInit(): void {
  }

  headerGenerator(): string {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (this.graded) {
      if (vowels.indexOf(this.assignmentType[0].toLowerCase()) !== -1) {
        return `Create an `;
      }

      return `Create a `;
    }

    return `Create an ungraded `;
  }

  // There are five million better ways to do this and I'm an idiot for allowing this to happen.
  // #deadlines, yo.
  getSelectedDate(day: number, month: number, year: number, mode: string): boolean {
    if (mode === 'open' && this.openDate) {
      if (this.openDate.getDate() === day && this.openDate.getMonth() + 1 === month && this.openDate.getFullYear() === year) {
        return true;
      }
    } else if (mode === 'due' && this.dueDate) {
      if (this.dueDate.getDate() === day && this.dueDate.getMonth() + 1 === month && this.dueDate.getFullYear() === year) {
        return true;
      }
    } else if (mode === 'close' && this.closeDate) {
      if (this.closeDate.getDate() === day && this.closeDate.getMonth() + 1 === month && this.closeDate.getFullYear() === year) {
        return true;
      }
    }

    return false;
  }

  selectDate(day: number, month: number, year: number) {
    if (this.dateMode === 'open') {
      this.openDate = new Date(year, month, day, getJsHour(this.openTime), this.openTime.minute, 0, 0);
    } else if (this.dateMode === 'due') {
      this.dueDate = new Date(year, month, day, getJsHour(this.dueTime), this.dueTime.minute, 0, 0);
    } else if (this.dateMode === 'close') {
      this.closeDate = new Date(year, month, day, getJsHour(this.closeTime), this.closeTime.minute, 0, 0);
    }
  }

  // My naming is awful...
  dateSelected(newDate: number[]) {
    this.selectDate(newDate[0], newDate[1], newDate[2]);
  }

  getDateString(date: Date): string {
    return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${getMeridiemTime(date)}`;
  }

  getModeTime(): ITime {
    if (this.dateMode === 'open') {
      return this.openTime;
    } else if (this.dateMode === 'due') {
      return this.dueTime;
    } else {
      return this.closeTime;
    }
  }

  changeTime(time: ITime) {
    if (this.dateMode === 'open') {
      this.openTime = time;
      if (this.openDate) {
        this.openDate.setHours(getJsHour(this.openTime), this.openTime.minute);
      }
    } else if (this.dateMode === 'due') {
      this.dueTime = time;
      if (this.dueDate) {
        this.openDate.setHours(getJsHour(this.dueTime), this.dueTime.minute);
      }
    } else {
      this.closeTime = time;
      if (this.closeDate) {
        this.openDate.setHours(getJsHour(this.closeTime), this.closeTime.minute);
      }
    }
  }
}
