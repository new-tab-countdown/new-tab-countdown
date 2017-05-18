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
        };
    }

    handleKeyDown(e) {
        if (e.key.toLowerCase() === "enter") {
            if (this.isValid(this.state.input)) {
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
        let customDate = CustomDateInputHelper.getCustomDate(input);
        return !isNaN(customDate.endDate);
    }

    getInvalidDateMessage() {
        let exampleDate = DateCalculator.getStartOfNextWeek();
        let exampleDateInput = `${exampleDate.getMonth() + 1}/${exampleDate.getDate()}/${exampleDate.getFullYear()}`;
        return (
            <p className="helper-message">
                {`invalid date (example: "vacation ${exampleDateInput}")`}
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
        let message = null;
        if (!this.state.isValidDate && this.state.input.length) {
            message = this.getInvalidDateMessage();
        } else if (this.state.input.length) {
            message = this.getHelperMessage();
        }
        return message;
    }

    render() {
        return (
            <span>
                <input
                    className="custom-date-input dropdown-option"
                    type="text"
                    maxLength={35}
                    placeholder={(document.activeElement.className.indexOf("custom-date-input") !== -1) ? "description + mm/dd/yyyy" : "custom date"}
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
