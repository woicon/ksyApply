// pages/apply/apply.js
var app = getApp();
var formList = require('../../pages/apply/formData.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
      stepBar: ['商户信息', '结算信息','进件信息'],
      formType: ['input', 'picker', 'upfile', 'textarea','time', 'area'],
      currentStep:0,
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

    bindKeyInput:function(e){
        //console.log(e.detail);
    },

    //picker控件选值存储
    changePicker:function(e){
        //console.log(e);
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
        console.log(e);
    },
    setFormData:function(node,value){
        var that = this;
        var _formData = that.data.formData;
        var _currentStep = that.data.currentStep;

        var currNode = _formData[_currentStep];
        var nodeData = currNode[node].data;
        

        if (nodeData.mode == 'selector'){
            var nodeValue = nodeData.range[value];
            var nodekey = nodeData.rangekey;
            currNode[node].data.selected = nodekey ? nodeValue[nodekey] : nodeValue;
        }else{
            currNode[node].data.selected = value;
            
        }
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
    uploadPhoto:function(){
        wx.chooseImage({
            success: function(res) {
                 wx.uploadFile({
                    url: '',
                    filePath: '',
                    name: '',
                    header: {},
                    formData: {},
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                })
            },
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})