import { SECOND, MINUTE, HOUR, DAY, WEEK } from './TimeOptions';
import { TODAY, THIS_WEEK, THIS_MONTH, THIS_YEAR } from './DateOptions';

export const DROPDOWN_OPTIONS = {

    timeOptions: {
        defaultValue: HOUR,
        options: [SECOND, MINUTE, HOUR, DAY, WEEK]
    },

    dateOptions: {
        defaultValue: TODAY,
        options: [TODAY, THIS_WEEK, THIS_MONTH, THIS_YEAR]
    }

}
