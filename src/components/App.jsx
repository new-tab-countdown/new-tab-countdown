import React from 'react';
import ReactDOM from 'react-dom';
import CountdownList from './CountdownList';
import NewTabCountdownHomepage from './NewTabCountdownHomepage';
import '../styles/site.scss';

const COUNTDOWN_INTERVAL_DURATION = 100;
const MAX_NUM_COUNTDOWN = 3;
const IS_CHROME = typeof chrome !== 'undefined';
if (IS_CHROME && chrome.storage) {
    chrome.storage.sync.get((value) => {
        ReactDOM.render(
            <CountdownList
                countdownList={value && value.countdownList ? value.countdownList : undefined}
                intervalDuration={COUNTDOWN_INTERVAL_DURATION}
                maxNumCountdown={MAX_NUM_COUNTDOWN}
                displayCountdownListControls
            />,
            document.getElementById('container')
        );
    });
} else {
    ReactDOM.render(
        <NewTabCountdownHomepage
            countdownList={undefined}
            intervalDuration={COUNTDOWN_INTERVAL_DURATION}
            maxNumCountdown={MAX_NUM_COUNTDOWN}
            isChrome={IS_CHROME}
        />,
        document.getElementById('container')
    );
}
