
function getItem(type, id) {
    var items = require('.././data/items.json');

    if (containsItem(items[type], id)) {
        return items[type][id];
    }
    else {
        return null;
    }
}

function containsItem(items, id) {
    try {
        let a = items[id];
    } catch (e) {
        return false;
    }
    return true;
}

export default getItem;