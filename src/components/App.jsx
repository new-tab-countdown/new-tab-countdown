import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from './Countdown';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';
import TimeCalculator from '../utils/TimeCalculator';
import '../styles/site.scss';

chrome.storage.sync.get((value) => {
    let timeOption = (value && value.timeOption) ? value.timeOption : DROPDOWN_OPTIONS.timeOptions.defaultValue;
    let dateOption = (value && value.dateOption) ? value.dateOption : DROPDOWN_OPTIONS.dateOptions.defaultValue;
    let timeRemaining = TimeCalculator.computeTimeRemaining(timeOption, dateOption, new Date());
    const INTERVAL = 100;
    ReactDOM.render(
        <Countdown
            className="countdown"
            timeOption={timeOption}
            dateOption={dateOption}
            timeRemaining={timeRemaining}
            interval={INTERVAL}
        />,
        document.getElementById('container')
    );
});
