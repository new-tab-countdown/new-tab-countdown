import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Countdown from './Countdown';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeCalculator from '../utils/TimeCalculator';
import CountdownListControls from './CountdownListControls';

export default class CountdownList extends Component {

    static get propTypes() {
        return {
            countdownList: PropTypes.array,
            intervalDuration: PropTypes.number.isRequired,
            maxNumCountdown: PropTypes.number.isRequired,
            displayCountdownListControls: PropTypes.bool,
            isChrome: PropTypes.bool,
        }
    }

    static get defaultProps() {
        const defaultCountdown = {
            'id': 1,
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
            }) + 1 : 0,
            now: new Date(),
            displayCountdownListControls: !!props.displayCountdownListControls,
            countdownBeingModified: 0,
            shouldHideDropdowns: false,
            enableDeleteCountdown: false,
        };
        this.onUpdateDropdownOption = this._onUpdateDropdownOption.bind(this);
        this.onCountdownDropdownChange = this._onCountdownDropdownChange.bind(this);
        this.getDefaultCountdown = this._getDefaultCountdown.bind(this);
        this.getCountdownListControls = this._getCountdownListControls.bind(this);
        this.onAddCountdown = this._onAddCountdown.bind(this);
        this.toggleEnableDeleteCountdown = this._toggleEnableDeleteCountdown.bind(this);
        this.onDeleteCountdown = this._onDeleteCountdown.bind(this);
        this.getCountdownList = this._getCountdownList.bind(this);
    }

    componentWillMount() {
        const intervalId = setInterval(() => {
            this.setState({
                now: new Date(),
            });
        }, this.props.intervalDuration);
        this.setState({
            intervalId: intervalId,
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    _onUpdateDropdownOption(countdownId, option, updatedValue) {
        const _countdownList = [...this.state.countdownList];
        _countdownList.filter((countdown) => {
            return countdown.id === countdownId;
        }).forEach((match) => {
            match[option] = updatedValue;
        });
        if (this.props.isChrome && chrome.storage) {
            chrome.storage.sync.set({'countdownList': _countdownList}, () => {
                chrome.storage.sync.get((value) => {
                    this.setState({
                        countdownList: value.countdownList,
                    });
                });
            });
        }
    }

    _onCountdownDropdownChange(countdownId, isBeingModified) {
        this.setState({
            countdownBeingModified: isBeingModified ? countdownId : 0,
            shouldHideDropdowns: false,
            enableDeleteCountdown: false,
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

    _getCountdownListControls() {
        if (this.state.displayCountdownListControls) {
            return (
                <CountdownListControls
                    onAddCountdown={this.onAddCountdown}
                    toggleEnableDeleteCountdown={this.toggleEnableDeleteCountdown}
                    disableAddCountdown={this.state.countdownList.length === this.props.maxNumCountdown}
                    disableToggleEnableDeleteCountdown={!this.state.countdownList.length}
                />
            );
        } else {
            return null;
        }
    }

    _onAddCountdown() {
        const _countdownList = (this.state.countdownList.length < this.props.maxNumCountdown) ? [...this.state.countdownList, this.getDefaultCountdown()] : [...this.state.countdownList];
        chrome.storage.sync.set({'countdownList': _countdownList}, () => {
            chrome.storage.sync.get((value) => {
                this.setState({
                    countdownList: value.countdownList,
                    countdownBeingModified: 0,
                    shouldHideDropdowns: true,
                    enableDeleteCountdown: false,
                });
            });
        });
    }

    _toggleEnableDeleteCountdown() {
        this.setState({
            countdownBeingModified: 0,
            shouldHideDropdowns: true,
            enableDeleteCountdown: !this.state.enableDeleteCountdown,
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

    _getCountdownList() {
        if (this.state.countdownList.length) {
            return this.state.countdownList.map((countdown, i) => {
                return (
                    <Countdown
                        key={i}
                        id={countdown.id}
                        updateDropdownOption={this.onUpdateDropdownOption}
                        onCountdownDropdownChange={this.onCountdownDropdownChange}
                        shouldBlur={!!this.state.countdownBeingModified && countdown.id !== this.state.countdownBeingModified}
                        shouldHideDropdowns={this.state.shouldHideDropdowns}
                        timeOption={countdown.timeOption}
                        dateOption={countdown.dateOption}
                        now={this.state.now}
                        enableDeleteCountdown={this.state.enableDeleteCountdown}
                        deleteCountdown={this.onDeleteCountdown}
                    />
                );
            });
        } else {
            return (
                <div className='all-countdowns-deleted-text'>
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
            <div className='content'>
                {this.getCountdownListControls()}
                <div className='countdown-list'>
                    {this.getCountdownList()}
                </div>
            </div>
        );
    }

}
