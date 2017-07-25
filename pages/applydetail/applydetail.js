// pages/applydetail/applydetail.js
var commondata = require('../../utils/data.js');
var commondata = require('../../pages/apply/formData.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stat:['待审核','审核中','已通过'],
    shopInfo:commondata,
    info:{
        shopName:'西少爷肉夹馍',
        shopNames:'西少爷餐饮科技有限公司',
        stat:'已审核',
        checkTime:'2017-07-12 9:00',
        registrationInfo:{
            configuration:{
                name:'西少爷餐饮科技有限公司',
                simpName:'西少爷',
                categories:'餐饮-服务行业-中餐',
                shopArea:'北京市朝阳区',
                areaInfo:'北苑路北10号院',
                headPerson:'王世超',
                headPhone:'13898881234',
                
            },
            shopInfo:{

            },
            settlement:{

            }
        }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: '审核状态',
      });
      wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#27CFB1',
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