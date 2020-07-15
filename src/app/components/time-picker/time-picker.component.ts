import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { ITime } from '@interfaces/time.interface';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit, OnChanges {

  @Input()
  hour = 11;

  @Input()
  minute = 59;

  @Input()
  morning = true;

  @Output()
  sendTime = new EventEmitter<ITime>();

  hourString: string;
  minuteString: string;
  meridiemString: string;

  constructor() { }

  ngOnInit(): void {
    this.hourString = this.getHourString();
    this.minuteString = this.getMinuteString();
    this.meridiemString = this.getMeridiem();
  }

  ngOnChanges(): void {
    this.hourString = this.getHourString();
    this.minuteString = this.getMinuteString();
    this.meridiemString = this.getMeridiem();
  }

  incrementHour() {
    let tempHour = this.hour;
    tempHour += 1;

    if (tempHour === 12) {
      this.changeMeridiem();
    }

    if (tempHour >= 13) {
      tempHour -= 12;
    }

    this.hour = tempHour;
    this.hourString = this.getHourString();
    this.timeChanged();
  }

  decrementHour() {
    let tempHour = this.hour;
    tempHour -= 1;

    if (tempHour === 11) {
      this.changeMeridiem();
    }

    if (tempHour <= 0) {
      tempHour += 12;
    }

    this.hour = tempHour;
    this.hourString = this.getHourString();
    this.timeChanged();
  }

  incrementMinute() {
    let tempMin = this.minute;
    tempMin += 1;

    if (tempMin >= 60) {
      tempMin -= 60;
      this.incrementHour();
    }

    this.minute = tempMin;
    this.minuteString = this.getMinuteString();
    this.timeChanged();
  }

  decrementMinute() {
    let tempMin = this.minute;
    tempMin -= 1;

    if (tempMin <= 0) {
      tempMin += 59;
      this.decrementHour();
    }

    this.minute = tempMin;
    this.minuteString = this.getMinuteString();
    this.timeChanged();
  }

  getMeridiem() {
    if (this.morning) {
      return 'AM';
    }

    return 'PM';
  }

  changeMeridiem() {
    this.morning = !this.morning;

    this.meridiemString = this.getMeridiem();
    this.timeChanged();
  }

  getHourString() {
    let hourString = this.hour.toString();
    if (hourString.length === 1) {
      hourString = '0' + hourString;
    }

    return hourString;
  }

  getMinuteString() {
    let minuteString = this.minute.toString();
    if (minuteString.length === 1) {
      minuteString = '0' + minuteString;
    }

    return minuteString;
  }

  limitNumberField(event: KeyboardEvent): boolean {
    this.timeChanged();
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

    return false;
  }

  limitHourField(event: KeyboardEvent) {
    this.timeChanged();
    if (this.limitNumberField(event)) {
      return;
    }
    if (this.hourString.length >= 2) {
      event.preventDefault();
    }
  }

  limitMinuteField(event: KeyboardEvent) {
    this.timeChanged();
    if (this.limitNumberField(event)) {
      return;
    }
    if (this.minuteString.length >= 2) {
      event.preventDefault();
    }
  }

  hourFocusOut() {
    console.log('focusout');
    if (this.hourString === '0' || this.hourString === '00' || this.hourString.length === 0) {
      this.hour = 1;
      this.hourString = '01';
      this.timeChanged();
      return;
    }

    if (this.hourString.length === 1) {
      this.hour = parseInt(this.hourString, 10);
      this.hourString = this.getHourString();
      this.timeChanged();
      return;
    }

    if (this.hourString.length === 2 && parseInt(this.hourString, 10) > 12) {
      this.hour = 12;
      this.hourString = this.getHourString();
      this.timeChanged();
      return;
    }

    this.hour = parseInt(this.hourString, 10);

    this.timeChanged();
  }

  minuteFocusOut() {
    if (this.minuteString === '0' || this.minuteString === '00' || this.minuteString.length === 0) {
      this.minute = 30;
      this.minuteString = this.getMinuteString();
      this.timeChanged();
      return;
    }

    if (this.minuteString.length === 1) {
      this.minute = parseInt(this.minuteString, 10);
      this.minuteString = this.getMinuteString();
      this.timeChanged();
      return;
    }

    if (this.minuteString.length === 2 && parseInt(this.minuteString, 10) > 59) {
      this.minute = 59;
      this.minuteString = this.getMinuteString();
      this.timeChanged();
      return;
    }

    this.minute = parseInt(this.minuteString, 10);

    this.timeChanged();
  }

  timeChanged() {
    const newTime: ITime = {
      hour: this.hour,
      minute: this.minute,
      meridiem: this.morning ? 'AM' : 'PM'
    };
    console.log(newTime);
    this.sendTime.emit(newTime);
  }
}
