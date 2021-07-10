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

                <p>Head: {this.props.head['name'] + " Helmet" + " "} 
                    { !this.props.head.max_level ?
                        <button class="btn btn-primary" onClick={() => this.props.upgradeItem('head')} 
                                title={"DPS: " + this.props.head['dps']}>
                                    
                            Upgrade for <span style={{fontSize : 13 }} class="badge bg-secondary">{this.props.head['gold']}</span> Gold
                        </button> : null
                    }
                </p>
                
                <p>Shoulders: {this.props.shoulders['name'] + " Shoulders" + " "} 
                    { !this.props.shoulders.max_level ?
                        <button onClick={() => this.props.upgradeItem('shoulders')} 
                                title={"DPS: " + this.props.shoulders['dps']}>
                            Upgrade for {this.props.shoulders['gold']} Gold
                        </button> : null
                    }
                </p>
                
                <p>Chest: {this.props.chest['name'] + " Chest" + " "}
                    { !this.props.chest.max_level ?
                        <button onClick={() => this.props.upgradeItem('chest')} 
                                title={"DPS: " + this.props.chest['dps']}>
                            Upgrade for {this.props.chest['gold']} Gold
                        </button> : null
                    }    
                </p>
                
                <p>Legs: {this.props.legs['name'] + " Leggings" + " "}  
                    { !this.props.legs.max_level ?
                        <button onClick={() => this.props.upgradeItem('legs')} 
                                title={"DPS: " + this.props.legs['dps']}>
                            Upgrade for {this.props.legs['gold']} Gold
                        </button> : null
                    }
                </p>

                <p>Boots: {this.props.boots['name']+ " Boots" + " "}  
                    { !this.props.boots.max_level ? 
                        <button onClick={() => this.props.upgradeItem('boots')} 
                                title={"DPS: " + this.props.boots['dps']}>
                            Upgrade for {this.props.boots['gold']} Gold
                        </button> : null 
                    }
                </p>

                <p>Weapon: {this.props.weapon['name']+ " Sword" + " "}
                    { !this.props.weapon.max_level ? 
                        <button onClick={() => this.props.upgradeItem('weapon')} 
                                title={"DMG : " + this.props.weapon['dmg']}>
                            Upgrade for {this.props.weapon['gold']} Gold
                        </button> : null 
                    }
                </p>

                <p>Shield: {this.props.shield['name'] + " Shield" + " "}  
                    { !this.props.shield.max_level ? 
                        <button onClick={() => this.props.upgradeItem('shield')} 
                                title={"DMG : " + this.props.shield['dmg']}>
                            Upgrade for {this.props.shield['gold']} Gold
                        </button> : null 
                    }
                </p>

                <p>Neck: {this.props.neck['name']+ " Necklace" + " "}
                    { !this.props.neck.max_level ?
                        <button onClick={() => this.props.upgradeItem('neck')} 
                                title="to be added">
                        Upgrade for {this.props.neck['gold']} Gold
                        </button> : null
                    }
                </p>

                <p>Ring 1: {this.props.ring1['name'] + " Click Damage Ring" + " "}
                    { !this.props.ring1.max_level ?
                        <button onClick={() => this.props.upgradeItem('ring1')} 
                                title="to be added">
                        Upgrade for {this.props.ring1['gold']} Gold
                        </button> : null 
                    }
                </p>

                <p>Ring 2: {this.props.ring2['name'] + " Idle Damage Ring" + " "}
                    { !this.props.ring2.max_level ?
                        <button onClick={() => this.props.upgradeItem('ring2')} 
                                title="to be added">
                        Upgrade for {this.props.ring2['gold']} Gold
                        </button> : null 
                    }
                </p>

            </div>
        )
    }
}

export default LeftPanel
