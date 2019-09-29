<template>
  <div id="backup">
    <div class="mainItem breadcrumb">
			<el-breadcrumb separator=">">
			  <el-breadcrumb-item>您的位置</el-breadcrumb-item>
			  <el-breadcrumb-item>检验鉴定</el-breadcrumb-item>
			  <el-breadcrumb-item>流程回退</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

    <div class="mainItem">
      <el-form ref="form" :model="query" label-width="110px" size='small'>
        <div class="form-body">
          <el-form-item class="form-items" label="受理号:">
            <el-input placeholder="受理号" v-model="query.acceptBookNo" clearable></el-input>
          </el-form-item>
          <div class="search ">
            <el-button size="small" type="primary" style="" @click="querys()">搜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;索</el-button>
          </div>
        </div>
      </el-form>
    </div>

    <div class="mainItem">
      <div  v-if="data != null">
        <div class="show-info">
          <div class="items">
            <div class="text">
              受理号:
            </div>
            <div class="content">
              {{data.acceptBookNo}}
            </div>
          </div>
          <div class="items">
            <div class="text">
              受理时间:
            </div>
            <div class="content">
              {{data.acceptDate}}
            </div>
          </div>
        </div>

        <div class="flows">
          <div class="items" v-for="e in dataList" :key="e.id">
            <div class="text">
              {{e.workFlowName}}
            </div>
            <div class="btns">
              <el-button type="primary" size='mini' @click='backup(e.sort,e.workFlowName)'>回退</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="msg" v-else>
        未查询到数据
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      query:{
        acceptBookNo:'',
      },
      data:null,
      dataList:[],
      reg:{}
    }
  },
  methods:{
    //苏公物受（毒物）字[2019]年1号
    querys(){
      if(this.query.acceptBookNo){
        this.postHttp("previews/getPreviewsByBookNo",this.query.acceptBookNo,res=>{
          if(res.data.previews){
            let time = res.data.previews.acceptDate;
            if(time){
              res.data.previews.acceptDate = this.timeF(new Date(res.data.previews.acceptDate)).format('YYYY-MM-DD HH:mm:ss');
            }else{
              res.data.previews.acceptDate = '';
            }
            this.data = res.data.previews;
            // 获取流程
            let register = res.data.GfLimRegisters;
            this.reg = res.data.GfLimRegisters;
            if(register){
              let data = {registerId:register.registerId,aucOrgId:register.aucOrgId,nextFlow:register.nextFlow}
              this.postHttp("flow/getWorkFlowForStep",data,res=>{
                // 处理res
                let list = new Array();
                for(let x in res.data){
                  if(res.data[x].sort > 4){
                    list.push(res.data[x]);
                  }
                }
                this.dataList = list;
              });
            }
          }else{
            this.data = null;
            this.reg = {}
          }
        })
      }else{
        this.data = null;
        this.reg = {}
      }
    },
    backup(sort,name){
      this.$confim('是否要回退到-'+name+'-流程?',"提示",data=>{
        let datas = {registerId:this.reg.registerId,type:1,aucOrgId:this.reg.aucOrgId,nextFlow:sort};
        let array = new Array();
        for(let x in this.dataList){
          if(this.dataList[x].sort >= sort){
            let data_ = {};
            data_['workflowId'] = this.dataList[x].id;
            data_['workflowName'] = this.dataList[x].workFlowName;
            data_['model'] = this.dataList[x].model;
            array.push(data_);
          }
        }
        datas['flows'] = array;
        this.postHttp('backup/insertBackUp',datas,res=>{
          if(res.code == '0'){
            this.notify_success('回退成功');
          }else{
            this.notify_error(res.msg);
          }
        });
      })
    }
  }
}
</script>

<style>
#backup{
  background-color: #f0f3fa;
  width: 100%;
  height: 100%;
  overflow: auto;
}
#backup .search{
  width: 66%;
  text-align: right;
  line-height: 50px;
}
#backup .show-info{
  display: flex;
  width: 100%;
}
#backup .msg{
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #c7c7c7;
  font-size: 20px;
}
#backup .show-info .items{
  width: 50%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding:0px 10px;
  font-size: 14px;
  text-align: center;
  color: #666;
}
#backup .show-info .text{
  width: 80px;
}
#backup .show-info .content{
  width: 300px;
  text-align: left;
}

#backup .flows{
  width: 100%;
  box-sizing: border-box;
  padding:20px 30px;
}
#backup .flows .items{
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  height: 40px;
}
#backup .flows .btns{
  padding:0px;
  height: 30px;
  margin-top:5px;
}
</style>
