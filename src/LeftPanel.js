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

                <p>Head: {this.props.head['name']} 
                    { !this.props.head.max_level ?
                        <button onClick={() => this.props.upgradeItem('head')} 
                                title={"DPS: " + this.props.head['dmg']}>
                            Upgrade for {this.props.head['gold']} Gold
                        </button> : null
                    }
                </p>
                
                <p>Shoulders: {this.props.shoulders['name']} 
                    { !this.props.shoulders.max_level ?
                        <button onClick={() => this.props.upgradeItem('shoulders')} 
                                title={"DPS: " + this.props.shoulders['dmg']}>
                            Upgrade for {this.props.shoulders['gold']} Gold
                        </button> : null
                    }
                </p>
                
                <p>Chest: {this.props.chest['name']}
                    { !this.props.chest.max_level ?
                        <button onClick={() => this.props.upgradeItem('chest')} 
                                title={"DPS: " + this.props.chest['dmg']}>
                            Upgrade for {this.props.chest['gold']} Gold
                        </button> : null
                    }    
                </p>
                
                <p>Legs: {this.props.legs['name']}  
                    { !this.props.legs.max_level ?
                        <button onClick={() => this.props.upgradeItem('legs')} 
                                title={"DPS: " + this.props.legs['dmg']}>
                            Upgrade for {this.props.legs['gold']} Gold
                        </button> : null
                    }
                </p>

                <p>Boots: {this.props.boots['name']}  
                    { !this.props.boots.max_level ? 
                        <button onClick={() => this.props.upgradeItem('boots')} 
                                title={"DPS: " + this.props.boots['dmg']}>
                            Upgrade for {this.props.boots['gold']} Gold
                        </button> : null 
                    }
                </p>

                <p>Weapon: {this.props.weapon}
                    <button onClick={() => this.props.upgradeItem('weapon')} 
                            title="to be added">
                       Upgrade for 
                    </button>
                </p>

                <p>Shield: {this.props.shield}  
                    <button onClick={() => this.props.upgradeItem('shield')} 
                            title="to be added">
                        Upgrade for 
                    </button>
                </p>

                <p>Neck: {this.props.neck['name']}
                    { !this.props.neck.max_level ?
                        <button onClick={() => this.props.upgradeItem('neck')} 
                                title="to be added">
                        Upgrade for {this.props.neck['gold']} Gold
                        </button> : null
                    }
                </p>

                <p>Ring: {this.props.ring['name']}
                    { !this.props.ring.max_level ?
                        <button onClick={() => this.props.upgradeItem('ring')} 
                                title="to be added">
                        Upgrade for {this.props.ring['gold']} Gold
                        </button> : null 
                    }
                </p>

            </div>
        )
    }
}

export default LeftPanel
