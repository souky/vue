<template data-title="毒物物证检验报告">
  <div class="" v-loading='loading'>
    <el-form ref="form" :model="form" label-width="100px" size='small'>
      <div class="title-center">毒物物证检验报告</div>
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
          <div class="tinymceMask" v-if="isFlowShow"></div>
        </el-form-item>
        <el-form-item class="form-items rows" label="鉴定要求:">
          <el-input v-model="form.c007" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="检验日期:">
          <el-date-picker :disabled='isFlowShow' value-format="yyyy年MM月dd日" v-model="form.c008" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="发文数量:">
          <el-input :disabled='isFlowShow' v-model="form.sendDocNum"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验地点:">
          <el-input :disabled='isFlowShow' v-model="form.c009"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="报告发放:">
          <el-checkbox-group :disabled='isFlowShow' v-model="form.attachmentInfo">
            <el-checkbox v-for="e in portOption" :key="e.dictId" :label="e.dictKey">{{e.dictValue}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>检验过程</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c010"></tinymce-editor>
        <div class="tinymceMask" v-if="isFlowShow"></div>
      </div>

      <div class="title-level one"><i class="el-icon-tickets"></i>鉴定意见</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.checkResultContent"></tinymce-editor>
        <div class="tinymceMask" v-if="isFlowShow"></div>
      </div>

      <!-- <div class="title-level one"><i class="el-icon-tickets"></i>附  件</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.c012"></tinymce-editor>
      </div> -->

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
      <el-button type="primary" v-if="!isFlowShow" size="small" plain @click="saveForm" v-no-more-click>保存</el-button>
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
        attachmentInfo:[]
      },
      name:'毒物物证检验报告',
      options:['attachmentInfo'],
      loading:true,
      regRow:{},
      portOption:[],
      isFlowShow:false,
      checkCodeNum:'',
      userList:[],
    }
  },
  mounted:function(){
    this.isFlowShow = eval(this.getData('isFlowShow'));
    this.regRow = JSON.parse(this.getData("regRow"));

    this.$set(this.form, 'checkUser',this.getData("userName"));
    this.$set(this.form, 'c009','苏州市公安局物证鉴定所理化检验室');
    this.$set(this.form, 'c008',this.timeF(new Date()).format('YYYY年MM月DD日'));
    this.$set(this.form, 'sendDocNum',2);

    this.postHttpForLogin('dict/getDictInfo',{parentKey:'ATTACHMENTINFO'},res=>{
      this.portOption = res.data;
    });

    this.postHttp("flow/getWorkFlowIdByRegisterId",this.regRow.registerId,res=>{
      let workflowId = res.data;
      this.postHttp("aucOrgUser/selectEmpListByWorkFlowId",workflowId,res=>{
        this.userList = res.data;
      });
    });
    this.dealData();
  },
  methods:{
    dealData(){
      let data = {registerId:this.regRow.registerId,checkDocType:3}
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
          this.$set(this, 'form',dealData);
          this.loading = false;
        }else{
          let dataInit = {
            registerId:this.regRow.registerId,
            checkDocType:2,
            aucOrgId:this.regRow.aucOrgId
          }
          this.postHttp("check/initAppraisal",dataInit,res=>{

            //checkCode
            this.$set(this.form, 'checkCode',res.data.checkCodeString);

            // previews createDatetime
            let date = this.timeF(new Date(res.data.createDatetime)).format('YYYY年MM月DD日');
            this.$set(this.form, 'c004',date);

            // evidences code
            let forData =  res.data.evidences;
            let array = [];
            for(let x in forData){
              array.push(forData[x].NAME+forData[x].NUM+forData[x].UNIT+',检材编号:('+forData[x].materialSerialNum+')')
            }
            this.$set(this.form, 'c006',array.join(';'));

            // CheckMethod
            let string = '本次实验参照'+res.data.returnString+'方法进行。';
            this.$set(this.form, 'c010',string);
            this.$set(this.form, 'checkResultContent',res.data.content);

            //Register
            let dataReg = res.data.registers;
            this.$set(this.form, 'c002',dataReg.orgCname);
            this.$set(this.form, 'c003',dataReg.sendPeople);
            let zhaiyao = '案(事)件情况摘要:《鉴定委托书》(委托书编号:'+dataReg.entrustNum+')中登'+
            '记的"案(事)件编号"为:'+dataReg.caseNo+'。委托方所述"简要案情"为:'+dataReg.caseBrief
            this.$set(this.form, 'c005',zhaiyao);
            this.$set(this.form, 'c007',dataReg.entrustRequire);
            this.$set(this.form, 'c010',Constant.ethanol.identificationBook.experimentalProcess);

            this.loading = false;
          })

        }

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
          this.notify_success("保存成功");this.$emit('saveHis');
          this.dealData();
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
