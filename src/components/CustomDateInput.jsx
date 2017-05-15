import React, { Component } from 'react';

export default class CustomDateInput extends Component {

    constructor() {
        super();
        this.state = {
            input: ''
        };
    }

    handleSubmit(e) {
        if (e.key.toLowerCase() === "enter") {
            this.props.onSubmit(this.state.input);
        }
    }

    render() {
        return (
            <input
                type="text"
                placeholder={(document.activeElement.className.indexOf("custom-date-input") !== -1) ? "description + mm/dd/yyyy" : "custom date"}
                onChange={(e) => this.setState({
                    input: e.target.value
                })}
                onKeyPress={(e) => this.handleSubmit(e)}
                className="custom-date-input dropdown-option"
            />
        );
    }

}

CustomDateInput.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}
