<template>
  <div>
    <DynamicTable :tableData="dynamicDataInsp"></DynamicTable>
  </div>
</template>

<script>
export default{
  data:function(){
    return {
      dynamicDataInsp: {
        data: [],
        hasCheck: '0',
        hasIndex: '0',
        align: 'center',
        hasEdit:'0',
        headers: [],
      },
      registerId: '',
      regRow:{}
    }
  },
  activated:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    this.registerId = this.regRow.registerId;
    let data = {aucOrgId: this.regRow.aucOrgId,type:'2'}
    this.postHttp("evidenceColumn/selectListByAucOrgId",data,res=>{
      this.dynamicDataInsp.headers = res.data;
      this.loadData();
    });
  },
  methods:{
    loadData() {
      let data = {registerId:this.registerId,type:'2'}
      this.postHttp("evidengesExtd/getEvidengesExtdList",data,res=>{
        this.dynamicDataInsp.data = res.data;
      });
    },
  }
}
</script>
