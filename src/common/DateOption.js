import Option from './Option';

export default class DateOption extends Option {

    constructor(displayName, timeUnit) {
        super(displayName);
        this.timeUnit = timeUnit;
    }

}
