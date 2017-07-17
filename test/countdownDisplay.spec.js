import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import CountdownDisplay from '../src/components/CountdownDisplay';
import { SECOND, MINUTE, HOUR, DAY } from '../src/constants/TimeOptions';

describe('<CountdownDisplay />', () => {

    it('Truncates timeRemaining (second) correctly.', () => {
        const wrapper = shallow(<CountdownDisplay
            timeOption={SECOND}
            timeRemaining={SECOND.convertFromMill}
        />);
        expect(wrapper.text().trim()).toBe('1');
    });

    it('Truncates timeRemaining (minute) correctly.', () => {
        const wrapper = shallow(<CountdownDisplay
            timeOption={MINUTE}
            timeRemaining={MINUTE.convertFromMill}
        />);
        expect(wrapper.text().trim()).toBe('1.00');
    });

    it('Truncates timeRemaining (hour) correctly.', () => {
        const wrapper = shallow(<CountdownDisplay
            timeOption={HOUR}
            timeRemaining={HOUR.convertFromMill}
        />);
        expect(wrapper.text().trim()).toBe('1.0000');
    });

    it('Truncates timeRemaining (day) correctly.', () => {
        const wrapper = shallow(<CountdownDisplay
            timeOption={DAY}
            timeRemaining={DAY.convertFromMill}
        />);
        expect(wrapper.text().trim()).toBe('1.000000');
    });

});
