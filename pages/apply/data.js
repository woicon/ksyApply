var category = require('./data/businessCategory.js');
var bank = require('./data/bankData.js');
var area = require('./data/area.js');

module.exports = {
    industry:category,//经营类目
    bank: bank,//浦发开户银行
    area:area,//银行开户地市选择
    setCategory: function (data,e){
        var initData = [[],[],[]];
        //column: 0, value: 2
        function setColumn(data,id){
            var column = [];
            // data.filter().map(data);
            for (i in data) {
                if (data[i].p_id == id) {
                    column.push(data[i]);
                }
            }
            return column;
        }
        if (e){  
            let nextColumn = data[e.column + 1];
            let sel = e.value + 1;
            switch (e.column) {
                case 0:
                    var nColumn = [], nsColumn = [];
                    initData[0] = data[0];
                    let nextColumns = data[e.column + 2];
                    initData[e.column + 1] = setColumn(nextColumn, sel);
                    nextid = setColumn(nextColumn, sel)[0].id;
                    initData[e.column + 2] = setColumn(nextColumns, nextid);
                    return initData;
                break;
                case 1:
                    var nColumn = [];
                    initData[0] = data[0];
                    for (let i in nextColumn) {
                        if (nextColumn[i].p_id == sel) {
                            nColumn.push(nextColumn[i]);
                        }
                    }
                    return nColumn;
                break;
                case 2:
                break;
            }
        }else{
            //初始化
            initData = [data[0], setColumn(data[1], 1), setColumn(data[2], 1)];
            return initData;
        }
    },
    columnChange:function(data,e){
        return this.setCategory(data,e);
    },
    
}