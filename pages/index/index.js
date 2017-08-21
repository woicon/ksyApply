//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎注册快收银',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goReg:function(){
    wx.navigateTo({
        url: '/pages/apply/apply',
    });
    
  },
  onLoad: function () {
    var that = this;

    wx.getWeRunData({
        success(res) {
            const encryptedData = res.encryptedData;
            console.log(res.encryptedData);
        }
    })

    var params = {
        version: "1.0",
        partner_id: "10000002048131212",
        input_charset: "UTF-8",
        out_trade_on: 'EB0220170721417900',
    }
    var key = 'C4AE13C5232E601412F24BF6258546A0';
    var newParma = app.toParmas(params, key);
    wx.request({
        url: 'http://testfront.51ebill.com:8000/front/base/gateway.in?' + newParma,
        method: 'POST',
        success: function (res) {
            console.log(res);
        }
    });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
        console.log(userInfo);
      that.setData({
        userInfo:userInfo
      })
    })
    
  }
})
