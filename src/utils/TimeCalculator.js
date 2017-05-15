export default class TimeCalculator {

    static computeTimeRemaining(timeOption, dateOption, now) {
        if (dateOption.endDate === null) {
            return null;
        } else {
            let ms = this.timeRemainingMill(dateOption, now);
            return ms / timeOption.convertFromMill;
        }
    }

    static timeRemainingMill(dateOption, now) {
        return dateOption.endDate - now;
    }

}
