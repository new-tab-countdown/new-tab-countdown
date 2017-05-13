import { SECOND, MINUTE, HOUR, DAY } from './TimeOptions';
import { TODAY, WEEK, MONTH, YEAR } from './DateOptions';

export const DROPDOWN_OPTIONS = {

    timeOptions: {
        defaultValue: HOUR,
        options: [SECOND, MINUTE, HOUR, DAY]
    },

    dateOptions: {
        defaultValue: TODAY,
        options: [TODAY, WEEK, MONTH, YEAR]
    }

}
