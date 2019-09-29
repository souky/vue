<template>
  <div id="examine">

    <div class="mainItem breadcrumb">
			<el-breadcrumb separator=">">
			  <el-breadcrumb-item>您的位置</el-breadcrumb-item>
			  <el-breadcrumb-item>网上送检</el-breadcrumb-item>
			  <el-breadcrumb-item>送检列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

    <div class="buttons">
      <template v-if="regRow.nextFlow != dataListLength">
        <div class="items">
          <el-button size="small" type="primary" plain @click="open(1)">审核</el-button>
        </div>
        <div class="items">
          <el-button size="small" type="primary" plain @click="open(2)">审核不通过</el-button>
        </div>
        <div class="items">
          <el-button size="small" type="danger" plain @click="open(3)">终止审核</el-button>
        </div>
      </template>
      <div class="items">
        <el-button size="small" type="primary" plain @click="backList">返回列表</el-button>
      </div>
    </div>

    <div class="mainItem tabs" v-loading='loading'>
      <el-tabs v-model="activeName">
        <el-tab-pane label="委托信息" name="90">
          <EINFO></EINFO>
        </el-tab-pane>
        <el-tab-pane label="被鉴定人信息" name="91">
          <AUTHINFO></AUTHINFO>
        </el-tab-pane>
        <el-tab-pane label="检材样本信息" name="92">
          <INSPINFO></INSPINFO>
        </el-tab-pane>
        <template v-for="e in dataList">
          <el-tab-pane :label="e.workFlowName" :name="e.workFlowName">
            <STEPINFO :infoDatas="e"></STEPINFO>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <el-dialog :title="dialogTitle" width="50%" :visible.sync="dialogExamine">
			<DynamicForm v-if="status == '1'" :formDatas="dynamicData" ref="formOne"></DynamicForm>
      <template v-else>
        <el-form ref="form" :model="reason" label-width="80px" :rules="rules">
          <el-form-item label="原因" prop="reason">
           <el-input type="textarea" resize="none" rows="5" v-model="reason.reason"></el-input>
         </el-form-item>
        </el-form>
      </template>
		  <div slot="footer" class="dialog-footer">
				<el-button @click="dialogExamine = false">取 消</el-button>
				<el-button type="primary" @click="saves">提 交</el-button>
		  </div>
		</el-dialog>

  </div>
</template>

<script>
import EINFO from '@/components/check/eInfo';
import AUTHINFO from '@/components/check/authInfo';
import INSPINFO from '@/components/check/inspInfo';
import STEPINFO from '@/components/check/stepInfo';

import datas from "@/js/datas"
export default{
  data:function(){
    return {
      activeName:'90',
      activeNames:[],
      datas:datas.dynamicData,
      loading:true,
      regRow:{},
      dataList:[],
      dialogExamine:false,
      dialogTitle:'',
      status:'',
      dataListLength:0,
      reason:{
        reason:''
      },
      dynamicData:{
        form:{
          style:"width:90%;margin:auto",
          ref:'addform',
          labelWidth:"140px",
          model:{}
        }
      },
      rules:{
        reason:[
          {required: true, message: '请输入原因', trigger: 'blur'}
        ]
      }
    }
  },
  created:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    this.dynamicData.form.rules = this.$DefaultRules.rules
  },
  activated:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    // 处理数据
    this.loadData();
  },
  components:{EINFO,AUTHINFO,INSPINFO,STEPINFO},
  methods:{
    loadData(){
      let data = {registerId:this.regRow.registerId,aucOrgId:this.regRow.aucOrgId,nextFlow:this.regRow.nextFlow}
      this.postHttp("flow/getWorkFlowForStep",data,res=>{
        // 处理res
        this.dataList = [];
        this.activeName = '90';
        this.dataListLength = res.data.length + 1;
        for(let x in res.data){
          if(res.data[x].sort == this.regRow.nextFlow){
            this.dynamicData.headers = res.data[x].headerList;
            this.dynamicData.info = res.data[x]
          }else{
            this.dataList.push(this.formatDatas(res.data[x]));
          }
        }
        this.loading = false;
      });
    },
    // 格式化数据
    formatDatas(data_){
      for(let x in data_.headerList){
        let formType = data_.headerList[x].formType;
        if(formType == 'select' || formType == 'checkbox' || formType == 'radios'){
          let options = data_.headerList[x].options;
          let string = data_.data[0][data_.headerList[x].name];
          let data_data = data_.data[0][data_.headerList[x].name];
          let data_format = [];
          for(let y in options){
            if(string == options[y].dictKey && (formType == 'select' || formType == 'radios')){
              data_.headerList[x].formatter = options[y].dictValue;
            }
            if(data_data.indexOf(options[y].dictKey) > 0 && formType == 'checkbox'){
              data_format.push(options[y].dictValue);
            }
          }
          data_.data[0][data_.headerList[x].name] = data_format.join("，");
        }
        if(formType == 'date'){
          let formats = data_.headerList[x].formatter;
          data_.headerList[x]['formatter'] = this.timeF(new Date(data_.data[0][data_.headerList[x].name])).format(formats);
        }
      }
      return data_;
    },
    open(val){
      this.dynamicData.form.model = {};
      this.dynamicData = this.$DealReceive(this.dynamicData);
      if(this.$refs['formOne']){
        this.$refs['formOne'].getForm().clearValidate();
      }
      if(this.$refs['form']){
        this.$refs['form'].clearValidate();
      }
      this.status = val;
      this.reason.reason = "";
      if(val == '1'){
        this.dialogTitle = this.dynamicData.info.workFlowName;
      }
      if(val == '2'){
        this.dialogTitle = '审核不通过';
      }
      if(val == '3'){
        this.dialogTitle = '审核退回';
      }
      this.dialogExamine = true;
    },
    saves(){
      let data = this.$DealSend(this.dynamicData).form.model;
      data['registerId'] = this.regRow.registerId;
      data['aucOrgId'] = this.regRow.aucOrgId;
      data['workflowId'] = this.dynamicData.info.id;
      data['sort'] = this.dynamicData.info.sort;
      data['status'] = this.status;
      if(this.status == '1'){
        this.$refs['formOne'].getForm().validate((valid) => {
          if (valid) {
            this.postHttp("wfData/inserData",data,res=>{
              if(res.code == '0'){
                this.notify_success("操作成功");
                this.dialogExamine = false;
                this.backList();
              }else{
                this.notify_error(res.msg)
              }
            });
          } else {
            return false;
          }
        });
      }
      if(this.status != '1'){
        data['reason'] = this.reason.reason;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.postHttp("wfData/inserData",data,res=>{
              if(res.code == '0'){
                this.notify_success("操作成功");
                this.dialogExamine = false;
                this.backList();
              }else{
                this.notify_error(res.msg)
              }
            });
          } else {
            return false;
          }
        });
      }

    },
    backList(){
      this.$router.push("appraisal");
    }
  }
}
</script>
<style>
#examine{
  width: 100%;
  background:#f0f3fa;
  height:100%;
  overflow: auto;
  position: relative;
  font-family: "microsoft yahei";
}
#examine .tabs{
  padding:10px 20px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
#examine .buttons{
  width: 97%;
  margin: 10px auto;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content:flex-end;
}
#examine .buttons .items{
  margin-left: 10px;
}
</style>
