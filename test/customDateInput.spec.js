import React from 'react';
import { shallow } from 'enzyme';
import CustomDateInput from '../src/components/CustomDateInput';

describe('<CustomDateInput />', () => {

    it('Displays submit helper message.', () => {
        const wrapper = shallow(<CustomDateInput
            onSubmit={() => {}}
        />);
        const input = wrapper.find('input');
        input.simulate('focus');
        expect(wrapper.text()).toBe('\"enter\" to submit');
        wrapper.setState({
            input: 'input'
        });
        expect(wrapper.text()).toBe('\"enter\" to submit');
    });

    it('Displays error helper message.', () => {
        const wrapper = shallow(<CustomDateInput
            onSubmit={() => {}}
        />);
        const input = wrapper.find('input');
        wrapper.setState({
            input: 'invalid input'
        });
        input.simulate('focus');
        input.simulate('keyDown', { key: 'enter' });
        expect(wrapper.text()).toContain('invalid date');
    });

    it('Displays past date helper message.', () => {
        const wrapper = shallow(<CustomDateInput
            onSubmit={() => {}}
        />);
        const input = wrapper.find('input');
        wrapper.setState({
            input: 'old date 1/1/2000'
        });
        input.simulate('focus');
        input.simulate('keyDown', { key: 'enter' });
        expect(wrapper.text()).toContain('has already passed');
    });

    it('Updates helper message appropriately.', () => {
        const wrapper = shallow(<CustomDateInput
            onSubmit={() => {}}
        />);
        const input = wrapper.find('input');
        wrapper.setState({
            input: 'invalid input'
        });
        input.simulate('focus');
        input.simulate('keyDown', { key: 'enter' });
        expect(wrapper.text()).toContain('invalid date');
        input.simulate('keyDown', { key: 'backspace' });
        expect(wrapper.text()).toBe('\"enter\" to submit');
        wrapper.setState({
            input: 'old date 1/1/2000'
        });
        input.simulate('keyDown', { key: 'enter' });
        expect(wrapper.text()).toContain('has already passed');
        input.simulate('keyDown', { key: 'backspace' });
        expect(wrapper.text()).toBe('\"enter\" to submit');
    });

});
