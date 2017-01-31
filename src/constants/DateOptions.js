import DateCalculator from '../utils/DateCalculator';

export const TODAY = {
    displayName: 'today',
    endDate: DateCalculator.getStartOfTomorrow()
}

export const WEEK = {
    displayName: 'this week',
    endDate: DateCalculator.getStartOfNextWeek()
}

export const MONTH = {
    displayName: 'this month',
    endDate: DateCalculator.getStartOfNextMonth()
}

export const YEAR = {
    displayName: 'this year',
    endDate: DateCalculator.getStartOfNextYear()
}
