var app = getApp();
var form = require('../../pages/apply/data.js');
var formData = require('../../pages/apply/formData.js');
var base = require('../../utils/util.js');
Page({
    data: {
        stepBar: ['商户信息', '结算信息', '进件信息'],
        formType: ['input', 'picker', 'upfile', 'textarea', 'time', 'area'],
        currentStep: 2,
        formData: formData,
        formStat:[],
        postData:null
    },
    formBlur:function(e){
        if(e.detail.value == ''){
            wx.showModal({
                content: '请输入',     
                showCancel:false
            })
        }
        let _post = form.post;
        let _postData = this.data.postData;
        _post[this.data.currentStep].forEach((val,index,arr)=>{
            
        });
    },
    getNode: function (id) {
        let _formData = this.data.formData;
        let currNode = _formData[this.data.currentStep];
        return currNode[id];
    },
    columnChange: function (e) {
        let that = this,
            detail = e.detail;
        //console.log(e);
        let _formData = that.data.formData;
        let node = _formData[that.data.currentStep][e.currentTarget.dataset.id];
        let _column = form.change(node.data.range, detail, e.currentTarget.dataset.range);
        let _value = node.value;
        _value[detail.column] = detail.value;
        //console.log(detail);
        switch (detail.column){
            case 0:
                _value[1] = 0;
                _value[2] = 0;
            break;
            case 1:
                _value[2] = 0;
            break;
            case 2:
            break;
        }
        node.value = _value;
        node.data.range = _column;
        that.setData({
            formData: _formData
        })
    },

    multiChange:function(e){
        let that = this;
        let _formData = that.data.formData;
        let _postData = that.data.postData;
        let _id = e.target.dataset.id;
        let _curr = that.data.currentStep;
        let currNode = _formData[_curr][_id];
        let _name = e.target.dataset.name;
        let value = e.detail.value;
        let range = currNode.data.range;
        let _selected = range[0][value[0]][1] + ',' + range[1][value[1]][1] + ',' + range[2][value[2]][1];
        
        currNode.value = e.detail.value;
        currNode.data.selected = _selected;
        _formData[_curr][_id] = currNode;

        if (e.target.id == "area"){
            _postData['province'] = range[0][value[0]][1];
            _postData['provinceId'] = range[0][value[0]][0];
            _postData['city'] = range[1][value[1]][1];
            _postData['cityId'] = range[1][value[1]][0];
            _postData['area'] = range[2][value[2]][1];
            _postData['areaId'] = range[2][value[2]][0];
        }else{
            _postData[e.target.id] = _selected;
            _postData[_name] = range[0][value[0]][0] + ',' + range[1][value[1]][2] + ',' + range[2][value[2]][2];
        }
        console.log(_postData);
        that.setData({
            formData: _formData,
            postData: _postData
        });
    },
    //picker控件选值存储
    changePicker: function (e) {
      let that = this;
      var _formData = that.data.formData;
      let _node = that.getNode(e.target.id);
      _node.value =e.detail.value;
      let range = _node.data.range;
      _node.data.selected = range[e.detail.value][0];
      let _postData = this.data.postData;
      _postData[e.target.dataset.name] = range[e.detail.value][1];
      if (e.target.dataset.extend){
          _postData[e.target.dataset.extend] = range[e.detail.value][0];
      }

      if (e.target.dataset.id === 'accountType'){
          let _form = _formData[1];
          if (e.detail.value === '1'){
             _form[2].label = '对公账户';
             _form[3].label = '企业名称';
         }else{
              _form[2].label = '银行卡号';
              _form[3].label = '持卡人姓名';
         }
      }
      that.setData({
        formData: _formData,
        postData: _postData
      });
    },
    nextStep: function () {
        let that = this;
        this.stepJump(+1);
        wx.setStorageSync({
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
                    console.log(res);
                }
            });
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
    submintForm: function () {
        wx.showLoading({
            title: '',
            mask:true
        });
        let that = this;
        let parmas = that.data.postData;
        delete parmas.sign_type;
        delete parmas.sign;
        delete parmas.agentAuditNo;
        parmas.operationDatetime = base.getNowDate();
        parmas.service = 'mp_pf_add_configure';
        parmas.productId = '480';
        let _parmas = base.getSign(parmas,app.key);
        wx.request({
            url: app.url.host,
            data: _parmas,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(res){
                wx.hideLoading();
                let data = base.XMLtoJSON(res.data);
                console.log(data)
                if(data.ebill.is_success === 'S'){
                    wx.navigateTo({
                        url: '/pages/applycomplete/applycomplete',
                    })
                }else{
                    wx.showModal({
                        title: '提交出错',
                        content: data.ebill.message,
                    })
                }
            },
            fail:function(error){
                wx.showToast({
                    title: '注册失败',
                })
            }
        });
        wx.navigateTo({
            url: '/pages/applycomplete/applycomplete',
        });
    },

    onLoad: function (options) {
        console.log(options);
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
 
        if (options.edit){
            console.log('sdf');
            wx.getStorage({
                key: 'parmas',
                success: function(res) {
                    //console.log(res);
                    //that.data.postData = res.data
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
       
    },
    onShow: function () {
        console.log('333');
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