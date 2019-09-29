<template data-title="文书发放">
  <div class="" v-loading='loading'>
    <el-form ref="form" :model="form" label-width="120px" size='small'>
      <div class="title-center">文书发放</div>
      <div class="title-level one"><i class="el-icon-tickets"></i>发放信息</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="文书编号:">
          <el-input v-model="checkReport.checkCode" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="委托单位:">
          <el-input v-model="form.orgCname" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="案件名称:">
          <el-input v-model="form.caseName" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="发放形式:">
          <el-select :disabled='isFlowShow' v-model="report.grantForm">
            <el-option value="0" label="凭受理鉴定登记表领取"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="发放时间:">
          <el-date-picker :disabled='isFlowShow' value-format="yyyy年MM月dd日" v-model="report.grantDate" type="date"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="领取单位:">
          <el-input :disabled='isFlowShow' v-model="report.receiveCompany"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="领取人:">
          <el-input :disabled='isFlowShow' v-model="report.receivePerson"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="联系电话:">
          <el-input :disabled='isFlowShow' v-model="report.phone"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="是否已领取检材:">
          <el-select :disabled='isFlowShow' v-model="report.isReceive">
            <el-option value="0" label="无"></el-option>
            <el-option value="1" label="是"></el-option>
            <el-option value="2" label="否"></el-option>
          </el-select>
        </el-form-item>

      </div>
    </el-form>
    <!-- <div class="btns">
      <el-button type="primary" v-if="!isFlowShow" size="small" plain @click="save">保 存</el-button>
    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
        options: [],
        loading: true,
        regRow: {},
        report: {},
        isFlowShow:false,
        checkReport:{},
        workflowId:''
      }
    },
    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.workflowId = this.getData("workflowId");
      this.query();
      this.queryReport();
      this.queryCheck();
    },
    methods: {
      //查询
      query() {
        this.postHttp("registers/getRegisterForJD", {registerId: this.regRow.registerId}, res => {
          this.loading = false;
          if (res.data != null) {
            this.form = res.data;
          }
        })
      },
      queryCheck() {
        this.postHttp("check/selectRegisterId", this.regRow.registerId, res => {
          this.checkReport.checkCode = res.data.checkCode;
        })
      },
      //查询受理编号和文书类型
      queryReport() {
        this.getHttp("previews/getPreviews", {"registerId": this.regRow.registerId}, res => {
          if (res.data != null) {
            this.report = res.data;
          }
        })
      },
      //保存
      save() {
        let data = this.report;
        data['type'] = 4;
        data['registerId'] = this.regRow.registerId;
        data['workFlowId'] = this.workflowId;
        this.postHttp("previews/uploadPreviews", data, res => {
          if (res.code == '0') {
            this.notify_success("保存成功");
            this.produceReport();
          } else {
            this.notify_error(res.msg);
          }
        })
      },
      //生成对应word
      produceReport() {
        let data = {};
        //委托id
        data['registerId'] = this.regRow.registerId;
        //鉴定专业id
        data['aucOrgId'] = this.regRow.aucOrgId;
        //多个word 编号 默认1
        data['serialNo'] = "1";
        //流程id
        data['workflowId'] = this.regRow.workflowId;
        this.postHttp("wordUpload/uploadJDGZJZ", data, res => {
          if (res.code == '0') {
            this.notify_success("生成成功!");
          }
        })
      },
    }
  }
</script>
<style>
</style>
