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
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            })
        })
    },
    onReady:function(){
        wx.hideLoading();
    }
})
