<template data-title="印章印文检验记录">
  <div class="stamp" v-loading='loading'>
    <el-form ref="form" :model="form" label-width="120px" size='small'>
      <div class="title-center">印章印文检验记录</div>
      <div class="title-level one"><i class="el-icon-tickets"></i>基本信息</div>
      <div class="form-body">
        <el-form-item class="form-items rows" label="受理鉴定编号:">
          <el-input v-model="form.c001" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="鉴定开始日期:">
          <el-date-picker value-format="yyyy年MM月dd日" v-model="form.c002" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="鉴定结束日期:">
          <el-date-picker value-format="yyyy年MM月dd日" v-model="form.c003" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验方法:">
          <el-checkbox-group v-model="form.checkMethod">
           <el-checkbox v-for="e in functionList" :key="e.id" :label="e.string">{{e.string}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验器材:">
          <el-checkbox-group v-model="form.checkStandard">
           <el-checkbox v-for="e in deviceList" :key="e.id" :label="e.string">{{e.string}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-items rows" label="检材:">
          <el-input v-model="form.c006" ></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="样本:">
          <el-input v-model="form.c007" ></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验要求:">
          <el-input v-model="form.c008" disabled></el-input>
        </el-form-item>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>分析检材</div>
      <div class="form-body">
        <el-form-item class="form-items rows" label="直接盖印形成:">
          <el-radio-group v-model="form.c009">
           <el-radio label="是">是</el-radio>
           <el-radio label="复印">复印</el-radio>
           <el-radio label="打印">打印</el-radio>
           <el-radio label="其他">其他<el-input v-model="form.c010"></el-input></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-items rows" label="具备检验条件:">
          <el-radio-group v-model="form.c011">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>分析样本</div>
      <div class="form-body">
        <el-form-item class="form-items rows" label="样本类型:">
          <el-radio-group v-model="form.c012">
           <el-radio label="案前样本">案前样本</el-radio>
           <el-radio label="案后样本">案后样本</el-radio>
           <el-radio label="实验样本">实验样本</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-items rows" label="具备检验条件:">
          <el-radio-group v-model="form.c013">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>比较检验</div>
      <div class="form-body">
        <el-form-item class="form-items rows" label="复制检材、样本:">
          <el-radio-group v-model="form.c014">
           <el-radio label="复印">复印</el-radio>
           <el-radio label="照相">照相</el-radio>
           <el-radio label="扫描打印">扫描打印</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-items rows" label="制作特征比对表:">
          <el-radio-group v-model="form.c015">
            <el-radio label="手工描绘">手工描绘</el-radio>
            <el-radio label="复制剪贴">复制剪贴</el-radio>
            <el-radio label="录入打印(见附页)">录入打印(见附页)</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>论证</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c016" ></tinymce-editor>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>鉴定意见</div>
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
    console.log(this.rows);
    this.$set(this.form, 'c001',this.rows.aucEvidId);
    //this.$set(this.form, 'c007',this.rows.aucName);
    this.postHttp("registers/getRegisterForJD",{registerId:this.regRow.registerId,checkDocType:1},res=>{
      // 常量数据放置
      this.$set(this.form, 'c008',res.data.entrustRequire);
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
.other .el-radio__input{
  display: none
}
.stamp .el-radio__label .el-input__inner{
  width: 100px;
  margin-left: 10px;
}
</style>
