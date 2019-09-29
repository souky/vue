<template>
    <div id="delayed" style="height: 100%;">
        <el-row class="yourAddress normalRow" style="margin-bottom:10px;">
            <el-col :span="24" class="normalCol">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                <el-breadcrumb-item>待办列表</el-breadcrumb-item>
                <el-breadcrumb-item>恢复申请审批</el-breadcrumb-item>
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
                    <el-form-item label="案事件名称:">
                        <el-col :span="20">
                        <el-input v-model="formData.caseName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="委托单位:">
                        <el-col :span="20">
                        <el-input v-model="formData.entrustOrg" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="委托时间:" prop="orgTel">
                        <el-col :span="20">
                            <el-date-picker
                                v-model="formData.entrustDate"
                                type="date"
                                placeholder="选择日期" :disabled="true">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请人:">
                        <el-col :span="20">
                        <el-input v-model="formData.applyName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请时间:">
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
                    <el-form-item label="恢复原因:" prop="reasonContent" >
                        <el-col :span="20">
                        <el-input v-model="formData.reasonContent" type="textarea" :rows="2" placeholder="请输入恢复原因" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>


        <el-form ref="formInfo" :rules="rules" :model="formData" label-width="130px" size="small">
            <el-row class="rowInfo">
                <el-col class="baseInfo">科长审核</el-col>
                <el-col :span="8">
                    <el-form-item label="是否同意:" prop="auditState">
                        <el-col :span="20">
                            <el-radio-group v-model="formData.auditState">
                                <el-radio :label="0">同意</el-radio>
                                <el-radio :label="1">不同意</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="审核意见:" prop="auditOption">
                        <el-col :span="20">
                        <el-input v-model="formData.auditOption" type="textarea" :rows="2" placeholder="请输入审核意见"></el-input>
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
                registerId: '',
                previewId: '',
                type: '',
                caseName: '',
                acceptNo: '',
                entrustOrg: '',
                entrustDate: '',
                applyReason: '',
                delayedDays: '',
                applyName: '',
                applyDate: '',
                type: '',
                id: '',
                auditState:'',
                auditOption:'',
            },
            rules: {
                delayedDays:[
                    { required: true, message: '请输入恢复时间', trigger: 'blur' },
                    { type: 'number', message: '恢复时间请输入数字', trigger: 'blur' }
                ],
                reasonContent:[
                     { required: true, message: '请输入恢复原因', trigger: 'blur' }
                ],
                auditState:[
                     { required: true, message: '请输选择审核状态', trigger: 'blur' }
                ],
                auditOption:[
                     { required: true, message: '请输入审核意见', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        getInfo(){
            //var registerId = this.getData("id");
            var obj={
                registerId:this.getData("registerId"),
                type:'5'
            }
            this.postHttp("apply/selectByObjectUnApprove", obj, res => {
                this.formData=res.data;
            })

        },
        onSubmit(){
            this.formData.type='5';
            this.postHttp("apply/updateById", this.formData, res => {
                if (res.code == '0') {
                    this.notify_success("操作成功");
                    this.$router.push("/applyList");
                }else {
                    this.notify_warning("操作失败");
                }
            })
        },
        cancle(){
            this.$router.push("/applyList");
        }
    },
    activated: function () {
        this.getInfo();
    },
    mounted:function() {

    }
}
</script>

<style>
    * {
    font-size: 13px;
    }
    #delayed .mainItem {
        width: 98%;
        margin: 10px auto;
        box-sizing: border-box;
    }

    #delayed {
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #delayed .el-date-editor.el-input, #delayed .el-date-editor.el-input__inner{
        width:100%;
    }
    #delayed .normalRow {
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow: auto;
    }

    #delayed .el-row {
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }


    #delayed .normalRow .normalCol {
    height: 3em;
    line-height: 3em;
    overflow: hidden;
  }

  #delayed .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  #delayed .step div {
    display: inline;
  }

  #delayed .doStep {
    color: #409EFF;
    padding-bottom: 10px;
  }

  #delayed .doStepActive {
    border-bottom: solid #409EFF;
  }

  #delayed .el-icon-tickets {
    color: #409EFF;
  }

  #delayed .baseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 16px;
    margin-bottom: 15px
  }

  #delayed .baseInfoTop {
    height: 3em;
    line-height: 3em;
    font-size: 20px;
    font-weight: bold;
  }

  #delayed .rowInfo {
    border-bottom: solid #f0f3fa
  }

  #delayed .el-input__inner {
    width: 80%;
  }

  #delayed .footerRow {
    padding-top: 10px;
  }


  #delayed .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #delayed .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #delayed .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
     border: 1px dashed  black;
  }
  #delayed .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  #delayed .el-select.el-select--small{
    width: 100%;
  }
  #delayed .el-button--small.is-circle{
    padding: 8px;
  }


</style>
