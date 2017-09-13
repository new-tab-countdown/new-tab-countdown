import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeCalculator from '../utils/TimeCalculator';
import CountdownDisplay from './CountdownDisplay';
import Dropdown from './Dropdown';
import CustomDateInput from './CustomDateInput';
import CustomDateInputHelper from '../utils/CustomDateInputHelper';

/**
The desired text to display is:
"There are `n` [seconds | minutes | hours | days] remaining [today | this week | this month | this year | custom date {description + date}]."
*/
export default class Countdown extends Component {

    static get propTypes() {
        return {
            timeOption: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
                toFixed: PropTypes.number.isRequired,
                convertFromMill: PropTypes.number.isRequired
            }),
            dateOption: PropTypes.shape({
                displayName: PropTypes.string.isRequired
            }),
            timeRemaining: PropTypes.number.isRequired,
            interval: PropTypes.number
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: false,
            timeOption: props.timeOption,
            dateOption: props.dateOption,
            timeRemaining: props.timeRemaining
        };
        this.onTimeOptionsDropdown = this._onTimeOptionsDropdown.bind(this);
        this.onTimeOptionsSelect = this._onTimeOptionsSelect.bind(this);
        this.onCustomDateSubmit = this._onCustomDateSubmit.bind(this);
        this.onDateOptionsDropdown = this._onDateOptionsDropdown.bind(this);
        this.onDateOptionsSelect = this._onDateOptionsSelect.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                timeRemaining: (this.state.timeRemaining - this.props.interval)
            });
        }, this.props.interval);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.setState({
                    timeRemaining: TimeCalculator.computeTimeRemaining(
                        this.state.timeOption,
                        this.state.dateOption,
                        new Date()
                    )
                });
            }
        });
    }

    _onTimeOptionsDropdown() {
        this.setState({
            displayTimeOptionDropdown: !this.state.displayTimeOptionDropdown,
            displayDateOptionDropdown: false
        });
    }

    _onTimeOptionsSelect(option) {
        this.setState({
            displayTimeOptionDropdown: !this.state.displayTimeOptionDropdown,
            displayDateOptionDropdown: false,
            timeOption: option
        });
        if (!process.env.NODE_ENV) {
            chrome.storage.sync.set({"timeOption": option});
        }
    }

    _onCustomDateSubmit(input) {
        let customDate = CustomDateInputHelper.getCustomDate(input);
        this.setState({
            displayDateOptionDropdown: false,
            dateOption: customDate,
            timeRemaining: TimeCalculator.computeTimeRemaining(
                this.state.timeOption,
                customDate,
                new Date()
            )
        });
        if (!process.env.NODE_ENV) {
            chrome.storage.sync.set({"dateOption": customDate});
        }
    }

    _onDateOptionsDropdown() {
        this.setState({
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: !this.state.displayDateOptionDropdown
        });
    }

    _onDateOptionsSelect(option) {
        this.setState({
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: !this.state.displayDateOptionDropdown,
            dateOption: option,
            timeRemaining: TimeCalculator.computeTimeRemaining(
                this.state.timeOption,
                option,
                new Date()
            )
        });
        if (!process.env.NODE_ENV) {
            chrome.storage.sync.set({"dateOption": option});
        }
    }

    render() {
        if (this.state.timeRemaining < 0 && (!this.state.dateOption.endDate)) {
            this.setState({
                timeRemaining: TimeCalculator.computeTimeRemaining(
                    this.state.timeOption,
                    this.state.dateOption,
                    new Date()
                )
            });
        }
        return (
            <div className="countdown">
                There are
                <CountdownDisplay
                    timeOption={this.state.timeOption}
                    timeRemaining={this.state.timeRemaining}
                />
                <Dropdown
                    dropdownType="time-options"
                    shouldDisplay={this.state.displayTimeOptionDropdown}
                    displayOption={this.state.timeOption}
                    dropdownOptions={DROPDOWN_OPTIONS.timeOptions}
                    onDropdown={this.onTimeOptionsDropdown}
                    onSelect={this.onTimeOptionsSelect}
                />
                &nbsp;remaining&nbsp;
                <Dropdown
                    dropdownType="date-options"
                    shouldDisplay={this.state.displayDateOptionDropdown}
                    displayOption={this.state.dateOption}
                    dropdownOptions={DROPDOWN_OPTIONS.dateOptions}
                    customDropdownOption={
                        <CustomDateInput
                            onSubmit={this.onCustomDateSubmit}
                        />
                    }
                    onDropdown={this.onDateOptionsDropdown}
                    onSelect={this.onDateOptionsSelect}
                />.
            </div>
        );
    }

}
