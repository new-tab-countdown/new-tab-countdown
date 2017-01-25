import '../styles/site.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DropdownSelect from './DropdownSelect.jsx';
import {TIMEUNIT, ENDUNIT} from '../constants/DropdownOptions.js';

/*
The desired text to display is:
"There are `n` [seconds | minutes | hours | days] remaining [today | this week | this month | this year]."
*/
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeUnit: TIMEUNIT.default,
            endUnit: ENDUNIT.default
        };
    }

    changeTimeUnit(timeUnit) {
        this.setState({
            timeUnit: timeUnit
        });
    }

    changeEndUnit(endUnit) {
        this.setState({
            endUnit: endUnit
        });
    }

    render() {
        const timeUnits = ['seconds', 'minutes', 'hours', 'days'];
        const endUnits = ['today', 'this week', 'this month', 'this year'];
        console.info(this.state);
        return (
            <div className="main">
                There are
                <DropdownSelect
                    options={timeUnits}
                    onChange={this.changeTimeUnit.bind(this)}
                />
                remaining
                <DropdownSelect
                    options={endUnits}
                    onChange={this.changeEndUnit.bind(this)}
                />.
            </div>
        );
    }

}

// App.propTypes = {
//     timeUnit: React.PropTypes.object.isRequired,
//     endUnit: React.PropTypes.object.isRequired
// };

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
