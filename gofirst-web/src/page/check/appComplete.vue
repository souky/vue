<template>
  <div id="appComplete" class="appComplete" style="height: 100%;">
    <div class="mainItem breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>您的位置</el-breadcrumb-item>
        <el-breadcrumb-item>网上鉴定</el-breadcrumb-item>
        <el-breadcrumb-item>鉴定列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="mainItem">
      <el-form ref="form" :model="query" label-width="110px" size='small'>
        <div class="form-body">
          <el-form-item class="form-items" label="操作状态:">
            <el-select v-model="query.status" placeholder="操作状态" clearable>
              <el-option
                size="small"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-items" label="委托单位:">
            <el-input placeholder="委托单位" v-model="query.entrustNum" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="受理编号:">
            <el-input placeholder="受理编号" v-model="query.acceptBookNo" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="案件名称:">
            <el-input placeholder="案件名称" v-model="query.caseName" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="我的任务:">
            <el-select v-model="query.task" placeholder="我的任务" clearable>
              <el-option size="small" v-for="item in options1" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-items" label="经办人:">
            <el-input placeholder="经办人" v-model="query.empName" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item class="form-items" label="委托日期:">
             <el-date-picker v-model="query.entrustDate" type="daterange" range-separator="至" start-placeholder="委托日期"
                             end-placeholder="委托日期"></el-date-picker>
           </el-form-item>-->
          <div class="search rows">
            <el-button size="small" type="primary" style="" @click="querys()">搜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;索</el-button>
            <el-button size="small" type="info" style="" @click="reset()">重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
          </div>
        </div>
      </el-form>
    </div>

    <div id="tabb" class="tabb mainItem">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column align='center' type="selection"></el-table-column>
        <el-table-column align='center' prop="acceptBookNo" show-overflow-tooltip label="受理编号"
                         style="width: 12%"></el-table-column>
        <el-table-column align='center' prop="acceptDate" :formatter='dateFormat' label="受理时间" show-overflow-tooltip
                         style="width: 8%"></el-table-column>
        <el-table-column style="width: 10%" align='center' prop="aucOrgCname" label="鉴定专业"></el-table-column>
        <el-table-column align='center' prop="orgCname" label="委托单位" show-overflow-tooltip
                         style="width: 12%"></el-table-column>
        <el-table-column align='center' prop="caseName" label="案件名称" show-overflow-tooltip
                         style="width: 12%"></el-table-column>
        <el-table-column prop="entrustRequire" align='center' label="鉴定要求"
                         style="width: 10%"></el-table-column>
        <el-table-column align='center' prop="entrustDate" :formatter='dateFormat' label="要求完成时间" show-overflow-tooltip
                         style="width: 8%">15个工作日
        </el-table-column>
        <el-table-column align='center' prop="name" label="状态" style="width: 10%"></el-table-column>
        <el-table-column align='center' prop="empName" label="经办人" style="width: 10%"></el-table-column>
        <el-table-column align='center' prop="oldappCompleteOrg" label="操作" style="width: 5%">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="examine(scope.row)" plain>查看</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div class="pages">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="pageSizeChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          :current-page.sync="page.pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        query: {
          status: '',
          entrustNum: '',
          acceptBookNo: '',
          caseName: '',
          task: '',
          empName: '',
        },
        page: {
          pageNum: 1,
          pageSize: 10,
        },
        options: [{
          value: '1',
          label: '程序受理'
        }, {
          value: '2',
          label: '专业受理'
        }, {
          value: '3',
          label: '收检'
        }, {
          value: '4',
          label: '检验记录'
        }, {
          value: '5',
          label: '报告编写'
        }, {
          value: '6',
          label: '鉴定复核'
        }, {
          value: '7',
          label: '授权人签字'
        }, {
          value: '8',
          label: '中心主任签名'
        }, {
          value: '9',
          label: '打印报告'
        }, {
          value: '10',
          label: '报告发放'
        }, {
          value: '11',
          label: '提交归档'
        }, {
          value: '12',
          label: '确认归档'
        }],
        options1: [{
          value: '1',
          label: '我的待办'
        }, {
          value: '2',
          label: '科室代办'
        }],
        tableData: [],
        registerId: '',
        multipleSelection: []
      }
    },
    activated: function () {
      this.querys();
    },
    methods: {
      handleCurrentChange(val) {
        this.page.pageNum = val;
        this.querys();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      pageSizeChange(val) {
        this.page.pageSize = val;
        this.querys();
      },
      //审核操作
      examine(row) {
        this.setData("regRow", JSON.stringify(row));
        this.setData("isFlowShow", true);
        this.setData("isShowBtn", false);
        this.$router.push("/examine");
      },
      //重置
      reset() {
        this.query = {};
        this.querys();
      },
      //查询操作
      querys() {
        var data = this.query;
        data['pageNum'] = this.page.pageNum;
        data['pageSize'] = this.page.pageSize;
        this.postHttp("registers/getCompleteAppList", data, res => {
          res.data.list.forEach(items => {
            if (items.name == null) {
              items.name = "鉴定完成"
            }
          });
          this.tableData = res.data.list;
          this.page.pageNum = res.data.pageNum;
          this.page.pageSize = res.data.pageSize;
          this.page.total = res.data.total;
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
  #appComplete .search {
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 1%;
    width: 100%;
    margin: 10px 0;
  }

  #appComplete .mainItem {
    width: 98%;
    margin: 10px auto;
    box-sizing: border-box;
  }

  #appComplete .form-body {
    padding: 0;
  }

  .appComplete .yourAddress .el-input--prefix .el-input__inner {
    padding-left: 30px;
    margin-top: 4px;
  }

  .appComplete .yourAddress .el-input--suffix .el-input__inner {
    padding-right: 30px;
    margin-top: 4px;
  }

  .searchBoddy {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 114px;
    background-color: white;
  }

  .appComplete {
    background-color: #f0f3fa;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .appComplete .el-row .normalCol {
    font-size: 14px;
    margin-top: 6px;
    /* width: 100; */
  }

  .normalCol .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 250px;
  }

  .searchButton {
    display: flex;
    justify-content: flex-end;

  }

  .appComplete .el-row .normalCol {
    font-size: 14px;
  }

  .appComplete .yourAddress .ban {

  }

  .appComplete .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  .appComplete .el-col-4 {
    width: 14%;
  }

  /**设置点击事件变为小手*/
  .appComplete .hand {
    cursor: pointer;
  }

  .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  .tabb .el-table__header tr,
  .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: RGB(85, 136, 254);
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  .tabb .el-table__body tr,
  .tabb .el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
