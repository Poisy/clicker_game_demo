 import React, { Component } from 'react';
import './styles/App.css';
import './styles/bootstrap.min.css';
import { LeftPanel } from './LeftPanel.js';
import { RightPanel } from './RightPanel.js';
import { MiddlePanel } from './MiddlePanel.js';
import Timer from './tools/timer.js';
import { getItem } from './tools/file_manager.js';
import QuestManager from './tools/quest_manager.js';
import './styles/debug.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_health: 10,
            max_health: 10,
            click_damage: 0,
            idle_damage: 0,
            monsters_killed: 0,
            current_level: 1,   	
            xp: 0,
            xp_required: 5,
            gold: 0,
            playtime: "00:00:00",
            head : {  },
            chest : {  },
            shoulders : {  },
            legs : {  },
            boots : {  },
            weapon : {  },
            shield : {  },
            neck : {  },
            ring1 : {  },
            ring2 : {  },
            quests : { 
                hunter : { },
                miner : { },
                fighter : { },
                watchmaker : { },
                collector : { },
                evolutioner : { }
             }
        }
        this.api = 'https://api.npoint.io/7fae27cfdcdb83c72349';
        this.min_drop_gold = 1;
        this.max_drop_gold = 3;
    }

    // Method that is called at the creation of the component
    componentDidMount() {
        this.loadSave(() => {
            if (this.state.neck.level !== 0) {
                this.max_drop_gold = this.state.neck.income;
                this.min_drop_gold = parseInt(this.max_drop_gold / 2, 10);
            }
            this.recalculateClickDamage();
            this.recalculateIdleDamage();
            this.timer = new Timer(this.state.playtime);
            this.timer.start((time) => {
                this.setState({ playtime: time });
                this.doDamage(this.state.idle_damage);
                this.checkWatchmakerQuest(time);
            });
            this.quest_manager = new QuestManager();
        });
    }


    render() {   
        return (
            <div className="App container">
                <div className="row abv">
                     
                    <LeftPanel
    	                dps = {this.state.idle_damage} 
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
                        weapon={this.state.weapon}
                        shield={this.state.shield}
                        neck={this.state.neck}
                        ring1={this.state.ring1}
                        ring2={this.state.ring2}>
                    </LeftPanel>

                    <MiddlePanel
                        xp={this.state.xp}
                        xp_required={this.state.xp_required}
                        max_health={this.state.max_health}
                        current_health={this.state.current_health}
                        doDamage={() => this.doDamage(this.state.click_damage)}>
                    </MiddlePanel> 

                    <RightPanel 
                        save={this.writeSave.bind(this)}
                        quests={this.state.quests}>
                    </RightPanel>
                    
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

        this.checkFighterQuest(damage);
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
        this.checkEvolutionerQuest();
    }

    resetMonster() {
        this.setState({ current_health: this.state.max_health });
        this.setState({ monsters_killed: this.state.monsters_killed + 1 }, () => {
            this.checkHunterQuest();
        }); 
        this.addGold(this.min_drop_gold, this.max_drop_gold);
    }

    addGold(min, max, countInQuest = true) {
        var rand = Math.round( Math.random() * (max - min) + min );

        if (countInQuest) this.checkMinerQuest(rand);

        this.setState({ gold : this.state.gold + rand });
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
            case "weapon": 
                this.upgradeWeapon();
                break;
            case "shield": 
                this.upgradeShield();
                break;
            case "neck": 
                this.upgradeNeck();
                break;
            case "ring1": 
                this.upgradeRing1();
                break;
            case "ring2": 
                this.upgradeRing2();
                break;
            default:
                break;
        }
    }

    upgradeHead() {
        let new_item = getItem('head', this.state.head.level);
        let next_item = getItem('head', this.state.head.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ head : new_item }, () => {
                this.recalculateIdleDamage();
                this.checkCollectorQuest(this.state.head.level);
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeShoulders() {
        let new_item = getItem('shoulders', this.state.shoulders.level);
        let next_item = getItem('shoulders', this.state.shoulders.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ shoulders : new_item }, () => {
                this.recalculateIdleDamage();
                this.checkCollectorQuest(this.state.shoulders.level);
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeChest() {
        let new_item = getItem('chest', this.state.chest.level);
        let next_item = getItem('chest', this.state.chest.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ chest : new_item }, () => {
                this.recalculateIdleDamage();
                this.checkCollectorQuest(this.state.chest.level);
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeLegs() {
        let new_item = getItem('legs', this.state.legs.level);
        let next_item = getItem('legs', this.state.legs.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ legs : new_item }, () => {
                this.recalculateIdleDamage();
                this.checkCollectorQuest(this.state.legs.level);
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeBoots() {
        let new_item = getItem('boots', this.state.boots.level);
        let next_item = getItem('boots', this.state.boots.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ boots : new_item }, () => {
                this.recalculateIdleDamage();
                this.checkCollectorQuest(this.state.boots.level);
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeWeapon() {
        let new_item = getItem('weapon', this.state.weapon.level);
        let next_item = getItem('weapon', this.state.weapon.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ weapon : new_item }, () => {
                this.recalculateClickDamage();
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeShield() {
        let new_item = getItem('shield', this.state.shield.level);
        let next_item = getItem('shield', this.state.shield.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ shield : new_item }, () => {
                this.recalculateClickDamage();
            });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeNeck() {
        let new_item = getItem('neck', this.state.neck.level);
        let next_item = getItem('neck', this.state.neck.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            this.max_drop_gold = new_item['income'];
            this.min_drop_gold = parseInt(this.max_drop_gold / 2, 10);
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ neck : new_item });
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeRing1() {
        let new_item = getItem('ring1', this.state.ring1.level);
        let next_item = getItem('ring1', this.state.ring1.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ ring1 : new_item }, () => {
                this.recalculateClickDamage();
            });
            
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    upgradeRing2() {
        let new_item = getItem('ring2', this.state.ring2.level);
        let next_item = getItem('ring2', this.state.ring2.level+1);

        if (next_item == null) {
            new_item.max_level = true;
        }

        if (this.state.gold >= new_item['gold']) {
            this.setState({ gold : this.state.gold - new_item['gold'] });
            new_item.level++;
            new_item['gold'] = next_item == null ? new_item['gold'] : next_item['gold'];
            this.setState({ ring2 : new_item }, () => {
                this.recalculateIdleDamage();
            });
            
        }
        else {
            alert("You don't have enough Gold!");
        }
    }

    recalculateClickDamage() {
        this.setState({ click_damage : (this.state.weapon.dmg * this.state.ring1.click_damage) + 
            (this.state.shield.dmg * this.state.ring1.click_damage) })
    }
    
    recalculateIdleDamage() {
        this.setState({ idle_damage : (this.state.head.dps * this.state.ring2.idle_damage) + 
            (this.state.shoulders.dps * this.state.ring2.idle_damage) +
            (this.state.chest.dps * this.state.ring2.idle_damage) +
            (this.state.legs.dps * this.state.ring2.idle_damage) +
            (this.state.boots.dps * this.state.ring2.idle_damage) })
    }

    loadSave(callback) {
        fetch(this.api)
        .then(response => response.json())
        .then(data => {
            this.setState({ current_level : data['level'] });
            this.setState({ xp : data['xp'] });
            this.setState({ xp_required : data['xp_required'] });
            this.setState({ gold : data['gold'] });
            this.setState({ monsters_killed : data['monsters_killed'] });
            this.setState({ max_health : data['max_health'] });
            this.setState({ playtime : data['playtime'] });
            this.setState({ head : data['head'] });
            this.setState({ shoulders : data['shoulders'] });
            this.setState({ chest : data['chest'] });
            this.setState({ legs : data['legs'] });
            this.setState({ boots : data['boots'] });
            this.setState({ weapon : data['weapon'] });
            this.setState({ shield : data['shield'] });
            this.setState({ neck : data['neck']});
            this.setState({ ring1 : data['ring1'] });
            this.setState({ ring2 : data['ring2'] });
            this.setState({ quests : {
                hunter : data['hunter'],
                miner : data['miner'],
                fighter : data['fighter'],
                watchmaker : data['watchmaker'],
                collector : data['collector'],
                evolutioner : data['evolutioner']
            }});
        })
        .finally(() => {
            callback();
        });

    }

    writeSave() {
        console.log("writeSave called!");
        fetch(this.api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level : this.state.current_level,
                xp : this.state.xp,
                xp_required : this.state.xp_required,
                gold : this.state.gold,
                monsters_killed : this.state.monsters_killed,
                max_health : this.state.max_health,
                playtime : this.state.playtime,
                head : this.state.head,
                shoulders : this.state.shoulders,
                chest : this.state.chest,
                legs : this.state.legs,
                boots : this.state.boots,
                weapon : this.state.weapon,
                shield : this.state.shield,
                neck : this.state.neck,
                ring1 : this.state.ring1,
                ring2 : this.state.ring2,
                hunter : this.state.quests.hunter,
                miner : this.state.quests.miner,
                fighter : this.state.quests.fighter,
                watchmaker : this.state.quests.watchmaker,
                collector : this.state.quests.collector,
                evolutioner : this.state.quests.evolutioner
            }),
        })
        .then(response => response.json())
        // .then(data => {
        //     console.log('Success: ', data);
        // })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    checkHunterQuest() {
        if (this.state.quests.hunter !== null) {
            let quest_result = this.quest_manager.CheckHunter(this.state.quests);
            this.setState({ quests : quest_result.quests }, () => {
                if (quest_result.is_completed && quest_result.quests.hunter !== null) {
                    let reward = quest_result.quests.hunter.reward;
                    this.addGold(reward, reward, false);
                }
            });
        }
    }

    checkMinerQuest(gold) {
        if (this.state.quests.miner !== null) {
            let quest_result = this.quest_manager.CheckMiner(this.state.quests, gold);
            this.setState({ quests : quest_result.quests }, () => {
                if (quest_result.is_completed && quest_result.quests.miner !== null) {
                    let reward = quest_result.quests.miner.reward;
                    this.addGold(reward, reward, false);
                }
            });
        }
    }

    checkFighterQuest(damage) {
        if (this.state.quests.fighter !== null) {
            let quest_result = this.quest_manager.CheckFighter(this.state.quests, damage);
            this.setState({ quests : quest_result.quests }, () => {
                if (quest_result.is_completed && quest_result.quests.fighter !== null) {
                    let reward = quest_result.quests.fighter.reward;
                    this.addGold(reward, reward, false);
                }
            });
        }
    }

    checkWatchmakerQuest(time) {
        // time => "{hours}:{minutes}:{seconds}"
        let time_array = time.split(':'); // ["{hours}", "{minutes}", "{seconds}"]
        let hours = parseInt(time_array[0]);
        let minutes = parseInt(time_array[1]);
        let seconds = parseInt(time_array[2]);
        if (seconds === 59) {
            if (this.state.quests.watchmaker !== null) {
                let quest_result = this.quest_manager.CheckWatchmaker(this.state.quests);
                this.setState({ quests : quest_result.quests }, () => {
                    if (quest_result.is_completed && quest_result.quests.watchmaker !== null) {
                        let reward = quest_result.quests.watchmaker.reward;
                        this.addGold(reward, reward, false);
                    }
                });
            }
        }
    }
    
    checkEvolutionerQuest() {
        if (this.state.quests.evolutioner !== null) {
            let quest_result = this.quest_manager.CheckEvolutioner(this.state.quests);
            this.setState({ quests : quest_result.quests }, () => {
                if (quest_result.is_completed && quest_result.quests.evolutioner !== null) {
                    let reward = quest_result.quests.evolutioner.reward;
                    this.addGold(reward, reward, false);
                }
            });
        }
    }

    checkCollectorQuest(item_level) {
        if (this.state.quests.evolutioner !== null) {
            let quest_level = this.state.quests.collector.id;

            if (item_level === quest_level) {
                let quests = this.state.quests;
                quests.collector.progress++;
                this.setState({ quests : quests });
            }

            if (this.state.head.level >= quest_level && this.state.shoulders.level >= quest_level && 
            this.state.chest.level >= quest_level && this.state.legs.level >= quest_level && 
            this.state.boots.level >= quest_level) {
                let quest_result = this.quest_manager.CheckCollector(this.state.quests);
                this.setState({ quests : quest_result }, () => {
                    if (quest_result.collector !== null) {
                        let reward = quest_result.collector.reward;
                        this.addGold(reward, reward, false);

                        let levels = [this.state.head.level, this.state.shoulders.level, this.state.chest.level,
                            this.state.legs.level, this.state.boots.level];
                        
                        levels.forEach(level => {
                            quest_level = this.state.quests.collector.id;    
                            if (level >= quest_level) {
                                let quests = this.state.quests;
                                quests.collector.progress++;
                                this.setState({ quests : quests });
                            }
                        });
                    }
                });
            }
        }
        
    }
}

export default App;