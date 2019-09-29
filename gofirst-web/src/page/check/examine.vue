<template>
  <div id="examine">

    <div class="flex">
      <div class="mainItem breadcrumb">
        <el-breadcrumb separator=">">
  			  <el-breadcrumb-item>您的位置</el-breadcrumb-item>
  			  <el-breadcrumb-item>检验鉴定</el-breadcrumb-item>
  			  <el-breadcrumb-item>审核</el-breadcrumb-item>
  			</el-breadcrumb>

        <div class="buttons">
          <div class="items">
            <el-button size="small" type="primary" plain @click="wordList">流程状态及产出物</el-button>
          </div>
          <div class="items" v-if="showBtn">
            <el-button size="small"  type="primary" plain @click="pass">审核通过</el-button>
          </div>
          <div class="items" v-if="showBtn">
            <el-button size="small"  type="warning" plain @click="open(2)">审核不通过</el-button>
          </div>
          <!-- <div class="items" v-if="showBtn">
            <el-button size="small"  type="danger" plain @click="open(3)">终止审核</el-button>
          </div> -->
          <div class="items">
            <el-button size="small" type="primary" plain @click="backList">返回列表</el-button>
          </div>
        </div>
      </div>

		</div>

    <div class="mainItem">
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="e in dataList" :key="e.id" :label="e.workFlowName" :name="e.id" :data_ele="e" ></el-tab-pane>
        </el-tabs>
      </div>

      <!-- <div class="forms" v-if="showForm">
        <DynamicForm :formDatas="dynamicData" ref="formOne"></DynamicForm>
      </div> -->

      <router-view ref='routerViews' v-on:saveHis="saveHis"></router-view>
    </div>

    <el-dialog :title="dialogTitle" width="50%" :visible.sync="dialogExamine">
      <el-form ref="form" :model="reason" label-width="80px" :rules="rules">
        <el-form-item label="原因" prop="reason">
         <el-input type="textarea" resize="none" rows="5" v-model="reason.reason"></el-input>
       </el-form-item>
      </el-form>
		  <div slot="footer" class="dialog-footer">
				<el-button @click="dialogExamine = false">取 消</el-button>
				<el-button type="primary" @click="saves">提 交</el-button>
		  </div>
		</el-dialog>

    <div class="rightTips">
			<div class="top clearfix">
				<div class="rightFinger">
					<img src="@/assets/img/pointer.png" />
				</div>
				<div class="topText">
					流程步骤
				</div>
			</div>
			<div class="body">
				<div :class="{'items':true,'active':e.sort<=regRow.nextFlow}" v-for="(e,index) in flowList" :key="e.id">
					<div class="point"><div class="innerCircle"></div></div>
					<div class="text">第{{index+1}}步：{{e.workFlowName}}</div>
				</div>
			</div>
			<div class="top clearfix">
				<div class="rightFinger">
					<img src="@/assets/img/pointer.png" />
				</div>
				<div class="topText">
					流程步骤
				</div>
			</div>
		</div>

  </div>
</template>

