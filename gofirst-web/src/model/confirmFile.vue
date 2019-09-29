<template>
  <div class="confirmFile">
    <div class="parentTitle">
      <span>目  录</span>
    </div>
    <div class="parentDiv">
      <el-table :data="tableParent" class="tableParent">
        <el-table-column prop="number" v-model="tableParent.number" label="序号" width="100"></el-table-column>
        <el-table-column prop="content" v-model="tableParent.content" label="内容"></el-table-column>
        <el-table-column prop="pages" label="页数" width="100">
          <template slot-scope="scope">
            <el-input disabled v-model="scope.row.pages" size="mini" placeholder="页数"/>
          </template>
        </el-table-column>
        <el-table-column class-name="inputClass" prop="pagtion" label="页码" width="270">
          <template slot-scope="scope">
            <div class="items inputs">
              <el-input disabled v-model="scope.row.pageStart" size="mini" placeholder="起始页"/>
            </div>
            <div class="items wave"> ~</div>
            <div class="items inputs">
              <el-input disabled v-model="scope.row.pageEnd" size="mini" placeholder="结束页"/>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-form ref="form" style="margin-top: 20px" :model="file" label-width="100px" size='small'>
        <div class="form-body">
          <el-form-item class="form-items rows-really-half" label="鉴定专业:">
            <el-input v-model="file.appraMajor" disabled/>
          </el-form-item>
          <el-form-item class="form-items rows-really-half" label="档案保存期限:">
            <el-select :disabled='isFlowShow' v-model="file.saveYearType" clearable placeholder="请选择">
              <el-option v-for="item in option"
                         :key="item.value"
                         :label="item.label"
                         :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-items rows-really-half" label="归档科案:">
            <el-select :disabled='isFlowShow' v-model="file.fileCase" clearable placeholder="请选择">
              <el-option v-for="item in optionss"
                         :key="item.value"
                         :label="item.label"
                         :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-items rows-really-half" label="是否发放:">
            <el-radio :disabled='isFlowShow' v-model="radio" label="发放"></el-radio>
            <el-radio :disabled='isFlowShow' v-model="radio" label="暂不发放"></el-radio>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- <div class="btns">
       <el-button type="primary" size="small" class="baocun" plain @click="save">确认归档</el-button>
     </div>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        workflowId:'',
        registerId: '',
        pagtion: '',
        radio: '',
        file: {
          saveYearType: '',
          fileCase: '',
        },
        isFlowShow:false,
        form: [],
        option: [{
          value: '1',
          label: '永久'
        }, {
          value: '2',
          label: '一年'
        }],
        optionss: [{
          value: '1',
          label: '档案'
        }],
        tableParent:
          [{
            number: '1',
            content: '检验报告副本',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }, {
            number: '2',
            content: '鉴定文书审批表、审批稿',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }, {
            number: '3',
            content: '鉴定委托书',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }, {
            number: '4',
            content: '鉴定事项确认书',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }, {
            number: '5',
            content: '鉴定事项记录表',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }, {
            number: '6',
            content: '检验记录表',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }, {
            number: '7',
            content: '建材样本流转记录',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }, {
            number: '8',
            content: '照片',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }, {
            number: '9',
            content: '图谱',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }, {
            number: '10',
            content: '其他附件',
            pages: '',
            pageStart: '',
            pageEnd: '',
          }
          ],
      }
    },
    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.workflowId = this.getData("workflowId");
      this.querys();
    },
    methods: {
      //查询
      querys() {
        this.postHttp("document/queryDocumens", this.regRow.registerId, res => {
          if (res.data != null) {
            this.form = res.data;
            this.form.forEach(item => {
              this.tableParent.forEach(items => {
                if (item.docOrder == items.number) {
                  items.pages = item.pageToNum;
                  items.pageStart = item.pageFromNum;
                  items.pageEnd = item.pageToNum;
                  this.file.appraMajor = item.appraMajor;
                  this.file.saveYearType = item.saveYearType;
                  this.file.fileCase = item.fileCase;
                  this.radio = item.isGrant;
                }
              });
            });
          }
        })
      },
      //生成对应word
      produceFilingWord() {
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
      //确认归档
      save() {
        let data = {};
        data['type'] = 5;
        data['registerId'] = this.regRow.registerId;
        data['workFlowId'] = this.regRow.workflowId;
        //多个word 编号 默认1
        data['serialNo'] = "1";
        this.postHttp("previews/uploadPreviews", data, res => {
          if (res.code == '0') {
            this.produceFilingWord();
            this.notify_success("保存成功");
          }
        });
        this.produceFilingWord();
      },
    },
  }
</script>

<style>
  .confirmFile {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .confirmFile .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  .confirmFile .el-row {
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    /* background-color: #ffffff; */
  }

  .confirmFile .normalRow {
    margin-top: 10px;
    margin-bottom: 15px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  .parentDiv {
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;

  }

  .sonDiv {
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
  }

  .parentTitle {
    text-align: center;
    font-size: 24px;
    height: 50px;
    line-height: 50px;
  }

  .sonTitle {
    text-align: center;
    background-color: #f0f3fa;
    font-size: 16px;
    height: 50px;
    line-height: 50px;

  }

  .confirmFile .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  .confirmFile .el-table__header tr,
  .confirmFile .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #c5cbce;
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  .confirmFile .el-table__body tr,
  .confirmFile .el-table__body td {
    padding: 0;
    height: 40px;
  }

  .confirmFile .el-table__body tr.current-row > td {
    background: RGB(85, 136, 254) !important;
    color: #fff;
  }

  .confirmFile .el-table {
    width: 100% !important;
  }

  .confirmFile .tableSon {
    width: 100%;
    height: 80%;
  }

  .confirmFile .list-table-expand {
    font-size: 0;
    margin-left: 80px;
  }

  .confirmFile .list-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .confirmFile .list-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 80%;
  }


  .confirmFile .inputClass .cell {
    display: flex;
  }

  .confirmFile .inputClass .items.inputs {
    width: 40%;
  }

  .confirmFile .inputClass .items.wave {
    width: 20%;
    text-align: center;
  }

  .confirmFile .form-body .form-items.rows-really-half {
    width: 40%;
    margin: 10px 5%;
  }
</style>
