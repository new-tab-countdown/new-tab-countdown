import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ dropdownType, shouldDisplay, displayOption, dropdownOptions, customDropdownOption, onDropdown, onSelect }) => {

    const options = (dropdownOptions.options).map(
        (option, i) => (
            <span
                className={`${(option.displayName).replace(/\s/g, "-")} dropdown-option`}
                key={i}
                onClick={() => onSelect(option)}
                >
                {option.displayName}
            </span>
        )
    );

    const dropdownContent = (
        <span className="dropdown-options">
            {options}
            {customDropdownOption}
        </span>
    );

    return (
        <span className="dropdown">
            <span className={`${dropdownType} dropdown-value`} onClick={onDropdown}>
                {displayOption.displayName}
            </span>
            {shouldDisplay ? dropdownContent : null}
        </span>
    );

};

Dropdown.propTypes = {
    dropdownType: PropTypes.string,
    shouldDisplay: PropTypes.bool.isRequired,
    displayOption: PropTypes.object.isRequired,
    dropdownOptions: PropTypes.object.isRequired,
    customDropdownOption: PropTypes.object,
    onDropdown: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default Dropdown;
