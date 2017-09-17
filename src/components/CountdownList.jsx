import React, { Component } from 'react';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import PropTypes from 'prop-types';
import Countdown from './Countdown';
import TimeCalculator from '../utils/TimeCalculator';

export default class CountdownList extends Component {

    static get propTypes() {
        return {
            countdownList: PropTypes.array.isRequired,
            interval: PropTypes.number.isRequired,
            maxNumCountdown: PropTypes.number.isRequired,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            countdownList: props.countdownList,
            showDeleteCountdown: false,
        };
        this.getDefaultCountdown = this._getDefaultCountdown.bind(this);
        this.onAddCountdown = this._onAddCountdown.bind(this);
        this.onDeleteCountdown = this._onDeleteCountdown.bind(this);
        this.getCountdownList = this._getCountdownList.bind(this);
        this.toggleDeleteCountdown = this._toggleDeleteCountdown.bind(this);
    }

    _getDefaultCountdown() {
        return {
            'id': this.state.countdownList.length,
            'timeOption': DROPDOWN_OPTIONS.timeOptions.defaultValue,
            'dateOption': DROPDOWN_OPTIONS.dateOptions.defaultValue,
        }
    }

    _onAddCountdown() {
        let _countdownList = [...this.state.countdownList];
        if (this.state.countdownList.length < this.props.maxNumCountdown) {
            _countdownList = [...this.state.countdownList, this.getDefaultCountdown()];
        }
        this.setState({
            countdownList: _countdownList,
        }, () => {
            chrome.storage.sync.set({'countdownList': this.state.countdownList});
        });
    }

    _onDeleteCountdown(countdownId) {
        let _countdownList = [...this.state.countdownList].filter((countdown) => {
            return countdown.id !== countdownId;
        });
        _countdownList.map((countdown, i) => {
            countdown.id = i;
        });
        this.setState({
            countdownList: _countdownList
        }, () => {
            chrome.storage.sync.set({'countdownList': this.state.countdownList});
        });
    }

    _toggleDeleteCountdown() {
        this.setState({
            showDeleteCountdown: !this.state.showDeleteCountdown,
        });
    }

    _getCountdownList() {
        return this.state.countdownList.map((countdown, i) => {
            return (
                <Countdown
                    key={i}
                    id={i}
                    className='countdown'
                    timeOption={countdown.timeOption}
                    dateOption={countdown.dateOption}
                    interval={this.props.interval}
                    deleteCountdown={this.onDeleteCountdown}
                    showDeleteCountdown={this.state.showDeleteCountdown}
                />
            );
        });
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
                    onClick={this.toggleDeleteCountdown}>
                    &#x0229d;
                </span>
                <div className='countdown-list'>
                    {this.getCountdownList()}
                </div>
            </div>
        );
    }

}
