import React from 'react';
import PropTypes from 'prop-types';

const CustomDropdownOption = ({ customOption, onSelect, displayCustomDateOption }) => {

    const TRUNCATE_LENGTH = 30;

    const getDropdownDisplayText = () => {
        // Remove 'until' from the text to display.
        let displayText = customOption.displayName.substr(6);
        return displayText.length > TRUNCATE_LENGTH
        ? displayText.substr(0, TRUNCATE_LENGTH) + "..." :  displayText;
    }

    return (
        <span
            className="dropdown-option"
            onClick={onSelect}>
            {displayCustomDateOption ? getDropdownDisplayText() : null}
        </span>
    );

};

CustomDropdownOption.propTypes = {
    customOption: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    displayCustomDateOption: PropTypes.bool
};

export default CustomDropdownOption;
