import DateCalculator from './DateCalculator';

export default class TimeCalculator {

    static computeTimeRemaining(timeOption, dateOption, now) {
        let endDate = dateOption.endDate ? DateCalculator.getEndDateFromDateOption(dateOption.endDate) : DateCalculator.getEndDateFromDateOption(dateOption);
        return endDate === null ? null : this.timeRemainingMill(endDate, now);
    }

    static timeRemainingMill(endDate, now) {
        return endDate - now;
    }

}
