<template data-title="检验报告和鉴定书">
  <div id="appraisalRecord">
    <router-view ref='jdview' v-on:saveHis="saveHis"></router-view>
    <div class="text" v-show='unselect'>
      未分配检验报告或鉴定书！
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      unselect:false,
    }
  },
  mounted:function(){
    let regRow = JSON.parse(this.getData("regRow"));
    // 跳转路由
    this.getHttp("previews/getPreviews",{"registerId":regRow.registerId},res =>{
        if(res.code == '0'){
          if(res.data.docForModel){
            this.$router.push(res.data.docForModel);
          }else{
            this.unselect = true;
          }
        }else{
            this.notify_warning(res.msg);
        }
    });
  },
  methods:{
    save(){
      this.$refs.jdview.saveForm();
    },
    saveHis(){
      this.$emit('saveHis');
    }
  }
}
</script>

<style>
#appraisalRecord{
  width:90%;
  margin:auto;
  padding-bottom:20px;
}
#appraisalRecord .text{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  color: #c7c7c7;
}
</style>
