var partners= require('./utils/member.js')
var base = require('./utils/util.js')
App({
    onLaunch: function (options) {
        let that = this;
        if (wx.showLoading) {
            wx.showLoading();
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
        let appInit = new Promise(function(openid){
            //微信登录
            wx.login({
                success: (res) => {
                    if (res.code) {
                        //获取openId
                        wx.request({
                            url: that.url.getOpenId,
                            data: {
                                appid: base.app.appId,
                                secret: base.app.appSecret,
                                code: res.code
                            },
                            success: (data) => {
                                that.api.openId = data.data.wechatVo.openId;
                                openid(res);
                            }
                        })
                    } else {
                        console.log('获取用户登录态失败！' + data.errMsg);
                    }
                }
            });
        })
        .then(function(res){
            //获取代理商信息
            let partnerId = options.query.no || 'EW_N3632231636';
            //let partnerId = options.query.no;
            let partner = that.getPartner(partnerId);
            for (let i in partner) {
                that.api[i] = partner[i];
            }
            that.key = partner.key;
            //that.api.openId = "ooo3w0OMtRB2UQVuqlbln091211";
            that.api.service = 'mp_pf_audit_details';
            that.api.agencyCodeName = partnerId;
            that.api.applicationName = '快收银一键开户';
            that.api.agentNo = partnerId;
            const parmas = that.api;
            delete parmas.key;
            that.checkParmas = parmas;
            // let _parmas = {};
            // for(let i in parmas){
            //     _parmas[i] = parmas[i]
            // }
            // _parmas.operationDatetime = base.getNowDate();
            // //注册状态检测
            // wx.request({
            //     url:that.url.host,
            //     //data: base.getSign(_parmas, partner.key),
            //     data:_parmas,
            //     method:'POST',
            //     header: {'content-type': 'application/x-www-form-urlencoded'},
            //     success:function(checkStat){
            //         let checkData = base.XMLtoJSON(checkStat.data).ebill;
            //         if (checkData.mcDetails) {
            //             console.log(!options.query.edit);
            //             if(!options.query.edit){
            //                 wx.redirectTo({
            //                     url: '/pages/applydetail/applydetail'
            //                 })
            //             }
            //         } else {
            //             wx.redirectTo({
            //                 url: '/pages/index/index'
            //             })
            //         }
            //     },
            //     fail:(err) => {
            //         console.log(err);
            //     }
            // });
        }).then(function(r,rej) {
            wx.request({
                url: that.url.getToken,
                data:{
                    appId:base.app.appId,
                    appSecret:base.app.appSecret
                },
                success: function(token) {
                    that.globalData.token = token.data.result;
                    wx.setStorage({
                        key: 'token',
                        data: token.data.result,
                    });
                }
            })
        })
    },
    //获取partner
    getPartner:function(id){
        for (let i in partners){
            if(i == id){
                return partners[i];
            }
        }
    },
    url:{
        host:'https://front.liantuobank.com/front/baseV3/gateway.in',//前置线上
        upfile: 'https://front.liantuobank.com/front/agentAppV3/uploadFile.in',//文件上传
        getOpenId:'https://club.liantuobank.com/api/microappToOpenid.htm',
        getToken: 'https://wx.liantuobank.com/app/token.do',
        sendMsg: 'https://wx.liantuobank.com/app/template.do'
    },
    api:{
        input_charset: 'UTF-8',
        version: '1.0',
        openId:null,
    },
    key:null,
    partnerId:null,
    globalData:{
        
    }
})