<script>
export default{
  data:function(){
    return {
      activeName:'90',
      activeNames:[],
      loading:true,
      regRow:{},
      dataList:[],
      dialogExamine:false,
      dialogTitle:'',
      status:'1',
      dataListLength:0,
      reason:{
        reason:''
      },

      sort:'',
      workflowId:'',
      showBtn:true,
      statusFlag:'1',
      roleId:'',

      // rightTips
      flowList:[],
      rules:{
        reason:[
          {required: true, message: '请输入原因', trigger: 'blur'}
        ]
      }
    }
  },
  activated:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    if(this.regRow == null){
      this.regRow = {}
    }
    // 处理数据
    this.loadProcess();
    // 拿取流程过程数据
    this.setData("registerId",this.regRow.registerId);
    this.setData('backURL','/exEntrustInfo');
    this.showBtn = eval(this.getData('isShowBtn'));
  },
  methods:{
    loadProcess(){
      this.postHttp("flow/getAllFlows",this.regRow.aucOrgId,res=>{
        this.flowList = res.data;
        if(eval(this.getData('isShowBtn'))){
          if(this.regRow.nextFlow > this.flowList.length){
            this.showBtn = false;
            this.setData("isFlowShow",true);
          }else{
            this.showBtn = true;
            this.setData("isFlowShow",false);
          }
        }
        this.loadData();
      })
    },
    // tab 切换
    handleClick(tab, event) {
      let data = tab.$attrs.data_ele;
      this.roleId = data.roleId;
      if(eval(this.getData('isShowBtn'))){
        if(data.sort == this.regRow.nextFlow){
          this.showBtn = true;
          this.setData("isFlowShow",false);
        }else{
          this.showBtn = false;
          this.setData("isFlowShow",true);
        }
      }
      this.setData('workflowId',data.id);
      if(data.model){
        let url = window.location.href;
        if(url.indexOf(data.model) < 0){
          this.$router.push(data.model);
        }
      }
    },

    loadData(){
      let data = {registerId:this.regRow.registerId,aucOrgId:this.regRow.aucOrgId,nextFlow:this.regRow.nextFlow}
      this.postHttp("flow/getWorkFlowForStep",data,res=>{
        // 处理res
        this.dataList = [];
        let pushUrl = '';
        for(let x in res.data){
          res.data[x].isShow = true;
          let nextFlow = this.regRow.nextFlow;
          if(this.regRow.nextFlow > this.flowList.length){
            nextFlow -= 1;
          }
          if(res.data[x].sort == nextFlow){
            this.activeName = res.data[x].id;
            pushUrl = res.data[x].model;
            this.workflowId = res.data[x].id;
            this.sort = res.data[x].sort;
            this.setData("workflowId",this.workflowId);
            this.setData("sort",this.sort);
          }
          // 流程结束
          if(nextFlow >= this.flowList.length){
            this.statusFlag = '2';
          }else{
            this.statusFlag = '1';
          }
          this.dataList.push(res.data[x]);
        }
        if(pushUrl != '' && pushUrl != undefined){
          this.$router.push(pushUrl);
        }
        this.loading = false;
      });
    },
    open(val){
      if(this.$refs['form']){
        this.$refs['form'].clearValidate();
      }
      this.status = val;
      this.reason.reason = "";
      if(val == '2'){
        this.dialogTitle = '审核不通过';
      }
      if(val == '3'){
        this.dialogTitle = '审核退回';
      }
      this.dialogExamine = true;
    },
    pass(){
      this.status = 1;
      if(typeof(this.$refs.routerViews.save) == 'function'){
        let flag = this.$refs.routerViews.save();
        if('error' != flag){
          this.saves();
        }
      }else{
        this.saves();
      }
    },
    saves(){
      let data = {};
      data['registerId'] = this.regRow.registerId;
      data['aucOrgId'] = this.regRow.aucOrgId;
      data['workflowId'] = this.workflowId;
      data['reason'] = this.getData('reason');
      data['sort'] = this.sort;
      data['roleId'] = this.roleId;
      data['status'] = this.status;
      data['statusFlag'] = this.statusFlag;
      if(this.status == '1'){
        this.postHttp("wfData/inserData",data,res=>{
          if(res.code == '0'){
            this.notify_success("操作成功");
            this.dialogExamine = false;
            this.backList();
          }else{
            this.notify_error(res.msg)
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
    saveHis(){
      let data = {};
      data['registerId'] = this.regRow.registerId;
      data['aucOrgId'] = this.regRow.aucOrgId;
      data['workflowId'] = this.workflowId;
      data['reason'] = this.getData('reason');
      data['sort'] = this.sort;
      data['roleId'] = this.roleId;
      data['status'] = '1';
      data['statusFlag'] = this.statusFlag;
      this.postHttp("wfData/insertHistory",data,res=>{
      });
    },
    backList(){
      this.$router.push("appraisal");
    },
    /**
     * word编辑
     */
    wordList(){
      this.pageOffice('word/flowWordList.html',{registerId:this.regRow.registerId});
    }
  }
}
</script>
<style>
#examine{
  width: calc(100% - 210px);
  background:#f0f3fa;
  height:100%;
  overflow: auto;
  position: relative;
  overflow-x: hidden;
  font-family: "microsoft yahei";
}
#examine .breadcrumb{
  position: relative;
}
#examine .tabs{
  padding:10px 20px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
#examine .forms{
  width:80%;
  margin:auto;
  padding:20px 0;
}
#examine .buttons{
  position: absolute;
  right: 10px;
  top:-2px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content:flex-end;
}
#examine .buttons .items{
  margin-left: 10px;
}
#examine #entrustInfo{
  background: #fff;
}
#examine #entrustInfo .yourAddress{
  display: none;
}
#examine #entrustInfo .step{
  display: none;
}
#examine #entrustInfo .normalRow{
  display: none;
}
#examine #entrustInfo .footerRow{
  display: none;
}
#examine .flex{
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1212;
  padding: 1px 0;
  background: #f0f3fa;
}
</style>
