import { getQuest } from "./file_manager.js";
import { getQuestCollector } from "./file_manager.js";


class QuestManager {

    constructor() {

    }


    CheckHunter(quests) {
        return this.CheckQuest(quests, 'hunter');
    }
    
    CheckMiner(quests, value) {
        return this.CheckQuest(quests, 'miner', value);
    }

    CheckFighter(quests, value) {
        return this.CheckQuest(quests, 'fighter', value);
    }

    CheckWatchmaker(quests) {
        return this.CheckQuest(quests, 'watchmaker');
    }

    CheckEvolutioner(quests) {
        return this.CheckQuest(quests, 'evolutioner');
    }

    CheckCollector(quests) {
        let next_quest =  getQuestCollector(quests.collector.id);

        quests.collector = next_quest;

        return quests;
    }
    	
    
    CheckQuest(quests, name, value = 1) {
        let is_completed = false;   
        let current_quest = this.GetQuest(quests, name);

        if (current_quest.progress + value >= current_quest.goal) {
            is_completed = true;
            
            let next_quest =  getQuest(name, current_quest.id+1);

            this.SetQuest(quests, next_quest, name);
        }
        else {  
            current_quest.progress = current_quest.progress + value;

            this.SetQuest(quests, current_quest, name);
        }

        return { quests : quests, is_completed : is_completed };
    }

    GetQuest(quests, name) {
        switch (name) {
            case 'hunter' : return quests.hunter;
            case 'miner' : return quests.miner;
            case 'fighter' : return quests.fighter;
            case 'watchmaker' : return quests.watchmaker;
            case 'collector' : return quests.collector;
            case 'evolutioner' : return quests.evolutioner;
        }
    }

    SetQuest(quests, quest, name) {
        switch (name) {
            case 'hunter' : quests.hunter = quest; break;
            case 'miner' : quests.miner = quest; break;
            case 'fighter' : quests.fighter = quest; break;
            case 'watchmaker' : quests.watchmaker = quest; break;
            case 'collector' : quests.collector = quest; break;
            case 'evolutioner' : quests.evolutioner = quest; break;
        }
    }
}

export default QuestManager;