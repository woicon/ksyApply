var app = getApp()
var base = require('../../utils/util.js')
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
        //注册状态检测
        let parmas = app.checkParmas;
        console.log(parmas);
        let _parmas = {};
        for (let i in parmas) {
            _parmas[i] = parmas[i]
        }
        //let _parmas = app.checkParmas;
        _parmas.operationDatetime = base.getNowDate();
        wx.request({
            url: app.url.host,
            data: base.getSign(_parmas, app.key),
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (checkStat) {
                let checkData = base.XMLtoJSON(checkStat.data).ebill;
                if (checkData.mcDetails) {
                    wx.redirectTo({
                        url: '/pages/applydetail/applydetail'
                    })
                }
            },
            fail: (err) => {
                console.log(err);
            }
        });
        wx.setNavigationBarTitle({
            title: '快收银开户注册',
        });
        
    },
    onReady:function(){
        let that = this;
        if(wx.hideLoading){
            wx.hideLoading();
        }else{
            that.setData({
                up: true,
            });
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
        
    }
})
