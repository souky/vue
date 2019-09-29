<template>
  <div id="mainContent" class="main_container">
    <headerTop></headerTop>
    <el-row style="height: 100%;">
      <el-col class="main_col" :span="4">
        <el-menu style="min-height: 100%;" theme="dark" router :unique-opened=true>

          <el-submenu index="1" v-if="showRegister">
            <template slot="title"><i class="el-icon-sold-out"></i>委托登记</template>
            <!-- <el-menu-item index="/dnaList">DNA委托列表</el-menu-item> -->
            <el-menu-item index="/entrustList">委托列表</el-menu-item>
            <el-menu-item index="/entrustUpdateList">登记信息修改申请</el-menu-item>
          </el-submenu>

          <!-- <el-submenu index="2" v-if="showDnaList">
            <template slot="title"><i class="el-icon-sold-out"></i>DNA</template>
            <el-menu-item index="/materInspectList">检材样本列表</el-menu-item>
          </el-submenu> -->

          <el-submenu index="6" v-if="showAppraisal">
            <template slot="title"><i class="el-icon-tickets"></i>检验鉴定</template>
            <el-menu-item index="/appraisal">鉴定列表</el-menu-item>
            <el-menu-item index="/appComplete">鉴定完成</el-menu-item>
            <el-menu-item index="/applyList">申请列表</el-menu-item>
            <el-menu-item index="/docList">文书台账</el-menu-item>
            <el-menu-item index="/backup">流程回退</el-menu-item>
          </el-submenu>

          <el-submenu index="7" v-if="showConfigure">
            <template slot="title"><i class="el-icon-setting"></i>配置</template>
            <el-menu-item index="/permission">权限配置</el-menu-item>
            <el-menu-item index="/mechanism">机构配置</el-menu-item>
            <el-menu-item index="/authenticateItem">鉴定专业</el-menu-item>
            <el-menu-item index="/dictManage">字典管理</el-menu-item>
            <el-menu-item index="/processManage">流程管理</el-menu-item>
            <el-menu-item index="/instrRecord">常量管理</el-menu-item>
            <el-menu-item index="/entrustOrgManage">流水号管理</el-menu-item>
            <el-menu-item index="/holidays">节假日管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: calc(100% - 108px);	width: calc(100% - 190px);">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>

    <footerBottom></footerBottom>
  </div>
</template>

<script>
  import footerBottom from '../components/footer';
  import headerTop from '../components/header'

  export default {
    data() {
      return {
        funcId: '',
        showRegister: '',
        showAppraisal: '',
        funcId: '',
        showConfigure: '',
        showDnaList:''
      }
    },
    components: {   /*前面的组件名称不能和html标签一样*/
      footerBottom,
      headerTop
    },
    mounted: function () {
      this.userNo = this.getData("userNo")
      this.query();
    },
    methods: {
      //查询
      query() {
        this.postHttpForLogin("auth/selectByUserNo", this.userNo, res => {
          if (res.code == 0) {
            this.funcId = res.data.funcId.split("，");
            this.funcId.forEach(items => {
              if (items.indexOf('/entrustList') !== -1) {
                this.showRegister = true;
              }
              if (items.indexOf('/appraisal') !== -1) {
                this.showAppraisal = true;
              }
              if (items.indexOf('/sysFunction') !== -1) {
                this.showConfigure = true;
              }
              if (items.indexOf('/sysFunction') !== -1) {
                this.showDnaList = true;
              }
            });
          }
        })
      },
      //点击退出，回到登录页面
      loginOut() {
        window.sessionStorage.clear();
        this.$router.push("/");
      }
    }
  }
</script>

<style>
  .main_container {
    height: 100%;
    width: 100%;
  }

  .main_col {
    min-height: 100%;
    width: 190px !important;
    background-color: white;
  }
</style>
