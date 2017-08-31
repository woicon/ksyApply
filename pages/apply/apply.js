var app = getApp();
var categoryData = require('../../pages/apply/data.js');
var formData = require('../../pages/apply/formData.js');
var base = require('../../utils/util.js');
Page({
    data: {
        stepBar: ['商户信息', '结算信息', '进件信息'],
        formType: ['input', 'picker', 'upfile', 'textarea', 'time', 'area'],
        currentStep: 0,
        formData: formData,
        //提交进件
        postData:{
            service: 'agent_app_upload_file',
            version: app.api.version,
            partner_id: app.api.partner_id,
            input_charset: app.api.input_charset,
            core_merchant_no: app.api.core_merchant_no,
            applicationName:'',
            agentNo: app.api.partner_id,
            openId: app.api.openId,
            operationDatetime:base.getNowDate(),
            productNo:'148',
        }
    },
    nextStep: function () {
        this.stepJump(+1);
    },
    backStep:()=> {
        this.stepJump(-1);
    },
    stepJump:(jump)=> {
        var that = this;
        var steped = that.data.currentStep;
        var _stepStats = that.data.stepStat;
        var stats = steped + jump;
        for (var i = 0; i < _stepStats.length; i++) {
            _stepStats[i] = false;
        }
        for (var i = 0; i <= stats; i++) {
            _stepStats[i] = true;
        }
        that.setData({
            currentStep: stats,
            stepStat: _stepStats
        });
    },
    //上传图片
    uploadPhoto:(e)=> {
        var that = this;
        let imgName = e.currentTarget.dataset.name;
        //需要签名的参数
        let upParmas = {
            service: 'agent_app_upload_file',
            partner_id: app.api.partner_id,
            version: app.api.version,
            input_charset: app.api.input_charset,
            core_merchant_no: app.api.core_merchant_no,
        }
        let parmas = app.getSign(upParmas, app.api.key);
        let _parmas = app.toQueryParams(parmas);
        let upImage = new Promise((res, rej)=> {
            wx.chooseImage({
                count: 1,
                success: (data)=> {
                    res(data);
                },
            })
        })
        .then((res)=> {
            let tempFilePaths = res.tempFilePaths;
            that.setData({
                img: tempFilePaths[0],
            })
            _parmas.url = encodeURIComponent(tempFilePaths[0]);
            let new_parmas = app.parseParam(_parmas);
            const uploadTask = wx.uploadFile({
                url: app.api.service.upfile + '?' + new_parmas,
                filePath: tempFilePaths[0],
                name: 'files',
                method: 'POST',
                header: {
                    'content-type': 'multipart/form-data'
                },
                complete: function (res) {
                    wx.hideLoading();
                    let _imgUrl = base.XMLtoJSON(res.data).ebill.file_url;
                    let imgUrl = _imgUrl.substring(0, _imgUrl.length - 1);
                    let _postData = that.data.postData;
                    _postData[imgName] = imgUrl;
                    that.setData({
                        postData: _postData
                    });
                    // wx.setStorageSync('IMGCACH', res.data);
                    // wx.getStorage({
                    //     key: 'IMGCACH',
                    //     success: function(res) {
                    //         console.log(res);
                    //     },
                    // })
                },
                success: function (res) {
                    wx.showLoading({
                        title: '上传中',
                    })
                },
                fail: function (res) {
                    console.log(res);
                }
            });
            uploadTask.onProgressUpdate((res) => {
                console.log('上传进度', res.progress)
                console.log('已经上传的数据长度', res.totalBytesSent)
                console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            })
        });
    },
    
    //picker控件选值存储
    changePicker: function (e) {
        var that = this;
        var _id = e.target.id;
        var currentId = e.currentTarget.dataset.id;
        var _value = e.detail.value;
        var _formData = that.data.formData;
        var _currentStep = that.data.currentStep;
        var currNode = _formData[_currentStep];
        var nodeData = currNode[_id].data;

        let _postData = that.data.postData;
        _postData[e.target.id] = e.detail.value;

        //选择银行
        //经营类目
        //地市选择
        //选择账户类型个人或者企业
        if (currentId == "accountType" && _value == 0) {
            _formData[_currentStep] = formList[1];
        } else if (currentId == "accountType" && _value == 1) {
            _formData[_currentStep] = formList.group;
        }

        if (nodeData.mode == 'selector') {
            var nodeValue = nodeData.range[_value];
            var nodekey = nodeData.rangekey;
            currNode[_id].data.selected = nodekey ? nodeValue[nodekey] : nodeValue;
        } else {
            currNode[_id].data.selected = _value;
        }
        wx.setStorage({
            key: 'REGDATA',
            data: _formData,
        });
        //存储data
        that.setData({
            formData: _formData
        });

    },

    //行业联动
    columnChange: function (e) {  
        let that = this,
            detail = e.detail;
        var _column = categoryData.columnChange(categoryData.industry, detail);
        let _formData = that.data.formData;
        let node = that.getNode(e.currentTarget.id);
        console.log(node);
        switch (e.detail.column){
            case 0:
                node.data.range[1] = _column[1];
                node.data.range[2] = _column[2];
            break;
            case 1:
                node.data.range[2] = _column;
            break;
        }
        that.setData({
            formData: _formData
        });
    },
    getNode:function(id){
        let that = this;
        let _formData = that.data.formData;
        let currNode = _formData[that.data.currentStep];
        return currNode[id];
    },
    setPostData:function(id,value){
        let that = this;
        let _postData = that.data.postData;
        _postData[id] = value;
        that.setData({
            postData: _postData
        });
    },
    bindMultiPickerChange: function (e) {
        console.log(e);
        let that = this,
            nodes = that.getNode(e.target.id),
            node = nodes.data.range;
        //col.name
        let value = node[0][e.detail.value[0]].cat + ',' + node[1][e.detail.value[1] || 1].cat + ',' + node[2][e.detail.value[2] || 1].cat;
        that.setPostData(nodes.name,value);
        that.setPostData('businessCategory', node[2][e.detail.value[2]].bcat);
        
    },
    bindKeyInput: function (e) {
        var that = this;
        that.setPostData(e.target.id, e.detail.value);
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
        //行业联动
        that.setData({
            formData: _formData
        });
    },
    bindMultiPickerColumnChange: function () {

    },
    formSubmit: function (e) {
        console.log(e)
    },
    //提交
    submintForm: function () {
        wx.navigateTo({
            url: '/pages/applycomplete/applycomplete',
        })
    },
    onLoad: function (options) {
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
        
        that.setData({
            stepStat: _stepStat
        });
    },
    onReady: function () {
        var that = this;
      
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