import '../styles/site.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from './Countdown';
import { DROPDOWN_OPTIONS } from '../constants/DropdownOptions';

chrome.storage.sync.get((value) => {
    let timeOption = (value && value.timeOption) ? value.timeOption : DROPDOWN_OPTIONS.timeOptions.defaultValue;
    let dateOption = (value && value.dateOption) ? value.dateOption : DROPDOWN_OPTIONS.dateOptions.defaultValue;
    ReactDOM.render(
        <Countdown
            timeOption={timeOption}
            dateOption={dateOption}
        />,
        document.getElementById('container')
    );
});
