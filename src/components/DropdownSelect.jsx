import React from 'react';

const DropdownSelect = ({options, onChange}) => {

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const dropdownOptions = (options).map(
        (option, i) => <option key={i} value={option}>{option}</option>
    );

    return (
        <select onChange={handleChange}>
            {dropdownOptions}
        </select>
    );
};

DropdownSelect.propTypes = {
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func
};

export default DropdownSelect;
