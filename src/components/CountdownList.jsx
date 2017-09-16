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
            maxNumCountdown: PropTypes.number.isRequired
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            countdownList: props.countdownList
        };
        this.getDefaultCountdown = this._getDefaultCountdown.bind(this);
        this.addCountdown = this._addCountdown.bind(this);
        this.getCountdownList = this._getCountdownList.bind(this);
    }

    _getDefaultCountdown() {
        return {
            'id': this.state.countdownList.length,
            'timeOption': DROPDOWN_OPTIONS.timeOptions.defaultValue,
            'dateOption': DROPDOWN_OPTIONS.dateOptions.defaultValue
        }
    }

    _addCountdown() {
        let _countdownList = [...this.state.countdownList];
        if (this.state.countdownList.length < this.props.maxNumCountdown) {
            _countdownList = [...this.state.countdownList, this.getDefaultCountdown()];
        }
        this.setState({
            countdownList: _countdownList
        }, () => {
            chrome.storage.sync.set({'countdownList': this.state.countdownList});
        });
    }

    // _deleteCountdown(countdownId) {
    //     console.info(countdownId);
    //     let _countdownList = [...this.state.countdownList];
    //     _countdownList.filter((countdown) => {
    //         console.info(countdown.id !== countdownId);
    //         return countdown.id !== countdownId;
    //     });
    //     console.info(_countdownList);
    //     this.setState({
    //         countdownList: _countdownList
    //     });
    // }

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
                />
            );
        });
    }

    render() {
        return (
            <div>
                <div onClick={this.addCountdown}>add</div>
                <div className='countdown-list'>
                    {this.getCountdownList()}
                </div>
            </div>
        );
    }

}
