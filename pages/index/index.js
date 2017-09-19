var app = getApp()
Page({
    data: {
        userInfo: {}
    },
    goReg: function () {
        wx.navigateTo({
            url: '/pages/apply/apply',
        });
    },
    onLoad: function () {
        var that = this;
        wx.getWeRunData({
            success(res) {
                const encryptedData = res.encryptedData;
            }
        });
        wx.setNavigationBarTitle({
            title: '快收银开户注册',
        });
    },
    onReady:function(){
        wx.hideLoading();
    }
})
