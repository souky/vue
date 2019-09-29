<template>
<div id="holidaySetting">
  <div class="mainItem breadcrumb">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>您的位置</el-breadcrumb-item>
      <el-breadcrumb-item>配置</el-breadcrumb-item>
      <el-breadcrumb-item>节假日配置</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="mainItem">
    <div class="controller">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择年份">
          <el-select v-model="times" @change="yearChange">
              <el-option v-for="e in yearOpt" :key="e" :label="e" :value="e"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setSundayHoliday" >将周六、日设置为假期</el-button>
        </el-form-item>
      </el-form>
    </div>
    <HolidaySetting ref="holiday"></HolidaySetting>
  </div>

</div>
</template>
<script>
  export default {
    data() {
      return {
        times:2019,
        yearOpt:[2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
      }
    },
    activated:function () {
      this.times = parseInt(new Date().getFullYear());
      this.$refs.holiday.init(this.times);

    },
    methods:{
      yearChange(){
        this.$refs.holiday.init(this.times);
      },
      setSundayHoliday(){
        this.$confim("确定将周六、日设置为节假日吗？",'提示',v=>{
          console.log(this.$refs.holiday);
          this.$refs.holiday.setSundayHoliday();
        })

      }
    }
  }
</script>
<style>
#holidaySetting .controller{
  padding:20px;
}
</style>
