var base = require('../../utils/util.js');
var commondata = require('../../pages/apply/data.js');
var picker = require('../../pages/apply/data/picker.js');
module.exports =[
    [
        {
            "label": "商户名称",
            "name":"merchantFullName",
            "placeholder": "请输入门店全称",
            "type": "0",
            "data": {
                maxlength: "27",
            },
            "stat": "false",
            "bindtap": "",
            "block":true,
            "required":"请输入正确的商户名称!",
            "bindblur":"formBlur",
            "tip":"请输入商户名称全称，如'西少爷餐饮科技有限公司'，支持汉字、字母、数字",
            "value": ""
        },
        {
            "label": "商户简称",
            "name": "merchantName",
            "placeholder": "如'西少爷'",
            "type": "0",
            "data": {
                maxlength:"12",
            },
            "stat": "false",
            "bindtap": "",
            "block": true,
            "required": "请输入商户简称!", 
            "bindblur": "formBlur",
            "tip": "请输入商户简称，如'西少爷'，支持汉字、字母、数字",
            "value": ""
        },
        {
            "label": "经营类目",
            "name": "businessCategoryName",
            "id":"businessCategory",
            "placeholder": "请选择",
            "type": "1",
            "range": commondata.category,
            "data": {
                mode: 'multiSelector',
                //range: commondata.initRange(commondata.category),
                rangekey: '1',
                selected:'请选择',
                bindchange: "multiChange",
                bindcolumnchange: 'columnChange'
            },
            "stat": "false",
            "block": true,
            "value":[0,0,0]
        },
        {
            "label": "商户所属地",
            "name": "area",
            "placeholder": "请选择",
            "type": "1",
            "data-id":'',
            "data": "",
            "stat": "false",
            "range": commondata.area,
            "data": {
                mode: 'multiSelector',
                selected: '请选择',
                rangekey: '1',
                //range: commondata.initRange(commondata.area),
                bindchange: "multiChange",
                bindcolumnchange: 'columnChange'
            },
            "value": [0,0,0]
        },
        {
            "label": "商户详细地址",
            "name":'address',
            "placeholder": "80个字以内",
            "type": "3",
            "data":{
                maxlength:"80"
            },
            "stat": "false",
            "bindtap": "",
            "value": "",
            "tip": "80个字以内，支持汉字、字母、数字",
            "block": true,
        },
        {
            "label": "营业执照类型",
            "placeholder": "请选择",
            "name":"businessLicenseType",
            "type": "1",
            "data": {
                mode: 'selector',
                range: base.values(picker.businessLicenseType),
                selected: '请选择',
                bindchange: "changePicker",
                //rangekey: "0",
            },
            "stat": "false",
            "bindtap": "",
            "value":""
        },
        {
            "label": "营业执照编号",
            "name":'businessLicenseNo',
            "placeholder": "15字或者18字执照编号",
            "type": "0",
            "data":{
                "maxlength":"18",
            },
            "stat": "false",
            "bindtap": "",
            "block": true,
            "required": "请输入正确的营业执照编号!",
            "tip": "数字或者字母，15位或者18位",
            "bindblur": "formBlur",
            "value": ""
        },
        {
            "label": "客服电话",
            "name": 'customerPhone',
            "placeholder": "请输入客服电话",
            "type": "0",
            "data": {
                "maxlength": "11",
                "type": "number"
            },
            "stat": "false",
            "bindtap": "",
            "bindblur": "formBlur",
            "block": true,
            "tip": "只允许数字",
            "required": "请输入正确的客服电话!",
            "value": ""
        },
        {
            "label": "商户联系人类型",
            "name":"contactType",
            "placeholder": "请选择",
            "type": "1",
            "data": {
                mode: 'selector',
                range: base.values(picker.contactType),
                selected: '请选择',
                //rangekey:,
                bindchange: "changePicker",
            },
            "stat": "false",
            "bindtap": "",
            "value": "",
        },
        {
            "label": "商户联系人姓名",
            "name":"contactName",
            "placeholder": "10字以内",
            "type": "0",
            "required": "请输入正确的姓名!",
            "data":{
                "maxlength":"10"
            },
            "stat": "false",
            "block":true,
            "tip": "最长10个汉字，不支持英文名及特殊字符",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "商户联系人手机号",
            "name": "contactPhone",
            "error": "请输入正确的手机号!",
            "placeholder": "11位手机号",
            "reg":"phone",
            "bindfocus":"inputFocus",
            "type": "0",
            "data": {
                "maxlength": "11",
                "type": "number"
            },
            "stat": "false",
            "bindtap": "",
            "bindblur": "formBlur",
            "value": ""
        },
        {
            "label": "联系人身份证号",
            "error": "请输入正确的身份证号!",
            "name": "certificateNo",
            "reg":"idcard",
            "placeholder": "18字以内",
            "type": "0",
            "data": {
                "maxlength": "18",
                "type":"idcard"
            },
            "stat": "false",
            "bindtap": "",
            "bindblur": "formBlur",
            "value": ""
        }
    ],
    [
        {
            "label": "账户类型",
            "placeholder": "请选择",
            "name":"accountType",
            "type": "1",
            "data": {
                mode: 'selector',
                range: base.values(picker.accountType),
                selected: '请选择',
                bindchange: "changePicker",
            },
            
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "开户银行",
            "placeholder": "请选择",
            "name":"bank",
            "type": "1",
            "data": {
                mode: 'selector',
                selected: '请选择',
                range: base.values(picker.bank),
                extend:"bankName",
                bindchange: "changePicker"
            },
            "stat": "false",
            "bindtap": "",
            "value": "",
            "bindblur": "formBlur",
            "_value":"",
        },
        {
            "label": "银行卡号",
            "name": "cardNo",
            "required": "请输入正确的银行卡号!",
            "placeholder": "请输入银行卡号",
            "type": "0",
            "data": {
                type:'number',
                maxlength:'20'
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "持卡人姓名",
            "name":"accountHolder",
            "required": "请输入正确的姓名!",
            "placeholder": "持卡人姓名",
            "type": "0",
            "data": {
                maxlength: "10",
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        }
    ],
    [
        {
            "label": "身份证正面",
            "name":"identificationFrontPfUrl",
            "placeholder": "请选择",
            "type": "2",
            "data": {
                reference:'../../pages/images/idcardz.jpg',

            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "身份证背面",
            "name":"identificationOppositePfUrl",
            "placeholder": "请选择",
            "type": "2",
            "data": {
                reference:'../../pages/images/idcardf.jpg',

            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "营业执照",
            "name":"businessLicensePfUrl",
            "placeholder": "请选择",
            "type": "2",
            "data": {
                reference: '../../pages/images/yyzz.jpg',

            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "开户许可证",
            "name":"openingPermitPfUrl",
            "placeholder": "请选择",
            "type": "2",
            "data": {
                reference: '../../pages/images/khxk.jpg',
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        }
    ]
];
