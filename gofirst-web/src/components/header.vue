<template>
  <div class="header_container">
    <div class="header_left">
      <a href="https://www.baidu.com/" target="_blank">
        <img hidefocus="true" src="../assets/logo.png" alt="www.baidu.com">
      </a>
      <p>刑事技术工作圈平台</p>
    </div>
    <div class="header_right">
      <div class="part">
        <div class="header-tips">{{systemName}}</div>
        <!-- <div class="header-select">
          <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                   <i class="el-icon--right"><img src="../assets/img/header-select.png"></i>
                  </span>
            <el-dropdown-menu class="header-el-dropdown-menu-select" slot="dropdown">
              <el-dropdown-item>送检系统</el-dropdown-item>
              <el-dropdown-item>鉴定系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
      </div>
      <div class="part">
        <!-- <div class="header-div-dropdown">
          <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                      控制面板<img src="../assets/img/header-down.png" alt="">
                  </span>
            <el-dropdown-menu slot="dropdown" class="header-el-dropdown-menu-col">
              <el-dropdown-item>送检系统</el-dropdown-item>
              <el-dropdown-item>鉴定系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="header-p1">|</div> -->
        <div class="header_user">
          用户 : <font>{{empName}}</font>
        </div>
        <div class="header_help">
          <div class="header_help_help">
            <div>帮助</div>
          </div>
          <div class="header-p2">|</div>
          <div class="header_help_exit">
            <div @click="loginOut">退出</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        userNo: '',
        empName: '',
        systemName:'',
      }
    },

    mounted: function () {
      this.userNo = this.getData("userNo")
      this.query();
      this.systemName = this.getData("systemName");
    },

    methods: {
      //查询
      query() {
        this.postHttpForLogin("auth/selectByUserNo", this.userNo, res => {
          if (res.code == 0) {
            this.empName = res.data.empName;
          }
        })
      },
      //点击退出，回到登录页面
      loginOut() {
        this.postHttpForLogin("auth/loginOut", {}, res => {
            let loginURL = this.getData('loginURL');
            window.sessionStorage.clear();
            this.setData("loginURL",loginURL);
            this.$router.push(loginURL);
        })
      }
    }
  }
</script>

<style scoped>
  .header_container {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0px;
  }

  .header_left {
    position: relative;
    width: 190px;
    height: 80px;
    background-color: #1e66dc;
    text-align: center;
  }

  .header_left img {
    position: relative;
    top: 9px;
  }

  .header_left p {
    position: relative;
    width: 190px;
    height: 80px;
    color: #fff;
    font-size: 16px;
    line-height: 50px;
  }

  .header_right {
    position: relative;
    width: 100%;
    height: 80px;
    line-height: 80px;
    background-image: url('../assets/img/header-right.png');
    background-size: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }

  .part {
    display: flex;
    display: -webkit-flex;
  }

  .header-tips {
    margin-left: 40px;
    font-size: 24px;
    color: #fff;
  }

  .header-select {
    margin-left: 20px;
    box-sizing: border-box;
    padding-top: 4px;
  }

  .header-div-dropdown {
    margin-left: 20px;
  }

  .header-div-dropdown img {
    margin-left: 10px;
    margin-bottom: 1px;
  }

  .el-dropdown-link {
    cursor: pointer;
    font-size: 14px;
    color: #fff;
  }

  .el-icon-arrow-down {
    font-size: 10px;
  }

  .header_user {
    margin-left: 20px;
    color: #fff;
    font-size: 14px;
  }

  .header_user font {
    cursor: pointer;
    text-decoration: underline;
  }

  .header_help {
    margin-left: 20px;
    color: #dcdcdc;
    font-size: 14px;
    display: flex;
    display: -webkit-flex;
    margin-right: 30px;
  }

  .header-el-dropdown-menu-select {
    top: 45px !important;
    left: 410px !important;
  }

  .header-el-dropdown-menu-col {
    top: 48px !important;
  }

  .header-p1 {
    margin-left: 20px;
    line-height: 78px;
    color: #fff;
  }

  .header-p2 {
    margin-left: 10px;
    color: #dcdcdc;
    line-height: 78px;
  }

  .header_help_help {
    margin-left: 10px;
    color: #dcdcdc;
    cursor: pointer;
  }

  .header_help_exit {
    margin-left: 10px;
    color: #dcdcdc;
    cursor: pointer;
  }

  .el-button--text {
    color: #dcdcdc;
  }
</style>
