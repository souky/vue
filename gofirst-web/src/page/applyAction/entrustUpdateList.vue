<template>
    <div id="entrustUpdateList" style="height: 100%;">
        <el-row class="yourAddress normalRow" style="margin-bottom:10px;">
            <el-col :span="24" class="normalCol">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                    <el-breadcrumb-item>待办列表</el-breadcrumb-item>
                    <el-breadcrumb-item>鉴定文书修改</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row class="yourAddress normalRow" style="margin-bottom:10px;">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="entrustBookNum" label="委托号" ></el-table-column>
            <el-table-column prop="acceptDate" label="受理时间" ></el-table-column>
            <el-table-column prop="acceptBookNo" label="受理号" ></el-table-column>
            <el-table-column prop="sendOrgName" label="委托单位" ></el-table-column>
            <el-table-column prop="caseName" label="案件名称" ></el-table-column>
            <el-table-column prop="processName" label="进度" ></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.registerId)" type="text" size="small">新增</el-button>
                <el-button @click="handleClickSearch(scope.row.registerId)" type="text" size="small">查看</el-button>
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
        </el-row>


    </div>
</template>

<script>
export default {
  data(){
    return {
      tableData:[],
      page:{
        pageSize: 10,
        pageNum: 1,
        total: 0,
      }
    }
  },
  methods:{
    initInfo(){
      var obj = {};
      obj['pageNum'] = this.page.pageNum;
      obj['pageSize'] = this.page.pageSize;
      this.postHttp("registers/getEntrustApplyList", obj, res => {
          if (res.code == '0') {
            this.page.pageNum = res.data.pageNum;
            this.page.pageSize = res.data.pageSize;
            this.page.total = res.data.total;
            this.tableData=res.data.list;
          }else {
              this.notify_warning("操作失败");
          }
      })
    },
    handleClick(registerId){
      this.setData('registerId',registerId);
      //editFlag 0 新增 1 编辑
      this.setData('editFlag','0');
      this.$router.push("/entrustUpdateApply");
    },
    handleClickSearch(registerId){
      this.setData('registerId',registerId);
      this.$router.push("/entrustUpdateApplyList");
    },
    handleCurrentChange(val){
      this.page.pageNum = val;
      this.initInfo();
    },
    pageSizeChange(val){
      this.page.pageSize = val;
      this.initInfo();
    }
  },
  activated: function () {
      this.initInfo();
  },
  mounted:function() {
    //this.initInfo();
  }
}
</script>


<style>
* {
    font-size: 13px;
    }
    #entrustUpdateList .mainItem {
        width: 98%;
        margin: 10px auto;
        box-sizing: border-box;
    }

    #entrustUpdateList {
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #entrustUpdateList .el-date-editor.el-input, #entrustUpdateList .el-date-editor.el-input__inner{
        width:100%;
    }
    #entrustUpdateList .normalRow {
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow: auto;
    }

    #entrustUpdateList .el-row {
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }


    #entrustUpdateList .normalRow .normalCol {
    height: 3em;
    line-height: 3em;
    overflow: hidden;
  }

  #entrustUpdateList .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  #entrustUpdateList .step div {
    display: inline;
  }

  #entrustUpdateList .doStep {
    color: #409EFF;
    padding-bottom: 10px;
  }

  #entrustUpdateList .doStepActive {
    border-bottom: solid #409EFF;
  }

  #entrustUpdateList .el-icon-tickets {
    color: #409EFF;
  }

  #entrustUpdateList .baseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 16px;
    margin-bottom: 15px
  }

  #entrustUpdateList .baseInfoTop {
    height: 3em;
    line-height: 3em;
    font-size: 20px;
    font-weight: bold;
  }

  #entrustUpdateList .rowInfo {
    border-bottom: solid #f0f3fa
  }
  #entrustUpdateList .el-input__inner{
      width: 100%;
  }

  #entrustUpdateList .el-select.el-select--small{
    width: 80%;
  }
  #entrustUpdateList .el-select.el-select--small .el-input__inner{
    width: 100%;
  }
  #entrustUpdateList .el-pagination__editor.el-input{
    width:35px;
  }
</style>
