import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AssignmentType } from '@enums/assignment.enum';
import { ITime, getJsHour } from '@interfaces/time.interface';
import { IAssignment } from '@models/assignment.model';

import { MONTHS_SHORT, getMeridiemTime } from '@globals/date';

@Component({
  selector: 'app-inst-ctx-assignments',
  templateUrl: './inst-ctx-assignments.component.html',
  styleUrls: ['./inst-ctx-assignments.component.scss']
})
export class InstCtxAssignmentsComponent implements OnInit {

  @Output()
  emitAssignment = new EventEmitter<IAssignment>();

  @Input()
  loading = false;

  dateMode = 'open';

  points = '';

  assignmentTypes = [AssignmentType.ASSIGNMENT, AssignmentType.DISCUSSION, AssignmentType.QUIZ];

  openDate: Date;
  dueDate: Date;
  closeDate: Date;

  openTime: ITime = {hour: 11, minute: 57, meridiem: 'PM'};
  dueTime: ITime = {hour: 11, minute: 56, meridiem: 'PM'};
  closeTime: ITime = {hour: 11, minute: 55, meridiem: 'PM'};

  sameAsDue = false;

  assignment: IAssignment;

  constructor() { }

  ngOnInit(): void {
    this.assignment = {
      name: '',
      description: '',
      openDate: new Date(),
      dueDate: new Date(),
      closeDate: new Date(),
      type: AssignmentType.ASSIGNMENT,
      allowedFileExtensions: [],
      points: 10,
      studentScore: 0,
      courseID: '',
      graded: false,
      layoutID: ''
    };
  }

  headerGenerator(): string {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (this.assignment.graded) {
      if (vowels.indexOf(this.assignment.type[0].toLowerCase()) !== -1) {
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

  limitNumberField(event: KeyboardEvent): boolean {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      return true;
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      return true;
    }

    const numbers = '1234567890';

    if (!numbers.includes(event.key)) {
      event.preventDefault();
      return true;
    }

    return true;
  }

  sendAssignment() {
    let assignPoints = 0;
    if (this.points !== '') {
      assignPoints = parseInt(this.points, 10);
    }

    let closeDate = this.closeDate;

    if (this.sameAsDue) {
      closeDate = this.dueDate;
    }

    this.emitAssignment.emit(this.assignment);
  }

  // TODO: Make this not shitty
  assignmentReady(): boolean {
    return true;
  }
}
