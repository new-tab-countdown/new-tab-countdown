import React, { Component } from 'react';
import DropdownSelect from './DropdownSelect';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeCalculator from '../utils/TimeCalculator';
import CountdownDisplay from './CountdownDisplay';

/*
The desired text to display is:
"There are `n` [seconds | minutes | hours | days] remaining [today | this week | this month | this year]."
*/
export default class Countdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeOption: DROPDOWN_OPTIONS.timeOptions.defaultValue,
            dateOption: DROPDOWN_OPTIONS.dateOptions.defaultValue,
            now: Date.now(),
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                now: Date.now()
            });
        }, 1000);
    }

    changeTimeUnit(timeOption) {
        this.setState({
            timeOption: timeOption
        });
    }

    changeEndUnit(dateOption) {
        this.setState({
            dateOption: dateOption
        });
    }

    render() {
        return (
            <div className="main">
                There are
                <CountdownDisplay
                    timeOption={this.state.timeOption}
                    dateOption={this.state.dateOption}
                    now={this.state.now}
                />
                <DropdownSelect
                    dropdownOptions={DROPDOWN_OPTIONS.timeOptions}
                    onChange={this.changeTimeUnit.bind(this)}
                />
                remaining
                <DropdownSelect
                    dropdownOptions={DROPDOWN_OPTIONS.dateOptions}
                    onChange={this.changeEndUnit.bind(this)}
                />.
            </div>
        );
    }

}
