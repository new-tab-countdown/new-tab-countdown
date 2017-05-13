import React from 'react';

const Dropdown = ({ shouldDisplay, displayOption, dropdownOptions, onDropdown, onSelect }) => {

    const options = (dropdownOptions.options).map(
        (option, i) => <span key={i} onClick={() => onSelect(option)} className="dropdown-option">{option.displayName}</span>
    );

    const dropdownContent = (
        <span className="dropdown-options">
            {options}
        </span>
    );

    return (
        <span className="dropdown" onClick={onDropdown}>
            {displayOption.displayName}
            {shouldDisplay ? dropdownContent : null}
        </span>
    );
};

Dropdown.propTypes = {
    shouldDisplay: React.PropTypes.bool.isRequired,
    displayOption: React.PropTypes.object.isRequired,
    dropdownOptions: React.PropTypes.object.isRequired,
    onDropdown: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired
};

export default Dropdown;
