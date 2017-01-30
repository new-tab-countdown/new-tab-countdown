import EndDates from './endDates.js';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;

export default class TimeUtils {

    static computeTimeRemaining(timeUnit, now, endUnit) {
        let ms = this.computeTimeRemainingMill(now, endUnit);
        switch(timeUnit) {
            case 'seconds':
                return ms / MILLISECONDS_IN_SECOND;
            case 'minutes':
                return ms / MILLISECONDS_IN_MINUTE;
            case 'hours':
                return ms / MILLISECONDS_IN_HOUR;
            case 'days':
                return ms / MILLISECONDS_IN_DAY;
        }
    }

    static timeRemainingMill(nowMill, endUnit) {
        switch(endUnit) {
            case 'today':
                return EndDates.getStartOfTomorrow() - nowMill;
            case 'this week':
                return EndDates.getStartOfNextWeek() - nowMill;
            case 'this month':
                return EndDates.getStartOfNextMonth() - nowMill;
            case 'this year':
                return EndDates.getStartOfNextYear() - nowMill;
        }
    }

}
