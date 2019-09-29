<template>
  <div id="programAccept">
    <el-form ref="form" :model="form" label-width="140px" size='small'>
      <div class="title-level one"><i class="el-icon-tickets"></i>基本信息</div>
      <div class="form-body">
        <!--<el-form-item class="form-items" label="受理编号:">
          <el-input v-model="form.checkCode" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items" label="文书类型:">
          <el-input v-model="form.checkResultType" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items" label="检验结论:">
          <el-input v-model="form.checkResultContent" disabled></el-input>
        </el-form-item>-->
        <el-form-item class="form-items rows-half" label="受理意见:">
          <el-input :disabled='isFlowShow' v-model="form.reason" resize="none" rows="5" type="textarea"
                    placeholder="受理意见"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <!-- <div class="btns">
      <el-button type="primary" v-if="!isFlowShow" size="small" class="baocun" plain @click="save">保 存</el-button>
    </div> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isFlowShow:false,
        textarea: '',
        form: {
          reason: '通过',
        },
      }
    },

    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.queryProgram();
    },

    methods: {
      //保存
      save() {
        this.setData("reason", this.form.reason);
      },
      //查询受理意见
      queryProgram() {
        let data = {};
        data['workflowId'] = this.getData("workflowId");
        data['registerId'] = this.regRow.registerId;
        this.postHttp("history/getHistory", data, res => {
          if (res.data != null) {
            this.form = res.data;
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
  #programAccept .mainItem {
    padding: 20px 0;
  }

  .normalColen .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 225px;
  }

  #programAccept {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #programAccept .el-row .normalCol {
    height: 3em;
    line-height: 3em;
    font-size: 14px;
  }

  #programAccept .yourAddress .ban {

  }

  #programAccept .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  #programAccept .el-col-4 {
    width: 14%;
  }


  #programAccept .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  #programAccept .tabb .el-table__header tr,
  #programAccept .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #c5cbce;
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  #programAccept .tabb .el-table__body tr,
  #programAccept .tabb .el-table__body td {
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
