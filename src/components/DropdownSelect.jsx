import React from 'react';
import DropdownOptions from '../constants/DropdownOptions';

const DropdownSelect = ({dropdownOptions, onChange}) => {

    const handleChange = (event) => {
        let value = event.target.value;
        let newOption = dropdownOptions.options.find(
            (option) => option.displayName === value
        );
        onChange(newOption);
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
