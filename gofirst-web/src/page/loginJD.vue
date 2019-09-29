<template>
  <div id="loginJD">
    <el-container>
      <el-header>
        <div class="header-in">
          <div class="text">
            鉴定系统
          </div>
          <div class="search">
            <!-- <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
              <el-button slot="append" >搜索</el-button>
            </el-input>
            <el-button type="info" plain style="margin-left:20px;">注册</el-button> -->
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="pre-text">
          <div class="text">
            公安一体化
          </div>
          <div class="text weight">
            鉴定系统智能管理平台
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
              <el-button type="info" plain @click="authLanding('ruleForm')">数字证书登录</el-button>
              <el-button type="primary" plain style="width:126px" @click="submitForm('ruleForm')">登录</el-button>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        版权所有 高弗特科技股份(上海)有限公司 热线电话：400-880-1976
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchKey: '',

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
    mounted: function () {
      //获取外部登陆地址
      var url = location.href;
      //回车按键直接登陆
      document.onkeydown = e => {
        if (e.keyCode === 13) {
          this.submitForm('ruleForm');
        }
      }
      window.sessionStorage.clear();
    },
    methods: {
      //数字认证证书登陆
      authLanding(formName) {
          this.usbkeyLogin( res => {
            if ('2' == res.status) {
              this.notify_error("密码错误");
              return;
            } else if ('0' == res.status) {
              this.notify_error("用户不存在");
              return;
            }
            var token = "Bearer " + res.token;
            window.localStorage.setItem("Authorization", token);
            //update token
            this.$axios.defaults.headers.common['Authorization'] = token;
            this.setData("userNo", this.ruleForm.userno);
            this.setData("loginURL", '/loginJD');
            this.setData("systemName", '鉴定系统');
            this.postHttpForLogin("auth/selectByUserNo", this.ruleForm.userno, res => {
              if (res.code == 0) {
                this.setData("userName", res.data.empName);
              }
            });
            this.$router.push('/appraisal');
          })
      },

      //输入账号密码登录
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // localStorage.setItem('ms_username',this.ruleForm.username);
            this.postHttpForLogin("auth/login", this.ruleForm, res => {
              if ('2' == res.status) {
                this.notify_error("密码错误");
                return;
              } else if ('0' == res.status) {
                this.notify_error("用户不存在");
                return;
              }
              var token = "Bearer " + res.token;
              window.localStorage.setItem("Authorization", token);
              //update token
              this.$axios.defaults.headers.common['Authorization'] = token;
              this.setData("userNo", this.ruleForm.userno);
              this.setData("loginURL", '/loginJD');
              this.setData("systemName", '鉴定系统');
              this.postHttpForLogin("auth/selectByUserNo", this.ruleForm.userno, res => {
                if (res.code == 0) {
                  this.setData("userName", res.data.empName);
                }
              })
              this.$router.push('/appraisal');
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
  #loginJD {

  }

  #loginJD .el-main {
    width: 100%;
    height: calc(100vh - 120px);
    background: url('../assets/img/login/backgroundJD.png') no-repeat;
    background-size: cover;
    position: relative;
  }

  #loginJD .header-in {
    width: 1200px;
    line-height: 60px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    margin: auto;
  }

  #loginJD .header-in .text {
    font-size: 28px;
    font-weight: 600;
  }

  #loginJD .header-in .search {
    display: flex;
    height: 40px;
    margin-top: 10px;
  }

  #loginJD .el-main .pre-text {
    position: absolute;
    left: 24%;
    top: 24%;
  }

  #loginJD .el-main .text {
    font-size: 32px;
    color: #fff;
  }

  #loginJD .el-main .text.weight {
    font-weight: 600;
  }

  #loginJD .el-main .login_outside {
    position: absolute;
    left: 73%;
    top: 0%;
    width: 350px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  #loginJD .el-main .login_outside .login {
    width: 350px;
    background: #fff;
    border-radius: 10px;
  }

  #loginJD .el-main .login .login-header {
    height: 80px;
    line-height: 80px;
    width: 100%;
    text-align: center;
    cursor: default;
    color: #409EFF;
    font-size: 24px;
    border-bottom: 1px solid #409EFF;
    margin-bottom: 20px;
  }

  #loginJD .el-main .login .login-mian {
    width: 90%;
    margin: auto;
    padding: 20px 0;
  }

  #loginJD .el-main .login .login-footer {
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 40px;
    margin: 20px auto;

  }

  #loginJD .el-footer {
    line-height: 60px;
    text-align: center;
  }
</style>
