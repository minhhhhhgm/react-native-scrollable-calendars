import { dayjs } from '../Utils/time';
import { Dayjs } from 'dayjs';
import isEqual from 'lodash/isEqual';

export const getMonthRange = (
  date: string | Date,
  min: number,
  max: number,
  passRange: number
) => {
  const result: string[] = [];

  if (min || max) {
    let cur = dayjs(min);
    while (cur.isSameOrBefore(max, 'month')) {
      result.push(dayjsToString(cur));
      cur = cur.add(1, 'month');
    }
    return result;
  } else {
    let cur = dayjs(date);
    for (let index = -passRange; index < passRange + 1; index++) {
      result.push(dayjsToString(cur.add(index, 'month')));
    }
    return result;
  }
};

export const getWeekRange = (
  date: string | Date,
  min: number,
  max: number,
  passRange: number
) => {
  const result: string[] = [];

  if (min || max) {
    let cur = dayjs(min);
    while (cur.isSameOrBefore(max, 'week')) {
      result.push(dayjsToString(cur));
      cur = cur.add(1, 'week');
    }
    return result;
  } else {
    let cur = dayjs(date);
    for (let index = -passRange; index < passRange + 1; index++) {
      result.push(dayjsToString(cur.add(index, 'week')));
    }
    return result;
  }
};

const defaultDayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export const getDayName = (day: number, dayNames = defaultDayNames) =>
  dayNames[day];

export const getDaysOfWeek = (firstDay: number) => {
  const days = [];
  for (let index = firstDay; index < firstDay + 7; index++) {
    const day = index % 7;
    days.push(day);
  }
  return days;
};

export const getDatesOfWeek = (date: Date, firstDay: number) => {
  const days = getDaysOfWeek(firstDay);
  const dates: string[] = [];
  let t = 0;
  days.forEach((day, index) => {
    if (index > 0 && day < days[index - 1]) t++;
    dates.push(dayjsToString(dayjs(date).add(t, 'week').day(day)));
  });
  return dates;
};

export const getDaysInMonth = (month: string | Date) => {
  let start = dayjs(month).startOf('month').startOf('week');
  const end = dayjs(month).endOf('month').endOf('week');

  const days = [];
  let cur = start.clone();

  while (cur.isSameOrBefore(end)) {
    days.push(dayjsToString(cur));
    cur = cur.add(1, 'day');
  }

  return days;
};

const leading = (value: any) => {
  return value < 10 ? '0' + value : '' + value;
};

export const dateToString = (value: Date) => {
  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const date = value.getDate();
  return `${year}-${leading(month)}-${leading(date)}`;
};

export const dayjsToString = (value: Dayjs) => {
  const year = value.year();
  const month = value.month() + 1;
  const date = value.date();
  return `${year}-${leading(month)}-${leading(date)}`;
};

export const compareProps = (a: any, b: any, keys: string[]) => {
  if (keys) {
    return keys.every((key) => isEqual(a[key], b[key]));
  }
  return isEqual(a, b);
};

export const sortMarkedDates = (obj) => {
  const today = dayjs().format('YYYY-MM-DD');
  const days = Object.keys(obj);
  if (!days.includes(today)) {
    days.push(today);
  }
  return days.sort((a, b) => dayjs(a).diff(b));
};
