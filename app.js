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
        let appInit = new Promise((rests) => {
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
                            success: (_res) => {
                                console.log(_res);
                                that.api.openId = _res.data.wechatVo.openId;
                                rests(res);
                            }
                        })
                    } else {
                        console.log('获取用户登录态失败！' + data.errMsg);
                    }
                }
            });
        })
        .then((res)=>{
            //获取代理商信息
            //let partnerId = options.query.no || 'EW_N2254856689';
            let partnerId = options.query.no;
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
            let _parmas = {};
            for(let i in parmas){
                _parmas[i] = parmas[i]
            }
            _parmas.operationDatetime = base.getNowDate();
            //注册状态检测
            wx.request({
                url:that.url.host,
                //data: base.getSign(_parmas, partner.key),
                data:_parmas,
                method:'POST',
                header: {'content-type': 'application/x-www-form-urlencoded'},
                success:function(checkStat){
                    let checkData = base.XMLtoJSON(checkStat.data).ebill;
                    if (checkData.mcDetails) {
                        console.log(!options.query.edit);
                        if(!options.query.edit){
                            wx.redirectTo({
                                url: '/pages/applydetail/applydetail'
                            })
                        }
                    } else {
                        wx.redirectTo({
                            url: '/pages/index/index'
                        })
                    }
                },
                fail:(err) => {
                    console.log(err);
                }
            });
        })
        .then(()=> {
            //获取Token
            wx.request({
                url: that.url.getToken,
                data:{
                    appId:base.app.appId,
                    appSecret:base.app.appSecret
                },
                success: function(token) {
                    console.log(token);
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
        //host: 'http://192.168.19.47:8000/front/baseV3/gateway.in',
        host:'http://front.51ebill.com/front/baseV3/gateway.in',//前置线上
        upfile: 'http://intfront.51ebill.com/front/agentAppV3/uploadFile.in',//文件上传
        //upfile:'http://192.168.19.47:8000/front/agentAppV3/uploadFile.in',
        getOpenId:'http://open.liantuobank.cn/api/microappToOpenid.htm',
        getToken: 'http://wx.liantuo.com/app/token.do',
        sendMsg: 'http://wx.liantuo.com//app/template.do'
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