import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from './Countdown';
import CountdownList from './CountdownList';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeCalculator from '../utils/TimeCalculator';
import '../styles/site.scss';

const INTERVAL = 100;
const MAX_NUM_COUNTDOWN = 3;
const renderCountdownList = (countdownList) => {
    ReactDOM.render(
        <CountdownList
            countdownList={countdownList}
            interval={INTERVAL}
            maxNumCountdown={MAX_NUM_COUNTDOWN}
        />,
        document.getElementById('container')
    );
}

chrome.storage.sync.get((value) => {
    if (!value || !value.countdownList) {
        const defaultCountdown = {
            'id': 0,
            'timeOption': DROPDOWN_OPTIONS.timeOptions.defaultValue,
            'dateOption': DROPDOWN_OPTIONS.dateOptions.defaultValue,
        };
        chrome.storage.sync.set({'countdownList': [defaultCountdown]}, () => {
            chrome.storage.sync.get((defaultValue) => {
                renderCountdownList(defaultValue.countdownList);
            });
        });
    } else {
        renderCountdownList(value.countdownList);
    }
});
