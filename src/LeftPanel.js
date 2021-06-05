import React, { Component } from 'react';
import './styles/bootstrap.min.css';
import './styles/debug.css';

export class LeftPanel extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="col debug_panel">
                <p>Level: {this.props.current_level}</p>
                <p>Click DMG: {this.props.click_damage}</p>
                <p>DPS: {this.props.dps}</p>
                <p>Monsters Killed: {this.props.monsters_killed}</p>
                <p>Gold: {this.props.gold}</p>
                <p>Playtime: {this.props.playtime}</p>
                <p>Head: {this.props.head}</p>
                <p>Shoulders: {this.props.shoulders}</p>
                <p>Chest: {this.props.chest}</p>
                <p>Legs: {this.props.legs}</p>
                <p>Boots: {this.props.boots}</p>
                <p>Weapon: {this.props.weapon}</p>
                <p>Shield: {this.props.shield}</p>
                <p>Neck: {this.props.neck}</p>
                <p>Ring: {this.props.ring}</p>
            </div>
        )
    }
}

export default LeftPanel
