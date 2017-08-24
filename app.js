var md5 = require('libs/md5/md5.min.js');
var xmltojson = require('utils/xmlToJson.js');
var Parser = require('libs/xmldom/dom-parser.js');
App({
    onLaunch: function () {
        var that = this;
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session',
                        data: {
                            js_code: res.code,
                            appid: 'wxea7c589ca4c29bd4',
                            secret: '61b6dd0b328b48fac3517bfc62d75fc4',
                            grant_type: res.code
                        },
                        success: function (res) {
                            that.api.openId = res.data.openid
                        },
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },
    toJSON:function(xml){
        var XMLParser = new Parser.DOMParser();
        var newXML = XMLParser.parseFromString(xml);
        return newXML;
    },
    api:{
        host:'http://testfront.51ebill.com:65527/front/base/gateway.in ',
        key:'33e0d39f5b248d348813b97751ec4f32',
        pid:'16122916164159599',
        input_charset:'UTF-8',
        version:'1.0',
        core_merchant_no:'EW_N0644449919',
        service:{
            upfile: 'http://intfront.51ebill.com/front/agentAppV3/uploadFile.in'//文件上传
        }
    },
    //生成签名参数
    toParmas: function (pars,key){
        var that = this;
        var _parmas = that.sortObj(pars);//排序
        var __parmas = that.parseParam(_parmas);//转URL转参数
        _parmas.sign = md5(__parmas + key).toLowerCase();
        _parmas.sign_type = 'MD5';
        return that.parseParam(_parmas);
    },
    //对象排序
    sortObj:function (obj) {
        var arr = [];
        for (var i in obj) {
            arr.push([i, obj[i]]);
        };
        console.log(arr);
        arr.sort();
        var len = arr.length,
            obj = {};
        for (var i = 0; i < len; i++) {
            obj[arr[i][0]] = arr[i][1];
        }
        return obj;
    },
    //转URL参数
    parseParam: function (obj, key, encode){
        function toQueryPair(key, value) {
            if (typeof value == 'undefined') {
                return key;
            }
            return key + '=' + encodeURIComponent(value === null ? '' : String(value));
        }
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
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
    },
    toQueryParams: function (par) {
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
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },
    globalData: {
        userInfo: null,
    }
})
