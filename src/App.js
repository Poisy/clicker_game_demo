import React, { Component } from 'react';
import './styles/App.css';
import './styles/bootstrap.min.css';
import { LeftPanel } from './LeftPanel.js';
import { RightPanel } from './RightPanel.js';
import { MiddlePanel } from './MiddlePanel.js';
import Timer from './tools/timer.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_health: 10,
            max_health: 10,
            click_damage: 1,
            damage_per_second: 0,
            monsters_killed: 0,
            current_level: 1,
            xp: 0,
            xp_required: 5,
            gold: 0,
            playtime: "00:00:00"
        }
        this.timer = new Timer(0, 0, 0);
    }

    // Method that is called at the creation of the component
    componentDidMount() {
        this.timer.start((time) => {
            this.setState({ playtime: time });
            this.doDamage(this.state.damage_per_second);
        });
    }


    render() {   
        return (
            <div className="App container">
                <div className="row">
                    <LeftPanel
    	                dps = {this.state.damage_per_second} 
                        gold={this.state.gold}
                        current_level={this.state.current_level}
                        click_damage={this.state.click_damage}
                        monsters_killed={this.state.monsters_killed}
                        playtime={this.state.playtime}>
                    </LeftPanel>

                    <MiddlePanel
                        xp={this.state.xp}
                        xp_required={this.state.xp_required}
                        max_health={this.state.max_health}
                        current_health={this.state.current_health}
                        doDamage={() => this.doDamage(this.state.click_damage)}>
                    </MiddlePanel>

                    <RightPanel></RightPanel>
                </div>
            </div>
        );
    }

    doDamage(damage) {
        if (this.state.current_health > 1) {
            this.setState({ current_health: this.state.current_health - damage <= 0 ? 0 : this.state.current_health - damage });
        }
        else {
            this.gainXP();
            this.resetMonster();
        }
    }

    gainXP() {
        this.setState({ xp: this.state.xp + 1 }, () => {
            if (this.state.xp === this.state.xp_required) {
                this.levelUp();
            }
        });
    }

    levelUp() {
        this.setState({ max_health: this.state.max_health + 5 }, () => {
            this.setState({ current_health: this.state.max_health });
        });
        this.setState({ xp: 0 });
        this.setState({ xp_required: this.state.xp_required + 5 });
        this.setState({ current_level: this.state.current_level + 1 });
    }

    resetMonster() {
        this.setState({ current_health: this.state.max_health });
        this.setState({ monsters_killed: this.state.monsters_killed + 1 });
        this.addGold(1, 3);
    }

    addGold(min, max) {
        var rand = Math.round( Math.random() * (max - min) + min );

        this.setState({ gold: this.state.gold + rand})
    }
    
    updateTime() {
        this.state.time.setSeconds(this.state.time.getSeconds()+1);
    }
}

export default App;
