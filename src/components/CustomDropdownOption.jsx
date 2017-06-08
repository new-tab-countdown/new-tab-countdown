import React from 'react';
import PropTypes from 'prop-types';

const CustomDropdownOption = ({ customOption, onSelect }) => {

    return (
        <span
            className="dropdown-option"
            onClick={onSelect}>
            {shouldDisplay ? customOption.displayName : null}
        </span>
    );

};

CustomDropdownOption.propTypes = {
    customOption: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default CustomDropdownOption;
