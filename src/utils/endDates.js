export default class EndDates {

    static getStartOfTomorrow() {
        let now = new Date();
        let tomorrow = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
        );
        return tomorrow.getTime();
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

}
