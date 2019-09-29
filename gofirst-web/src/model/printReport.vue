<template>
  <div id="printReport">
    <el-form ref="form" :model="form" label-width="140px" size='small'>
      <div class="title-level one"><i class="el-icon-tickets"></i>基本信息</div>
      <div class="form-body">
        <!--<el-form-item class="form-items" label="受理编号:">
          <el-input v-model="form.c001" disabled></el-input>
        </el-form-item>-->
        <el-form-item class="form-items rows-really-half" label="文书类型:">
          <el-input v-model="form.sendDocBookType" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验结论:">
          <!-- <el-input v-model="form.checkResultContent" disabled></el-input>-->
          <tinymce-editor ref="editor" v-model="print.checkResultContent"></tinymce-editor>
          <div class="tinymceMask" v-if="isFlowShow"></div>
        </el-form-item>
      </div>
    </el-form>
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
        multipleSelection: [],
        registerId: '',
        form: {},
        print:{},
        isFlowShow:false,
      }
    },
    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.querys();
      this.queryPrint();
    },
    methods: {
      //查询操作
      querys() {
        this.postHttp("check/selectRegisterId", this.regRow.registerId, res => {
          this.print = res.data;
        })
      },
      //查询受理编号和文书类型
      queryPrint() {
        this.getHttp("previews/getPreviews", {"registerId": this.regRow.registerId}, res => {
          if (res.data != null) {
            let string = '';
            if (res.data.sendDocBookType == 1) {
              string = '鉴定书（通用）'
            } else if (res.data.sendDocBookType == 2) {
              string = '物证检验报告'
            } else if (res.data.sendDocBookType == 3) {
              string = '物证检验意见书'
            }
            this.$set(this.form,'sendDocBookType',string);
          }
        })
      },
      //鉴定事项记录表
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
        this.postHttp("wordUpload/uploadJDSXJLB", data, res => {
          if (res.code == '0') {
            this.notify_success("生成成功!");
          }
        })
      },
      
      //鉴定文书审批表
      createWord() {
        let data = {};
        //委托id
        data['registerId'] = this.regRow.registerId;
        //鉴定专业id
        data['aucOrgId'] = this.regRow.aucOrgId;
        //多个word 编号 默认1
        data['serialNo'] = "2";
        //流程id
        data['workflowId'] = this.workflowId;
        this.postHttp("wordUpload/uploadJDWSSPB", data, res => {
          if (res.code == '0') {
            this.notify_success("生成成功!");
          }
        })
      },

      save(){
        this.checkWord();
        this.createWord();
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
  #printReport .mainItem {
    padding: 20px 0;
  }

  .normalColen .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 225px;
  }

  #printReport {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #printReport .el-row .normalCol {
    height: 3em;
    line-height: 3em;
    font-size: 14px;
  }

  #printReport .yourAddress .ban {

  }

  #printReport .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  #printReport .el-col-4 {
    width: 14%;
  }


  #printReport .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  #printReport .tabb .el-table__header tr,
  #printReport .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #c5cbce;
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  #printReport .tabb .el-table__body tr,
  #printReport .tabb .el-table__body td {
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
