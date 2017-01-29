import React from 'react';
import DropdownOptions from '../constants/dropdownOptions.js';

const DropdownSelect = ({dropdownOptions, onChange}) => {

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const options = (dropdownOptions.options).map(
        (option, i) => <option key={i} value={option}>{option}</option>
    );

    return (
        <select defaultValue={dropdownOptions.default} onChange={handleChange}>
            {options}
        </select>
    );
};

DropdownSelect.propTypes = {
    dropdownOptions: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func
};

export default DropdownSelect;
