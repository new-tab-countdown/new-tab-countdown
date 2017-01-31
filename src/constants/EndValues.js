import EndDates from '../utils/EndDates';

export const TODAY = {
    displayName: 'today',
    endDate: EndDates.getStartOfTomorrow()
}

export const WEEK = {
    displayName: 'this week',
    endDate: EndDates.getStartOfNextWeek()
}

export const MONTH = {
    displayName: 'this month',
    endDate: EndDates.getStartOfNextMonth()
}

export const YEAR = {
    displayName: 'this year',
    endDate: EndDates.getStartOfNextYear()
}
