import React from 'react';
import PropTypes from 'prop-types';

const CountdownDisplay = ({ timeOption, timeRemaining }) => {

    return (
        <span className="time-remaining">
            &nbsp;{timeRemaining ? (timeRemaining / timeOption.convertFromMill).toFixed(timeOption.toFixed) : "ಠ_ಠ"}&nbsp;
        </span>
    );

};

CountdownDisplay.propTypes = {
    timeOption: PropTypes.object.isRequired,
    timeRemaining: PropTypes.number.isRequired
};

export default CountdownDisplay;
