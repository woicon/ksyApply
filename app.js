var partners= require('./utils/member.js');
var base = require('./utils/util.js');
App({
    onLaunch: function (options) {
        let that = this;
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
            let partnerId = options.query.no || 'EW_N2254856689';
            let partner = that.getPartner(partnerId);
            for (var i in partner) {
                that.api[i] = partner[i];
            }
            that.key = partner.key;
            that.api.service = 'mp_pf_audit_details';
            that.api.agencyCodeName = partnerId;
            that.api.applicationName = '快收银一键开户';
            that.api.agentNo = partnerId;
         
            const parmas = that.api;
            delete parmas.key;
            console.log(parmas);
            parmas.operationDatetime = base.getNowDate();
            //  delete parmas.openId;
            //  parmas.agentAuditNo = '3386';
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
                        if (!options.query.edit){
                            wx.navigateTo({
                                url: '/pages/applydetail/applydetail',
                            })
                        }
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
        //upfile: 'http://intfront.51ebill.com/front/agentAppV3/uploadFile.in',//文件上传
        upfile:'http://192.168.19.47:8000/front/agentAppV3/uploadFile.in'
    },
    api:{
        input_charset: 'UTF-8',
        version: '1.0',
    },
    key:null,
    partnerId:null,
    getUserInfo: function (cb) {
        
    },
    globalData: {
        userInfo: null,
    }
})
