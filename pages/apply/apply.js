var app = getApp();
var categoryData = require('../../utils/data.js');
var formList = require('../../pages/apply/formData.js');
Page({
  data: {
      stepBar: ['商户信息', '结算信息','进件信息'],
      formType: ['input', 'picker', 'upfile', 'textarea','time', 'area'],
      currentStep:2,
      formData:formList,
    },
    nextStep:function(){
        this.stepJump(+1);
    },
    backStep: function () {
        this.stepJump(-1);
    },
    stepJump:function(jump){
        var that = this;
        var steped = that.data.currentStep;
        var _stepStats = that.data.stepStat;
        var stats = steped + jump;
        for (var i = 0; i < _stepStats.length;i++){
            _stepStats[i] = false;
        }
        for (var i = 0; i <= stats; i++){
            _stepStats[i] = true;
        }
        that.setData({
            currentStep: stats,
            stepStat: _stepStats
        }); 
    },
    uploadPhoto: function () {
        var that = this;
        //需要签名的参数
        var upParmas = {
            service: 'agent_app_upload_file',
            partner_id: app.api.pid,
            version: app.api.version,
            input_charset: app.api.input_charset,
            core_merchant_no: app.api.core_merchant_no,
        }
        let parmas = app.toParmas(upParmas, app.api.key);
        var _parmas = app.toQueryParams(parmas);
        var up = new Promise(function(res,rej){
            wx.chooseImage({
                success: function (data) {
                    res(data);
                },
            })
        })
        .then(function(res){
            let tempFilePaths = res.tempFilePaths;
            that.setData({
                img: tempFilePaths[0],
            })
            _parmas.url = encodeURIComponent(tempFilePaths[0]);
            var new_parmas = app.parseParam(_parmas);
            console.log(new_parmas);
            try{
                const uploadTask = wx.uploadFile({
                    url: app.api.service.upfile + '?' + new_parmas,
                    filePath:tempFilePaths[0],
                    name: 'files',
                    method: 'POST',
                    header:{
                        'content-type': 'multipart/form-data'
                    },
                    complete:function(res){
                        console.log(res.data);
                       // var datas = app.toJson(res.data);
                        console.log(app.toJSON(res.data));
                        wx.setStorageSync('IMGCACH', toString(res.data) )
                    },
                    success: function (res) {
                        console.log(res.data.data);
                        console.log(app.toJSON(res.data.data));

                        wx.setStorageSync('IMGCACH', res.data.data)
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
            } catch (e) {
                console.log(e);
            }
         });
    },
    //picker控件选值存储
    changePicker:function(e){
        var that = this;
        var _id =  e.target.id;
        var currentId = e.currentTarget.dataset.id;
        var _value = e.detail.value;
        var _formData = that.data.formData;
        var _currentStep = that.data.currentStep;
        var currNode = _formData[_currentStep];
        var nodeData = currNode[_id].data;

        //选择账户类型个人或者企业
        if (currentId == "accountType" && _value == 0) {
            _formData[_currentStep] = formList[1];
        } else if (currentId == "accountType" && _value == 1){
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
    columnChange:function(e){
        categoryData.category(e.detail.column,e.detail.value);
        var that = this;
        var _formData = that.data.formData;
        var currNode = _formData[that.data.currentStep];

        if (e.detail.column == 0){
            currNode[e.currentTarget.id].data.range[e.detail.column + 1] = categoryData.column;
        }else{
            currNode[e.currentTarget.id].data.range[e.detail.column + 1] = categoryData.column;
        }
        
        that.setData({
            formData: _formData
        });
    },

    setFormData:function(node,value){
        var that = this;
        var _formData = that.data.formData;
        var _currentStep = that.data.currentStep;
        var currNode = _formData[_currentStep];
        var nodeData = currNode[node].data;
        //选择赋值
        if (nodeData.mode == 'selector'){
            var nodeValue = nodeData.range[value];
            var nodekey = nodeData.rangekey;
            currNode[node].data.selected = nodekey ? nodeValue[nodekey] : nodeValue;
        }else{
            currNode[node].data.selected = value;
        }
        //行业联动
        that.setData({
            formData:_formData
        });

    },

    bindMultiPickerChange:function(){

    },

    bindMultiPickerColumnChange:function(){

    },
    formSubmit:function (e){
        console.log(e)
    },
    //提交
    submintForm:function () {
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
        for (var i = 0; i < that.data.stepBar.length;i++){
            _stepStat.push(false);
        }
        that.setData({
            stepStat: _stepStat
        })
    },
  onReady: function () {
  
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