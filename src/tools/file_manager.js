
function getItem(type, id) {
    var items = require('.././data/items.json');
    return items[type][id];
}

export default getItem;