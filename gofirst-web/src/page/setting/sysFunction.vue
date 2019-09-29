<template>
    <div class="sysFunction">
        <el-row class="yourAddress normalRow">
            <el-col :span="12" class="normalCol">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                <el-breadcrumb-item>配置</el-breadcrumb-item>
                <el-breadcrumb-item>系统模块配置</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>

        <el-tabs :tab-position="tabPosition" type="border-card" class="sysTab">
            <el-tab-pane label="系统功能管理">系统功能管理</el-tab-pane>
            <el-tab-pane label="模块应用管理">模块应用管理</el-tab-pane>
            <el-tab-pane label="角色应用管理">角色应用管理</el-tab-pane>
        </el-tabs>

    </div>

</template>

<script>
export default {
    data() {
      return {
        tabPosition: 'left'
      };
    }

};
</script>

<style >
.sysFunction {
  background-color: #f0f3fa;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.sysFunction .el-breadcrumb {
  height: 3em;
  line-height: 3em;
}
.sysFunction .el-row {
  margin-left: 15px;
  margin-right: 15px;
  padding-left: 10px;
  /* background-color: #ffffff; */
}
.sysFunction .normalRow {
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  padding-left: 10px;
  background-color: #ffffff;
  overflow: hidden;
}
.sysTab{
    margin-left: 15px;
    margin-right: 15px;
  /* padding-left: 10px; */
    height: 92%;
    /* background-color:"#545c64";
    color:"#fff"; */

}

</style>
