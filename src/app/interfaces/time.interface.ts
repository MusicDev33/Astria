export interface ITime {
  hour: number;
  minute: number;
  meridiem: string;
}

export function getJsTime(time: ITime): ITime {
  if (time.meridiem === 'AM') {
    return time;
  }

  if (time.meridiem === 'PM') {
    time.hour += 12;
    if (time.hour === 24) {
      time.hour = 0;
    }

    return time;
  }
}

export function getJsHour(time: ITime): number {
  if (time.meridiem === 'AM') {
    return time.hour;
  }

  if (time.meridiem === 'PM') {
    if (time.hour + 12 === 24) {
      return 0;
    }

    return time.hour + 12;
  }
}
