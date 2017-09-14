import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Countdown from './Countdown';

export default class CountdownList extends Component {

    static get propTypes() {
        return {
            countdownList: PropTypes.array
        }
    }

    constructor() {
        super();

    }

}
