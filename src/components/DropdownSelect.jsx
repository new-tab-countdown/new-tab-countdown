import React from 'react';
import DropdownOptions from '../constants/DropdownOptions.js';

const DropdownSelect = ({dropdownOptions, onChange}) => {

    const handleChange = (event) => {
        console.info(event);
        onChange(event.target.value);
    };

    const options = (dropdownOptions.options).map(
        (option, i) => <option key={i} value={option.displayName}>{option.displayName}</option>
    );

    return (
        <select defaultValue={dropdownOptions.defaultValue.displayName} onChange={handleChange}>
            {options}
        </select>
    );
};

DropdownSelect.propTypes = {
    dropdownOptions: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func
};

export default DropdownSelect;
