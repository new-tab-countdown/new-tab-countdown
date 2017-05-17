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
"There are `n` [seconds | minutes | hours | days] remaining [today | this week | this month | this year]."
*/
export default class Countdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayTimeOption: false,
            displayDateOption: false,
            timeOption: props.timeOption,
            dateOption: props.dateOption,
            now: Date.now()
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({now: Date.now()});
        }, 100);
    }

    render() {
        return (
            <div className="countdown">
                There are
                <CountdownDisplay
                    timeOption={this.state.timeOption}
                    dateOption={this.state.dateOption}
                    now={this.state.now}
                />
                <Dropdown
                    shouldDisplay={this.state.displayTimeOption}
                    displayOption={this.state.timeOption}
                    dropdownOptions={DROPDOWN_OPTIONS.timeOptions}
                    onDropdown={() => {
                        this.setState({
                            displayTimeOption: !this.state.displayTimeOption,
                            displayDateOption: false
                        });
                    }}
                    onSelect={(option) => {
                        this.setState({
                            displayTimeOption: !this.state.displayTimeOption,
                            displayDateOption: false,
                            timeOption: option
                        });
                        chrome.storage.sync.set({"timeOption": option});
                    }}
                />
                &nbsp;remaining&nbsp;
                <Dropdown
                    shouldDisplay={this.state.displayDateOption}
                    displayOption={this.state.dateOption}
                    dropdownOptions={DROPDOWN_OPTIONS.dateOptions}
                    customDropdownOption={
                        <CustomDateInput
                            onSubmit={(input) => {
                                let customDate = CustomDateInputHelper.getCustomDate(input);
                                this.setState({
                                    displayDateOption: false,
                                    dateOption: customDate
                                });
                                chrome.storage.sync.set({"dateOption": customDate});
                            }}
                        />
                    }
                    onDropdown={() => {
                        this.setState({
                            displayTimeOption: false,
                            displayDateOption: !this.state.displayDateOption
                        });
                    }}
                    onSelect={(option) => {
                        this.setState({
                            displayTimeOption: false,
                            displayDateOption: !this.state.displayDateOption,
                            dateOption: option
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
    dateOption: PropTypes.object.isRequired
}
