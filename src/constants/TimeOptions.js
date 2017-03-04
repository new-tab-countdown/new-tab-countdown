const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE;
const MILLISECONDS_IN_DAY = HOURS_IN_DAY * MILLISECONDS_IN_HOUR;

export const SECOND = {
    displayName: 'seconds',
    toFixed: 0,
    convertFromMill: MILLISECONDS_IN_SECOND
}

export const MINUTE = {
    displayName: 'minutes',
    toFixed: 2,
    convertFromMill: MILLISECONDS_IN_MINUTE
}

export const HOUR = {
    displayName: 'hours',
    toFixed: 4,
    convertFromMill: MILLISECONDS_IN_HOUR
}

export const DAY = {
    displayName: 'days',
    toFixed: 6,
    convertFromMill: MILLISECONDS_IN_DAY
}
