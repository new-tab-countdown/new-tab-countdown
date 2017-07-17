import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../src/components/Dropdown';
import { DROPDOWN_OPTIONS } from '../src/constants/DropdownOptions';

describe('<Dropdown />', () => {

    it('Displays default dropdown option.', () => {
        const wrapper = shallow(<Dropdown
            shouldDisplay={false}
            displayOption={DROPDOWN_OPTIONS.timeOptions.defaultValue}
            dropdownOptions={DROPDOWN_OPTIONS.timeOptions}
            onDropdown={() => {}}
            onSelect={() => {}}
        />);
        expect(wrapper.text()).toBe('hours');
    });

    it('Displays the dropdown options.', () => {
        const wrapper = shallow(<Dropdown
            shouldDisplay={true}
            displayOption={DROPDOWN_OPTIONS.timeOptions.defaultValue}
            dropdownOptions={DROPDOWN_OPTIONS.timeOptions}
            onDropdown={() => {}}
            onSelect={() => {}}
        />);
        expect(wrapper.find('.dropdown-option').length).toBe(4);
    });

});
