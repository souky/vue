<template>
  <div id="authorizeSign">
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
          <!--<el-input v-model="form.checkResultContent" disabled></el-input>-->
          <tinymce-editor ref="editor" v-model="checks.checkResultContent"></tinymce-editor>
          <div class="tinymceMask" v-if="isFlowShow"></div>
        </el-form-item>
        <el-form-item class="form-items rows-half" label="本专业授权签字人审核意见:">
          <el-checkbox-group :disabled='isFlowShow' v-model="checkList">
            <el-checkbox label="鉴定主体合法"></el-checkbox>
            <el-checkbox label="鉴定程序规范"></el-checkbox>
            <el-checkbox label="鉴定方法科学"></el-checkbox>
            <el-checkbox label="鉴定意见准确"></el-checkbox>
            <el-checkbox label="文书制作合格"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-items rows-half" label="复核结论:">
          <el-input :disabled='isFlowShow' v-model="form.reviewConclud" resize="none" rows="5" type="textarea"
                    placeholder="复核结论"></el-input>
        </el-form-item>
      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>授权签字</div>
      <div class="form-body">
        <el-form-item class="form-items rows-really-half" label-width="67px" label="">
          <el-checkbox :disabled='isFlowShow' v-model="checked">
            呈请(室)主任 / 所长 :
            <el-select :disabled='isFlowShow' v-model="author.direSign" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-checkbox>
        </el-form-item>
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
    data() {
      return {
        textarea: '',
        registerId: '',
        author: {
          direSign: '',
        },
        checks: {},
        form: {
          reviewConclud: '',
        },
        options: [{
          value: '1',
          label: '李民'
        }],
        radioSelect: "",
        checked: '',
        isFlowShow: false,
        checkList: [],
        workflowId:''
      }
    },
    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.workflowId = this.getData("workflowId");
      this.querys();
      this.queryAuth();
    },
    methods: {
      //查询操作
      querys() {
        this.postHttp("check/selectRegisterId", this.regRow.registerId, res => {
          if (res.data != null) {
            this.checks = res.data;
          }
        })
      },

      //查询受理编号和文书类型
      queryAuth() {
        this.getHttp("previews/getPreviews", {"registerId": this.regRow.registerId}, res => {
          if (res.data != null) {
            this.form.acceptBookNo = res.data.acceptBookNo;
            if (res.data.optionContent != null) {
              this.checkList = res.data.optionContent.split(",");
            }
            this.form.reviewConclud = res.data.resultContent2;
            this.author.direSign = res.data.checkUser3;
            if (this.author.direSign != null) {
              this.checked = true;
            }
            this.radio = res.data.radio;
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
        this.setData("checkPerson", this.author.direSign);
        var data = this.author;
        data['type'] = 2;
        data['checked'] = this.checked;
        data['reviewConclud'] = this.form.reviewConclud;
        data['checkList'] = this.checkList.toString();
        data['registerId'] = this.regRow.registerId;
        data['workFlowId'] = this.workflowId;
        this.postHttp("previews/uploadPreviews", data, res => {
          if (res.code == '0') {
            this.produceWord();
            this.notify_success("保存成功");
            this.$emit('saveHis');
          }
        })
      },
      //生成对应word
      produceWord() {
        let data = {};
        //委托id
        data['registerId'] = this.regRow.registerId;
        //鉴定专业id
        data['aucOrgId'] = this.regRow.aucOrgId;
        //多个word 编号 默认1
        data['serialNo'] = "1";
        //流程id
        data['workflowId'] = this.workflowId;
        this.postHttp("wordUpload/uploadJDWSSPB", data, res => {
          if (res.code == '0') {
            this.notify_success("生成成功!");
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
  #authorizeSign .mainItem {
    padding: 20px 0;
  }

  .normalColen .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 225px;
  }

  #authorizeSign {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #authorizeSign .el-row .normalCol {
    height: 3em;
    line-height: 3em;
    font-size: 14px;
  }

  #authorizeSign .yourAddress .ban {

  }

  #authorizeSign .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  #authorizeSign .el-col-4 {
    width: 14%;
  }


  #authorizeSign .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  #authorizeSign .tabb .el-table__header tr,
  #authorizeSign .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #c5cbce;
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  #authorizeSign .tabb .el-table__body tr,
  #authorizeSign .tabb .el-table__body td {
    padding: 0;
    height: 40px;
  }

  #boddy .input1,
  #boddy .input2 {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 50%;
  }

  .xianshi {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 95px;
    background-color: white;
  }

  .textareas {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 210px;
    background-color: white;
  }

  .baocun {
    color: #409EFF;
    background: #ecf5ff;
    border-color: #b3d8ff;
    margin-top: 25px;
  }

</style>
