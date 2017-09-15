var xmlToJSON = require('../libs/xmlToJSON/xmlToJSON.js');
var md5 = require('../libs/md5/md5.min.js');
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const app ={
    appId:'wxea7c589ca4c29bd4',
    appSecret:'61b6dd0b328b48fac3517bfc62d75fc4'
}
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
function getNowDate() {
    return formatTime(new Date());
}
function sedMsg(){

}
//XML转JSON /(ㄒoㄒ)/
function XMLtoJSON(xml) {
    var myOptions = {
        normalize: false,
        mergeCDATA: false,
        xmlns: true,
        grokText: false,
        textKey: false,
        grokAttr: false,
        childrenAsArray: false,
        stripAttrPrefix: false,
        stripElemPrefix: false,
        normalize: false,
        attrsAsObject: false
    }
    return xmlToJSON.xmlToJSON.parseString(xml, myOptions);
}
//对象排序
function sortObj(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push([i, obj[i]]);
    };
    arr.sort();
    var len = arr.length,
        obj = {};
    for (var i = 0; i < len; i++) {
        obj[arr[i][0]] = arr[i][1];
    }
    return obj;
}

//转URL参数
function parseParam(obj, encode) {
    function toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        if (encode) {
            return key + '=' + encodeURIComponent(value === null ? '' : String(value));
        } else {
            return key + '=' + (value === null ? '' : String(value));
        }
    }
    var ret = [];
    for (var key in obj) {
        key = encode ? encodeURIComponent(key) : key;
        var values = obj[key];
        if (values && values.constructor == Array) {//数组
            var queryValues = [];
            for (var i = 0, len = values.length, value; i < len; i++) {
                value = values[i];
                queryValues.push(toQueryPair(key, value));
            }
            ret = ret.concat(queryValues);
            console.log(ret);
        } else { //字符串
            ret.push(toQueryPair(key, values));
        }
    }
    return ret.join('&');
}

function toQueryParams(par) {
    var search = par.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/);
    if (!search) {
        return {};
    }
    var searchStr = search[1];
    var searchHash = searchStr.split('&');
    var ret = {};
    searchHash.forEach(function (pair) {
        var temp = '';
        if (temp = (pair.split('=', 1))[0]) {
            var key = decodeURIComponent(temp);
            var value = pair.substring(key.length + 1);
            if (value != undefined) {
                value = decodeURIComponent(value);
            }
            if (key in ret) {
                if (ret[key].constructor != Array) {
                    ret[key] = [ret[key]];
                }
                ret[key].push(value);
            } else {
                ret[key] = value;
            }
        }
    });
    return ret;
}
let reg = {
    business:/^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/,
    phone: /^[1][3,4,5,7,8][0-9]{9}$/,
    chinese:/^[\u0391-\uFFE5]+$/,
    idcard:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/,
}
function getToken(){
    // wx.request({
    //     url: 'http://wxcs.liantuo.com/app/token.do?'+a.appId+'&appSecret='+a.appSecret,
    //     method:'POST',
    //     success: function (res) {
    //         return res.data.result;
    //     }
    // });
}
function validation(str,reg){
    let res = reg.test(str);
    return res;
}
//生成签名参数
function getSign(parmas, key) {
    var that = this;
    let _parmas = sortObj(parmas);
    let __parmas = parseParam(_parmas);
    parmas.sign = md5(__parmas + key).toLowerCase();
    parmas.sign_type = 'MD5';
    return parmas;
}
module.exports = {
    XMLtoJSON: XMLtoJSON,
    formatTime: formatTime,
    getNowDate: getNowDate,
    toQueryParams: toQueryParams,
    parseParam: parseParam,
    sortObj: sortObj,
    getSign:getSign,
    reg:reg,
    validation: validation,
    app:app,
    getToken: getToken,
}
