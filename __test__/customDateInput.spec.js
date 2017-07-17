import React from 'react';
import { shallow, mount } from 'enzyme';
import CustomDateInput from '../src/components/CustomDateInput';

describe('<CustomDateInput />', () => {

    it('Displays `enter` helper message.', () => {
        const wrapper = shallow(<CustomDateInput
            onSubmit={() => {}}
        />)
        const input = wrapper.find('input');
        input.simulate('focus');
        expect(wrapper.text()).toBe('\"enter\" to submit');
    });

    it('Displays error helper message.', () => {
        const wrapper = shallow(<CustomDateInput
            onSubmit={() => {}}
        />)
        const input = wrapper.find('input');
        input.simulate('focus');
        input.simulate('change', { target: { value: 'invalid input' } });
        expect(wrapper.text()).toBe('\"enter\" to submit');
    });

});
