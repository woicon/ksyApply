var commondata = require('../../utils/data.js');
module.exports =[
    [
        {
            "label": "商户名称",
            "placeholder": "请输入门店全称",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "商户简称",
            "placeholder": "如肯德基",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "行业类别",
            "placeholder": "请选择",
            "type": "1",
            "data": {
                mode: 'multiSelector',
                range: commondata.industry,
                rangekey: 'name',
                selected: '请选择',
                bindchange: "bindMultiPickerChange",
                bindcolumnchange: 'bindMultiPickerColumnChange'
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "商户所属地",
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
            "placeholder": "80个字以内",
            "type": "3",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "营业执照号",
            "placeholder": "32字以内",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "负责人",
            "placeholder": "10字以内",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "负责人手机号",
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
            "label": "账户类型",
            "placeholder": "请选择",
            "type": "1",
            "data": {
                mode: 'selector',
                range: ['个人账户', '企业账户'],
                selected: '请选择',
                bindchange: "changePicker"
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
        // {
        //     "label": "证件类型",
        //     "placeholder": "请选择",
        //     "type": "1",
        //     "data": {
        //         mode: 'selector',
        //         range: ['身份证', '企业账户'],
        //         selected: '请选择',
        //         bindchange: "changePicker"
        //     },
        //     "stat": "false",
        //     "bindtap": "",
        //     "value": ""
        // },
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
            "label": "持卡人地址",
            "placeholder": "请输入持卡人地址",
            "type": "0",
            "data": "",
            "stat": "false",
            "bindtap": "",
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
            "placeholder": "请选择",
            "type": "2",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "身份证背面",
            "placeholder": "请选择",
            "type": "2",
            "data": "",
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "营业执照",
            "placeholder": "请选择",
            "type": "2",
            "data": {
                type: 'number',
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        },
        {
            "label": "开户许可证",
            "placeholder": "请选择",
            "type": "2",
            "data": {
                type: 'number'
            },
            "stat": "false",
            "bindtap": "",
            "value": ""
        }
    ]
]