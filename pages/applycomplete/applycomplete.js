// pages/applycomplete/applycomplete.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    wx.navigateTo({
        url: '/pages/applydetail/applydetail',
    });

    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})