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
            gold: 1111150,
            playtime: "00:00:00",
            head : { name : "Empty", dmg : 0, gold : 25, max_level : false },
            chest : { name : "Empty", dmg : 0, gold : 25, max_level : false },
            shoulders : { name : "Empty", dmg : 0, gold : 25, max_level : false },
            legs : { name : "Empty", dmg : 0, gold : 25, max_level : false },
            boots : { name : "Empty", dmg : 0, gold : 25, max_level : false },
            neck : { name : "Empty", income : 0, gold : 25, max_level : false },
            ring : { name : "Empty", income : 0, gold : 25, max_level : false }
        }
        this.head = -1;
        this.shoulders = -1;
        this.chest = -1;
        this.legs = -1;
        this.boots = -1;
        this.neck = -1;
        this.ring = -1;
        this.timer = new Timer(0, 0, 0);
        this.min_drop_gold = 1;
        this.max_drop_gold = 3;
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
        this.addGold(this.min_drop_gold, this.max_drop_gold);
    }

    addGold(min, max) {
        var rand = Math.round( Math.random() * (max - min) + min );

        this.setState({ gold: this.state.gold + rand})
    }
    
    updateTime() {
        this.state.time.setSeconds(this.state.time.getSeconds()+1);
    }

    upgradeItem(type) {
        switch (type) {
            case "head": 
                this.upgradeHead();
                break;
            case "shoulders": 
                this.upgradeShoulders();
                break;
            case "chest": 
                this.upgradeChest();
                break;
            case "legs": 
                this.upgradeLegs();
                break;
            case "boots": 
                this.upgradeBoots();
                break;
            case "neck": 
                this.upgradeNeck();
                break;
            case "ring": 
                this.upgradeRing();
                break;
            default:
                break;
        }
    }

    upgradeHead() {
        let new_item = getItem('head', this.head+1);
        let next_item = getItem('head', this.head+2);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            this.head++;
            let dps = this.state.damage_per_second - this.state.head.dmg + new_item['dmg'];
            this.setState({ damage_per_second : dps }, () => {
                new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
                this.setState({ head : new_item });
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeShoulders() {
        let new_item = getItem('shoulders', this.shoulders+1);
        let next_item = getItem('shoulders', this.shoulders+2);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            this.shoulders++;
            let dps = this.state.damage_per_second - this.state.shoulders.dmg + new_item['dmg'];
            this.setState({ damage_per_second : dps }, () => {
                new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
                this.setState({ shoulders : new_item });
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeChest() {
        let new_item = getItem('chest', this.chest+1);
        let next_item = getItem('chest', this.chest+2);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            this.chest++;
            let dps = this.state.damage_per_second - this.state.chest.dmg + new_item['dmg'];
            this.setState({ damage_per_second : dps }, () => {
                new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
                this.setState({ chest : new_item });
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeLegs() {
        let new_item = getItem('legs', this.legs+1);
        let next_item = getItem('legs', this.legs+2);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            this.legs++;
            let dps = this.state.damage_per_second - this.state.legs.dmg + new_item['dmg'];
            this.setState({ damage_per_second : dps }, () => {
                new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
                this.setState({ legs : new_item });
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeBoots() {
        let new_item = getItem('boots', this.boots+1);
        let next_item = getItem('boots', this.boots+2);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            this.boots++;
            let dps = this.state.damage_per_second - this.state.boots.dmg + new_item['dmg'];
            this.setState({ damage_per_second : dps }, () => {
                new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
                this.setState({ boots : new_item });
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeWeapon() {
        let new_item = getItem('weapon', this.weapon+1);
        let next_item = getItem('weapon', this.weapon+2);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            this.weapon++;
            let dps = this.state.damage_per_second - this.state.weapon.dmg + new_item['dmg'];
            this.setState({ damage_per_second : dps }, () => {
                new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
                this.setState({ weapon : new_item });
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeShield() {
        let new_item = getItem('shield', this.shield+1);
        let next_item = getItem('shield', this.shield+2);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            this.shield++;
            let dps = this.state.damage_per_second - this.state.shield.dmg + new_item['dmg'];
            this.setState({ damage_per_second : dps }, () => {
                new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
                this.setState({ shield : new_item });
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeNeck() {
        let new_item = getItem('neck', this.neck+1);
        let next_item = getItem('neck', this.neck+2);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            this.neck++;
            this.max_drop_gold = new_item['income'];``
            this.min_drop_gold = parseInt(this.max_drop_gold / 2, 10);
            console.log(this.max_drop_gold);
            console.log(this.min_drop_gold);
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ neck : new_item });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeRing() {
        let new_item = getItem('ring', this.ring+1);
        let next_item = getItem('ring', this.ring+2);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            this.ring++;
            let dps = this.state.damage_per_second - this.state.ring.dmg + new_item['dmg'];
            this.setState({ damage_per_second : dps }, () => {
                new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
                this.setState({ ring : new_item });
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }
}

export default App;
