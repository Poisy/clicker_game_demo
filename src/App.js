import React, { Component } from 'react';
import './styles/App.css';
import './styles/bootstrap.min.css';
import { LeftPanel } from './LeftPanel.js';
import { RightPanel } from './RightPanel.js';
import { MiddlePanel } from './MiddlePanel.js';
import Timer from './tools/timer.js';
import getItem from './tools/file_manager.js';
import './styles/debug.css';

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
            playtime: "00:00:00",
            head : { name : "leather", dmg : 5, gold : 25 },
            chest : { name : "leather", dmg : 5, gold : 25 },
            shoulders : { name : "leather", dmg : 5, gold : 25 },
            legs : { name : "leather", dmg : 5, gold : 25 },
            boots : { name : "leather", dmg : 5, gold : 25 },
            neck : { name : "iron necklace of good fortune", dmg : 5, gold : 25 },
            ring : { name : "iron ring of strength", dmg : 5, gold : 25 }
        }
        this.head = 0;
        this.shoulders = 0;
        this.chest = 0;
        this.legs = 0;
        this.boots = 0;
        this.neck = 0;
        this.ring = 0;
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
                <div className="row abv">
                     
                    <LeftPanel
    	                dps = {this.state.damage_per_second} 
                        gold={this.state.gold}
                        current_level={this.state.current_level}
                        click_damage={this.state.click_damage}
                        monsters_killed={this.state.monsters_killed}
                        playtime={this.state.playtime}
                        upgradeItem={(type) => this.upgradeItem(type)}
                        head={this.state.head}
                        shoulders={this.state.shoulders}
                        chest={this.state.chest}
                        legs={this.state.legs}
                        boots={this.state.boots}
                        neck={this.state.neck}
                        ring={this.state.ring}>
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

    upgradeItem(type) {
        let current_item;

        switch (type) {
            case "head": 
                current_item = this.head;
                break;
            case "shoulders": 
                current_item = this.shoulders;
                break;
            case "chest": 
                current_item = this.chest;
                break;
            case "legs": 
                current_item = this.legs;
                break;
            case "boots": 
                current_item = this.boots;
                break;
            case "neck": 
                current_item = this.neck;
                break;
            case "ring": 
                current_item = this.ring;
                break;
            default:
                break;
        }

        let new_item = getItem(type, current_item+1);
        console.log(new_item['name']);
        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] }, () => {
                switch (type) {
                    case "head": 
                        this.head++;
                        this.setState({ head : new_item });
                        break;
                    case "shoulders": 
                        this.shoulders++;
                        this.setState({ shoulders : new_item });
                        break;
                    case "chest": 
                        this.chest++;
                        this.setState({ chest : new_item });
                        break;
                    case "legs": 
                        this.legs++;
                        this.setState({ legs : new_item });
                        break;
                    case "boots": 
                        this.boots++;
                        this.setState({ boots : new_item });
                        break;
                    case "neck": 
                        this.neck++;
                        this.setState({ neck : new_item });
                        break;
                    case "ring": 
                        this.ring++;
                        this.setState({ ring : new_item });
                        break;
                    default:
                        break;
                }
            });
        }
        else {
            alert("You have not enough Gold!");
        }
    }
}

export default App;
