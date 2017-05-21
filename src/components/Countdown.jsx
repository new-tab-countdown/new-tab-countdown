import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeCalculator from '../utils/TimeCalculator';
import CountdownDisplay from './CountdownDisplay';
import Dropdown from './Dropdown';
import CustomDateInput from './CustomDateInput';
import CustomDateInputHelper from '../utils/CustomDateInputHelper';

/*
The desired text to display is:
"There are `n` [seconds | minutes | hours | days] remaining [today | this week | this month | this year | custom date {description + date}]."
*/
export default class Countdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: false,
            timeOption: props.timeOption,
            dateOption: props.dateOption,
            timeRemaining: props.timeRemaining
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                timeRemaining: this.state.timeRemaining - this.props.interval
            });
        }, this.props.interval);
    }

    render() {
        return (
            <div className="countdown">
                There are
                <CountdownDisplay
                    timeOption={this.state.timeOption}
                    timeRemaining={this.state.timeRemaining}
                />
                <Dropdown
                    shouldDisplay={this.state.displayTimeOptionDropdown}
                    displayOption={this.state.timeOption}
                    dropdownOptions={DROPDOWN_OPTIONS.timeOptions}
                    onDropdown={() => {
                        this.setState({
                            displayTimeOptionDropdown: !this.state.displayTimeOptionDropdown,
                            displayDateOptionDropdown: false
                        });
                    }}
                    onSelect={(option) => {
                        this.setState({
                            displayTimeOptionDropdown: !this.state.displayTimeOptionDropdown,
                            displayDateOptionDropdown: false,
                            timeOption: option
                        });
                        chrome.storage.sync.set({"timeOption": option});
                    }}
                />
                &nbsp;remaining&nbsp;
                <Dropdown
                    shouldDisplay={this.state.displayDateOptionDropdown}
                    displayOption={this.state.dateOption}
                    dropdownOptions={DROPDOWN_OPTIONS.dateOptions}
                    customDropdownOption={
                        <CustomDateInput
                            onSubmit={(input) => {
                                let customDate = CustomDateInputHelper.getCustomDate(input);
                                this.setState({
                                    displayDateOptionDropdown: false,
                                    dateOption: customDate,
                                    timeRemaining: TimeCalculator.computeTimeRemaining(this.state.timeOption, customDate, new Date())
                                });
                                chrome.storage.sync.set({"dateOption": customDate});
                            }}
                        />
                    }
                    onDropdown={() => {
                        this.setState({
                            displayTimeOptionDropdown: false,
                            displayDateOptionDropdown: !this.state.displayDateOptionDropdown
                        });
                    }}
                    onSelect={(option) => {
                        this.setState({
                            displayTimeOptionDropdown: false,
                            displayDateOptionDropdown: !this.state.displayDateOptionDropdown,
                            dateOption: option,
                            timeRemaining: TimeCalculator.computeTimeRemaining(this.state.timeOption, option, new Date())
                        });
                        chrome.storage.sync.set({"dateOption": option});
                    }}
                />.
            </div>
        );
    }

}

Countdown.propTypes = {
    timeOption: PropTypes.object.isRequired,
    dateOption: PropTypes.object.isRequired,
    timeRemaining: PropTypes.number.isRequired,
    interval: PropTypes.number.isRequired
}
