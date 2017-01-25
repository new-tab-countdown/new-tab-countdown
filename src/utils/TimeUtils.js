const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

const MILLISECONDS_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;

export default class TimeUtils {

    static getTimeRemaining(now, endTime) {
        switch(endTime) {
            case 'today': return this.getStartOfTomorrow(now) - now;
            case 'this week': return getStartOfNextWeek(now) - now;
            case 'this month': return getStartOfNextMonth(now) - now;
            case 'this year': return getStartOfNextYear(now) - now;
        }
    }

    static test() {
        return 1;
    }

    static getStartOfTomorrow(now) {
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
        );
    }

    static getStartOfNextWeek(now) {
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 7 - now.getDay()
        );
    }

    static getStartOfNextMonth(now) {
        return new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );
    }

    static getStartOfNextYear(now) {
        return new Date(
            now.getFullYear() + 1,
            0,
            1
        );
    }

}
