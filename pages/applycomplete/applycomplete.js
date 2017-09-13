// pages/applycomplete/applycomplete.js
var app = getApp();
Page({
  data: {
  
  },
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
        title: '注册成功',
    });
    wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#27CFB1',
    });
    wx.showModal({
        title: '提示',
        content: '请妥善保管商户及门店登录账户及密码',
    });
    wx.getStorage({
        key: 'loginInfo',
        success: function(res) {
            that.setData({
                detail: JSON.parse(res.data)
            });
        }
    });
    wx.getStorage({
        key: 'mallInfo',
        success: function (res) {
            that.setData({
                mallInfo:res.data
            });
        }
    });
  },
  finshReg:function (){
    wx.navigateTo({
        url: '/pages/applydetail/applydetail',
    });
  },
  onReady: function () {
    wx.hideLoading();
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})