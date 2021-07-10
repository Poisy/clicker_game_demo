
export function getItem(type, id) {
    var items = require('.././data/items.json');

    if (containsItem(items[type], id)) {
        let item = items[type][id];
        item['level'] = id;
        return item;
    }
    else {
        return null;
    }
}

function containsItem(items, id) {
    return items[id] !== undefined;
}

export function getQuest(type, id) {
    var quests = require('.././data/quests.json');

    if (containsItem(quests[type]['goals'], id)) {
        let quest = {
            id : id,
            progress : 0,
            goal : quests[type]['goals'][id],
            reward : quests[type]['rewards'][id]
        };
        return quest;
    }
    else {
        return null;
    }
}

export function getQuestCollector(id) {
    var quests = require('.././data/quests.json');

    if (containsItem(quests['collector']['goals'], id)) {
        let quest = {
            id : id + 1,
            progress : 0,
            goal : 5,
            type : quests['collector']['goals'][id],
            reward : quests['collector']['rewards'][id]
        };
        return quest;
    }
    else {
        return null;
    }
}