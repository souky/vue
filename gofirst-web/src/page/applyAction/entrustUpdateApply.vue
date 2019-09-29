<template>
    <div id="entrustUpdateApply" style="height: 100%;">
        <el-row class="yourAddress normalRow" style="margin-bottom:10px;">
            <el-col :span="24" class="normalCol">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                <el-breadcrumb-item>待办列表</el-breadcrumb-item>
                <el-breadcrumb-item>鉴定文书修改申请</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>

        <el-form ref="formInfo" :rules="rules" :model="formData" label-width="130px" size="small">
            <el-row class="rowInfo">
                <el-col class="baseInfoTop">鉴定文书修改</el-col>
            </el-row>
            <el-row class="rowInfo">
                <el-col class="baseInfo">申请登记</el-col>
                <el-col :span="8">
                    <el-form-item label="申请单位:" prop="entrustOrg">
                        <el-col :span="20">
                        <el-input v-model="formData.entrustOrg" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="承办人:" prop="applyName">
                        <el-col :span="20">
                        <el-input v-model="formData.applyName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请日期:" prop="applyDate">
                        <el-col :span="20">
                        <el-input v-model="formData.applyDate" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="案事件名称:" prop="caseName">
                        <el-col :span="20">
                        <el-input v-model="formData.caseName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="鉴定文书编号:" prop="checkCode">
                        <el-col :span="20">
                        <el-input v-model="formData.checkCode" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="更改方式:" prop="changeType">
                        <el-col :span="20">
                            <el-select v-model="formData.changeType" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="原文书内容:" prop="oldContent">
                        <el-col :span="20">
                            <el-input v-model="formData.oldContent" type="textarea" :rows="2" placeholder="请输入原文书内容"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="修改的内容:" prop="updateContent">
                        <el-col :span="20">
                        <el-input v-model="formData.updateContent" type="textarea" :rows="2" placeholder="请输入修改的内容"></el-input>
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
            formData: {
                id:'',
                registerId: '',
                previewId: '',
                entrustOrg: '',
                applyName: '',
                applyDate: '',
                caseName: '',
                checkCode: '',
                changeType: '',
                oldContent: '',
                updateContent: ''
            },
            rules: {

            },
            options: [
                {
                value: '0',
                label: '原文杠改并发《鉴定文书更正函》'
                }, {
                value: '1',
                label: '收回原件并重新出具鉴定文书'
                }
            ]
        }
    },
    methods:{
        getInfo(){
            var editFlag =this.getData('editFlag');
            if(editFlag == '0'){
                var obj={
                    registerId:this.getData("registerId"),
                    type:'4'
                }
                this.postHttp("apply/selectEntrustApplyInfo", obj, res => {
                    this.$set(this,"formData",res.data);
                })
            } else if(editFlag == '1'){
                var id = this.getData("id");
                console.log(id)
                this.postHttp("apply/selectByPrimaryKey", id, res => {
                    this.formData = res.data;
                })
            }
        },
        onSubmit(){
            var editFlag =this.getData('editFlag');
            if(editFlag == '0'){
                this.formData.type='4';
                this.postHttp("apply/insertOnly", this.formData, res => {
                    if (res.code == '0') {
                        this.notify_success("操作成功");
                        this.$router.push("/entrustUpdateList");
                    }else {
                        this.notify_warning("操作失败");
                    }
                })
            }else{
                this.formData.type='4';
                this.postHttp("apply/update", this.formData, res => {
                    if (res.code == '0') {
                        this.notify_success("操作成功");
                        this.$router.push("/entrustUpdateApplyList");
                    }else {
                        this.notify_warning("操作失败");
                    }
                })
            }
        },
        cancle(){
            var editFlag =this.getData('editFlag');
            if(editFlag == '0'){
                this.$router.push("/entrustUpdateList");
            }else{
                this.$router.push("/entrustUpdateApplyList");
            }
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
    #entrustUpdateApply .mainItem {
        width: 98%;
        margin: 10px auto;
        box-sizing: border-box;
    }

    #entrustUpdateApply {
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #entrustUpdateApply .el-date-editor.el-input, #entrustUpdateApply .el-date-editor.el-input__inner{
        width:100%;
    }
    #entrustUpdateApply .normalRow {
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow: auto;
    }

    #entrustUpdateApply .el-row {
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }


    #entrustUpdateApply .normalRow .normalCol {
    height: 3em;
    line-height: 3em;
    overflow: hidden;
  }

  #entrustUpdateApply .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  #entrustUpdateApply .step div {
    display: inline;
  }

  #entrustUpdateApply .doStep {
    color: #409EFF;
    padding-bottom: 10px;
  }

  #entrustUpdateApply .doStepActive {
    border-bottom: solid #409EFF;
  }

  #entrustUpdateApply .el-icon-tickets {
    color: #409EFF;
  }

  #entrustUpdateApply .baseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 16px;
    margin-bottom: 15px
  }

  #entrustUpdateApply .baseInfoTop {
    height: 3em;
    line-height: 3em;
    font-size: 20px;
    font-weight: bold;
  }

  #entrustUpdateApply .rowInfo {
    border-bottom: solid #f0f3fa
  }
  #entrustUpdateApply .el-input__inner{
      width: 80%;
  }

  #entrustUpdateApply .el-select.el-select--small{
    width: 80%;
  }
  #entrustUpdateApply .el-select.el-select--small .el-input__inner{
    width: 100%;
  }
</style>

