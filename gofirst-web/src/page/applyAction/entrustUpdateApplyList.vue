<template>
    <div id="entrustUpdateApplyList" style="height: 100%;">
        <el-row class="yourAddress normalRow" style="margin-bottom:10px;">
            <el-col :span="22" class="normalCol">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                    <el-breadcrumb-item>待办列表</el-breadcrumb-item>
                    <el-breadcrumb-item>委托修改申请列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="2" class="normalCol">
                <el-button type="primary" @click="goBack" size="small">返回</el-button>
            </el-col>
        </el-row>

        <el-row class="yourAddress normalRow" style="margin-bottom:10px;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="entrustBookNum" label="委托号" ></el-table-column>
                <el-table-column prop="caseName" label="案件名称" ></el-table-column>
                <el-table-column prop="applyName" label="申请人" ></el-table-column>
                <el-table-column prop="applyDate" label="申请时间" ></el-table-column>
                <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="updateHandleClick(scope.row.id)" type="text" size="small">修改</el-button>
                    <el-button @click="handleClickSearch(scope.row.docId)" type="text" size="small">打印</el-button>
                </template>
                </el-table-column>
          </el-table>
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
        getInitInfo(){
            var registerId = this.getData("registerId");
            var obj={
                registerId:registerId,
                type:'4'
            }

            this.postHttp("apply/selectAppluUpdateList", obj, res => {
                this.tableData=res.data;
            })

        },
        updateHandleClick(id){
            this.setData('id',id);
             //editFlag 0 新增 1 编辑
            this.setData('editFlag','1');
            this.$router.push('entrustUpdateApply');
        },
        handleClickSearch(docId){
            console.log(docId);
            //this.setData("docId",docId);
            //this.$router.push('print');
            this.postHttp("document/selectByPrimaryKey", docId, res => {
                if (res.code == '0') {
                    let src =  this.getBaseUrl()+"/WORD_FILE/"+res.data.address;
                    window.open(src);
                }else {
                    this.notify_warning("操作失败");
                }
            })
        },
        goBack(){
            this.$router.push('entrustUpdateList');
        }
    },
    activated: function(){
        this.getInitInfo();
    }
}
</script>


<style>
* {
    font-size: 13px;
    }
    #entrustUpdateApplyList .mainItem {
        width: 98%;
        margin: 10px auto;
        box-sizing: border-box;
    }

    #entrustUpdateApplyList {
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #entrustUpdateApplyList .el-date-editor.el-input, #entrustUpdateApplyList .el-date-editor.el-input__inner{
        width:100%;
    }
    #entrustUpdateApplyList .normalRow {
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow: auto;
    }

    #entrustUpdateApplyList .el-row {
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }


    #entrustUpdateApplyList .normalRow .normalCol {
    height: 3em;
    line-height: 3em;
    overflow: hidden;
  }

  #entrustUpdateApplyList .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  #entrustUpdateApplyList .step div {
    display: inline;
  }

  #entrustUpdateApplyList .doStep {
    color: #409EFF;
    padding-bottom: 10px;
  }

  #entrustUpdateApplyList .doStepActive {
    border-bottom: solid #409EFF;
  }

  #entrustUpdateApplyList .el-icon-tickets {
    color: #409EFF;
  }

  #entrustUpdateApplyList .baseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 16px;
    margin-bottom: 15px
  }

  #entrustUpdateApplyList .baseInfoTop {
    height: 3em;
    line-height: 3em;
    font-size: 20px;
    font-weight: bold;
  }
</style>

