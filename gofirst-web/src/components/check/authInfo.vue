<template>
  <div>
    <DynamicTable :tableData="dynamicData"></DynamicTable>
  </div>
</template>

<script>
export default{
  data:function(){
    return {
      dynamicData: {
        data: [],
        hasCheck: '0',
        hasIndex: '0',
        align: 'center',
        hasEdit: '0',
        headers: [],
      },
      registerId: '',
      regRow:{}
    }
  },
  activated:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    this.registerId = this.regRow.registerId;
    let data = {aucOrgId: this.regRow.aucOrgId, type: '1'};
    this.postHttp("evidenceColumn/selectListByAucOrgId", data, res => {
      this.dynamicData.headers = res.data;
    });
    this.query();
  },
  methods:{
    query() {
      let data = {registerId: this.registerId, type: '1'};
      this.postHttp("evidengesExtd/getEvidengesExtdList", data, res => {
        if (res.code == '0') {
          this.dynamicData.data = res.data;
        } else {
          this.notify_warning(res.msg);
        }
      })
    },
  }
}
</script>
