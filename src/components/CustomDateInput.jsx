import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateCalculator from '../utils/DateCalculator';
import CustomDateInputHelper from '../utils/CustomDateInputHelper';

export default class CustomDateInput extends Component {

    constructor() {
        super();
        this.state = {
            input: '',
            isValidDate: true,
            placeholder: "custom date",
            helperMessage: '',
            isOnFocus: false
        };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    onFocus() {
        this.setState({
            placeholder: "description + mm/dd/yyyy",
            helperMessage: `"enter" to submit`,
            isOnFocus: true
        });
    }

    onBlur() {
        this.setState({
            placeholder: "custom date",
            helperMessage: '',
            isOnFocus: false
        });
    }

    onChange(e) {
        this.setState({
            input: e.target.value
        });
    }

    handleKeyDown(e) {
        if (e.key.toLowerCase() === "enter") {
            if (!this.isValid(this.state.input)) {
                this.setState({
                    isValidDate: false
                });
            } else {
                this.setState({
                    helperMessage: ''
                });
                this.props.onSubmit(this.state.input);
            }
        } else {
            this.setState({
                isValidDate: true,
                helperMessage: `"enter" to submit`
            });
        }
    }

    isValid(input) {
        let customDate = CustomDateInputHelper.getCustomDate(input);
        // If customDate is null then the parsed date is invalid.
        if (!customDate) {
            this.setState({
                helperMessage: `invalid date (example: "vacation ${DateCalculator.getExampleDateString()}")`
            });
            return false;
        } else {
            // Prevent dates that have already passed.
            let endDate = new Date(customDate.endDate);
            if (endDate - ((new Date())) < 0) {
                this.setState({
                    helperMessage: `"${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}" has already passed`
                });
                return false;
            } else {
                return true;
            }
        }
    }

    render() {
        return (
            <span className="dropdown-option">
                <input
                    className="custom-date-input"
                    type="text"
                    maxLength={35}
                    placeholder={this.state.placeholder}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyDown={this.handleKeyDown}
                />
                <p className="helper-message">
                    {this.state.helperMessage}
                </p>
            </span>
        );
    }

}

CustomDateInput.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
