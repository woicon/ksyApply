//app.js
var md5 = require('utils/md5.min.js');
var xmltojson = require('utils/xmlToJson.js');
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var that = this;
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
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
    toJson:function(data){
        xmltojson.toJson(xmltojson.createXml(data));
        console.log(xmltojson.toJson(xmltojson.createXml(data)));
    },
    api:{
        host:'http://testfront.51ebill.com:65527/front/base/gateway.in ',
        key:'39ccfc8f32c6a5e026ca7bfe2f1bf9a8',
        pid:'16112109533877254',
        input_charset:'UTF-8',
        version:'1.0',
        core_merchant_no:'EW_N8636137588',
        service:{
            upfile: 'http://testfront.51ebill.com:65527/front/base/gateway.in'
        }
    },
    //生成签名参数
    toParmas: function (params,key){
        function sortObj(obj) {
            var arr = [];
            for (var i in obj) {
                arr.push([obj[i], i]);
            };
            arr.reverse();
            var len = arr.length;
            var obj = {};
            for (var i = 0; i < len; i++) {
                obj[arr[i][1]] = arr[i][0];
            }
            return obj;
        }
        function parseParam(param, key, encode) {
            if (param == null) return '';
            var paramStr = '';
            var t = typeof (param);
            if (t == 'string' || t == 'number' || t == 'boolean') {
                //paramStr += '&' + key + '=' + param;
                paramStr += "&" + key + "=" + encodeURIComponent(param);
            } else {
                for (var i in param) {
                    var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                    paramStr += parseParam(param[i], k, encode);
                }
            }
            return paramStr;
        };
        var _parmas = sortObj(params);
        __parma = parseParam(_parmas).substr(1);
        console.log(__parma);
        var sign = {
            sign: md5(__parma + key).toLowerCase(),
            sign_type: 'MD5'
        }
        _parmas.sign = md5(__parma + key).toLowerCase();
        _parmas.sign_type = 'MD5';
        return parseParam(_parmas).substr(1);
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
