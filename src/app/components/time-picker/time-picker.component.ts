import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  @Input()
  hour = 11;

  @Input()
  minute = 59;

  @Input()
  morning = true;

  constructor() { }

  ngOnInit(): void {
  }

  incrementHour() {
    let tempHour = this.hour;
    tempHour += 1;

    if (tempHour === 12) {
      this.morning = !this.morning;
    }

    if (tempHour >= 13) {
      tempHour -= 12;
    }

    this.hour = tempHour;
  }

  decrementHour() {
    let tempHour = this.hour;
    tempHour -= 1;

    if (tempHour === 11) {
      this.morning = !this.morning;
    }

    if (tempHour <= 0) {
      tempHour += 12;
    }

    this.hour = tempHour;
  }

  getMeridiem() {
    if (this.morning) {
      return 'AM';
    }

    return 'PM';
  }

  getHourString() {
    let hourString = this.hour.toString();
    if (hourString.length === 1) {
      hourString = '0' + hourString;
    }

    return hourString;
  }

  getMinuteString() {
    return this.minute.toString();
  }

}
