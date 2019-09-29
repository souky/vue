<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">网上送检系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="userno">
          <el-input v-model="ruleForm.userno" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people">用户</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password">
            <el-button slot="prepend" icon="el-icon-lx-lock">密码</el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="login-tips">Tips : 欢迎来这里</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
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
        }
      }
    },
    mounted:function(){
      //回车按键直接登陆
			document.onkeydown = e =>{
				if (e.keyCode === 13 ) {
					this.submitForm('ruleForm');
				}
			}
      //location.href = 'PageOffice://|http://localhost:8883/dianju/receipt.html|width=1366px;height=800px;frame=yes;ismodal=false;'
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
              }
              var token = "Bearer " + res.token;
              window.localStorage.setItem("Authorization", token);
              //update token
              this.$axios.defaults.headers.common['Authorization'] = token;
              this.setData("userNo", this.ruleForm.userno);
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
      }
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/login-bg.jpg');
    background-size: 100%;
  }

  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }

  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
</style>
