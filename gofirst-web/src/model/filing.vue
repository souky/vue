<template>
  <div class="filing">
    <div class="parentTitle">
      <span>目  录</span>
    </div>
    <div class="parentDiv">
      <el-table :data="tableParent" class="tableParent">
        <el-table-column prop="number" v-model="tableParent.number" label="序号" width="100"></el-table-column>
        <el-table-column prop="content" v-model="tableParent.content" label="内容"></el-table-column>
        <el-table-column prop="pages" label="页数" width="100">
          <template slot-scope="scope">
            <el-input :disabled='isFlowShow' @change='countPage' v-model.number="scope.row.pages" size="mini" placeholder="页数"/>
          </template>
        </el-table-column>
        <el-table-column class-name="inputClass" prop="pagtion" label="页码" width="270">
          <template slot-scope="scope">
            <div class="items inputs">
              <el-input :disabled='true' v-model.number="scope.row.pageStart" size="mini" placeholder="起始页"/>
            </div>
            <div class="items wave"> ~</div>
            <div class="items inputs">
              <el-input :disabled='true' v-model.number="scope.row.pageEnd" size="mini" placeholder="结束页"/>
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
              <el-option v-for="item in options"
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
      <el-button type="primary" v-if="!isFlowShow" size="small" class="baocun" plain @click="save">保 存</el-button>
    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        saveYearType: '',
        fileCase: '',
        pagtion: '',
        radio: '',
        isFlowShow:false,
        file: {
          appraMajor: '',
          saveYearType:'',
          fileCase:'',
        },
        option: [{
          value: '1',
          label: '永久'
        }, {
          value: '2',
          label: '一年'
        }],
        options: [{
          value: '1',
          label: '档案'
        }],
        tableParent: [{
          number: '1',
          content: '检验报告副本',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }, {
          number: '2',
          content: '鉴定文书审批表、审批稿',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }, {
          number: '3',
          content: '鉴定委托书',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }, {
          number: '4',
          content: '鉴定事项确认书',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }, {
          number: '5',
          content: '鉴定事项记录表',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }, {
          number: '6',
          content: '检验记录表',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }, {
          number: '7',
          content: '检材样本流转记录',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }, {
          number: '8',
          content: '照片',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }, {
          number: '9',
          content: '图谱',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }, {
          number: '10',
          content: '其他附件',
          pages: '0',
          pageStart: '0',
          pageEnd: '0',
        }
        ],
      }
    },
    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.querys();
      this.queryAucOrg();
    },
    methods: {
      //查询专业
      queryAucOrg() {
        this.postHttp("aucOrg/selectByPrimaryKey", {aucOrgId: this.regRow.aucOrgId}, res => {
          if (res.data != null) {
            this.file.appraMajor = res.data.aucOrgCname;
          }
        })
      },
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
                  this.file.saveYearType = item.saveYearType;
                  this.file.fileCase = item.fileCase;
                  this.radio = item.isGrant;
                }
              });
            });
          }
        })
      },
      //保存
      save() {
        var data = this.file;
        data['tableParent'] = this.tableParent;
        data['radio'] = this.radio;
        data['registerId'] = this.regRow.registerId;
        this.postHttp("document/insertDocument", data, res => {
          if (res.code == '0') {
            this.notify_success("保存成功");
          }
        })
      },
      // 自动写页码
      countPage(){
        let tempDataOne = this.unBinding(this.tableParent);
        let tempMax = 0;
        for(let x in tempDataOne){
          let data = tempDataOne[x];
          let start = 1;
          if(data.pages != '0' && typeof(data.pages) == 'number'){
            if(x != 0){
              start = tempMax;
            }
            data.pageStart = start;
            data.pageEnd = start + data.pages - 1;
            tempMax = start + data.pages;
          }else{
            data.pageStart = 0;
            data.pageEnd = 0;
            data.pages = 0;
          }
          tempDataOne[x] = data;
        }
        this.tableParent = tempDataOne;
      }
    },
  }
</script>

<style>
  .filing {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .filing .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  .filing .el-row {
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    /* background-color: #ffffff; */
  }

  .filing .normalRow {
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

  .filing .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  .filing .el-table__header tr,
  .filing .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #c5cbce;
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  .filing .el-table__body tr,
  .filing .el-table__body td {
    padding: 0;
    height: 40px;
  }

  .filing .el-table__body tr.current-row > td {
    background: RGB(85, 136, 254) !important;
    color: #fff;
  }

  .filing .el-table {
    width: 100% !important;
  }

  .filing .tableSon {
    width: 100%;
    height: 80%;
  }

  .filing .list-table-expand {
    font-size: 0;
    margin-left: 80px;
  }

  .filing .list-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .filing .list-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 80%;
  }


  .filing .inputClass .cell {
    display: flex;
  }

  .filing .inputClass .items.inputs {
    width: 40%;
  }

  .filing .inputClass .items.wave {
    width: 20%;
    text-align: center;
  }

  .filing .form-body .form-items.rows-really-half {
    width: 40%;
    margin: 10px 5%;
  }
</style>
