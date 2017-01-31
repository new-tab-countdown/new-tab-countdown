const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;

export const SECOND = {
    displayName: 'seconds',
    convertFromMill: MILLISECONDS_IN_SECOND
}

export const MINUTE = {
    displayName: 'minutes',
    convertFromMill: MILLISECONDS_IN_MINUTE
}

export const HOUR = {
    displayName: 'hours',
    convertFromMill: MILLISECONDS_IN_HOUR
}

export const DAY = {
    displayName: 'days',
    convertFromMill: MILLISECONDS_IN_DAY
}
