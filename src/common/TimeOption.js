import Option from './Option';

export default class TimeOption extends Option {

    constructor(displayName, toFixed, convertFromMill) {
        super(displayName);
        this.toFixed = toFixed;
        this.convertFromMill = convertFromMill;
    }

}
