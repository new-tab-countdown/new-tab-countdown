import React from 'react';
import PropTypes from 'prop-types';

const CountdownDisplay = ({
    timeOption,
    timeRemaining,
}) => {

    return (
        <span className='time-remaining'>
            &nbsp;{timeRemaining ? (timeRemaining / timeOption.convertFromMill).toFixed(timeOption.toFixed) : 'ಠ_ಠ'}&nbsp;
        </span>
    );

};

CountdownDisplay.propTypes = {
    timeOption: PropTypes.PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        toFixed: PropTypes.number.isRequired,
        convertFromMill: PropTypes.number.isRequired,
    }).isRequired,
    timeRemaining: PropTypes.number.isRequired,
};

export default CountdownDisplay;
