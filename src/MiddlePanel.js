import React, { Component } from 'react';
import './styles/bootstrap.min.css';
import './styles/debug.css';
import './styles/MiddlePanel.css';
import monster from './images/monsters/sample_monster.png';

export class MiddlePanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-3 debug_panel">
                <img className="monster" src={monster} onClick={() => this.props.doDamage()} />

                <p>Monster name: Kyubey</p>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{ width: this.props.current_health / this.props.max_health * 100 + "%" }}
                        aria-valuenow={this.props.current_health} aria-valuemin="0" aria-valuemax={this.props.max_health}>{this.props.current_health}</div>
                </div>

                <p>XP</p>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: this.props.xp / this.props.xp_required * 100 + "%" }}
                        aria-valuenow={this.props.xp} aria-valuemin="0" aria-valuemax={this.props.xp_required}>{this.props.xp}</div>
                </div>
            </div>
        )
    }
}

export default MiddlePanel;