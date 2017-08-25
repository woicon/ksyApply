var md5 = require('libs/md5/md5.min.js');
//var xmltojson = require('utils/xmlToJson.js');
// var xmlToJSON = require('libs/xmlToJSON/xmlToJSON.js');
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
    // toJSON:function(xml){
    //    // var testxml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><ebill><service>agent_app_upload_file</service><partner_id>16122916164159599</partner_id><sign_type>MD5</sign_type><input_charset>UTF-8</input_charset><sign>30ee41d68bdebd4de0131f1e144251c3</sign><version>1.0</version><is_success>S</is_success><error>SUCCESS</error><message>SUCCESS</message><file_url>http://static.solaridc.com/public_upload/lft_app/dls20170825101607_tmp_1728226528o6zAJs-dDuoRBcvYpUKkGSJmQGRA4a9e6950b94d8b9ab0a9c61050ce5a8c.png|</file_url></ebill>'
    //     // var XMLParser = new Parser.DOMParser();
    //     // var newXML = XMLParser.parseFromString(xml);
    //     var myOptions = {
    //        // mergeCDATA: false,
    //         xmlns: false,
    //         grokText:false,
    //         grokAttr:false,
    //         //attrsAsObject: false
    //         childrenAsArray:false,
    //         stripAttrPrefix:false
    //     }
        
    //     return xmlToJSON.xmlToJSON.parseString(xml, myOptions);
    //    // console.log(newXML);
    // },
    api:{
        host:'http://testfront.51ebill.com:65527/front/base/gateway.in ',
        key:'33e0d39f5b248d348813b97751ec4f32',
        partner_id:'16122916164159599',
        input_charset:'UTF-8',
        version:'1.0',
        core_merchant_no:'EW_N0644449919',
        tst:'s',
        service:{
            upfile: 'http://intfront.51ebill.com/front/agentAppV3/uploadFile.in'//文件上传
        }
    },
    //生成签名参数
    toParmas: function (parmas,key){
        var that = this;
        //只参与签名的参数
        var hashAttr = ["partner_id","service","version","input_charset","is_success","error","message","core_merchant_no","fund_pool_no","tradeDetails","thirdData","fop"];
        let hashList = {};
        for (let x in parmas){
            for (let i in hashAttr) {
                if (hashAttr[i] == x){
                    hashList[hashAttr[i]] = parmas[x]
                };
            }
        }
        let _parmas = that.sortObj(hashList);//排序
        let __parmas = that.parseParam(_parmas);//转URL转参数
        parmas.sign = md5(__parmas + key).toLowerCase();
        parmas.sign_type = 'MD5';
        return that.parseParam(parmas);
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
