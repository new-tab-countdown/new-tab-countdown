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
'There are `n` [seconds | minutes | hours | days] remaining [today | this week | this month | this year | custom date {description + date}].'
*/
export default class Countdown extends Component {

    static get propTypes() {
        return {
            id: PropTypes.number.isRequired,
            updateDropdownOption: PropTypes.func.isRequired,
            timeOption: PropTypes.shape({
                displayName: PropTypes.string,
                toFixed: PropTypes.number,
                convertFromMill: PropTypes.number,
            }).isRequired,
            dateOption: PropTypes.shape({
                displayName: PropTypes.string,
                timeUnit: PropTypes.string,
            }).isRequired,
            now: PropTypes.object.isRequired,
            enableDeleteCountdown: PropTypes.bool.isRequired,
            deleteCountdown: PropTypes.func.isRequired,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: false,
        };
        this.onTimeOptionsDropdown = this._onTimeOptionsDropdown.bind(this);
        this.onTimeOptionsSelect = this._onTimeOptionsSelect.bind(this);
        this.onCustomDateSubmit = this._onCustomDateSubmit.bind(this);
        this.onDateOptionsDropdown = this._onDateOptionsDropdown.bind(this);
        this.onDateOptionsSelect = this._onDateOptionsSelect.bind(this);
        this.enableDeleteCountdown = this._enableDeleteCountdown.bind(this);
        this.onDeleteCountdown = this._onDeleteCountdown.bind(this);
    }

    _onTimeOptionsDropdown() {
        this.setState({
            displayTimeOptionDropdown: !this.state.displayTimeOptionDropdown,
            displayDateOptionDropdown: false,
        });
    }

    _onTimeOptionsSelect(option) {
        this.props.updateDropdownOption(this.props.id, 'timeOption', option);
        this.setState({
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: false,
        });
    }

    _onCustomDateSubmit(input) {
        let customDate = CustomDateInputHelper.getCustomDate(input);
        this.props.updateDropdownOption(this.props.id, 'dateOption', customDate);
        this.setState({
            displayDateOptionDropdown: false,
        });
    }

    _onDateOptionsDropdown() {
        this.setState({
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: !this.state.displayDateOptionDropdown,
        });
    }

    _onDateOptionsSelect(option) {
        this.props.updateDropdownOption(this.props.id, 'dateOption', option);
        this.setState({
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: false,
        });
    }

    _enableDeleteCountdown() {
        if (this.props.enableDeleteCountdown) {
            return (
                <span onClick={this.onDeleteCountdown}>
                    &#x02297;
                </span>
            );
        }
        return null;
    }

    _onDeleteCountdown() {
        this.props.deleteCountdown(this.props.id);
    }

    render() {
        const timeRemaining = TimeCalculator.computeTimeRemaining(
            this.props.timeOption,
            this.props.dateOption,
            this.props.now,
        );
        return (
            <div className='countdown'>
                There are
                <CountdownDisplay
                    className='countdown-display'
                    timeOption={this.props.timeOption}
                    timeRemaining={timeRemaining}
                />
                <Dropdown
                    className='time-options-dropdown'
                    dropdownType='time-options'
                    shouldDisplay={this.state.displayTimeOptionDropdown}
                    displayOption={this.props.timeOption}
                    dropdownOptions={DROPDOWN_OPTIONS.timeOptions}
                    onDropdown={this.onTimeOptionsDropdown}
                    onSelect={this.onTimeOptionsSelect}
                />
                &nbsp;remaining&nbsp;
                <Dropdown
                    className='date-options-dropdown'
                    dropdownType='date-options'
                    shouldDisplay={this.state.displayDateOptionDropdown}
                    displayOption={this.props.dateOption}
                    dropdownOptions={DROPDOWN_OPTIONS.dateOptions}
                    customDropdownOption={
                        <CustomDateInput
                            className='custom-date-input'
                            onSubmit={this.onCustomDateSubmit}
                        />
                    }
                    onDropdown={this.onDateOptionsDropdown}
                    onSelect={this.onDateOptionsSelect}
                />.
                {this.enableDeleteCountdown()}
            </div>
        );
    }

}
