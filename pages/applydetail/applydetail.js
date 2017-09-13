var app = getApp();
Page({
  data: {
    stat: { "2":'待审核',"3":'处理中',"4":'不通过',"6":'审核通过'},
    businessLicenseType:{
        "NATIONAL_LEGAL": "营业执照",
        "NATIONAL_LEGAL_MERGE": "营业执照（多证合一）",
        "INST_RGST_CTF": "事业单位法人证书"
    },
    contactType:{
    "LEGAL_PERSON": "法人",
    "CONTROLLER": "实际控制人",
    "AGENT": "代理人",
    "OTHER": "其他"
    },
    passType:{
      "1":"支付宝",
      "2":"微信",
      "3":"银行（光大）",
      "4":"支付宝二清",
      "5":"微信二清",
      "6":"浦发银行"
    },
    mcList:[
        //进件商户信息
        {
            "fullNameCn": "商户名称",
            "nameCn": "商户简称",
            "tradeType": "经营类目",
            "tradeTypeName": "经营类目名称",
            "customerPhone": "客服电话",
            "contactType": "联系人类型",
            "contactName": "联系人姓名",
            "certificateNo": "联系人身份证号码",
            "contactPhone": "联系人电话",
            "contactMobile": "联系人手机号",
            "contactEmail": "联系人邮箱",
            "businessLicenseType": "营业执照类型",
            "businessLicenseNo": "营业执照编号",
            "province": "商户所在省",
            "provinceId": "商户所在省ID",
            "city": "商户所在市",
            "cityId": "商户所在市ID",
            "area": "商户所在区",
            "areaId": "商户所在区ID",
            "address": "商户详细地址"
        },
        //进件费率信息
        {
            "configureName": "配置名称",
            "passId": "通道id",
            "passType": "通道类型",
            "passName": "通道名称",
            "alipayRateId": "支付宝费率ID",
            "alipayRateName": "支付宝费率名称",
            "alipayRate": "支付宝费率",
            "wechatRateId": "微信费率ID",
            "wechatRateName": "微信费率名称",
            "wechatRate": "微信费率",
            "remark": "配置备注"
        },
        //银行账户信息
        {
            "accountType": "账户类型",
            "bank": "开户银行",
            "cardNo": "银行卡号/对公账号",
            "accountHolder": "开户人/企业名称"
        },
        //资质照片
        {
            "businessLicenseUrl": "营业执照照片",
            "identificationFrontUrl": "负责人身份证正面照片",
            "identificationOppositeUrl": "负责人身份证反面照片",
            "openingPermitUrl": "开户许可证照片"
        }
    ],
  },
  editForm: function () {
      console.log('2')
      wx.redirectTo({
          url: '/pages/apply/apply?edit=true',
      })
  },
  onLoad: function (options) {
      let that = this;
      wx.setNavigationBarTitle({
          title: '注册审核状态',
      });
      wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#27CFB1',
      });
      wx.getStorage({
          key: 'mcDetails',
          success: function(res) {
              console.log(JSON.parse(res.data));
              that.setData({
                  mcDetails: JSON.parse(res.data)
              });
          },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})