import React from 'react';
import { shallow, mount } from 'enzyme';
import Countdown from '../src/components/Countdown';
import { DROPDOWN_OPTIONS } from '../src/constants/DropdownOptions';
import { HOUR } from '../src/constants/TimeOptions';

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

    it('Countdown renders with default time and date options.', () => {
        const wrapper = mount(
          <Countdown
              timeOption={DROPDOWN_OPTIONS.timeOptions.defaultValue}
              dateOption={DROPDOWN_OPTIONS.dateOptions.defaultValue}
              timeRemaining={HOUR.convertFromMill * 10}
              interval={100}
          />
        );
        expect(wrapper.text()).toContain('hours remaining today.');
    });

});
