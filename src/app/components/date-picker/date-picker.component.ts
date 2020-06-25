import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Input()
  month: number = new Date().getMonth() + 1;

  @Input()
  year: number = new Date().getFullYear();

  currentDate = new Date();

  // These are the numbers for the current date.
  currentDay: number;
  currentMonth: number;
  currentYear: number;

  currentWeeks: number[][] = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() { }

  ngOnInit(): void {
    this.currentDay = this.currentDate.getDate();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.currentYear = this.currentDate.getFullYear();

    this.constructMonth(this.month, this.year);
  }

  returnToCurrentMonth() {
    this.month = this.currentMonth;
    this.year = this.currentYear;

    this.constructMonth(this.month, this.year);
  }

  daysInMonth(month: number, year: number): number {
    // January is 1
    return new Date(year, month, 0).getDate();
  }

  constructMonth(month: number, year: number) {
    this.currentWeeks = [];
    const numDays = this.daysInMonth(month, year);
    const date = new Date(year, month - 1, 1);
    let currentWeek = [];
    for (let j = 0; j < date.getDay(); j++) {
      currentWeek.push(0);
    }
    for (let i = 0; i < numDays; i++) {
      if (currentWeek.length === 7) {
        this.currentWeeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(i + 1);
    }

    for (let j = currentWeek.length; j < 7; j++) {
      currentWeek.push(0);
    }
    this.currentWeeks.push(currentWeek);
  }

  leftArrowClicked() {
    this.month -= 1;
    if (this.month === 0) {
      this.month = 12;
      this.year -= 1;
    }

    this.constructMonth(this.month, this.year);
  }

  rightArrowClicked() {
    this.month += 1;
    if (this.month === 13) {
      this.month = 1;
      this.year += 1;
    }

    this.constructMonth(this.month, this.year);
  }

  doubleLeftArrowClicked() {
    this.month -= 6;
    if (this.month <= 0) {
      this.month += 12;
      this.year -= 1;
    }

    this.constructMonth(this.month, this.year);
  }

  doubleRightArrowClicked() {
    this.month += 6;
    if (this.month >= 13) {
      this.month -= 12;
      this.year += 1;
    }

    this.constructMonth(this.month, this.year);
  }
}
