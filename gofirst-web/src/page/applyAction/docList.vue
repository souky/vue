<template>
    <div id="docList" style="height: 100%;">
        <el-row class="yourAddress normalRow" style="margin-bottom:10px;">
            <el-col :span="24" class="normalCol">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                <el-breadcrumb-item>待办列表</el-breadcrumb-item>
                <el-breadcrumb-item>文书台账</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>

        <el-row class="yourAddress normalRow" style="margin-bottom:10px;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="acceptDate" label="受理日期" ></el-table-column>
                <el-table-column prop="acceptBookNo" label="受理号" width="220px" ></el-table-column>
                <el-table-column prop="caseName" label="案件名称" ></el-table-column>
                <el-table-column prop="caseNo" label="案事件编号" ></el-table-column>
                <el-table-column prop="checkCode" label="鉴定号" width="220px"></el-table-column>
                <el-table-column prop="aucOrgName" label="专业" width="50px"></el-table-column>
                <el-table-column prop="isGrant" label="是否发放" width="100px"></el-table-column>
                <el-table-column prop="checkResultContent" label="鉴定结论" >
                    <template slot-scope="scope">
                        <div v-html="scope.row.checkResultContent"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="grantDate" label="发放时间" width="120px"></el-table-column>
                <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="updateHandleClick(scope.row.registerId)" type="text" size="small">修改申请</el-button>
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
        updateHandleClick(val){
            this.setData("registerId",val);
            this.$router.push('checkEntrustUpdateApply');
        },
        getInitInfo(){
            this.postHttp("previews/getDocList", {}, res => {
                this.tableData=res.data.list;
                this.page.total=res.data.total;
            })
        },
        handleCurrentChange(){

        },
        pageSizeChange(){

        }
    },
    activated:function(){
        this.getInitInfo();
    }
}
</script>

<style>
* {
    font-size: 13px;
    }
    #docList .mainItem {
        width: 98%;
        margin: 10px auto;
        box-sizing: border-box;
    }

    #docList {
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #docList .el-date-editor.el-input, #docList .el-date-editor.el-input__inner{
        width:100%;
    }
    #docList .normalRow {
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow: auto;
    }

    #docList .el-row {
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }


    #docList .normalRow .normalCol {
    height: 3em;
    line-height: 3em;
    overflow: hidden;
  }

  #docList .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  #docList .step div {
    display: inline;
  }

  #docList .doStep {
    color: #409EFF;
    padding-bottom: 10px;
  }

  #docList .doStepActive {
    border-bottom: solid #409EFF;
  }

  #docList .el-icon-tickets {
    color: #409EFF;
  }

  #docList .baseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 16px;
    margin-bottom: 15px
  }

  #docList .baseInfoTop {
    height: 3em;
    line-height: 3em;
    font-size: 20px;
    font-weight: bold;
  }
</style>


