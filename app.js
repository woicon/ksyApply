var partners= require('./utils/member.js');
var base = require('./utils/util.js');
App({
    onLaunch: function (options) {
        var that = this;
        let init = new Promise((res,rej)=>{
            wx.login({
                success: function (data) {
                    if (data.code) {
                        wx.request({
                            url: 'https://api.weixin.qq.com/sns/jscode2session',
                            data: {
                                js_code: data.code,
                                appid: 'wxea7c589ca4c29bd4',
                                secret: '61b6dd0b328b48fac3517bfc62d75fc4',
                                grant_type: data.code
                            },
                            success: function (re) {
                                that.api.openId = re.data.openid
                                res(re);
                            },
                        })
                    } else {
                        console.log('获取用户登录态失败！' + res.errMsg);
                    }
                }
            });
        })
        .then((res)=>{
            //检测是否注册
            let partnerId = options.query.no || 'EW_N8636137588';
            var partner = that.getPartner(partnerId);
            for (var i in partner) {
                that.api[i] = partner[i];
            }
            let parmas = that.api;
            delete parmas.key;
            parmas.operationDatetime = base.getNowDate();
            parmas.service = 'mp_pf_audit_details';
            parmas.agencyCodeName = partnerId;
            parmas.applicationName = '快收银一键开户';
            parmas.agencyCodeName = partnerId;
            parmas.core_merchant_no = partnerId;
            delete parmas.openId;
            parmas.agentAuditNo = '3386',
            //console.log(that.parseParam(that.getSign(parmas,partner.key), true));
            wx.request({
                url: that.url.host,
                data: base.getSign(parmas, partner.key),
                method:'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    
                },
                complete:function (res){
                    let data = base.XMLtoJSON(res.data).ebill;
                    console.log(data);
                    if (data.mcDetails) {
                        wx.navigateTo({
                            url: '/pages/applydetail/applydetail',
                        })
                        wx.setStorageSync('mcDetails', data.mcDetails);
                    } else {
                        wx.navigateTo({
                            url: '/pages/index/index',
                        })
                    }
                }
            });
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
        host: 'http://192.168.19.47:8000/front/baseV3/gateway.in',
        //host:'http://front.51ebill.com/front/baseV3/gateway.in',
        upfile: 'http://intfront.51ebill.com/front/agentAppV3/uploadFile.in'//文件上传
    },
    api:{
        input_charset:'UTF-8',
        version:'1.0',
    },
    
    
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },
    globalData: {
        userInfo: null,
    }
})
