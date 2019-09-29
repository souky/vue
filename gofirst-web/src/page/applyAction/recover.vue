<template>
    <div id="recover"  style="height: 100%;">
        <el-row class="yourAddress normalRow" style="margin-bottom:10px;">
            <el-col :span="24" class="normalCol">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                <el-breadcrumb-item>待办列表</el-breadcrumb-item>
                <el-breadcrumb-item>恢复申请</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>

        <el-form ref="formInfo" :rules="rules" :model="formData" label-width="130px" size="small">
            <el-row class="rowInfo">
                <el-col class="baseInfoTop">恢复申请</el-col>
            </el-row>
            <el-row class="rowInfo">
                <el-col class="baseInfo">申请登记</el-col>
                <el-col :span="8">
                    <el-form-item label="受理号:" prop="orgName">
                        <el-col :span="20">
                        <el-input v-model="formData.acceptNo" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="案件名称:" prop="caseName">
                        <el-col :span="20">
                        <el-input v-model="formData.caseName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="委托单位:" prop="entrustOrg">
                        <el-col :span="20">
                        <el-input v-model="formData.entrustOrg" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="委托时间:" prop="entrustDate">
                        <el-col :span="20">
                            <el-date-picker
                                v-model="formData.entrustDate"
                                type="datetime"
                                placeholder="选择日期时间"
                                :disabled="true">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请人:" prop="applyName">
                        <el-col :span="20">
                            <el-input v-model="formData.applyName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请时间:" prop="applyDate">
                        <el-col :span="20">
                            <el-date-picker
                                v-model="formData.applyDate"
                                type="datetime"
                                placeholder="选择日期时间"
                                :disabled="true">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="恢复原因:" prop="reasonContent">
                        <el-col :span="20">
                        <el-input type="textarea" :rows="2" v-model="formData.reasonContent"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>

                <el-col :span="10" :offset="7">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="cancle">取消</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

    </div>
</template>
<script>
export default {
    data(){
        return {
            formData:{
                acceptNo :'',
            },
            rules:{

            }
        }
    },
    methods:{
        getInitInfo(){
            var obj={
                //registerId:this.getData("registerId"),
                registerId:'caf35d5eb39f4d89b190f30b05970393',
                type:'5'
            }
            this.postHttp("apply/selectApplyInfo", obj, res => {
                this.formData=res.data;
                //this.formData['this.formData']=0;
            })

        },
        onSubmit(){
            this.formData.type='5';
            this.formData['c001']= this.getData('sort');
            this.postHttp("apply/insert", this.formData, res => {
                if (res.code == '0') {
                    this.notify_success("操作成功");
                    this.$router.push("/appraisal");
                }else {
                    this.notify_warning("操作失败");
                }
            })
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
    #recover .mainItem {
        width: 98%;
        margin: 10px auto;
        box-sizing: border-box;
    }

    #recover {
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #recover .el-date-editor.el-input, #recover .el-date-editor.el-input__inner{
        width:100%;
    }
    #recover .normalRow {
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow: auto;
    }

    #recover .el-row {
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }


    #recover .normalRow .normalCol {
    height: 3em;
    line-height: 3em;
    overflow: hidden;
  }

  #recover .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  #recover .step div {
    display: inline;
  }

  #recover .doStep {
    color: #409EFF;
    padding-bottom: 10px;
  }

  #recover .doStepActive {
    border-bottom: solid #409EFF;
  }

  #recover .el-icon-tickets {
    color: #409EFF;
  }

  #recover .baseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 16px;
    margin-bottom: 15px
  }

  #recover .baseInfoTop {
    height: 3em;
    line-height: 3em;
    font-size: 20px;
    font-weight: bold;
  }

  #recover .rowInfo {
    border-bottom: solid #f0f3fa
  }

  #recover .el-input__inner {
    width: 80%;
  }

  #recover .footerRow {
    padding-top: 10px;
  }


  #recover .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #recover .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #recover .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
     border: 1px dashed  black;
  }
  #recover .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  #recover .el-select.el-select--small{
    width: 100%;
  }
  #recover .el-button--small.is-circle{
    padding: 8px;
  }
</style>

