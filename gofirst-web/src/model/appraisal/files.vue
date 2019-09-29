<template data-title="文检鉴定书">
  <div class="filesA" v-loading='loading'>
    <el-form ref="form" :model="form" label-width="120px" size='small'>
      <div class="title-center">文检鉴定书</div>
      <div class="title-level one"><i class="el-icon-tickets"></i>绪    论</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="编号:">
          <el-input v-model="form.checkCode" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="委托单位:">
          <el-input v-model="form.c002" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="送检人:">
          <el-input v-model="form.c003" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="受理日期:">
          <el-date-picker value-format="yyyy年MM月dd日" v-model="form.c004" disabled type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-items rows" label="情况摘要:">
          <el-input type="textarea" rows="6" resize="none" v-model="form.c005" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检材样本:">
          <tinymce-editor ref="editor" v-model="form.c006"></tinymce-editor>
        </el-form-item>
        <el-form-item class="form-items rows" label="鉴定要求:">
          <el-input v-model="form.c007" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="检验日期:">
          <el-date-picker value-format="yyyy年MM月dd日" v-model="form.c008" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="发文数量:">
          <el-input v-model="form.sendDocNum"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验地点:">
          <el-input v-model="form.c009"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="报告发放:">
          <el-checkbox-group v-model="form.attachmentInfo">
            <el-checkbox v-for="e in portOption" :key="e.dictId" :label="e.dictKey">{{e.dictValue}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>检验过程</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c010"></tinymce-editor>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>论    证</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c011"></tinymce-editor>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>鉴定意见</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.checkResultContent"></tinymce-editor>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>附  件</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c013"></tinymce-editor>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>鉴 定 人</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="检验人:">
          <el-input v-model="form.checkUser" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="复核人:">
          <el-input v-model="form.checkUser2"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="btns">
      <el-button type="primary" size="small" plain @click="saveForm" v-no-more-click>保存</el-button>
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
      },
      name:'文检鉴定书',
      options:['attachmentInfo'],
      loading:true,
      regRow:{},
      portOption:[]
    }
  },
  mounted:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    this.postHttpForLogin('dict/getDictInfo',{parentKey:'ATTACHMENTINFO'},res=>{
      this.portOption = res.data;
    })

    this.postHttp('check/getJDnumber',this.regRow.aucOrgId,res=>{
      this.checkCodeNum = res.data.checkCode;
      this.$set(this.form, 'checkCode',res.data.checkCodeString);
    });
    this.getHttp('previews/getPreviews',{registerId:this.regRow.registerId},res=>{
      let date = this.timeF(new Date(res.data.createDatetime)).format('YYYY年MM月DD日');
      this.$set(this.form, 'c004',date);
    });

    this.$set(this.form, 'checkUser',this.getData("userName"));
    this.postHttp("registers/getRegisterForJD",{registerId:this.regRow.registerId,checkDocType:2},res=>{

      // 常量数据放置
      this.$set(this.form, 'c002',res.data.orgCname);
      this.$set(this.form, 'c003',res.data.sendPeople);
      this.$set(this.form, 'c004',res.data.acceptDate);
      // 案情摘要
      let zhaiyao = '案(事)件情况摘要:《鉴定委托书》(委托书编号:'+res.data.entrustNum+')中登'+
      '记的"案(事)件编号"为:'+res.data.caseNo+'。委托方所述"简要案情"为:'+res.data.caseBrief
      this.$set(this.form, 'c005',zhaiyao);
      this.$set(this.form, 'c007',res.data.entrustRequire);
      this.$set(this.form, 'c010',Constant.file.identificationBook.experimentalProcess);
      this.$set(this.form, 'c011',Constant.file.identificationBook.dataRecord);
      this.$set(this.form, 'checkResultContent',Constant.file.identificationBook.testConclusion);
    })
    this.dealData();
  },
  methods:{
    dealData(){
      let data = {registerId:this.regRow.registerId,checkDocType:2}
      this.postHttp("check/selectByCheck",data,res=>{
        // 处理数据
        if(res.data != null){
          this.$set(this, 'form',res.data);
        }
        let options = this.options;
        for(let x in options){
          if(this.form[options[x]]){
            this.$set(this.form, options[x], this.form[options[x]].split(","));
          }else{
            this.$set(this.form, options[x], []);
          }
        }
        this.loading = false;
      })
    },
    saveForm(){
      let data = this.unBinding(this.form);
      delete data['createDatetime'];
      delete data['updateDatetime'];
      data = this.dealSendData(data);
      // 类型 1:检验记录 2:鉴定书 3:检验报告
      data['checkDocType'] = 2;
      data['serialNo'] = "1";
      data['registerId'] = this.regRow.registerId;
      data['aucOrgId'] = this.regRow.aucOrgId;
      data['name'] = this.name;
      data['workflowId'] = this.getData("workflowId");
      this.loading = true;
      this.postHttp("check/insertOrUpdateSelective",data,res=>{
        if(res.code == '0'){
          this.loading = false;
          this.notify_success("保存成功");this.$emit('saveHis');
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

    }
  }
}
</script>

<style>
</style>
