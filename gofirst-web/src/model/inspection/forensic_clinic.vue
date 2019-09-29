<template data-title="法医临床检验记录表">
  <div class="forensicClinic" v-loading='loading'>
    <el-form ref="form" :model="form" label-width="120px" size='small'>
      <div class="title-center">法医临床检验记录表</div>
      <div class="title-level one"><i class="el-icon-tickets"></i>基本信息</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="受理鉴定编号:">
          <el-input v-model="form.c001" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="案(事)件名称:">
          <el-input v-model="form.c002" disabled></el-input>
        </el-form-item>
      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>人员信息</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="姓名:">
          <el-input v-model="form.c003" ></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="性别:">
          <el-input v-model="form.c004" ></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="出生日期:">
          <el-input v-model="form.c005" ></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="职业:">
          <el-input v-model="form.c006" ></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="服务处所:">
          <el-input v-model="form.c007"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="身份证号码:">
          <el-input v-model="form.c008" ></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="住址:">
          <el-input v-model="form.c009" ></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="受伤时间:">
          <el-input v-model="form.c010" ></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="检验日期:">
          <el-date-picker value-format="yyyy年MM月dd日" v-model="form.c011" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="联系方式:">
          <el-input v-model="form.c012" ></el-input>
        </el-form-item>

        <el-form-item class="form-items rows" label="要求:">
          <el-input v-model="request" type="textarea" disabled></el-input>
        </el-form-item>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>自诉</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c013" ></tinymce-editor>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>检见</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.checkResultContent" ></tinymce-editor>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>阅片</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c014" ></tinymce-editor>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>备注</div>
      <div class="form-body">
        <el-form-item class="form-items rows" label="直接盖印形成:">
          <el-radio-group v-model="form.c015">
           <el-radio label="补送补充就医材料">补送补充就医材料</el-radio>
           <el-radio label="就医终结后再复查">就医终结后再复查</el-radio>
           <el-radio label="建议进行相关检查">建议进行相关检查</el-radio>
           <el-radio label="其它有关未尽事宜">其它有关未尽事宜</el-radio>
          </el-radio-group>
        </el-form-item>
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
      name:'法医临床检验记录表',
      options:[],
      loading:true,

      regRow:{},
      rows:{},

      deviceList:[],
      functionList:[],
      request:'① 实事求是,全面细致;② 客观描述损伤性状;③ 准确测量,规范记录;④ 对损伤进行规范拍照,必要时摄像;⑤ 重要资料复印、复制。'
    }
  },
  mounted:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    this.rows = JSON.parse(this.getData("rows"));
    this.$set(this.form, 'c001',this.rows.bookNo);
    //this.$set(this.form, 'c007',this.rows.aucName);
    this.postHttp("registers/getRegisterForJD",{registerId:this.regRow.registerId,checkDocType:1},res=>{
      // 常量数据放置
      this.$set(this.form, 'c002',res.data.caseName);
    });
    this.postHttp("evidences/getPeopleListForReal",this.regRow.registerId,res=>{
      // 常量数据放置
      this.$set(this.form, 'c003',res.data[0].EXPNAME);
      this.$set(this.form, 'c004',res.data[0].SEX == '1'?'男':'女');
      this.$set(this.form, 'c005',res.data[0].BIRTHDAY);
      this.$set(this.form, 'c008',res.data[0].EXPIDENT);
      this.$set(this.form, 'c009',res.data[0].EXPADDRESS);

    });
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
        }
        let options = this.options;
        for(let x in options){
          if(dealData[options[x]]){
            this.$set(dealData, options[x], dealData[options[x]].split(","));
          }else{
            this.$set(dealData, options[x], []);
          }
        }
        this.$set(this, 'form',dealData);
        this.loading = false;
      })
    },
    saveForm(){
      let data = this.unBinding(this.form);
      data = this.dealSendData(data);
      // 类型 1:检验记录 2:鉴定书
      data['checkDocType'] = 1;
      data['serialNo'] = new Date().getTime().toString();
      data['registerId'] = this.regRow.registerId;
      data['aucOrgId'] = this.regRow.aucOrgId;
      data['evidenceJcId'] = this.rows.aucEvidId;
      data['name'] = this.name;
      data['workflowId'] = this.getData("workflowId");
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
