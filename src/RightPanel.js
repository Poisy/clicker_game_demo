import React, { Component } from 'react';
import './styles/bootstrap.min.css';
import './styles/debug.css';

export class RightPanel extends Component {
    render() {
        return (
            <div className="col debug_panel">
    	        <button onClick={this.props.save}>Save</button>
                
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        {
                            this.props.quests.hunter !== null ? 
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Hunter {this.props.quests.hunter.id+1}</div>
                                Kill {this.props.quests.hunter.goal} of these little cute creatures!
                            </div> : 
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Hunter Quests Completed!</div>
                            </div>
                        }
                        
                        {
                            this.props.quests.hunter !== null ? 
                            <span className="badge bg-primary rounded-pill">
                                {this.props.quests.hunter.progress} / {this.props.quests.hunter.goal}
                            </span> : null
                        }
                        
                    </li>


                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        {
                            this.props.quests.miner !== null ?
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Miner {this.props.quests.miner.id+1}</div>
                                    Collect {this.props.quests.miner.goal} Gold!
                            </div> :
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Miner Quests Completed!</div>
                            </div>
                        }

                        {
                            this.props.quests.miner !== null ? 
                            <span className="badge bg-primary rounded-pill">
                                {this.props.quests.miner.progress} / {this.props.quests.miner.goal}
                            </span> : null
                        }
                    </li>


                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        {
                            this.props.quests.fighter !== null ?
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Fighter {this.props.quests.fighter.id+1}</div>
                                Deal {this.props.quests.fighter.goal} Damage!
                            </div> :
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Fighter Quests Completed!</div>
                            </div>
                        }

                        {
                            this.props.quests.fighter !== null ? 
                            <span className="badge bg-primary rounded-pill">
                                {this.props.quests.fighter.progress} / {this.props.quests.fighter.goal}
                            </span> : null
                        }
                    </li>


                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        {
                            this.props.quests.watchmaker !== null ?
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Watchmaker {this.props.quests.watchmaker.id+1}</div>
                                Play for {this.props.quests.watchmaker.goal} Minutes!
                            </div> :
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Watchmaker Quests Completed!</div>
                            </div>
                        }

                        {
                            this.props.quests.watchmaker !== null ? 
                            <span className="badge bg-primary rounded-pill">
                                {this.props.quests.watchmaker.progress} / {this.props.quests.watchmaker.goal}
                            </span> : null
                        }
                    </li>
                    

                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        {
                            this.props.quests.collector !== null ?
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Collector {this.props.quests.collector.id}</div>
                                Collect full {this.props.quests.collector.type} set!
                            </div> :
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Collector Quests Completed!</div>
                            </div>
                        }

                        {
                            this.props.quests.collector !== null ? 
                            <span className="badge bg-primary rounded-pill">
                                {this.props.quests.collector.progress} / {this.props.quests.collector.goal}
                            </span> : null
                        }
                    </li>



                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        {
                            this.props.quests.evolutioner !== null ?
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Evolutioner {this.props.quests.evolutioner.id+1}</div>
                                Reach {this.props.quests.evolutioner.goal} level!
                            </div> :
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Evolutioner Quests Completed!</div>
                            </div>
                        }

                        {
                            this.props.quests.evolutioner !== null ? 
                            <span className="badge bg-primary rounded-pill">
                                {this.props.quests.evolutioner.progress} / {this.props.quests.evolutioner.goal}
                            </span> : null
                        }
                    </li>

                </ol>

            </div>
        )
    }
}

export default RightPanel;