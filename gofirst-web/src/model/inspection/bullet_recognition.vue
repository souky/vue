<template data-title="枪弹识别检验记录">
  <div class="bulletRecognition" v-loading='loading'>
    <el-form ref="form" :model="form" label-width="120px" size='small'>
      <div class="title-center">枪弹识别检验记录</div>
      <div class="title-level one"><i class="el-icon-tickets"></i>基本信息</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="受理鉴定编号:">
          <el-input v-model="form.c001" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="检验时间:">
          <el-date-picker value-format="yyyy年MM月dd日" v-model="form.c005" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-items rows" label="简要案情:">
          <el-input v-model="form.c002" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="送检物品:">
          <el-input v-model="form.c003" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验要求:">
          <el-input v-model="form.c004" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验器材:">
          <el-checkbox-group v-model="form.checkStandard">
           <el-checkbox v-for="e in deviceList" :key="e.id" :label="e.string">{{e.string}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验方法:">
          <el-checkbox-group v-model="form.checkMethod">
           <el-checkbox v-for="e in functionList" :key="e.id" :label="e.string">{{e.string}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>检验过程</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c008" ></tinymce-editor>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>检验结论</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.checkResultContent" ></tinymce-editor>
      </div>
    </el-form>
    <el-form ref="form" :model="form" label-width="60px" size='small'>
      <div class="title-level one"><i class="el-icon-tickets"></i>检验人签名</div>
      <div class="form-body">
        <el-form-item class="form-items rows" label="检验人:">
          <el-input v-model="form.checkUser"></el-input>
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
      options:['checkStandard','checkMethod'],
      loading:true,

      regRow:{},
      rows:{},

      deviceList:[],
      functionList:[]
    }
  },
  mounted:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    this.rows = JSON.parse(this.getData("rows"));
    this.$set(this.form, 'c001',this.rows.aucEvidId);
    this.$set(this.form, 'c003',this.rows.aucName);
    this.postHttp("registers/getRegisterForJD",{registerId:this.regRow.registerId,checkDocType:1},res=>{
      // 常量数据放置
      this.$set(this.form, 'c002',res.data.caseBrief);
      this.$set(this.form, 'c004',res.data.entrustRequire);

    });
    this.dealData();
    this.getDeviceAndFunc();
  },
  methods:{
    dealData(){
      // this.postHttp("check/selectByPrimaryKey","",res=>{
      //
      // })
      // 处理数据
      let options = this.options;
      for(let x in options){
        if(this.form[options[x]]){
          this.$set(this.form, options[x], this.form[options[x]].split(","));
        }else{
          this.$set(this.form, options[x], []);
        }
      }

      this.loading = false;
    },
    saveForm(){
      let data = this.unBinding(this.form);
      data = this.dealSendData(data);
      // 类型 1:检验记录 2:鉴定书
      data['checkDocType'] = 1;
      data['registerId'] = this.regRow.registerId;
      data['evidenceJcId'] = this.rows.aucEvidId;
      this.postHttp("check/insertOrUpdateSelective",data,res=>{
        if(res.code == '0'){
          this.notify_success("保存成功");
          this.back();
        }else{
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
        if(data[x] != null && data[x] != undefined){
          data[x] = data[x].replace(new RegExp('border="1"', 'g'),'border="1" cellspacing="0" cellpadding="0"')
        }
      }
      return data;
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
    back(){
      this.$emit('back');
      this.$router.push("/inspectionRecord");
    }
  }
}
</script>

<style>
</style>
