import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Countdown from '../src/components/Countdown';
import { DROPDOWN_OPTIONS } from '../src/constants/DropdownOptions';
import { SECOND, MINUTE, HOUR, DAY } from '../src/constants/TimeOptions';
import { TODAY, WEEK, MONTH, YEAR } from '../src/constants/DateOptions';

describe('<Countdown />', () => {

    it('Countdown shallow renders with CountdownDisplay and Dropdowns.', () => {
        const wrapper = shallow(
          <Countdown
              timeOption={DROPDOWN_OPTIONS.timeOptions.defaultValue}
              dateOption={DROPDOWN_OPTIONS.dateOptions.defaultValue}
              timeRemaining={10}
              interval={100}
          />
        );
        expect(wrapper.text()).toBe('There are<CountdownDisplay /><Dropdown /> remaining <Dropdown />.');
    });

    it('Countdown renders with default time and date props.', () => {
        const wrapper = mount(
          <Countdown
              timeOption={DROPDOWN_OPTIONS.timeOptions.defaultValue}
              dateOption={DROPDOWN_OPTIONS.dateOptions.defaultValue}
              timeRemaining={10}
              interval={100}
          />
        );
        expect(wrapper.text()).toContain('hours remaining today.');
    });

    it('Countdown renders with changed time and date props.', () => {
        const wrapper = mount(
          <Countdown
              timeOption={DROPDOWN_OPTIONS.timeOptions.defaultValue}
              dateOption={DROPDOWN_OPTIONS.dateOptions.defaultValue}
              timeRemaining={10}
              interval={100}
          />
        );
        wrapper.setProps({
            timeOption: SECOND,
            dateOption: WEEK
        });
        expect(wrapper.props().timeOption.displayName).toBe('seconds');
        expect(wrapper.props().dateOption.displayName).toBe('this week');
    });

    it('Displays dropdown options when clicked.', () => {
        const wrapper = mount(
          <Countdown
              timeOption={DROPDOWN_OPTIONS.timeOptions.defaultValue}
              dateOption={DROPDOWN_OPTIONS.dateOptions.defaultValue}
              timeRemaining={10}
              interval={100}
          />
        );
        console.info(process.env.NODE_ENV);
        wrapper.find('.time-options').simulate('click');
        expect(wrapper.find('.dropdown-option').length).toBe(4);
        wrapper.find('.seconds').simulate('click');
        expect(wrapper.text()).toContain('seconds remaining today.');
    });

});
