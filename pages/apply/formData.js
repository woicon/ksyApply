var commondata = require('../../pages/apply/data.js');

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
            "tip":"请输入商户名称全称，如'西少爷餐饮科技有限公司'",
            "value": ""
        },
        {
            "label": "商户简称",
            "name": "merchantName",
            "placeholder": "如肯德基",
            "type": "0",
            "data": {
                maxlength:"12",
            },
            "stat": "false",
            "bindtap": "",
            "block": true,
            "required": "请输入商户简称!", 
            "bindblur": "formBlur",
            "tip": "请输入商户简称，如'西少爷'",
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
                range: commondata.initRange(commondata.category),
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
                range: commondata.initRange(commondata.area),
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
            "block": true,
        },
        {
            "label": "营业执照类型",
            "placeholder": "请选择",
            "name":"businessLicenseType",
            "type": "1",
            "data": {
                mode: 'selector',
                range: [['营业执照', 'NATIONAL_LEGAL'],['营业执照（多证合一）', 'NATIONAL_LEGAL_MERGE'], ['事业单位法人证书','INST_RGST_CTF']],
                selected: '请选择',
                bindchange: "changePicker",
                rangekey: "0",
                id: "accountType"
            },
            "stat": "false",
            "bindtap": "",
            "value":[0,0,0]
        },
        {
            "label": "营业执照编号",
            "name":'businessLicenseNo',
            "placeholder": "18字以内",
            "type": "0",
            "data":{
                "maxlength":"18",
            },
            "stat": "false",
            "bindtap": "",
            "required": "请输入正确的营业执照编号!",
            "bindblur": "formBlur",
            "value": ""
        },
        {
            "label": "客服电话",
            "name": 'customerPhone',
            "placeholder": "只允许数字以及-",
            "type": "0",
            "data": {
                "maxlength": "11",
                "type": "number"
            },
            "stat": "false",
            "bindtap": "",
            "bindblur": "formBlur",
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
                range: [['法人', 'LEGAL_PERSON'], ['实际控制人', 'CONTROLLER'], ['代理人', 'AGENT'], ['其他','OTHER']],
                selected: '请选择',
                rangekey:'0',
                bindchange: "changePicker",
                id: "accountType"
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
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
            "bindtap": "",
            "value": ""
        },
        {
            "label": "商户联系人手机号",
            "name": "contactPhone",
            "required": "请输入正确的手机号!",
            "placeholder": "11位手机号",
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
            "required": "请输入正确的身份证号!",
            "name": "certificateNo",
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
                range: [['个人','1'],['企业','2']],
                selected: '请选择',
                rangekey:'0',
                bindchange: "changePicker",
                id: "accountType"
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
                range: commondata.bank,
                rangekey: "0",
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
            "placeholder": "20个字符以内",
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
                reference: '../../pages/images/idcardf.jpg',

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
                reference:'../../pages/images/idcardz.jpg',

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
