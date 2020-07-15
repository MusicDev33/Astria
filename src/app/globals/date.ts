export const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'Septmber', 'October', 'November', 'December'];

// I'd rather have this than use string manipulation and drive up line lengths
export const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getMeridiemTime(date: Date): string {
  let hour = date.getHours();
  let meridiem = 'AM';

  if (hour > 12) {
    hour -= 12;
    meridiem = 'PM';
  }

  if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${date.getMinutes()} ${meridiem}`;
}
