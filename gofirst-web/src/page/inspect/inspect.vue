<template>
  <div id="inspect" data-title="鉴定总页面">
    <div class="mainItem breadcrumb">
			<el-breadcrumb separator=">">
			  <el-breadcrumb-item>您的位置</el-breadcrumb-item>
			  <el-breadcrumb-item>检验鉴定</el-breadcrumb-item>
			  <el-breadcrumb-item>{{stepName}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
    <div class="mainItem" v-if="componentsName == 'vestige'">
      <VESTIGE ref='child' ></VESTIGE>
    </div>
  </div>
</template>

<script>
// 痕迹鉴定
import VESTIGE from '@/components/inspects/vestige';
export default {
  data(){
    return{
      componentsName:'',
      stepName:''
    }
  },
  // 组件
  components:{VESTIGE},
  activated:function(){
    this.componentsName = this.getData("componentsName");
    this.stepName = this.getData("stepName");

    // 测试用
    this.componentsName = 'vestige';
    this.stepName = '痕迹鉴定';

    this.dealChildData();
  },
  mounted:function(){


  },
  methods:{
    dealChildData(){
      setTimeout(()=>{
        this.$refs.child.dealData();
      },10)
    }
  }
}
</script>

<style>
#inspect{
  width: 100%;
  background:#f0f3fa;
  height:100%;
  overflow: auto;
  position: relative;
  font-family: "microsoft yahei";
}
</style>
