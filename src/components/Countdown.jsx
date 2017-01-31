import React, { Component } from 'react';
import DropdownSelect from './DropdownSelect.jsx';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeCalculator from '../utils/TimeCalculator';

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
            now: new Date(),
            timeRemaining: null
        };
    }

    changeTimeUnit(timeOption) {
        this.setState({
            timeOption: timeOption
        }, () => this.updateTimeRemaining);
    }

    changeEndUnit(dateOption) {
        this.setState({
            dateOption: dateOption
        }, () => this.updateTimeRemaining);
    }

    // componentDidMount() {
    //     this.setState({
    //         ms: TimeCalculator.timeRemainingMill(
    //             this.state.now,
    //             this.state.dateOption
    //         )
    //     });
    // }

    updateTimeRemaining() {
        this.setState({
            ms: TimeCalculator.timeRemainingMill(
                this.state.now,
                this.state.dateOption
            )
        });
    }

    getTimeRemainingMill(ms) {
        if (ms < 1000) {
            this.forceUpdate();
        } else {
            return ms - 1000;
        }
    }

    render() {
        console.info(this.state);
        let ms = TimeCalculator.computeTimeRemaining(
            this.state.timeOption,
            this.state.now,
            this.state.dateOption
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
                    dropdownOptions={DROPDOWN_OPTIONS.dateOptions}
                    onChange={this.changeEndUnit.bind(this)}
                />.
            </div>
        );
    }

}
