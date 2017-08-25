var app = getApp();
var categoryData = require('../../utils/data.js');
var formData = require('../../pages/apply/formData.js');
var xmlToJSON = require('../../libs/xmlToJSON/xmlToJSON.js');
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
            operationDatetime:null,
        },
        stepCache:[{},{},{}],
    },
    nextStep: function () {
        this.stepJump(+1);
    },
    backStep: function () {
        this.stepJump(-1);
    },
    stepJump: function (jump) {
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
    uploadPhoto: function (e) {
        var that = this;
        let imgName = e.currentTarget.dataset.name;
        //需要签名的参数
        var upParmas = {
            service: 'agent_app_upload_file',
            partner_id: app.api.partner_id,
            version: app.api.version,
            input_charset: app.api.input_charset,
            core_merchant_no: app.api.core_merchant_no,
        }
        let parmas = app.toParmas(upParmas, app.api.key);
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
                    let _imgUrl = that.XMLtoJSON(res.data).ebill.file_url;
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
   
    XMLtoJSON:function(xml){
            var myOptions = {
            normalize:false,
            mergeCDATA: false,
            xmlns: true,
            grokText:false,
            textKey:false,
            grokAttr:false,
            childrenAsArray:false,
            stripAttrPrefix:false,
            stripElemPrefix:false,
            normalize:false,
            attrsAsObject:false
        }
        return xmlToJSON.xmlToJSON.parseString(xml, myOptions);
    },
    bindKeyInput:function(e){
        var that = this;
        let _postData = that.data.postData;
        _postData[e.target.id] = e.detail.value;
        that.setData({
            postData: _postData
        });
    },
    postSet:function(){
        
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
        categoryData.category(e.detail.column, e.detail.value);
        var that = this;
        var _formData = that.data.formData;
        var currNode = _formData[that.data.currentStep];

        if (e.detail.column == 0) {
            currNode[e.currentTarget.id].data.range[e.detail.column + 1] = categoryData.column;
        } else {
            currNode[e.currentTarget.id].data.range[e.detail.column + 1] = categoryData.column;
        }

        that.setData({
            formData: _formData
        });
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

    bindMultiPickerChange: function () {

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

    /**
     * 生命周期函数--监听页面加载
     */
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
        var testxml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><ebill><service>agent_app_upload_file</service><partner_id>16122916164159599</partner_id><sign_type>MD5</sign_type><input_charset>UTF-8</input_charset><sign>30ee41d68bdebd4de0131f1e144251c3</sign><version>1.0</version><is_success>S</is_success><error>SUCCESS</error><message>SUCCESS</message><file_url>http://static.solaridc.com/public_upload/lft_app/dls20170825101607_tmp_1728226528o6zAJs-dDuoRBcvYpUKkGSJmQGRA4a9e6950b94d8b9ab0a9c61050ce5a8c.png|</file_url></ebill>'
        console.log(that.XMLtoJSON(testxml));
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