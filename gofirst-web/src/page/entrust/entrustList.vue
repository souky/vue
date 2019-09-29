<template>
  <div id="entrustList" style="height: 100%;">

    <div class="mainItem breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>您的位置</el-breadcrumb-item>
        <el-breadcrumb-item>网上送检</el-breadcrumb-item>
        <el-breadcrumb-item>送检列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="mainItem">
      <el-form ref="form" :model="query" label-width="120px" size='small'>
        <div class="form-body">
          <el-form-item class="form-items" label="委托编号:">
            <el-input v-model="query.entrustBookNum" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="案（事）件编号:">
            <el-input v-model="query.caseNo" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="受理编号:">
            <el-input v-model="query.acceptBookNo" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="送检人:">
            <!-- <el-select
               v-model="query.sendPeople"
               multiple
               filterable
               remote
               reserve-keyword
               placeholder="请输入关键词"
               :remote-method="remoteMethod"
               :loading="loading">
               <el-option
                 v-for="item in option"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>-->
            <el-input v-model="query.sendPeople" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="被鉴定人姓名:">
            <el-input v-model="query.sendOrgId" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="案（事）件名称:">
            <el-input v-model="query.caseName" clearable></el-input>
          </el-form-item>
          <div class="search rows">
            <el-button size="small" type="primary" style="" @click="querys()">搜&emsp;&emsp;索</el-button>
            <el-button size="small" type="info" style="" @click="reSet()">重&emsp;&emsp;置</el-button>
          </div>
        </div>
      </el-form>

    </div>
    <div id="bodss" class="mainItem">
      <div class="text">
        本人网上送检信息表
      </div>
      <div class="btn">
        <el-button type="primary" @click="jump()" size="small">网上登记</el-button>
        <el-button @click="delet()" type="danger" size="small">删&emsp;&emsp;除
        </el-button>
      </div>
    </div>
    <div id="tabb" class="tabb mainItem">
      <el-table
        @row-dblclick="storageDetail"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%" highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column
          align='center'
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          align='center'
          prop="caseNo"
          label="案(事)件编号"
          width="120">
        </el-table-column>
        <el-table-column
          align='center'
          prop="caseName"
          label="案(事)件名称"
          show-overflow-tooltip
          width="220">
        </el-table-column>
        <el-table-column
          align='center'
          prop="orgCname"
          label="鉴定机构"
          show-overflow-tooltip
          width="160">
        </el-table-column>
        <el-table-column
          align='center'
          :formatter='dateFormat'
          prop="entrustDate"
          label="委托时间"
          show-overflow-tooltip
          width="160">
        </el-table-column>
        <el-table-column
          align='center'
          prop="c001"
          label="被鉴定人姓名"
          width="120">
        </el-table-column>
        <el-table-column
          align='center'
          prop="entrustBookNum"
          label="委托编号"
          width="150">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          align='center'
          prop="acceptBookNo"
          label="受理编号"
          width="130"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align='center'
          prop="aucOrgCname"
          label="专业"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          align='center'
          prop="empName"
          label="送检人"
          width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align='center'
          prop="name"
          label="办理进度"
          width="100">
        </el-table-column>
        <el-table-column
          align='center'
          prop="applyState"
          label="审核状态"
          width="100">
          <template slot-scope="scope">
            {{ scope.row.applyState =='2' ? '延时': '' }}
            {{ scope.row.applyState =='4' ? '中止': '' }}
            {{ scope.row.applyState =='6' ? '终止': '' }}
            {{ scope.row.applyState =='0' || scope.row.applyState =='1' || scope.row.applyState =='3'|| scope.row.applyState =='5' || scope.row.applyState =='7'? '正常': '' }}
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          prop="reason"
          label="处理意见" show-overflow-tooltip>
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
          entrustBookNum: '',
          caseNo: '',
          acceptBookNo: '',
          sendPeople: '',
          sendOrgId: '',
          caseName: '',
        },
        option: [],
        options: [],
        value: [],
        list: [],
        loading: false,
        loadingUser: false,
        page: {
          pageNum: 1,
          pageSize: 10,
        },
        options1: [{
          value: '1',
          label: '受理退回'
        }, {
          value: '2',
          label: '待受理'
        }, {
          value: '3',
          label: '待指派'
        }, {
          value: '4',
          label: '检验中'
        }, {
          value: '5',
          label: '签发中'
        }, {
          value: '6',
          label: '归档中'
        }, {
          value: '7',
          label: '领取中'
        }, {
          value: '8',
          label: '已完成'
        }],
        options: [{
          value: '1',
          label: '委托书条码号'
        }, {
          value: '2',
          label: '受理登记条码号'
        }, {
          value: '3',
          label: '现场勘验号'
        }, {
          value: '4',
          label: '案（事）件编号'
        }],
        tableData: [],
        registerId: '',
        multipleSelection: []
      }
    },
    activated: function () {
      this.setData("edit", 0);
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

      //查询员工
      queryPerson() {
        this.postHttp("registers/delete", registerList.toString(), res => {
          if (res.code == '0') {
            //删除成功之后从新调用查询方法
            this.querys();
            this.tableData = res.list;
          } else {
            this.notify_warning(res.msg);
          }
        })
      },

      //送检人条件查询
      remoteMethod(query) {
        if (query !== '') {
          this.loadingUser = true;
          setTimeout(() => {
            this.loadingUser = false;
            this.option = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.option = [];
        }
      },

      //删除操作
      delet() {
        if (this.multipleSelection.length <= 0) {
          this.notify_warning("请选择要删除的行！");
          return;
        }
        this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var registerList = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            registerList.push(this.multipleSelection[i].registerId);
          }
          this.postHttp("registers/delete", registerList.toString(), res => {
            if (res.code == '0') {
              //删除成功之后从新调用查询方法
              this.querys();
              this.tableData = res.list;
            } else {
              this.notify_warning(res.msg);
            }
          })
        }).catch(() => {
          //取消
        });
      },
      storageDetail(row) {
        if (row.sort > 2) {
          this.setData("edit", 1);
        }
        if(row.aucOrgCname.indexOf("DNA")!=-1){
          this.setData("consignmentId", row.registerId);
          this.setData("aucOrgId", row.aucOrgId);
          this.$router.push("entrustInfo_dna");
        }else{
          this.setData("registerId", row.registerId);
          this.setData("aucOrgId", row.aucOrgId);
          this.$router.push("entrustInfo");
        }
        
      },
      jump() {
        this.$router.push('/entrustChoice');
      },
      reminder() {
        this.$router.push('/authenticator');
      },
      //查询操作
      querys() {
        var data = this.query;
        data['pageNum'] = this.page.pageNum;
        data['pageSize'] = this.page.pageSize;
        this.postHttp("registers/list", data, res => {
          this.page.pageNum = res.data.pageNum;
          this.page.pageSize = res.data.pageSize;
          this.page.total = res.data.total;
          res.data.list.forEach(item => {
            if (item.empName1 == null) {
              item.empName = item.empName;
            } else {
              item.empName = item.empName + "," + item.empName1;
            }
          });
          this.tableData = res.data.list;
        })
      },
      //重置
      reSet() {
        this.query = {};
        this.querys();
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

  #entrustList .yourAddress .el-input--prefix .el-input__inner {
    padding-left: 30px;
    margin-top: 4px;
  }

  #entrustList .yourAddress .el-input--suffix .el-input__inner {
    padding-right: 30px;
    margin-top: 4px;
  }

  .normalColen .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 225px;
  }

  #entrustList {
    background-color: #f0f3fa;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #entrustList .el-row .normalCol {
    height: 3em;
    line-height: 3em;
    font-size: 14px;
  }

  #entrustList .yourAddress .ban {

  }

  #entrustList .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  #entrustList .sousuo {
    position: absolute;
    right: 58px;
    top: 7.6px;
  }

  .shanchu {
    position: absolute;
    right: 57px;
    top: 4.6px;
  }

  .tishi {
    position: absolute;
    right: 59px;
    top: 4.6px;
  }

  .dengji {
    position: absolute;
    right: 187px;
    top: 4.6px;
  }

  #entrustList .el-col-4 {
    width: 14%;
  }

  /**设置点击事件变为小手*/
  #entrustList .hand {
    cursor: pointer;
  }

  #entrustList .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  #entrustList .tabb .el-table__header tr,
  #entrustList .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: RGB(85, 136, 254);
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  #entrustList .tabb .el-table__body tr,
  #entrustList .tabb .el-table__body td {
    padding: 0;
    height: 40px;
  }

  #entrustList .mainItem {
    width: 98%;
    margin: 10px auto;
    box-sizing: border-box;
  }

  #entrustList .form-body {
    padding: 10px 0;
  }

  #entrustList .search {
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 1%;
    width: 100%;
  }

  #entrustList #bodss {
    display: flex;
    justify-content: space-between;
    height: 50px;
  }

  #entrustList #bodss .text {
    text-align: left;
    width: 200px;
    font-size: 14px;
    line-height: 50px;
    padding-left: 10px;
  }

  #entrustList #bodss .btn {
    width: 190px;
    display: flex;
    height: 32px;
    margin-top: 9px;
    margin-right: 1%;
    justify-content: flex-end;
  }
</style>
