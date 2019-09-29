<template data-title="检验报告和鉴定书">
  <div id="appraisalRecordDNA">

    <div class="uploadBody">
      <div class="uploads">
        <el-upload ref="upload" action="" :on-remove="handleRemove" :before-upload="beforeUpload"
         :file-list="fileList" :auto-upload="false" :http-request="uploadWord" :data="data" :on-preview="preview">
          <template v-if="!isFlowShow">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传doc/docx文件</div>
          </template>
        </el-upload>
      </div>
      <div class="showPdf" >
        <template v-if="pdfUrl == ''">
          未上传word
        </template>
        <template v-else>
          <embed width="100%" height="100%" :src="pdfUrl" ></embed>
        </template>
      </div>
    </div>

    <el-form ref="form" :model="form" label-width="120px" size='small'>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="编号:">
          <el-input v-model="form.checkCode"  :disabled='isFlowShow'></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="发文数量:">
          <el-input :disabled='isFlowShow' v-model="form.sendDocNum"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="报告发放:">
          <el-checkbox-group :disabled='isFlowShow' v-model="form.attachmentInfo">
            <el-checkbox v-for="e in portOption" :key="e.dictId" :label="e.dictKey">{{e.dictValue}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>鉴定意见</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.checkResultContent"></tinymce-editor>
        <div class="tinymceMask" v-if="isFlowShow"></div>
      </div>

      <div class="no_testimonials">
        <div class="left">
          <el-checkbox-group v-model="form.c035">
            <el-checkbox label="not">不出鉴定文书</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="right">
          <el-radio-group :disabled="form.c035.length == 0" v-model="form.checkResultContent">
            <el-radio label="无需发文">无需发文</el-radio>
            <el-radio label="不具备出鉴定书或检验报告书的条件">不具备出鉴定书或检验报告书的条件</el-radio>
            <el-radio label="技术或设备条件所限,送往其它单位检验">技术或设备条件所限,送往其它单位检验</el-radio>
            <el-radio label="由县区出具鉴定书或检验报告书">由县区出具鉴定书或检验报告书</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>鉴 定 人</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="检验人:">
          <el-input v-model="form.checkUser" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="复核人:">
          <el-select v-model="form.checkUser2" placeholder="请选择" :disabled='isFlowShow'>
            <el-option v-for="item in userList" :key="item.empNo" :label="item.empName" :value="item.empName">
              <span style="float: left">{{ item.empName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.empNo }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div class="btns">
      <el-button type="primary"  v-if="!isFlowShow" size="small" plain @click="saveForm" v-no-more-click>保存</el-button>
    </div>

    <el-dialog title="PDF查看" :visible.sync="dialogVisible" width="80%"  >
      <embed width="100%" height="600px" :src="pdfUrl"></embed>
    </el-dialog>

  </div>
</template>

<script>
import TinymceEditor from "@/components/tinymce-editor";
export default {
  components: {
    TinymceEditor
  },
  data(){
    return{
      fileList:[],
      data:{},
      file:{},
      pdfUrl:'',
      dialogVisible:false,
      isFlowShow:false,
      form:{
        attachmentInfo:[],
        c035:[]
      },
      options:['attachmentInfo','c035'],
      userList:[],
      portOption:[],
    }
  },
  mounted:function(){
    let regRow = JSON.parse(this.getData("regRow"));
    // 跳转路由
    this.data['aucOrgId'] = regRow.aucOrgId;
    this.data['registerId'] = regRow.registerId;
    this.data['workflowId'] = this.getData("workflowId");
    this.isFlowShow = eval(this.getData('isFlowShow'));

    this.$set(this.form, 'checkUser',this.getData("userName"));
    this.$set(this.form, 'sendDocNum',2);

    this.postHttpForLogin('dict/getDictInfo',{parentKey:'ATTACHMENTINFO'},res=>{
      this.portOption = res.data;
    });

    this.postHttp("aucOrgUser/selectEmpListByWorkFlowId", this.getData("workflowId"),res=>{
      this.userList = res.data;
    });

    this.loadData();
  },
  methods:{
    loadData(){
      this.postHttp("/wordUpload/getCheckRecord",this.data,res=>{
        this.fileList = [];
        if(res.code == '0'){
          if(res.data){
            let obj = new Object();
            obj['name'] = res.data.name;
            obj['url'] = res.data.address;
            this.fileList.push(obj);
            // 处理pdf地址
            this.pdfUrl = "/auc/WORD_FILE/"+res.data.address.split(".")[0]+".pdf";
          }else{
            this.pdfUrl = '';
          }
        }else{
          this.pdfUrl = ''
          this.notify_error(res.message);
        }
      });

      // 数据拉取
      let data = {registerId:this.data.registerId,checkDocType:3}
      this.postHttp("check/selectByCheck",data,res=>{
        // 处理数据
        if(res.data != null){
          let dealData = this.form;
          dealData = res.data;
          let options = this.options;
          for(let x in options){
            if(dealData[options[x]]){
              this.$set(dealData, options[x], dealData[options[x]].split(","));
            }else{
              this.$set(dealData, options[x], []);
            }
          }
          this.$set(this, 'form',dealData);
        }
      });
    },
    save(){
      if(this.pdfUrl==''){
        this.notify_error("请上传文件");
        return "error";
      }
      return this.saveForm();
    },
    saveHis(){
      this.$emit('saveHis');
    },
    // 上传相关
    uploadWord(){
      let obj = this.$refs.upload
      if(obj.uploadFiles.length > 1){
        this.notify_error("只能上传一个文件");
        return;
      }
      if(obj.uploadFiles.length == 0){
        this.notify_error("请添加上传文件");
        return;
      }
      let fileData = new FormData();
      fileData.append('aucOrgId', this.data.aucOrgId);
      fileData.append('file', this.file);
      fileData.append('registerId', this.data.registerId);
      fileData.append('workflowId', this.data.workflowId);
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      this.$axios.post("/auc/wordUpload/uploadCheckRecordDna",fileData,config).then(response => {
          if(response.data.code == '0'){
            this.loadData();
          }else{
            this.notify_error(response.data.msg);
          }
        },response => {
          this.notify_error('网络错误');
      })
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      if(!this.isFlowShow){
        this.postHttp("/wordUpload/deleteCheckRecord",this.data,res=>{
          if(res.code == '0'){
            this.notify_success('删除成功');
            this.loadData();
          }else{
            this.notify_error(res.message);
          }
        });
      }else{
        this.loadData();
        return false;
      }
    },
    preview(){
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      let type = file.name.split(".")[1];
      if(type != 'doc' && type != 'docx'){
        this.notify_error("请选择word文件");
        return false;
      }else{
        this.file = file;
        return true;
      }
    },
    saveForm(){
      let data = this.unBinding(this.form);
      delete data['createDatetime'];
      delete data['updateDatetime'];
      data = this.dealSendData(data);
      // 类型 1:检验记录 2:鉴定书 3:检验报告
      data['checkDocType'] = 3;
      data['registerId'] = this.data.registerId;
      data['aucOrgId'] = this.data.aucOrgId;
      data['updateWord'] = "notUpdate";
      data['workflowId'] = this.getData("workflowId");
      this.postHttp("check/insertOrUpdateSelective",data,res=>{
        if(res.code == '0'){
          this.$emit('saveHis');
          this.loadData();
          return true;
        }else{
          this.notify_error(res.msg);
          return false;
        }
      })
    },
    dealSendData(data){
      let options = this.options;
      for(let x in options){
        let dataItem = data[options[x]];
        if(dataItem != undefined){
          if(dataItem.length > 0){
            dataItem = dataItem.join(",");
          }else{
            dataItem = '';
          }
          data[options[x]] = dataItem;
        }
      }
      for(let x in data){
        if(data[x] != null && data[x] != undefined && (typeof(data[x])=='string' || typeof(data[x]) == 'object') ){
          data[x] = data[x].replace(new RegExp('border="1"', 'g'),'border="1" cellspacing="0" cellpadding="0"')
        }
      }
      return data;
    },
  }
}
</script>

<style>
#appraisalRecordDNA{
  width:90%;
  margin:auto;
  padding-bottom:20px;
}
#appraisalRecordDNA .uploadBody{
  display: flex;
  justify-content: space-between;
}
#appraisalRecordDNA .uploads{
  width: 48%;
  margin-right: 4%;
}
#appraisalRecordDNA .showPdf{
  width: 48%;
  height: 400px;
  line-height: 400px;
  text-align: center;
  color:#666;
}
#appraisalRecordDNA .showPdf embed{
  overflow: hidden;
}
#appraisalRecordDNA .no_testimonials{
  display: flex;
  margin: 10px 20px;
  justify-content: center;
}
#appraisalRecordDNA .no_testimonials .left{
  width: 300px;
  display: flex;
  align-items: center;
}
#appraisalRecordDNA .no_testimonials .right{
  width: 300px;
}

#appraisalRecordDNA .no_testimonials .el-radio {
    color: #606266;
    cursor: pointer;
    margin-right: 30px;
    display: block;
    margin-top: 5px;
}
</style>
