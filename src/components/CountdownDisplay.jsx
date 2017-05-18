import React from 'react';
import PropTypes from 'prop-types';
import TimeCalculator from '../utils/TimeCalculator';

const CountdownDisplay = ({ timeOption, dateOption, now }) => {

    const timeRemaining = TimeCalculator.computeTimeRemaining(timeOption, dateOption, now);

    return (
        <span className="time-remaining">
            &nbsp;{timeRemaining ? timeRemaining.toFixed(timeOption.toFixed) : "ಠ_ಠ"}&nbsp;
        </span>
    );

};

CountdownDisplay.propTypes = {
    timeOption: PropTypes.object.isRequired,
    dateOption: PropTypes.object.isRequired,
    now: PropTypes.number.isRequired
};

export default CountdownDisplay;
