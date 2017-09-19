var category = require('./data/businessCategory.js');
var bank = require('./data/bankData.js');
var area = require('./data/area.js');
let picker = require('./data/picker.js');
function setArrary(data) {
    let _arrary = [[], [], []];
    let toArrary = (item, index, array) => {
        return item.split('|');
    }
    data.map((item, index, arr) => {
        _arrary[index] = arr[index].map(toArrary);
    });
    return _arrary;
}
const areaArrey = setArrary(area);
const categoryArrey = setArrary(category);
module.exports = {
    category: categoryArrey,//经营类目
    area: areaArrey,
    change: function (pageDate,e,range){
        switch (e.column){
            case 0:
            let city = this.getNode(range[1], range[0][e.value][0]);
            return [pageDate[0], city, this.getNode(range[2], city[0][0])];
            break;
            case 1:
            return [pageDate[0], pageDate[1], this.getNode(range[2], pageDate[1][e.value][0])];
            break;
            case 2:
                return pageDate;
            break;
        }
    },
    getNode: function (data,id){
        let isId = (value, index, array) => {
            return array[index][2] == id
        }
        return data.filter(isId);
    },
    initRange:function(range){
        return [range[0], this.getNode(range[1], range[0][0][0]), this.getNode(range[2], range[1][0][0])];
    }
}