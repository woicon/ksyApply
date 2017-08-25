var commondata = require('../../utils/data.js');
module.exports =[
    [
        {
            "label": "商户名称",
            "name":"merchantFullName",
            "placeholder": "请输入门店全称",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "商户简称",
            "name": "merchantName",
            "placeholder": "如肯德基",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "经营类目",
            "name": "businessCategory",
            "placeholder": "请选择",
            "type": "1",
            "data": {
                mode: 'multiSelector',
                range: commondata.normalCategory,
                rangekey: 'name',
                selected: '请选择',
                bindchange: "bindMultiPickerChange",
                bindcolumnchange: 'columnChange'
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "商户所属地",
            "name": "area",
            "placeholder": "请选择",
            "type": "1",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "data": {
                mode: 'region',
                selected: '请选择',
                bindchange: "changePicker"
            },
            "value": ""
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
            "value": ""
        },
        {
            "label": "营业执照类型",
            "placeholder": "请选择",
            "type": "1",
            "data": {
                mode: 'selector',
                range: ['营业执照', '营业执照（多证合一）','事业单位法人证书'],
                selected: '营业执照',
                bindchange: "changePicker",
                id: "accountType"
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "营业执照编号",
            "name":'businessLicenseNo',
            "placeholder": "32字以内",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "客服电话",
            "name": 'customerPhone',
            "placeholder": "只允许数字以及-",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "商户联系人类型",
            "name":"contactType",
            "placeholder": "请选择",
            "type": "1",
            "data": {
                mode: 'selector',
                range: ['法人', '实际控制人','代理人','其他'],
                selected: '营业执照',
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
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        
        {
            "label": "联系人身份证号",
            "name": "contactName",
            "placeholder": "10字以内",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "商户联系人姓名",
            "name": "contactName",
            "placeholder": "10字以内",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "商户联系人手机号",
            "placeholder": "11位手机号",
            "name":"contactPhone",
            "type": "0",
            "data": {
                maxlength: "11",
                type: "number"
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "产品版本id",
            "name": "productNo",
            "placeholder": "选择",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
    ],
    [
        {
            "label": "账户类型",
            "placeholder": "请选择",
            "name":"accountType",
            "type": "1",
            "data": {
                mode: 'selector',
                range: ['个人', '企业'],
                selected: '个人',
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
            "type": "1",
            "data": {
                mode: 'selector',
                selected: '请选择',
                range: commondata.bank,
                rangekey: "name",
                bindchange: "changePicker"
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "开户银行编号",
            "name": "productNo",
            "placeholder": "选择",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "银行卡号",
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
            "label": "身份证号",
            "placeholder": "请输身份证号",
            "type": "0",
            "data": {
                type: 'idcard'
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "证件有效期",
            "placeholder": "选择有效期",
            "type": "1",
            "data": {
                mode: 'date',
                fields: "month",
                selected: "12-22",
                bindchange: "changePicker"
            },
            "stat": "false",
            "bindtap": "changeDate",
            "value": ""
        },
        {
            "label": "银行预留手机号",
            "placeholder": "11位手机号",
            "type": "0",
            "data": {
                maxlength: "11",
                type: "number"
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

module.exports.group = [
    {
        "label": "账户类型",
        "placeholder": "请选择",
        "type": "1",
        "data": {
            mode: 'selector',
            range: ['个人', '企业'],
            selected: "企业",
            bindchange: "changePicker",
            id:"accountType"
        },
        "stat": "false",
        "bindtap": "",
        "value": ""
    },
    {
        "label": "开户银行",
        "placeholder": "请选择",
        "type": "1",
        "data": {
            mode: 'selector',
            selected: '请选择',
            range: commondata.bank,
            rangekey: "name",
            bindchange: "changePicker"
        },
        "stat": "false",
        "bindtap": "",
        "value": ""
    },

    {
        "label": "对公账户",
        "placeholder": "20个字符以内",
        "type": "0",
        "data": {
            type: 'number',
            maxlength: '20'
        },
        "stat": "false",
        "bindtap": "",
        "value": ""
    },
    {
        "label": "企业名称",
        "placeholder": "请输入企业名称",
        "type": "0",
        "data": {
        },
        "stat": "false",
        "bindtap": "",
        "value": ""
    },
    // {
    //     "label": "商户所属地",
    //     "placeholder": "请选择",
    //     "type": "1",
    //     "data": "",
    //     "stat": "false",
    //     "bindtap": "",
    //     "data": {
    //         mode: 'region',
    //         selected: '请选择',
    //         bindchange: "changePicker"
    //     },
    //     "value": ""
    // },
    {
        "label": "法人身份证号",
        "placeholder": "请输身份证号",
        "type": "0",
        "data": {
            type: 'idcard'
        },
        "stat": "false",
        "bindtap": "",
        "value": ""
    }
]