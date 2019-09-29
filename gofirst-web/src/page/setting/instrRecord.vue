<template>
  <div id="instr" class="">
    <div class="mainItem breadcrumb">
			<el-breadcrumb separator=">">
			  <el-breadcrumb-item>您的位置</el-breadcrumb-item>
			  <el-breadcrumb-item>配置</el-breadcrumb-item>
			  <el-breadcrumb-item>常量配置</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
    <div class="auc-div mainItem">
        <span class="aucSpecialty">请选择鉴定专业：</span>
        <el-select v-model="aucOrgId" filterable placeholder="请选择" @change="changeAuc"  size="mini">
          <el-option
            v-for="item in aucOptions"
            :key="item.aucOrgId"
            :label="item.aucOrgCname"
            :value="item.aucOrgId"
          ></el-option>
        </el-select>
    </div>

    <el-tabs type="border-card" class="mainItem">
      <el-tab-pane label="仪器设备/检验方法">
        <div class="mainItem mainbody">
            <div class="part">
              <div class="title_">
                仪器设备
                <el-button class="title_btn" size="mini" plain type="primary" @click="openSave(1)">新增</el-button>
              </div>
              <el-table style="width: 100%"
                  :data="deviceData.filter(data => !deviceSearch || data.key.toLowerCase().includes(deviceSearch.toLowerCase()) || data.value.toLowerCase().includes(deviceSearch.toLowerCase()))">
                <el-table-column align='center' prop="key" label="编号"></el-table-column>
                <el-table-column align='center' prop="value" label="名称"></el-table-column>
                <el-table-column align="right" width="200"  class-name="operations">
                  <template slot="header" slot-scope="scope">
                    <el-input v-model="deviceSearch" size="mini" placeholder="输入关键字搜索"/>
                  </template>
                  <template slot-scope="scope">
                    <div class="op_items">
                      <el-button size="mini" plain type="warning" @click="openEdit(scope.row,1)">修改</el-button>
                    </div>
                    <div class="op_items">
                      <el-button size="mini" plain type="danger" @click="deletes(scope.row)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="part">
              <div class="title_">
                检验方法
                <el-button class="title_btn" size="mini" plain type="primary" @click="openSave(2)">新增</el-button>
              </div>
              <el-table style="width: 100%"
                  :data="funcData.filter(data => !funcSearch || data.key.toLowerCase().includes(funcSearch.toLowerCase()) || data.value.toLowerCase().includes(funcSearch.toLowerCase()))">
                <el-table-column align='center' prop="key" label="编号"></el-table-column>
                <el-table-column align='center' prop="value" label="名称"></el-table-column>
                <el-table-column align="right" width="200"  class-name="operations">
                  <template slot="header" slot-scope="scope">
                    <el-input v-model="funcSearch" size="mini" placeholder="输入关键字搜索"/>
                  </template>
                  <template slot-scope="scope">
                    <div class="op_items">
                      <el-button size="mini" plain type="warning" @click="openEdit(scope.row,2)">修改</el-button>
                    </div>
                    <div class="op_items">
                      <el-button size="mini" plain type="danger" @click="deletes(scope.row)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
      </el-tab-pane>
      <el-tab-pane label="检验记录/鉴定书和检验报告">
        <div class="mainItem mainbody">
        <div class="part">
          <div class="title_">
            检验记录
            <el-button class="title_btn" size="mini" plain type="primary" @click="openAucSave(1)">新增</el-button>
          </div>
          <el-table style="width: 100%"
              :data="aucData.filter(data => !aucSearch || data.key.toLowerCase().includes(aucSearch.toLowerCase()) || data.value.toLowerCase().includes(aucSearch.toLowerCase()))">
            <el-table-column align='center' prop="code" label="编号"></el-table-column>
            <el-table-column align='center' prop="name" label="名称"></el-table-column>
            <el-table-column align='center' prop="sort" label="顺序"></el-table-column>
            <el-table-column align='center' prop="model" label="模板"></el-table-column>
            <el-table-column align="right" width="200"  class-name="operations">
              <template slot="header" slot-scope="scope">
                <el-input v-model="aucSearch" size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <div class="op_items">
                  <el-button size="mini" plain type="warning" @click="openAucEdit(scope.row,1)">修改</el-button>
                </div>
                <div class="op_items">
                  <el-button size="mini" plain type="danger" @click="deletesAuc(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="part">
          <div class="title_">
            鉴定书和检验报告
            <el-button class="title_btn" size="mini" plain type="primary" @click="openAucSave(2)">新增</el-button>
          </div>
          <el-table style="width: 100%"
              :data="docDate.filter(data => !docSearch || docDate.key.toLowerCase().includes(docSearch.toLowerCase()) || docDate.value.toLowerCase().includes(docSearch.toLowerCase()))">
            <el-table-column align='center' prop="code" label="编号"></el-table-column>
            <el-table-column align='center' prop="name" label="名称"></el-table-column>
            <el-table-column align='center' prop="sort" label="顺序"></el-table-column>
            <el-table-column align='center' prop="model" label="模板"></el-table-column>
            <el-table-column align="right" width="200"  class-name="operations">
              <template slot="header" slot-scope="scope">
                <el-input v-model="docSearch" size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <div class="op_items">
                  <el-button size="mini" plain type="warning" @click="openAucEdit(scope.row,1)">修改</el-button>
                </div>
                <div class="op_items">
                  <el-button size="mini" plain type="danger" @click="deletesAuc(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="instrTitle" width="30%" :visible.sync="instrDialog">
      <el-form :model="instrRecord" style="width:85%;margin:auto;">
        <el-form-item label="编号" label-width="80px">
          <el-input v-model="instrRecord.key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="instrRecord.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="instrDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="aucTitle" width="30%" :visible.sync="aucDialog">
      <el-form :model="aucRecord" style="width:85%;margin:auto;">
        <el-form-item label="编号" label-width="80px">
          <el-input v-model="aucRecord.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="aucRecord.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顺序"  label-width="80px" prop="sort"
                :rules="[{required: true, message: '必填项', trigger: 'change'},
                        {type: 'number', message: '必须为数字值', trigger: 'blur'}
                        ]">
            <el-input v-model.number="aucRecord.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板" label-width="80px">
          <el-input v-model="aucRecord.model" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="aucDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveAuc">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data(){
    return{
      aucOptions:[],
      aucOrgId:'',

      deviceData:[],
      deviceSearch:'',

      funcData:[],
      funcSearch:'',

      instrRecord:{},
      instrDialog:false,
      instrTitle:'新增',

      aucData:[],
      docDate:[],
      aucSearch:'',
      docSearch:'',
      aucDialog:false,
      aucRecord:{},
      aucTitle:'',

    }
  },
  activated:function(){
    this.aucBase();
  },
  methods:{
    // 加载专业id数据
    aucBase() {
      this.postHttp("aucOrg/getGfLimAucOrgList", "", res => {
        if (res.code == "0") {
          this.aucOptions = res.data;
        } else {
          this.notify_warning(res.msg);
        }
      });
    },
    // 更换专业id
    changeAuc(aucOrgId){
      this.aucOrgId = aucOrgId;
      this.loadData(1);
      this.loadData(2);
      this.aucDataList(1);
      this.aucDataList(2);
    },
    // 加载数据
    loadData(type){
      this.postHttp("instr/getInsertList",{irType:type,aucOrgId:this.aucOrgId},res=>{
        if(type == 1){
          this.deviceData = res.data;
        }else{
          this.funcData = res.data;
        }
      })
    },
    openSave(type){
      this.instrDialog = true;
      this.instrTitle = (type == 1)?"新增仪器设备":"新增检验方法";
      this.instrRecord = {};
      this.instrRecord['irType'] = type;
      this.instrRecord['aucOrgId'] = this.aucOrgId;
    },
    /**
     *
     */
    openAucSave(type){
      this.aucDialog = true;
      this.aucTitle =  (type == 1)?"新增检验记录":"新增鉴定书和检验报告";
      this.aucRecord = {};
      this.aucRecord['type'] = type;
      this.aucRecord['aucOrgId'] = this.aucOrgId;
    },
    /**
     *
     */
    saveAuc(){
      let tempData = this.unBinding(this.aucRecord);
      this.postHttp("eviAuc/insertAucTip",tempData,res=>{
          if(res.code == '0'){
            this.notify_success("操作成功");
            this.aucDialog = false;
            this.aucDataList(tempData.type);
          }else{
            this.notify_error(res.msg);
            this.instrDialog = false;
          }
        })

    },
    /**
     *
     */
    aucDataList(type){
      this.postHttp("eviAuc/getAucTipList",{"aucOrgId":this.aucOrgId,"type":type},res =>{
          if(res.code == '0'){
            if(type == 1){
                this.aucData = res.data;
              }else{
                this.docDate = res.data;
              }
          }else{
              this.$notify_warning(res.msg);
          }
      });
    },
    openAucEdit(row,type){
      this.aucDialog = true;
      this.aucTitle = (type == 1)?"编辑检验记录":"编辑鉴定书和检验报告";
      this.aucRecord = row;
    },
    deletesAuc(row){
      this.$confim("确定要删除此项？","提示",data=>{
        this.getHttp("eviAuc/delAucTip",{"aucTipId":row.aucTipId},res=>{
          if(res.code == '0'){
            this.notify_success("删除成功");
            this.aucDialog = false;
            this.aucDataList(row.type);
          }else{
            this.notify_error(res.msg);
            this.aucDialog = false;
          }
        });
      });
    },
    saveOrUpdate(){
      this.postHttp("instr/saveOrUpdate",this.instrRecord,res=>{
        if(res.code == '0'){
          this.notify_success("操作成功");
          this.instrDialog = false;
          this.loadData(this.instrRecord.irType);
        }else{
          this.notify_error(res.msg);
          this.instrDialog = false;
        }
      })
    },
    openEdit(row,type){
      this.instrDialog = true;
      this.instrTitle = (type == 1)?"编辑仪器设备":"编辑检验方法";
      this.instrRecord = row;
    },
    deletes(row){
      this.$confim("确定要删除此项？","提示",data=>{
        this.postHttp("instr/deleteInstr",row,res=>{
          if(res.code == '0'){
            this.notify_success("删除成功");
            this.instrDialog = false;
            this.loadData(row.irType);
          }else{
            this.notify_error(res.msg);
            this.instrDialog = false;
          }
        });
      });
    }
  }


}
</script>

<style>
#instr{
  background-color: #f0f3fa;
  width: 100%;
  height: 100%;
  overflow: auto;
}
#instr .mainbody{
  display: flex;
  display: -webkit-flex;
}
#instr .title_{
  color:#888;
  font-weight: 600;
  width: 100%;
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px #ebeef5 solid;
  margin-bottom: 7px;
  position: relative;
}
.title_btn{
  position: absolute;
  right: 14px;
  top: 7px;
}
#instr .part{
  width: 45%;
  padding:20px 2.5%;
}
#instr .el-table td,#instr .el-table th{
  padding:5px 0;
}
#instr td.operations .cell{
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: flex-end;
}
#instr td.operations .cell .op_items{
  margin:auto 3px;
}
#instr .auc-div {
  height: 40px;
  line-height: 40px;
  padding-left:20px;
  font-size: 14px;
  box-sizing: border-box;
  overflow: hidden;
}
#instr .aucSpecialty {
  color: #20a0ff;
}
</style>
