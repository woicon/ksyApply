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
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            })
        })

    }
})
