var app = getApp();
var form = require('../../pages/apply/data.js');
var formData = require('../../pages/apply/formData.js');
var base = require('../../utils/util.js');
var picker = require('../../pages/apply/data/picker.js');
Page({
    data: {
        stepBar: ['商户信息', '结算信息', '进件信息'],
        formType: ['input', 'picker', 'upfile', 'textarea', 'time', 'area'],
        currentStep:0,
        formData: formData,
        formStat:[],
        picker:picker,
        postData:null,
        mupicker:{},
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
        let that = this,
            detail = e.detail;
        console.log(e);
        let _formData = that.data.formData;
        let node = _formData[that.data.currentStep][e.currentTarget.dataset.id];
        let _column = form.change(node.data.range, detail, e.currentTarget.dataset.range);
        let _mupicker = that.data.mupicker;
        console.log(!_mupicker[e.target.id]);
        if (!_mupicker[e.target.id]){
            // _value = _mupicker[e.target.id]||[0,0,0];
            // _value[detail.column] = detail.value;
        }
        //console.log(detail);
        // switch (detail.column){
        //     case 0:
        //         _value[1] = 0;
        //         _value[2] = 0;
        //     break;
        //     case 1:
        //         _value[2] = 0;
        //     break;
        //     case 2:
        //     break;
        // }
       // node.value = _value;
        node.data.range = _column;

        that.setData({
            formData: _formData,
            mupicker:_mupicker,
        })
    },

    multiChange:function(e){
        let that = this;
        wx.showLoading();
        console.log(e);
        let _formData = that.data.formData;
        let _postData = that.data.postData;
        let _id = e.target.dataset.id;
        let _curr = that.data.currentStep;
        let currNode = _formData[_curr][_id];
        //let _name = e.target.dataset.name;
        let value = e.detail.value;
        let range = currNode.data.range;
        //let _selected = range[0][value[0]][1] + ',' + range[1][value[1]][1] + ',' + range[2][value[2]][1];
        //currNode.value = e.detail.value;
        //currNode.data.selected = _selected;
        _formData[_curr][_id] = currNode;
        let _mupicker = that.data.mupicker;
        _mupicker[e.target.id] = e.detail.value;

        
        if (e.target.id == "area"){
            _postData['province'] = range[0][value[0]][1];
            _postData['provinceId'] = range[0][value[0]][0];
            _postData['city'] = range[1][value[1]][1];
            _postData['cityId'] = range[1][value[1]][0];
            _postData['area'] = range[2][value[2]][1];
            _postData['areaId'] = range[2][value[2]][0];
        }else{
           // _postData[e.target.id] = _selected;
            _postData[e.target.dataset.name] = range[0][value[0]][0] + ',' + range[1][value[1]][2] + ',' + range[2][value[2]][2];
        }
        console.log(_postData);
        that.setData({
            formData: _formData,
            postData: _postData,
            mupicker: _mupicker
        });
        wx.hideLoading();
    },

    //picker控件选值存储
    changePicker: function (e) {
        console.log(e);
        wx.showLoading();
        let that = this;
        let _postData = this.data.postData;
        // let _node = that.getNode(e.target.id);
        // //_node.value =e.detail.value;
        // let range = _node.data.range;
        let pickerData = that.data.picker; 

        let nodes = base.keys(pickerData[e.target.dataset.name]);
        _postData[e.target.dataset.name] = nodes[e.detail.value];

        if (e.target.dataset.extend){
            values = base.values(pickerData[e.target.dataset.name]);
            _postData[e.target.dataset.extend] = values[e.detail.value];
        }
      
        if (e.currentTarget.dataset.name === 'accountType'){
        let _formData = that.data.formData;
        let _form = _formData[1];
        if (e.detail.value === '1'){
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

      }

      that.setData({
        postData: _postData
      });
      wx.hideLoading();
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
        //let _parmas = base.toQueryParams(parmas);
        let upImage = new Promise((res, rej)=> {
            wx.chooseImage({
                count: 1,
                success: (data)=> {
                    res(data);
                },
            })
        })
        .then((res)=> {
            wx.showLoading({
                title: '上传中',
                mask:true
            });
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
                    console.log(base.XMLtoJSON(res.data))
                    let _imgUrl = base.XMLtoJSON(res.data).ebill.file_url;
                    let imgUrl = _imgUrl.substring(0, _imgUrl.length - 1);
                    _postData[imgName] = imgUrl;
                    that.setData({
                        postData: _postData
                    });
                    wx.hideLoading();
                },
                fail: function (res) {
                    wx.hideLoading();
                    console.log(res);
                }
            });
        }).catch((error)=>{
            wx.showModal({
                title: '出了点小问题',
                content: error,
                showCancel:false
            })
        });
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
        wx.showLoading({
            mask:true
        });
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
        parmas.productId = '484';//线下环境
        //parmas.productId = '421';//线上环境
        let _parmas = base.getSign(parmas,app.key);
        let submitReg = new Promise((_res)=>{
            wx.request({
                url: app.url.host,
                data: _parmas,
                method: 'POST',
                header: {'content-type': 'application/x-www-form-urlencoded'},
                success:function(res){
                    wx.hideLoading();
                    let data = base.XMLtoJSON(res.data);
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
                            key: 'mallInfo',
                            data:{
                                name:that.data.postData.merchantFullName
                            },
                        });
                        _res(data.ebill.mcDetails);
                    }else{
                        wx.showModal({
                            content: data.ebill.message,
                            showCancel:false
                        })
                    }
                },
                fail:function(error){
                    wx.showToast({
                        title: '注册失败',
                    })
                }
            });
        }).then((res)=>{
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
                    console.log(err);
                }
            })
        })
    },
    onLoad: function (options) {
        wx.showLoading();
        var that = this;
        wx.setNavigationBarTitle({
            title: '注册快收银',
        }); 
        
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#27CFB1',
        });
        
        var _stepStat = [];
        for (var i = 0; i < that.data.stepBar.length; i++) {
            _stepStat.push(false);
        }
        
        var that = this;
        let postData = app.api;
        delete postData.key;
        wx.getStorage({
            key: 'parmas',
            complete:function(res){
                if(res.data){
                    that.setData({
                        postData: res.data
                    });
                };
            }
        })
        if (options.edit){
            wx.getStorage({
                key: 'parmas',
                success: function(res) {
                    that.setData({
                        postData: res.data
                    });
                },
            })
        }
        that.setData({
            stepStat: _stepStat,
            postData: postData
        });

    },
    onReady: function () {
        wx.hideLoading()
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