import DateCalculator from './DateCalculator';

export default class TimeCalculator {

    static computeTimeRemaining(timeOption, dateOption, now) {
        let endDate = dateOption.endDate ? DateCalculator.getEndDateFromDateOption(dateOption.endDate) : DateCalculator.getEndDateFromDateOption(dateOption);
        if (endDate === null) {
            return null;
        } else {
            let ms = this.timeRemainingMill(endDate, now);
            return ms;
        }
    }

    static timeRemainingMill(endDate, now) {
        return endDate - now;
    }

}
