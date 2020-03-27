import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() month: number = new Date().getMonth() + 2;
  @Input() year: number = new Date().getFullYear();

  currentWeeks = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() { }

  ngOnInit(): void {
    this.constructMonth(this.month, this.year);
  }

  daysInMonth(month: number, year: number): number {
    // January is 1
    return new Date(year, month, 0).getDate();
  }

  constructMonth(month: number, year: number) {
    const numDays = this.daysInMonth(month, year);
    const date = new Date(year, month - 1, 1);
    console.log(date.getDay());
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

}
