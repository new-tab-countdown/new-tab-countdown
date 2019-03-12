import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateCalculator from '../utils/DateCalculator';
import CustomDateInputHelper from '../utils/CustomDateInputHelper';

export default class CustomDateInput extends Component {

    static get propTypes() {
        return {
            onSubmit: PropTypes.func.isRequired
        }
    }

    constructor() {
        super();
        this.state = {
            input: '',
            isValidDate: true,
            placeholder: 'a custom date',
            helperMessage: '',
            isOnFocus: false,
        };
        this.onFocus = this._onFocus.bind(this);
        this.onBlur = this._onBlur.bind(this);
        this.onChange = this._onChange.bind(this);
        this.handleKeyDown = this._handleKeyDown.bind(this);
    }

    _onFocus() {
        this.setState({
            placeholder: 'description + mm/dd/yyyy',
            helperMessage: `press "enter" to submit`,
            isOnFocus: true,
        });
    }

    _onBlur() {
        this.setState({
            placeholder: 'a custom date',
            helperMessage: '',
            isOnFocus: false,
        });
    }

    _onChange(e) {
        this.setState({
            input: e.target.value,
        });
    }

    _handleKeyDown(e) {
        if (e.key.toLowerCase() === 'enter') {
            if (!this._isValid(this.state.input)) {
                this.setState({
                    isValidDate: false,
                });
            } else {
                this.setState({
                    helperMessage: '',
                });
                this.props.onSubmit(this.state.input);
            }
        } else {
            this.setState({
                isValidDate: true,
                helperMessage: `press "enter" to submit`,
            });
        }
    }

    _isValid(input) {
        let customDate = CustomDateInputHelper.getCustomDate(input);
        // If customDate is null then the parsed date is invalid.
        if (!customDate) {
            this.setState({
                helperMessage: `invalid date (example: 'vacation ${DateCalculator.getExampleDateString()}')`,
            });
            return false;
        } else {
            // Prevent dates that have already passed.
            let endDate = new Date(customDate.endDate);
            if (endDate - ((new Date())) < 0) {
                this.setState({
                    helperMessage: `'${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}' has already passed`,
                });
                return false;
            } else if (endDate - ((new Date())) > Number.MAX_SAFE_INTEGER) {
                this.setState({
                    helperMessage: `'${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}' is too far into the future`,
                });
                return false;
            } else {
                return true;
            }
        }
    }

    render() {
        return (
            <span className='dropdown-option'>
                <input
                    className='custom-date-input'
                    type='text'
                    maxLength={35}
                    placeholder={this.state.placeholder}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyDown={this.handleKeyDown}
                />
                <p className='helper-message'>
                    {this.state.helperMessage}
                </p>
            </span>
        );
    }

}
