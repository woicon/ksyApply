//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    bankData: [
        {
            id: "102100099996",
            name: "中国工商银行",
            code: "102100099996"
        },
        {
            id: "103100000026",
            name: "中国农业银行股份有限公司",
            code: "103100000026"
        },
        {
            id: "104100000004",
            name: "中国银行总行",
            code: "104100000004"
        },
        {
            id: "105100000017",
            name: "中国建设银行股份有限公司总行",
            code: "105100000017"
        },
        {
            id: "301290000007",
            name: "交通银行",
            code: "301290000007"
        },
        {
            id: "302100011000",
            name: "中信银行股份有限公司",
            code: "302100011000"
        },
        {
            id: "303100000006",
            name: "中国光大银行",
            code: "303100000006"
        },
        {
            id: "304100040000",
            name: "华夏银行股份有限公司总行",
            code: "304100040000"
        },
        {
            id: "305100000013",
            name: "中国民生银行",
            code: "305100000013"
        },
        {
            id: "306581000003",
            name: "广发银行股份有限公司",
            code: "306581000003"
        },
        {
            id: "307584007998",
            name: "平安银行（原深圳发展银行）",
            code: "307584007998"
        },
        {
            id: "308584000013",
            name: "招商银行股份有限公司",
            code: "308584000013"
        },
        {
            id: "309391000011",
            name: "兴业银行总行",
            code: "309391000011"
        },
        {
            id: "310290000013",
            name: "上海浦东发展银行",
            code: "310290000013"
        },
        {
            id: "313100000013",
            name: "北京银行",
            code: "313100000013"
        },
        {
            id: "313192000013",
            name: "包商银行股份有限公司",
            code: "313192000013"
        },
        {
            id: "313241066661",
            name: "吉林银行",
            code: "313241066661"
        },
        {
            id: "313261000018",
            name: "哈尔滨银行结算中心",
            code: "313261000018"
        },
        {
            id: "313301099999",
            name: "江苏银行股份有限公司",
            code: "313301099999"
        },
        {
            id: "313331000014",
            name: "杭州银行股份有限公司",
            code: "313331000014"
        },
        {
            id: "313651099999",
            name: "成都银行",
            code: "313651099999"
        },
        {
            id: "313653000013",
            name: "重庆银行",
            code: "313653000013"
        },
        {
            id: "313791000015",
            name: "西安银行股份有限公司",
            code: "313791000015"
        },
        {
            id: "315456000105",
            name: "恒丰银行",
            code: "315456000105"
        },
        {
            id: "316331000018",
            name: "浙商银行",
            code: "316331000018"
        },
        {
            id: "319361000013",
            name: "徽商银行股份有限公司",
            code: "319361000013"
        },
        {
            id: "325290000012",
            name: "上海银行股份有限公司",
            code: "325290000012"
        },
        {
            id: "402100000018",
            name: "北京农村商业银行股份有限公司",
            code: "402100000018"
        },
        {
            id: "403100000004",
            name: "中国邮政储蓄银行有限责任公司",
            code: "403100000004"
        },
        {
            id: "402221010013",
            name: "辽宁省农村信用社联合社",
            code: "402221010013"
        }
    ],
  }
})
