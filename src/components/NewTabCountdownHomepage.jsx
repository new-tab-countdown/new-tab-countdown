import React from 'react';
import PropTypes from 'prop-types';
import CountdownList from './CountdownList';
import '../styles/site.scss';

const NewTabCountdownHomepage = ({
    countdownList,
    intervalDuration,
    maxNumCountdown,
}) => {

    return (
        <div className='content'>
            <div className='new-tab-countdown-info'>
                <div className='title'>
                    New Tab Countdown
                </div>
                <div className='sub-title'>
                    a chrome extension
                </div>
                <div className='links'>
                    <a
                        className='link'
                        href='https://chrome.google.com/webstore/detail/new-tab-countdown/pbeiaielhjhfdpnonbbincehnanaehon'
                        target="_blank"
                    >
                        download
                    </a>
                    <span className='divider'>⋮</span>
                    <a
                        className='link'
                        href='https://github.com/cbass10liu/new-tab-countdown'
                        target="_blank"
                    >
                        github
                    </a>
                    <span className='divider'>⋮</span>
                    <a
                        className='link'
                        href='https://sebastian-liu.com/'
                        target="_blank"
                    >
                        about
                    </a>
                </div>
            </div>
            <div className='countdown-list'>
                <CountdownList
                    countdownList={countdownList}
                    intervalDuration={intervalDuration}
                    maxNumCountdown={maxNumCountdown}
                />
            </div>
        </div>
    );

};

NewTabCountdownHomepage.propTypes = {
    countdownList: PropTypes.object,
    intervalDuration: PropTypes.number.isRequired,
    maxNumCountdown: PropTypes.number.isRequired,
};

export default NewTabCountdownHomepage;
