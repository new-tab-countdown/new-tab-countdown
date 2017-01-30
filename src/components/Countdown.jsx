import React, { Component } from 'react';
import DropdownSelect from './DropdownSelect.jsx';
import DropdownOptions from '../constants/dropdownOptions.js';
import TimeUtils from '../utils/timeUtils.js';

/*
The desired text to display is:
"There are `n` [seconds | minutes | hours | days] remaining [today | this week | this month | this year]."
*/
export default class Countdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeUnit: DropdownOptions.TIME_OPTIONS.defaultValue,
            endUnit: DropdownOptions.END_OPTIONS.defaultValue,
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
        let ms = TimeUtils.timeRemainingMill(
            this.state.now,
            this.state.endUnit
        );
        return (
            <div className="main">
                There are {ms}
                <DropdownSelect
                    dropdownOptions={DropdownOptions.TIME_OPTIONS}
                    onChange={this.changeTimeUnit.bind(this)}
                />
                remaining
                <DropdownSelect
                    dropdownOptions={DropdownOptions.END_OPTIONS}
                    onChange={this.changeEndUnit.bind(this)}
                />.
            </div>
        );
    }

}
