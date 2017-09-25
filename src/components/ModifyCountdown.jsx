import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ModifyCountdown extends Component {

    static get propTypes() {
        return {
            onAddCountdown: PropTypes.func.isRequired,
            toggleEnableDeleteCountdown: PropTypes.func.isRequired,
            disableAddCountdown: PropTypes.bool.isRequired,
            disableToggleEnableDeleteCountdown: PropTypes.bool.isRequired,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            tooltipMessage: '',
        };
        this.addCountdown = this._addCountdown.bind(this);
        this.enableDeleteCountdown = this._enableDeleteCountdown.bind(this);
    }

    _addCountdown() {
        if (!this.props.disableAddCountdown) {
            this.props.onAddCountdown();
        } else {
            this.setState({
                tooltipMessage: 'maximum of 3 countdowns',
            }, () => {
                setTimeout(() => {
                    this.setState({
                        tooltipMessage: '',
                    });
                }, 2000);
            });
        }
    }

    _enableDeleteCountdown() {
        if (!this.props.disableToggleEnableDeleteCountdown) {
            this.props.toggleEnableDeleteCountdown();
        }
    }

    render() {
        return (
            <div className='modify-countdown'>
                <div
                    className={`${this.props.disableAddCountdown ? 'disabled-' : ''}add-countdown`}
                    onClick={this.addCountdown}>
                    [+]
                    <span className='tooltip-message'>
                        {this.state.tooltipMessage}
                    </span>
                </div>
                <div
                    className={`${this.props.disableToggleEnableDeleteCountdown ? 'disabled-' : ''}toggle-enable-delete-countdown`}
                    onClick={this.enableDeleteCountdown}>
                    [&minus;]
                </div>
            </div>
        );
    }

}
