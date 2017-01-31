import { SECOND, MINUTE, HOUR, DAY } from './TimeValues';
import { TODAY, WEEK, MONTH, YEAR } from './EndValues';

export const DROPDOWN_OPTIONS = {

    timeOptions: {
        defaultValue: MINUTE,
        options: [SECOND, MINUTE, HOUR, DAY]
    },

    endOptions: {
        defaultValue: TODAY,
        options: [TODAY, WEEK, MONTH, YEAR]
    }

}
