import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Countdown from './Countdown';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeCalculator from '../utils/TimeCalculator';

export default class CountdownList extends Component {

    static get propTypes() {
        return {
            countdownList: PropTypes.array,
            interval: PropTypes.number.isRequired,
            maxNumCountdown: PropTypes.number.isRequired,
        }
    }

    static get defaultProps() {
        const defaultCountdown = {
            'id': 0,
            'timeOption': DROPDOWN_OPTIONS.timeOptions.defaultValue,
            'dateOption': DROPDOWN_OPTIONS.dateOptions.defaultValue,
        };
        return {
            countdownList: [defaultCountdown],
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            countdownList: props.countdownList,
            nextCountdownId: props.countdownList.length ? props.countdownList.map((countdown) => {
                return countdown.id;
            }).reduce((currentMax, id) => {
                return currentMax > id ? currentMax : id;
            }) + 1 : 1,
            enableDeleteCountdown: false,
        };
        this.onUpdateDropdownOption = this._onUpdateDropdownOption.bind(this);
        this.getDefaultCountdown = this._getDefaultCountdown.bind(this);
        this.onAddCountdown = this._onAddCountdown.bind(this);
        this.onDeleteCountdown = this._onDeleteCountdown.bind(this);
        this.toggleEnableDeleteCountdown = this._toggleEnableDeleteCountdown.bind(this);
        this.getCountdownList = this._getCountdownList.bind(this);
    }

    _onUpdateDropdownOption(countdownId, option, updatedValue) {
        const _countdownList = [...this.state.countdownList];
        _countdownList.filter((countdown) => {
            return countdown.id === countdownId;
        }).forEach((match) => {
            match[option] = updatedValue;
        });
        chrome.storage.sync.set({'countdownList': _countdownList}, () => {
            chrome.storage.sync.get((value) => {
                this.setState({
                    countdownList: value.countdownList,
                });
            });
        });
    }

    _getDefaultCountdown() {
        const defaultCountdown = {
            'id': this.state.nextCountdownId,
            'timeOption': DROPDOWN_OPTIONS.timeOptions.defaultValue,
            'dateOption': DROPDOWN_OPTIONS.dateOptions.defaultValue,
        };
        this.setState({
            nextCountdownId: this.state.nextCountdownId + 1,
        });
        return defaultCountdown;
    }

    _onAddCountdown() {
        const _countdownList = (this.state.countdownList.length < this.props.maxNumCountdown) ? [...this.state.countdownList, this.getDefaultCountdown()] : [...this.state.countdownList];
        chrome.storage.sync.set({'countdownList': _countdownList}, () => {
            chrome.storage.sync.get((value) => {
                this.setState({
                    countdownList: value.countdownList,
                });
            });
        });
    }

    _onDeleteCountdown(countdownId) {
        const _countdownList = [...this.state.countdownList].filter((countdown) => {
            return countdown.id !== countdownId;
        });
        chrome.storage.sync.set({'countdownList': _countdownList}, () => {
            chrome.storage.sync.get((value) => {
                this.setState({
                    countdownList: value.countdownList,
                    enableDeleteCountdown: false,
                });
            });
        });
    }

    _toggleEnableDeleteCountdown() {
        this.setState({
            enableDeleteCountdown: !this.state.showDeleteCountdown,
        });
    }

    _getCountdownList() {
        if (this.state.countdownList.length) {
            return this.state.countdownList.map((countdown, i) => {
                return (
                    <Countdown
                        key={i}
                        id={countdown.id}
                        updateDropdownOption={this.onUpdateDropdownOption}
                        timeOption={countdown.timeOption}
                        dateOption={countdown.dateOption}
                        interval={this.props.interval}
                        deleteCountdown={this.onDeleteCountdown}
                        enableDeleteCountdown={this.state.enableDeleteCountdown}
                    />
                );
            });
        } else {
            return (
                <div className='no-countdowns'>
                    ಠ_ಠ You've deleted all the countdowns!&nbsp;
                    <span
                        className='add-countdown-text'
                        onClick={this.onAddCountdown}
                    >
                        Add one
                    </span>?
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <span
                    className='add-countdown'
                    onClick={this.onAddCountdown}>
                    &#x02295;
                </span>
                <span
                    className='delete-countdown'
                    onClick={this.toggleEnableDeleteCountdown}>
                    &#x0229d;
                </span>
                <div className='countdown-list'>
                    {this.getCountdownList()}
                </div>
            </div>
        );
    }

}
