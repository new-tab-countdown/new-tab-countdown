import TimeOption from '../common/TimeOption';

const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE;
const MILLISECONDS_IN_DAY = HOURS_IN_DAY * MILLISECONDS_IN_HOUR;
const MILLISECONDS_IN_WEEK = DAYS_IN_WEEK * MILLISECONDS_IN_DAY;

export const SECOND = new TimeOption('seconds', 0, MILLISECONDS_IN_SECOND);

export const MINUTE = new TimeOption('minutes', 2, MILLISECONDS_IN_MINUTE);

export const HOUR = new TimeOption('hours', 4, MILLISECONDS_IN_HOUR);

export const DAY = new TimeOption('days', 6, MILLISECONDS_IN_DAY);

export const WEEK = new TimeOption('weeks', 7, MILLISECONDS_IN_WEEK);
