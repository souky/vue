<template>
  <div>
    <div class="info_body">
      <template v-if="infoDatas.status == '1'" v-for="e in infoDatas.headerList">
        <template v-if="e.operations == '0'">
          <div :class="(e.formType == 'input' || e.formType == 'radios')?'items':'items rows'">
            <div class="label">{{e.label}}</div>
            <div v-if="e.formType == 'select' || e.formType == 'radios' || e.formType == 'date'" class="content">{{e.formatter}}</div>
            <div v-else class="content">{{infoDatas.data[0][e.name]}}</div>
          </div>
        </template>
      </template>
    </div>
    <div v-if="infoDatas.status == '2'">
      <div class="info-title">
        <font style="color:#666">[{{infoDatas.workFlowName}}]</font> - 退回
      </div>
      <div class="info-reason">
        <font style="color:#666">退回原因：</font>{{infoDatas.reason}}
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data:function(){
    return {
      datas:{}
    }
  },
  props:['infoDatas'],
  mounted:function(){

  },
  methods:{
  }
}
</script>
<style>
.info_body{
  display: flex;
  display: -webkit-flex;
  flex-wrap:wrap;
  margin-top:10px;
}
.info_body .items{
  display: flex;
  display: -webkit-flex;
  width:33%;
  font-size:14px;
  height:40px;
  line-height: 40px;
}
.info_body .items.rows{
  width:100%;
}
.info_body .items .label{
  width:140px;
  text-align: right;
  color:#777;
}
.info_body .items .content{
  width:calc(100% - 160px);
  margin-left:20px;
}
.info-title{
  width: 100%;
  height:50px;
  line-height: 50px;
  text-align: center;
}
.info-reason{
  line-height: 20px;
  width: 100%;
  box-sizing: border-box;
  padding:20px;
}
</style>
