<template>
  <div id="loginJD">
    <el-container>
      <el-header>
        <div class="header-in">
          <div class="text">
            委托系统
          </div>
          <div class="search">
            <!-- <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
              <el-button slot="append" >搜索</el-button>
            </el-input> -->
            <el-button type="info" plain style="margin-left:20px;" @click='openRegister'>注册</el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="pre-text">
          <div class="text">
            公安一体化
          </div>
          <div class="text weight">
            委托系统智能管理平台
          </div>
        </div>
        <div class="login_outside">
          <div class="login">
            <div class="login-header">
              账号登录
            </div>
            <div class="login-mian">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="userno">
                  <el-input v-model="ruleForm.userno" placeholder="账号">
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" placeholder="密码" v-model="ruleForm.password">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="login-footer">
              <el-button type="info" plain>数字证书登录</el-button>
              <el-button type="primary" plain style="width:126px" @click="submitForm('ruleForm')">登录</el-button>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        版权所有 高弗特科技股份(上海)有限公司 热线电话：400-880-1976
      </el-footer>
    </el-container>

    <el-dialog title='注册' :visible.sync="registerDialog" width='30%' :close-on-click-modal='false'>
      <div class="dynamicForm">
        <el-form :model="register" ref="regForm" label-width="100px" status-icon>
          <el-form-item label='所属机构' prop="orgId" :rules="regRules.notNullSelect">
            <el-select v-model="register.orgId" filterable placeholder="请选择">
              <el-option v-for="e in orgList" :key="e.orgId" :value="e.orgId" :label='e.orgName'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='用户名' prop="userNo" :rules="regRules.userName">
            <el-input v-model="register.userNo" placeholder="请填写警号"></el-input>
          </el-form-item>
          <el-form-item label='姓名' prop="userName" :rules="regRules.chinese">
            <el-input v-model="register.userName" placeholder="请填写姓名"></el-input>
          </el-form-item>
          <el-form-item label='密码' prop="userPd" :rules="regRules.userName">
            <el-input type="password" placeholder="密码" v-model="register.userPd"></el-input>
          </el-form-item>
          <el-form-item label='确认密码' prop="userPd2" :rules="regRules.password">
            <el-input type="password" placeholder="确认密码" v-model="register.userPd2"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetRegForm">重  置</el-button>
        <el-button type="primary" @click="registerUser">注  册</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      searchKey:'',

      ruleForm: {
        userno: '',
        password: ''
      },
      rules: {
        userno: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },

      registerDialog:false,
      register:{
        orgId:''
      },
      orgList:[],
      regRules:{}
    }
  },
  created:function(){
    this.regRules = this.$DefaultRules.rules
  },
  mounted:function(){
    this.regRules.password = [
      {validator:(rule, value, callback)=>{
        if (value) {
          if(value.length > 20 || value.length < 6){
            callback(new Error('此项长度需在6-20位之间'));
          }else{
            if(this.register.userPd != this.register.userPd2){
              callback(new Error('两次输入密码不一致'));
            }else{
              callback();
            }
          }
        } else {
          callback(new Error('此项为必填项'));
        }
      },trigger: 'blur',required: true}
    ]

    //回车按键直接登陆
    document.onkeydown = e =>{
      if (e.keyCode === 13 ) {
        this.submitForm('ruleForm');
      }
    }
    // 获取组织机构
    this.postHttpForLogin("orgsController/getAllOrgList",{},res=>{
      this.orgList = res.data;
    });
    window.sessionStorage.clear();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // localStorage.setItem('ms_username',this.ruleForm.username);
          this.postHttpForLogin("auth/login", this.ruleForm, res => {
            if('2' == res.status){
              this.notify_error("密码错误");
              return;
            }else if ('0' == res.status){
              this.notify_error("用户不存在");
              return;
            }
            var token = "Bearer " + res.token;
            window.localStorage.setItem("Authorization", token);
            //update token
            this.$axios.defaults.headers.common['Authorization'] = token;
            this.setData("userNo", this.ruleForm.userno);
            this.setData("loginURL",'/loginWT');
            this.setData("systemName",'委托系统');
            this.postHttpForLogin("auth/selectByUserNo", this.ruleForm.userno, res => {
              if (res.code == 0) {
                this.setData("userName", res.data.empName);
              }
            })
            this.$router.push('/entrustList');
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    openRegister(){
      this.registerDialog = true;
      this.resetRegForm();
    },
    resetRegForm(){
      if(this.$refs.regForm){
        this.$refs.regForm.resetFields();
      }
    },
    registerUser(){
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          this.postHttpForLogin("auth/saveUser",this.register,res=>{
            if(res.code == '0'){
              this.notify_success("注册成功,请重新登录");
              this.registerDialog = false;
            }else{
              this.notify_error(res.msg);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style>
#loginJD{

}
#loginJD .el-main{
  width: 100%;
  height: calc(100vh - 120px);
  background:url('../assets/img/login/backgroundJD.png') no-repeat;
  background-size:cover;
  position: relative;
}

#loginJD .header-in{
  width: 1200px;
  line-height: 60px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin: auto;
}
#loginJD .header-in .text{
  font-size: 28px;
  font-weight: 600;
}
#loginJD .header-in .search{
  display: flex;
  height: 40px;
  margin-top: 10px;
}
#loginJD .el-main .pre-text{
  position: absolute;
  left: 24%;
  top: 24%;
}
#loginJD .el-main .text{
  font-size: 32px;
  color:#fff;
}
#loginJD .el-main .text.weight{
  font-weight: 600;
}
#loginJD .el-main .login_outside{
  position: absolute;
  left: 73%;
  top: 0%;
  width: 350px;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
#loginJD .el-main .login_outside .login{
  width: 350px;
  background: #fff;
  border-radius: 10px;
}
#loginJD .el-main .login .login-header{
  height: 80px;
  line-height: 80px;
  width: 100%;
  text-align: center;
  cursor: default;
  color:#409EFF;
  font-size: 24px;
  border-bottom: 1px solid #409EFF;
  margin-bottom: 20px;
}
#loginJD .el-main .login .login-mian{
  width: 90%;
  margin: auto;
  padding:20px 0;
}
#loginJD .el-main .login .login-footer{
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 40px;
  margin: 20px auto;

}
#loginJD .el-footer{
  line-height: 60px;
  text-align: center;
}
</style>
