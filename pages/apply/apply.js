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
    toQueryParams:function (par){
        var search = par.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/);

       
        if(!search){
            return {};
        }
        var searchStr = search[1];
        var searchHash = searchStr.split('&');
        var ret = {};
        searchHash.forEach(function (pair) {
            var temp = '';
            if (temp = (pair.split('=', 1))[0]) {
                var key = decodeURIComponent(temp);
                var value = pair.substring(key.length + 1);
                if (value != undefined) {
                    value = decodeURIComponent(value);
                }
                if (key in ret) {
                    if (ret[key].constructor != Array) {
                        ret[key] = [ret[key]];
                    }
                    ret[key].push(value);
                } else {
                    ret[key] = value;
                }
            }
        });
        return ret;
    },
    upFile:function(){
        
        return ;
    },
    uploadPhoto: function () {
        var that = this;
        
       // var chooseImg = new Promise(function(res,rej){

        var up = new Promise(function(res,rej){
            wx.chooseImage({
                success: function (data) {
                    
                    res(data);
                },
            })
        })
        .then(function(res){
            let tempFilePaths = res.tempFilePaths;

            wx.getImageInfo({
                src: res.tempFilePaths[0],
                success: function (res) {
                    console.log(res)
                    console.log(res.height)
                }
            })
            that.setData({
                img: tempFilePaths[0],
            })
            var upParmas = {
                partner_id: app.api.pid,
                version: app.api.version,
                input_charset: app.api.input_charset,
                core_merchant_no: app.api.core_merchant_no,
                file: tempFilePaths[0]
            }
            let parmas = app.toParmas(upParmas, app.api.key);
        
            var ps = that.toQueryParams(parmas);
            
            delete ps.file;
            console.log(ps);
            try{
                wx.uploadFile({
                    url:app.api.host,
                    filePath:tempFilePaths[0],
                    name: 'file',
                    //header: { "Content-Type": "multipart/form-data" },
                    //method: 'POST',
                    formData:ps,
                    header:{
                        'content-type': 'multipart/form-data'
                    },
                    complete:function(res){
                        console.log(res);
                    },
                    success: function (res) {
                        console.log(data);
                    },
                    fail: function (res) {
                        console.log(res);
                    }
                });
            } catch (e) {
                console.log(e);
            }

            // try{
            //     // const uploadTask =
            //     console.log(that.toQueryParams(parmas))
            //     wx.request({
            //         url: app.api.service.upfile + '?' + parmas,
            //         method: 'POST',
            //         header: {
            //             'content-type': 'multipart/form-data' 
            //         },
            //         //data:that.toQueryParams(parmas),
            //         success: function (res) {
            //             console.log(res);
            //         }
            //     })
            // } catch (e) {
            //     console.log(e);
            // }
        });

    },
    bindKeyInput:function(e){
        //console.log(e.detail);
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
        // console.info(that.upFile());
        // console.log(
        //     that.toQueryParams(that.upFile())
        // ) 
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