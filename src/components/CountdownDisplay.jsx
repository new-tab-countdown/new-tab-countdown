import React from 'react';
import TimeCalculator from '../utils/TimeCalculator';

const CountdownDisplay = ({ timeOption, dateOption, now }) => {

    const timeRemaining = TimeCalculator.computeTimeRemaining(timeOption, dateOption, now);

    return (
        <span className="time-remaining">&nbsp;{timeRemaining.toFixed(timeOption.toFixed)}&nbsp;</span>
    );

};

CountdownDisplay.propTypes = {
    timeOption: React.PropTypes.object.isRequired,
    dateOption: React.PropTypes.object.isRequired,
    now: React.PropTypes.number.isRequired
};

export default CountdownDisplay;
