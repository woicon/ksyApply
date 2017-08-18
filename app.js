//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
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
                        console.log(res)
                    },
                }) 
            } else {
                console.log('获取用户登录态失败！' + res.errMsg)
            }
        }
    });
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

  globalData: {
    userInfo: null,
  }
})
