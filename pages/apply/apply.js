var app = getApp();
var formData = require('../../pages/apply/formData.js');
var base = require('../../utils/util.js');
var picker = require('../../pages/apply/data/picker.js');
var commondata = require('../../pages/apply/data.js');
Page({
    data: {
        stepBar: ['商户信息', '结算信息', '进件信息'],
        formType: ['input', 'picker', 'upfile', 'textarea', 'time', 'area'],
        currentStep:0,
        formData: formData,
        formStat:[],
        picker:picker,
        postData:{},
        canuse: wx.canIUse('picker.mode.multiSelector'),
        mupicker:{
            businessCategoryName:[0,0,0],
            area:[0,0,0]
        },
    },
    inputFocus:function(e){
    },
    formBlur:function(e){
        let _reg = base.reg;
        const data = e.target.dataset;
        if (data.reg){
            if ( e.detail.value =='' || !base.validation(e.detail.value, _reg[data.reg])){
                wx.showModal({
                    content: data.error,
                    showCancel:false
                })
            }
        }
    },
    getNode: function (id) {
        let _formData = this.data.formData;
        let currNode = _formData[this.data.currentStep];
        return currNode[id];
    },
    columnChange: function (e) {
        if (wx.showLoading) {
            wx.showLoading({
                mask: true
            });
        }
        let that = this;
        let node = e.target.id;
        let range = that.data.range[node];
        let pageDate = that.data.murange[node];
        let _murange = that.data.murange;
        let _mupicker = that.data.mupicker;
        let _value = _mupicker[node];
        _value[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                let city = commondata.getNode(range[1], range[0][e.detail.value][0]);
                _murange[node] = [pageDate[0], city, commondata.getNode(range[2], city[0][0])];
                _value[1] = 0;
                _value[2] = 0;
                break;
            case 1:
                _value[2] = 0;
                _murange[node] = [pageDate[0], pageDate[1], commondata.getNode(range[2], pageDate[1][e.detail.value][0])];
                break;
            case 2:
                _murange[node] = pageDate;
                break;
        }
        that.setData({
            mupicker:_mupicker,
            murange: _murange
        });
        if (wx.hideLoading) {
            wx.hideLoading()
        }
    },

    multiChange:function(e){
        let that = this;
        let node = e.target.id;
        let _postData = that.data.postData;
        let range = that.data.murange[node];
        let value = e.detail.value;
        console.log(value);
        if (e.target.id == "area"){
            if (wx.showLoading) {
                wx.showLoading();
            }
            _postData['province'] = range[0][value[0]][1];
            _postData['provinceId'] = range[0][value[0]][0];
            _postData['city'] = range[1][value[1]][1];
            _postData['cityId'] = range[1][value[1]][0];
            _postData['area'] = range[2][value[2]][1];
            _postData['areaId'] = range[2][value[2]][0];
        }else{
            _postData[e.target.id] = range[0][value[0]][1] + ',' + range[1][value[1]][1] + ',' + range[2][value[2]][1];
            //_postData[e.target.dataset.name] = range[0][value[0]][0] + ',' + range[1][value[1]][2] + ',' + range[2][value[2]][2];
            _postData[e.target.dataset.name] = range[2][value[2]][0];
        }
        that.setData({
            postData: _postData,
        });
        if (wx.hideLoading) {
            wx.hideLoading()
        }
    },
    //picker控件选值存储
    changePicker: function (e) {
        let that = this;
        let _postData = this.data.postData;
        let pickerData = that.data.picker; 
        let nodes = base.keys(pickerData[e.target.dataset.name]);
        _postData[e.target.dataset.name] = nodes[e.detail.value];
        if (e.target.dataset.extend){
            let values = base.values(pickerData[e.target.dataset.name]);
            _postData[e.target.dataset.extend] = values[e.detail.value];
        }
        if (e.currentTarget.dataset.name === 'accountType'){
        let _formData = that.data.formData;
        let _form = _formData[1];
        if (e.detail.value === '1'){
            if (wx.showLoading){
            wx.showLoading();
            }
            _form[2].label = '对公账户';
            _form[3].label = '企业名称';
            _form[2].placeholder = '请输入对公账号';
            _form[3].placeholder = '请输入企业名称';
        }else{
            _form[2].label = '银行卡号';
            _form[3].label = '持卡人姓名';
            _form[2].placeholder = '请输入银行卡号';
            _form[3].placeholder = '请输入持卡人姓名';
        }
        that.setData({
            formData: _formData
        });
        if (wx.hideLoading) {
            wx.hideLoading()
        }
      }
      that.setData({
        postData: _postData
      });
    },
    nextStep: function () {
        let that = this;
        this.stepJump(+1);
        wx.setStorage({
            key: 'parmas',
            data: that.data.postData,
        });
    },
    backStep:function() {
        this.stepJump(-1);
    },
    stepJump:function(jump) {
        var that = this;
        var steped = that.data.currentStep;
        var _stepStats = that.data.stepStat;
        var stats = steped + jump;
        let __stepStats = _stepStats.map((value) =>{
            return value = false;
        });
        for (var i = 0; i < _stepStats.length; i++) {
            _stepStats[i] = false;
        }
        for (var i = 0; i <= stats; i++) {
            _stepStats[i] = true;
        }
        that.setData({
            currentStep: stats,
            stepStat:_stepStats
        });
    },
    //上传图片
    uploadPhoto:function(e){
        var that = this;
        let imgName = e.currentTarget.dataset.name;
        let _postData = that.data.postData;
        let upParmas = {
            service: 'agent_app_upload_file',
            partner_id: app.api.partner_id,
            version: app.api.version,
            input_charset: app.api.input_charset,
            core_merchant_no: app.api.core_merchant_no,
        }
        let parmas = base.getSign(upParmas, app.key);
        //let parmas = upParmas;//免签
        console.log(parmas);
        let upImage = new Promise((res, rej)=> {
            wx.chooseImage({
                count: 1,
                success: (data)=> {
                    res(data);
                },
            })
        })
        .then((res,rej)=> {
            if(wx.showLoading){
                wx.showLoading({
                    title: '上传中',
                    mask:true
                });
            }
            let that = this;
            let tempFilePaths = res.tempFilePaths;
            parmas.url = encodeURIComponent(tempFilePaths[0]);
            let new_parmas = base.parseParam(parmas);
            const uploadTask = wx.uploadFile({
                url: app.url.upfile + '?' + new_parmas,
                filePath: tempFilePaths[0],
                name: 'files',
                method: 'POST',
                success: function (res) {
                    const data = base.XMLtoJSON(res.data);
                    console.log(data);
                    if(data.ebill.is_success == 'S'){
                        let _imgUrl = base.XMLtoJSON(res.data).ebill.file_url;
                        let imgUrl = _imgUrl.substring(0, _imgUrl.length - 1);
                        _postData[imgName] = imgUrl;
                        that.setData({
                            postData: _postData
                        });
                    }else{
                        wx.showModal({
                            title: '提示',
                            content: '服务器除了点小问题',
                            showCancel:false
                        })
                    };
                    if (wx.hideLoading){
                        wx.hideLoading()
                    }
                },
                fail: function (res) {
                    if (wx.hideLoading) {
                        wx.hideLoading()
                    }
                }
            });
            });
        upImage.catch(()=>{
            console.log('error')
        })
    },
    setPostData:function(id,value){
        let that = this;
        let _postData = that.data.postData;
        _postData[id] = value;
        that.setData({
            postData: _postData
        });
    },
    bindKeyInput: function (e) {
        var that = this;
        let value = e.detail.value;
        that.setPostData(e.target.id, value.trim());
    },

    setFormData: function (node, value) {
        var that = this;
        var _formData = that.data.formData;
        var _currentStep = that.data.currentStep;
        var currNode = _formData[_currentStep];
        var nodeData = currNode[node].data;
        //选择赋值
        if (nodeData.mode == 'selector') {
            var nodeValue = nodeData.range[value];
            var nodekey = nodeData.rangekey;
            currNode[node].data.selected = nodekey ? nodeValue[nodekey] : nodeValue;
        } else {
            currNode[node].data.selected = value;
        }
        that.setData({
            formData: _formData
        });
    },

    //提交
    submintForm: function (e) {
        let that = this;
        
        wx.setStorage({
            key: 'parmas',
            data: that.data.postData,
        });
        var formId = e.detail.formId;
        let parmas = that.data.postData;
        delete parmas.sign_type;
        delete parmas.sign;
        delete parmas.agentAuditNo;
        parmas.operationDatetime = base.getNowDate();
        parmas.service = 'mp_pf_add_configure';
        // 快收银连锁版
        //parmas.productId = '484';//线下环境
        parmas.productId = '421';//线上环境
        let _parmas = base.getSign(parmas,app.key);  
        //let _parmas = parmas;//免签
        let submitReg = new Promise((_res,rej)=>{
            wx.getStorage({
                key: 'submitstat',
                success: function(res) {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '您已经提交注册，请勿重复提交！',
                    });
                },
                fail:function(){
                    wx.request({
                        url: app.url.host,
                        data: _parmas,
                        method: 'POST',
                        header: {'content-type': 'application/x-www-form-urlencoded'},
                        success:function(res){
                            wx.hideLoading();
                            let data = base.XMLtoJSON(res.data);
                            console.log(data);
                            if(data.ebill.is_success === 'S'){
                                let mcDetails = JSON.parse(data.ebill.mcDetails);
                                _res({
                                    "keyword1": {
                                        "value": base.getNowDate(),
                                        "color": "#4a4a4a"
                                    },
                                    "keyword2": {
                                        "value": that.data.postData.contactPhone,
                                        "color": "#9b9b9b"
                                    },
                                    "keyword3": {
                                        "value": that.data.postData.merchantFullName,
                                        "color": "#9b9b9b"
                                    },
                                    "keyword4": {
                                        "value": "商户登录账号：" + mcDetails.merchantLoginName + "门店登录账号：" + mcDetails.storeLoginName,
                                        "color": "#9b9b9b"
                                    },
                                    "keyword5": {
                                        "value": "注册成功，我方会在一个工作日内完成审核，审核期间使用快收银软件只支持现金收款。系统已默认创建商户及门店，登录密码均默认" + mcDetails.storePassword,
                                        "color": "#9b9b9b"
                                    }
                                });
                                wx.setStorage({
                                    key: 'loginInfo',
                                    data: data.ebill.mcDetails,
                                });
                                wx.setStorage({
                                    key: 'submitstat',
                                    data: 'lockReg',
                                });
                                wx.setStorage({
                                    key: 'mallInfo',
                                    data:{
                                        name:that.data.postData.merchantFullName
                                    },
                                });
                                _res(data.ebill.mcDetails);
                            }else{
                                //data.ebill.message
                                wx.showModal({
                                    content: '请填完整信息后再提交注册！',//data.ebill.message,
                                    showCancel:false
                                });
                                wx.removeStorage({
                                    key: 'submitstat',
                                    success: function(res) {
                                        console.log(res);
                                    },
                                })
                            }
                        },
                        fail:function(error){
                            wx.showToast({
                                title: '注册失败',
                            })
                        }
                    });
                }
            });
        }).then((res,rej)=>{
            wx.request({
                url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + app.globalData.token,
                data: {
                    //touser: "ooo3w0OMtRB2UQVuqlblZOa2-eZs",
                    touser:app.api.openId,
                    template_id: 'RbxT2BNL9d_0DHAfZrR6ELEskkJ8OYg_X4ngfPmfHO0',
                    page: '/pages/applydetail/applydetail',
                    form_id: formId,
                    data: res
                },
                method: 'POST',
                success: function (res) {
                    console.log(res);
                    wx.navigateTo({
                        url: '/pages/applycomplete/applycomplete',
                    });
                },
                fail: function (err) {
                    console.log("push err");
                    //console.log(err);
                }
            })
        });
        submitReg.catch(()=>{
            console.log('error');
        })
    },
    onLoad: function (options) {
        var that = this;
        console.log('可以用吗？'+wx.canIUse('picker.mode.multiSelector'));
        if (wx.showLoading) {
            wx.showLoading();
        } else {
            that.setData({
                up: true,
            });
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
        if (wx.setNavigationBarColor) {
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#27CFB1',
            });
        } else {
            that.setData({
                up:true,
            });
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
        wx.setNavigationBarTitle({
            title: '注册快收银',
        });
        var _stepStat = [];
        for (var i = 0; i < that.data.stepBar.length; i++) {
            _stepStat.push(false);
        }
        let _postData = app.api;
        delete _postData.key;
        if(options.edit){
            wx.removeStorage({
                key: 'submitstat',
                success: function(res) {
                    console.log(res);
                },
            })
        }
        wx.getStorage({
            key: 'parmas',
            success: function (res) {
                console.log(res);
                let postData = res.data;
                delete postData.sign;
                delete postData.sign_type;
                that.setData({
                    postData: postData
                });
            },
            fail:function(res){
                console.log(res);
                that.setData({
                    postData: _postData
                });
            }
        })
      
       
        that.setData({
            stepStat: _stepStat,
            murange: {
                area: commondata.initRange(commondata.area),
                businessCategoryName: commondata.initRange(commondata.category)
            },
            range:{
                 businessCategoryName: commondata.category,
                 area: commondata.area
            }
        });
    },
    onReady: function () {
        if (wx.hideLoading){
                wx.hideLoading()
        }
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    }
})