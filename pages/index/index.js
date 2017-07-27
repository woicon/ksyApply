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
