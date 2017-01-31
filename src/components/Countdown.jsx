import React, { Component } from 'react';
import DropdownSelect from './DropdownSelect.jsx';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeUtils from '../utils/TimeUtils';

/*
The desired text to display is:
"There are `n` [seconds | minutes | hours | days] remaining [today | this week | this month | this year]."
*/
export default class Countdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeUnit: DROPDOWN_OPTIONS.timeOptions.defaultValue,
            endUnit: DROPDOWN_OPTIONS.endOptions.defaultValue,
            now: (new Date()).getTime()
        };
    }

    changeTimeUnit(timeUnit) {
        this.setState({
            timeUnit: timeUnit
        });
    }

    changeEndUnit(endUnit) {
        this.setState({
            endUnit: endUnit
        });
    }

    render() {
        let ms = TimeUtils.computeTimeRemaining(
            this.state.timeUnit,
            this.state.now,
            this.state.endUnit
        );
        return (
            <div className="main">
                There are {ms}
                <DropdownSelect
                    dropdownOptions={DROPDOWN_OPTIONS.timeOptions}
                    onChange={this.changeTimeUnit.bind(this)}
                />
                remaining
                <DropdownSelect
                    dropdownOptions={DROPDOWN_OPTIONS.endOptions}
                    onChange={this.changeEndUnit.bind(this)}
                />.
            </div>
        );
    }

}
