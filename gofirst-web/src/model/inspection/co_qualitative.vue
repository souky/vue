<template data-title="一氧化碳定性检验记录表">
  <div class="coQualitative" v-loading='loading'>
    <el-form ref="form" :model="form" label-width="120px" size='small'>
      <div class="title-center">一氧化碳定性检验记录表</div>
      <div class="title-level one"><i class="el-icon-tickets"></i>基本信息</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="受理编号:">
          <el-input v-model="form.c001" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="检材性状:">
          <el-input v-model="form.c003" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检材编号:">
          <el-input v-model="form.c002" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验器材:">
          <el-checkbox-group :disabled='isFlowShow' v-model="form.checkStandard">
           <el-checkbox v-for="e in deviceList" :key="e.id" :label="e.string">{{e.string}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验方法:">
          <el-checkbox-group :disabled='isFlowShow' v-model="form.checkMethod">
           <el-checkbox v-for="e in functionList" :key="e.id" :label="e.string">{{e.string}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>检验过程</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c004" ></tinymce-editor>
        <div class="tinymceMask" v-if="isFlowShow"></div>
      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>结果分析</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c005" ></tinymce-editor>
        <div class="tinymceMask" v-if="isFlowShow"></div>
      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>检验结论</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.checkResultContent" ></tinymce-editor>
        <div class="tinymceMask" v-if="isFlowShow"></div>
      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>备注</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c006" ></tinymce-editor>
        <div class="tinymceMask" v-if="isFlowShow"></div>
      </div>
    </el-form>

    <el-form ref="form" :model="form" label-width="80px" size='small'>
      <div class="title-level one"><i class="el-icon-tickets"></i>检验人签名</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="检验人:">
          <el-input v-model="form.checkUser" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="检验时间:">
          <el-date-picker value-format="yyyy年MM月dd日" :disabled='isFlowShow' v-model="form.c007" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </div>
    </el-form>
    <div class="btns">
      <el-button type="info" size="small" plain @click="back">返  回</el-button>
      <el-button type="primary" v-if="!isFlowShow" size="small"  plain @click="saveForm" v-no-more-click>保存</el-button>
    </div>


  </div>
</template>

<script>
import TinymceEditor from "@/components/tinymce-editor";
import Constant from '@/js/modelData/constant';
export default {
  components: {
    TinymceEditor
  },
  data(){
    return {
      form:{
        checkStandard:[],
        checkMethod:[]
      },
      name:'一氧化碳定性检验记录表',
      options:['checkStandard','checkMethod'],
      loading:true,

      regRow:{},
      rows:{},

      deviceList:[],
      functionList:[],

      isFlowShow:false,
    }
  },
  mounted:function(){
    this.isFlowShow = eval(this.getData('isFlowShow'));
    this.regRow = JSON.parse(this.getData("regRow"));
    this.rows = JSON.parse(this.getData("rows"));
    // 调取检材数据
    this.$set(this.form, 'c001',this.rows.bookNo);
    this.$set(this.form, 'c002',this.rows.number);
    this.$set(this.form, 'c003',this.rows.status);
    this.$set(this.form, 'checkUser',this.getData("userName"));
    this.$set(this.form, 'c007',this.timeF(new Date()).format('YYYY年MM月DD日'));

    this.$set(this.form, 'c004',Constant.co.inspectionReport.experimentalProcess);
    this.$set(this.form, 'c005',Constant.co.inspectionReport.analysisCondition);
    this.$set(this.form, 'checkResultContent',Constant.co.inspectionReport.testConclusion);
    this.dealData();
    this.getDeviceAndFunc();
  },
  methods:{
    dealData(){
      let data = {registerId:this.regRow.registerId,evidenceJcId:this.rows.aucEvidId}
      this.postHttp("check/selectByCheck",data,res=>{
        // 处理数据
        let dealData = this.form;
        if(res.data != null){
          dealData = res.data;
          let options = this.options;
          for(let x in options){
            if(dealData[options[x]]){
              this.$set(dealData, options[x], dealData[options[x]].split(","));
            }else{
              this.$set(dealData, options[x], []);
            }
          }
        }
        this.$set(this, 'form',dealData);
        this.loading = false;
      })
    },
    saveForm(){
      let data = this.unBinding(this.form);
      delete data['createDatetime'];
      delete data['updateDatetime'];
      data = this.dealSendData(data);
      // 类型 1:检验记录 2:鉴定书
      data['checkDocType'] = 1;
      data['serialNo'] = new Date().getTime().toString();
      data['registerId'] = this.regRow.registerId;
      data['aucOrgId'] = this.regRow.aucOrgId;
      data['evidenceJcId'] = this.rows.aucEvidId;
      data['name'] = this.name;
      data['workflowId'] = this.getData("workflowId");
      this.loading = true;
      this.postHttp("check/insertOrUpdateSelective",data,res=>{
        if(res.code == '0'){
          this.notify_success("保存成功");
          this.loading = false;
          this.back();
        }else{
          this.loading = false;
          this.notify_error(res.msg);
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
    back(){
      this.$emit('back');
      this.$router.push("/inspectionRecord");
    },
    // 获取检验方法和仪器
    getDeviceAndFunc(){
      this.postHttp('instr/getInsertList',{aucOrgId:this.regRow.aucOrgId},res=>{
        for(let e in res.data){
          let string = '(' + res.data[e].key + ')' + res.data[e].value;
          res.data[e].string = string;
          if(res.data[e].irType == '1'){
            this.deviceList.push(res.data[e]);
          }
          if(res.data[e].irType == '2'){
            this.functionList.push(res.data[e]);
          }
        }
      })
    },
  }
}
</script>

<style>
</style>
