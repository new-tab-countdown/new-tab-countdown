export default class TimeCalculator {

    static computeTimeRemaining(timeOption, now, dateOption) {
        let ms = this.timeRemainingMill(now, dateOption);
        return ms / timeOption.convertFromMill;
    }

    static timeRemainingMill(now, dateOption) {
        return dateOption.endDate - now;
    }

}
