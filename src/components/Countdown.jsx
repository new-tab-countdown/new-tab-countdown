import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeCalculator from '../utils/TimeCalculator';
import CountdownDisplay from './CountdownDisplay';
import Dropdown from './Dropdown';
import CustomDateInput from './CustomDateInput';
import CustomDateInputHelper from '../utils/CustomDateInputHelper';

const updateCountdown = (countdownId, option, updatedValue) => {
    let _countdownList = [];
    chrome.storage.sync.get((value) => {
        _countdownList = [...value.countdownList]
        _countdownList.filter((countdown) => {
            return countdown.id === countdownId;
        }).forEach((match) => {
            return match[option] = updatedValue;
        });
        chrome.storage.sync.set({'countdownList': _countdownList});
    });
};

/**
The desired text to display is:
'There are `n` [seconds | minutes | hours | days] remaining [today | this week | this month | this year | custom date {description + date}].'
*/
export default class Countdown extends Component {

    static get propTypes() {
        return {
            id: PropTypes.number.isRequired,
            timeOption: PropTypes.shape({
                displayName: PropTypes.string,
                toFixed: PropTypes.number,
                convertFromMill: PropTypes.number,
            }).isRequired,
            dateOption: PropTypes.shape({
                displayName: PropTypes.string,
                timeUnit: PropTypes.string,
            }).isRequired,
            interval: PropTypes.number.isRequired,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: false,
            timeOption: props.timeOption,
            dateOption: props.dateOption,
        };
        this.onTimeOptionsDropdown = this._onTimeOptionsDropdown.bind(this);
        this.onTimeOptionsSelect = this._onTimeOptionsSelect.bind(this);
        this.onCustomDateSubmit = this._onCustomDateSubmit.bind(this);
        this.onDateOptionsDropdown = this._onDateOptionsDropdown.bind(this);
        this.onDateOptionsSelect = this._onDateOptionsSelect.bind(this);
        this.onDeleteCountdown = this._onDeleteCountdown.bind(this);
        this.showDeleteCountdown = this._showDeleteCountdown.bind(this);
    }

    componentWillMount() {
        this.setState({
            timeRemaining: TimeCalculator.computeTimeRemaining(
                this.state.timeOption,
                this.state.dateOption,
                new Date(),
            ),
        });
    }

    componentDidMount() {
        const intervalId = setInterval(() => {
            this.setState({
                timeRemaining: (this.state.timeRemaining - this.props.interval),
            });
        }, this.props.interval);
        this.setState({
            intervalId: intervalId,
        });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && this.state.intervalId) {
                console.info(this.state.intervalId);
                this.setState({
                    timeRemaining: TimeCalculator.computeTimeRemaining(
                        this.state.timeOption,
                        this.state.dateOption,
                        new Date(),
                    ),
                });
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    _onTimeOptionsDropdown() {
        this.setState({
            displayTimeOptionDropdown: !this.state.displayTimeOptionDropdown,
            displayDateOptionDropdown: false,
        });
    }

    _onTimeOptionsSelect(option) {
        this.setState({
            displayTimeOptionDropdown: !this.state.displayTimeOptionDropdown,
            displayDateOptionDropdown: false,
            timeOption: option,
        }, () => {
            if (!process.env.NODE_ENV) {
                updateCountdown(this.props.id, 'timeOption', this.state.timeOption);
            }
        });
    }

    _onCustomDateSubmit(input) {
        let customDate = CustomDateInputHelper.getCustomDate(input);
        this.setState({
            displayDateOptionDropdown: false,
            dateOption: customDate,
            timeRemaining: TimeCalculator.computeTimeRemaining(
                this.state.timeOption,
                customDate,
                new Date(),
            ),
        }, () => {
            if (!process.env.NODE_ENV) {
                updateCountdown(this.props.id, 'dateOption', this.state.dateOption);
            }
        });
    }

    _onDateOptionsDropdown() {
        this.setState({
            displayTimeOptionDropdown: false,
            displayDateOptionDropdown: !this.state.displayDateOptionDropdown,
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
                new Date(),
            ),
        }, () => {
            if (!process.env.NODE_ENV) {
                updateCountdown(this.props.id, 'dateOption', this.state.dateOption);
            }
        });
    }

    _onDeleteCountdown() {
        this.props.deleteCountdown(this.props.id);
    }

    _showDeleteCountdown() {
        if (this.props.showDeleteCountdown) {
            return (
                <span onClick={this.onDeleteCountdown}>
                    &#x02297;
                </span>
            );
        }
        return null;
    }

    render() {
        if (this.state.timeRemaining < 0 && (!this.state.dateOption.endDate)) {
            this.setState({
                timeRemaining: TimeCalculator.computeTimeRemaining(
                    this.state.timeOption,
                    this.state.dateOption,
                    new Date(),
                ),
            });
        }
        return (
            <div className='countdown'>
                There are
                <CountdownDisplay
                    className='countdown-display'
                    timeOption={this.state.timeOption}
                    timeRemaining={this.state.timeRemaining}
                />
                <Dropdown
                    className='time-options-dropdown'
                    dropdownType='time-options'
                    shouldDisplay={this.state.displayTimeOptionDropdown}
                    displayOption={this.state.timeOption}
                    dropdownOptions={DROPDOWN_OPTIONS.timeOptions}
                    onDropdown={this.onTimeOptionsDropdown}
                    onSelect={this.onTimeOptionsSelect}
                />
                &nbsp;remaining&nbsp;
                <Dropdown
                    className='date-options-dropdown'
                    dropdownType='date-options'
                    shouldDisplay={this.state.displayDateOptionDropdown}
                    displayOption={this.state.dateOption}
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
                {this.showDeleteCountdown()}
            </div>
        );
    }

}
