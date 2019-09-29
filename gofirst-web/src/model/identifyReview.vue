<template>
  <div id="identifyReview">
    <el-form ref="form" :model="form" label-width="140px" size='small'>
      <div class="title-level one"><i class="el-icon-tickets"></i>基本信息</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label="受理编号:">
          <el-input v-model="form.acceptBookNo" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-really-half" label="文书类型:">
          <el-input v-model="form.sendDocBookType" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验结论:">
          <!-- <div v-html="check.checkResultContent"></div>-->
          <tinymce-editor ref="editor" v-model="check.checkResultContent"></tinymce-editor>
          <div class="tinymceMask" v-if="isFlowShow"></div>
        </el-form-item>
        <el-form-item class="form-items rows" label="复核意见:">
          <el-input :disabled="isFlowShow" v-model="form.reviewOpinion" resize="none" rows="5" type="textarea"
                    placeholder="复核意见"></el-input>
        </el-form-item>
      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>授权签字</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label-width="5px" label="">
          <el-radio :disabled="isFlowShow" v-model="radio" label="1">
            <span>指定授权签字人:</span>
            <el-select :disabled="isFlowShow" class="sign" v-model="review.authSign" clearable placeholder="请选择">
              <el-option
                v-for="item in empList"
                :key="item.empNo"
                :label="item.empName"
                :value="item.empNo"
              ></el-option>
            </el-select>
          </el-radio>
        </el-form-item>
        <!--<el-form-item class="form-items rows-really-half" label-width="5px" label="">
          <el-radio :disabled="isFlowShow" v-model="radio" label="2">
            <span>呈请(室)主任/所长:</span>
            <el-select :disabled="isFlowShow" class="sign" v-model="review.direSign" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-radio>
        </el-form-item>-->
      </div>
    </el-form>
    <!-- <div class="btns">
      <el-button type="primary" v-if="!isFlowShow" size="small" class="baocun" plain @click="save">保存</el-button>
    </div> -->
  </div>
