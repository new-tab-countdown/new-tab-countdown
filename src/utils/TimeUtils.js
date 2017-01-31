import { SECOND, MINUTE, HOUR, DAY } from '../constants/TimeValues';
import EndDates from './EndDates';

export default class TimeUtils {

    static computeTimeRemaining(timeUnit, now, endUnit) {
        let ms = this.timeRemainingMill(now, endUnit);
        return ms / timeUnit.convertFromMill;
    }

    static timeRemainingMill(nowMill, endUnit) {
        return endUnit.endDate - nowMill;
    }

}
