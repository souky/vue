<template>
  <div id="directSign">
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
          <tinymce-editor ref="editor" v-model="checkeds.checkResultContent"></tinymce-editor>
          <div class="tinymceMask" v-if="isFlowShow"></div>
        </el-form-item>
        <el-form-item class="form-items rows-half" label="(室)主任/所长意见:">
          <el-input :disabled='isFlowShow' v-model="form.conclusion" resize="none" rows="5" type="textarea"
                    placeholder="(室)主任/所长意见"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <!-- <div class="btns">
      <el-button type="primary"  v-if="!isFlowShow" size="small" class="baocun" plain @click="save">保 存</el-button>
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
        form: {
          acceptBookNo:'',
          sendDocBookType: '',
          conclusion:'',
        },
        isFlowShow:false,
        checkeds:{},
        workflowId:''
      }
    },
    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.workflowId = this.getData("workflowId");
      this.querys();
      this.queryDirect();
    },
    methods: {
      //查询操作
      querys() {
        this.postHttp("check/selectRegisterId", this.regRow.registerId, res => {
          if (res.data != null) {
            this.checkeds = res.data;
          }
        })
      },
      //查询受理编号和文书类型
      queryDirect() {
        this.getHttp("previews/getPreviews", {"registerId": this.regRow.registerId}, res => {
          if (res.data != null) {
            this.form.acceptBookNo = res.data.acceptBookNo;
            this.form.conclusion = res.data.resultContent3;
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
        let data = {};
        data['conclusion'] = this.form.conclusion;
        data['type'] = 3;
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
  #directSign .mainItem {
    padding: 20px 0;
  }

  .normalColen .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 225px;
  }

  #directSign {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #directSign .el-row .normalCol {
    height: 3em;
    line-height: 3em;
    font-size: 14px;
  }

  #directSign .yourAddress .ban {

  }

  #directSign .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  #directSign .el-col-4 {
    width: 14%;
  }


  #directSign .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  #directSign .tabb .el-table__header tr,
  #directSign .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #c5cbce;
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  #directSign .tabb .el-table__body tr,
  #directSign .tabb .el-table__body td {
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

</style>
