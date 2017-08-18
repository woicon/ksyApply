//app.js
var md5 = require('utils/md5.min.js');
App({
  onLaunch: function() {
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
                        appid:'wxea7c589ca4c29bd4',
                        secret:'61b6dd0b328b48fac3517bfc62d75fc4',
                        grant_type: res.code
                    },
                    success:function(res){
                        //console.log(res.data.openid)
                        that.user.openId = res.data.openid

                        console.log('openId：'+res.data.openid);
                    },
                }) 
            } else {
                console.log('获取用户登录态失败！' + res.errMsg)
            }
        }
    });


    var params = {
        PARTNER_ID:"10000002048131212",
        KEY:"C4AE13C5232E601412F24BF6258546A0",
        AGREEMENT_NO: "10000002048131212",
    }
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

    var _params = JSON.stringify(sortObj(params));

    
    
    _params = _params.replace(/"/g, "");
    _params = _params.replace(/,/g, "&");
    _params = _params.replace(/:/g, "=");
    _params = _params.replace(/{/g, "");
    _params = _params.replace(/}/g, "");
    console.log(_params);
    var key = C4AE13C5232E601412F24BF6258546A0;
    var sign = md5(_params + key); // "2063c1608d6e0baf80249c42e2be5804"
    console.log(_params);
    // wx.request({
    //     url: 'http://testfront.51ebill.com:8000/front/base/gateway.in?'+_params,
    //     method:'GET',
    //     success:function(res){
    //         console.log(res);
    //     }
    // });

  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
    user:{
        openId:null,
    },
  globalData: {
    userInfo: null,
  }
})
