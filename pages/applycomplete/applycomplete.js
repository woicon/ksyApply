// pages/applycomplete/applycomplete.js
var app = getApp();
Page({
  data: {
  
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '注册成功',
    });
    wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#27CFB1',
    });
    wx.onUserCaptureScreen(function (res) {
        console.log('用户截屏了')
    });
    wx.showModal({
        title: '提示',
        content: '请妥善保管商户及门店登录账户及密码',
    })
  },
  finshReg:function (){
    // wx.navigateTo({
    //     url: '/pages/applydetail/applydetail',
    // });
  },
  onReady: function () {
  
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