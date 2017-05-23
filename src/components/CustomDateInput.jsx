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
            isOnFocus: false
        };
    }

    handleKeyDown(e) {
        if (e.key.toLowerCase() === "enter") {
            if (!this.isValid(this.state.input)) {
                this.setState({
                    isValidDate: false
                });
            } else {
                this.props.onSubmit(this.state.input);
            }
        } else {
            this.setState({
                isValidDate: true
            });
        }
    }

    isValid(input) {
        return CustomDateInputHelper.getCustomDate(input);
    }

    getInvalidDateMessage() {
        return (
            <p className="helper-message">
                {`invalid date (example: "vacation ${DateCalculator.getExampleDateString()}")`}
            </p>
        );
    }

    getHelperMessage() {
        return (
            <p className="helper-message">
                {`"enter" to submit`}
            </p>
        );
    }

    getMessage() {
        if (this.state.isOnFocus) {
            if (!this.state.isValidDate && this.state.input.length) {
                return this.getInvalidDateMessage();
            } else if (this.state.input.length) {
                return this.getHelperMessage();
            }
        } else {
            return null;
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
                    onFocus={() => {
                        this.setState({
                            placeholder: "description + mm/dd/yyyy",
                            isOnFocus: true
                        });
                    }}
                    onBlur={() => {
                        this.setState({
                            placeholder: "custom date",
                            isOnFocus: false
                        });
                    }}
                    onChange={(e) => {
                        this.setState({
                            input: e.target.value
                        });
                    }}
                    onKeyDown={(e) => this.handleKeyDown(e)}
                />
                {this.getMessage()}
            </span>
        );
    }

}

CustomDateInput.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