</template>
<script>
  import TinymceEditor from "@/components/tinymce-editor";

  export default {
    components: {
      TinymceEditor
    },
    data: function () {
      return {
        acceptBookNo: '',
        checkResultType: '',
        checkResultContent: '',
        radio: '',
        textarea: '',
        review: {
          authSign: '',
          direSign: ''
        },
        empList: [],
        options: [{
          value: '1',
          label: '赵璟悠'
        }, {
          value: '2',
          label: '舒翠霞'
        }, {
          value: '3',
          label: '华炜婕'
        }],
        authSign: '',
        direSign: '',
        tableData: [],
        registerId: '',
        multipleSelection: [],
        form: {
          c001: '苏公物受（文）字[2019] 30号',
          reviewOpinion: '',
        },
        check: {},
        radioSelect: "",
        isFlowShow: false,
        modelsSel: '',
        workflowId: '',
        nextWorkFlowId:''
      }
    },
    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.workflowId = this.getData("workflowId");
      this.getEmpList();
      this.querys();
      this.queryPre();
      this.querysDoc();
    },
    methods: {
           /**
       * 获取人员信息
       */
      getEmpList() {

       // 查询workFlow
        this.getHttp("flow/getWorkFlowIdByRegisterId", {registerId:this.regRow.registerId}, res => {
            if (res.code == '0') {
                  this.nextWorkFlowId = res.data;
                   this.postHttp("aucOrgUser/selectEmpListByWorkFlowId", this.nextWorkFlowId, res => {
                      if (res.code == '0') {
                            this.empList = res.data;
                          }
                    })
                }
          })

       
        },
      //查询操作
      querys() {
        this.postHttp("check/selectRegisterId", this.regRow.registerId, res => {
          if (res.data != null) {
            this.check = res.data;
          }
        })
      },

      //查询文档信息
      querysDoc() {
        let data = {};
        data['registerId'] = this.regRow.registerId;
        data['aucOrgId'] = this.regRow.aucOrgId;
        data['type'] = 1;
        data['docOrder'] = 6;
        this.postHttp("document/queryDocuments", data, res => {
          if (res.data != null) {

          }
        })
      },
      //生成对应word
      checkWord() {
        let data = {};
        //委托id
        data['registerId'] = this.regRow.registerId;
        //鉴定专业id
        data['aucOrgId'] = this.regRow.aucOrgId;
        //多个word 编号 默认1
        data['serialNo'] = "1";
        //流程id
        data['workflowId'] = this.workflowId;
        this.postHttp("wordUpload/uploadCheckRecord", data, res => {
          if (res.code == '0') {
            this.notify_success("生成成功!");
          }
        })
      },
      //查询受理编号和文书类型
      queryPre() {
        this.getHttp("previews/getPreviews", {"registerId": this.regRow.registerId}, res => {
          if (res.data != null) {
            this.form.acceptBookNo = res.data.acceptBookNo;
            this.form.reviewOpinion = res.data.resuleContent1;
            this.radio = res.data.radio;
            if (this.radio == 1) {
              this.review.authSign = res.data.checkUser2;
            } else if (this.radio == 2) {
              this.review.direSign = res.data.checkUser2;
            }
            if (res.data.sendDocBookType == 1) {
              this.form.sendDocBookType = '鉴定书（通用）'
            } else if (res.data.sendDocBookType == 2) {
              this.form.sendDocBookType = '物证检验报告'
            } else if (res.data.sendDocBookType == 3) {
              this.form.sendDocBookType = '物证检验意见书'
            }
          }
        })
      },
      //保存
      save() {
        if (this.radio == 1) {
          this.setData("checkPerson", this.review.authSign);
        } else if (this.radio == 1) {
          this.setData("checkPerson", this.review.direSign);
        }
        var data = this.review;
        data['type'] = 1;
        data['radio'] = this.radio;
        data['reviewOpinion'] = this.form.reviewOpinion;
        data['registerId'] = this.regRow.registerId;
        data['workFlowId'] = this.workflowId;
        this.postHttp("previews/uploadPreviews", data, res => {
          if (res.code == '0') {
            this.notify_success("保存成功");
          }
        })
      },
      dateFormat(row, column, cellValue, index) {
        var date = cellValue;
        if (date == undefined || date == '') {
          return "";
        }
        return this.timeF(date).format("YYYY-MM-DD HH:mm:ss");
      },
    }
  }
</script>

<style>
  #identifyReview .mainItem {
    padding: 20px 0;
  }

  #identifyReview .normalColen .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 225px;
  }

  #identifyReview {
    background-color: #fff;
    width: 100%;
    height: 100%;
    margin: 5px auto;
    overflow: auto;
  }

  #identifyReview .el-row .normalCol {
    height: 3em;
    line-height: 3em;
    font-size: 14px;
  }

  #identifyReview .yourAddress .ban {

  }

  #identifyReview .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  #identifyReview .el-col-4 {
    width: 14%;
  }


  #identifyReview .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  #identifyReview .tabb .el-table__header tr,
  #identifyReview .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #c5cbce;
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  #identifyReview .tabb .el-table__body tr,
  #identifyReview .tabb .el-table__body td {
    padding: 0;
    height: 40px;
  }

  #identifyReview #boddy .input1,
  #identifyReview #boddy .input2 {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 50%;
  }

  #identifyReview .sign {
    width: 67%;
  }

  #identifyReview .xianshi {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 95px;
    background-color: white;
  }

  #identifyReview .textareas {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 210px;
    background-color: white;
  }

  #identifyReview .btns {
    display: flex;
    justify-content: center;
    padding-right: 20px;
    padding-bottom: 20px;
  }

  #identifyReview .baocun {
    color: #409EFF;
    background: #ecf5ff;
    border-color: #b3d8ff;
    margin-top: 30px;
  }
</style>
