/**
 * @description 默认验证规则
 */
export default{
  rules:{
    // input非空
    notNullInput:[
      { required: true, message: '此项为必填项', trigger: 'blur' }
    ],
    // select checkbox radios 非空
    notNullSelect:[
      { required: true, message: '此项为必选项', trigger: 'change' }
    ],
    // 数字验证
    isNumber:[
      {validator:function(rule, value, callback){
        let reg = /^[0-9]\d*$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('请输入正确数字'));
        }
      },trigger: 'blur',required: true}
    ],
    // 身份证验证
    idCard:[
      {validator:function(rule, value, callback){
        //let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
        let reg = /^([1-9]\d{5})((18|19|20)\d{2})((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}([0-9]|X|x)$/
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('请输入正确身份证号'));
        }
      },trigger: 'blur',required: true}
    ],
    // 电话号验证
    phone:[
      {validator:function(rule, value, callback){
        let regP = /^1[345789]\d{9}$/;
        let regT = /\d{3}-\d{8}|\d{4}-\d{7,8}/


        if (regP.test(value) || regT.test(value)) {
          callback();
        } else {
          callback(new Error('请输入正确电话号'));
        }
      },trigger: 'blur',required: true}
    ],
    // 中文字符
    chinese:[
      {validator:function(rule, value, callback){
        let reg = /^[\u0391-\uFFE5]+$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('只允许中文字符'));
        }
      },trigger: 'blur',required: true}
    ],
    // 用户名
    userName:[
      {validator:function(rule, value, callback){
        if (value) {
          if(value.length > 20 || value.length < 6){
            callback(new Error('此项长度需在6-20位之间'));
          }else{
            callback();
          }
        } else {
          callback(new Error('此项为必填项'));
        }
      },trigger: 'blur',required: true}
    ]
  }
}
