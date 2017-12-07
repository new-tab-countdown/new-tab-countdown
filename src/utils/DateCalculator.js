import { TODAY, THIS_WEEK, THIS_MONTH, THIS_YEAR } from '../constants/DateOptions';

export default class DateCalculator {

    static getStartOfTomorrow() {
        let now = new Date();
        let tomorrow = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
        );
        return tomorrow;
    }

    static getStartOfNextWeek() {
        let now = new Date();
        let nextWeek = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 7 - now.getDay()
        );
        return nextWeek;
    }

    static getStartOfNextMonth() {
        let now = new Date();
        let nextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );
        return nextMonth;
    }

    static getStartOfNextYear() {
        let now = new Date();
        let nextYear = new Date(
            now.getFullYear() + 1,
            0,
            1
        );
        return nextYear;
    }

    static getExampleDateString() {
        let exampleDate = this.getStartOfNextWeek();
        return `${exampleDate.getMonth() + 1}/${exampleDate.getDate()}/${exampleDate.getFullYear()}`;
    }

    static getEndDateFromDateOption(dateOption) {
        switch (dateOption.timeUnit) {
            case TODAY.timeUnit:
                return this.getStartOfTomorrow();
            case THIS_WEEK.timeUnit:
                return this.getStartOfNextWeek();
            case THIS_MONTH.timeUnit:
                return this.getStartOfNextMonth();
            case THIS_YEAR.timeUnit:
                return this.getStartOfNextYear();
            default:
                return new Date(dateOption);
        }
    }

}
