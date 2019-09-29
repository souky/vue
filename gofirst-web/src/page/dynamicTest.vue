<template>
	<div style="width:100%;height:100%;box-sizing:border-box;background:#f0f3fa">
		<div  style="width:90%;margin:auto;padding-top:100px;box-sizing:border-box;">
			<DynamicTable :tableData="dynamicData" @edit="edit" @deletes="deletes"></DynamicTable>
		</div>

		<div style="width:90%;margin:auto;padding-top:30px;box-sizing:border-box;">
			<DynamicForm :formDatas="dynamicData" ref="formOne"></DynamicForm>
		</div>

		<el-button type="primary" @click="test">测试</el-button>
  </div>
</template>

<script type="text/javascript">

import DynamicData from '@/js/DynamicData';
export default {
  data() {
      return {
          msg:'',
          dynamicData:DynamicData.dynamicData,

      }
  },
	//更改或者追加规则需要在created函数中声明
  created:function(){
		this.dynamicData.form.rules = this.$DefaultRules.rules
  },
  methods:{
    edit(row){
      console.log(row);
    },
    deletes(row){
      this.$confim("确定要删除此项？","提示",data=>{
				console.log(row);
			})
    },
		test(){
			//取出组件中的form
			this.$refs['formOne'].getForm().validate((valid) => {
        if (valid) {
          console.log(this.dynamicData.form.model);
        } else {
          console.log('error submit!!');
          return false;
        }
      });

		}
  }
}
</script>
