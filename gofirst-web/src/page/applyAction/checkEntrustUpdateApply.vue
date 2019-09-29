<template>
    <div id="checkEntrustUpdateApply" style="height: 100%;">
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
                <el-col class="baseInfoTop">鉴定文书修改审批表</el-col>
            </el-row>
            <el-row class="rowInfo">
                <el-col class="baseInfo">修改申请</el-col>
                <el-col :span="8">
                    <el-form-item label="鉴定文书编号:" prop="checkCode">
                        <el-col :span="20">
                        <el-input v-model="formData.checkCode" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="文书类型:" prop="sendDocBookType">
                        <el-col :span="20">
                        <el-input v-model="formData.sendDocBookType" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                
                <el-col :span="8">
                    <el-form-item label="委托单位:" prop="orgName">
                        <el-col :span="20">
                        <el-input v-model="formData.orgName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="发出日期:" prop="grantDate">
                        <el-col :span="20">
                        <el-input v-model="formData.grantDate" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="委托人:" prop="empName">
                        <el-col :span="20">
                        <el-input v-model="formData.empName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="委托时间:" prop="entrustDate">
                        <el-col :span="20">
                        <el-input v-model="formData.entrustDate" :disabled="true"></el-input>
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
                <el-col :span="8">
                    <el-form-item label="修改方式:" prop="changeType">
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
                    <el-form-item label="修改内容:" prop="oldContent">
                        <el-col :span="20">
                            <el-input v-model="formData.oldContent" type="textarea" :rows="2" placeholder="请输入原文书内容"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="新内容:" prop="updateContent">
                        <el-col :span="20">
                        <el-input v-model="formData.updateContent" type="textarea" :rows="2" placeholder="请输入修改的内容"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="修改原因:" prop="reasonContent">
                        <el-col :span="20">
                        <el-input v-model="formData.reasonContent" type="textarea" :rows="2" placeholder="请输入修改的内容"></el-input>
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
                registerId: '',
                checkCode: '',
                sendDocBookType: '',
                orgName: '',
                grantDate:'',
                empName: '',
                entrustDate:'',
                oldContent:'',
                updateContent:'',
                reasonContent:'',
                changeType:'',
                applyName:'',
                applyDate:'',
                id:'',

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
            var registerId = this.getData("registerId");
            this.postHttp("apply/selectCheckUpdate", registerId, res => {
                console.log(res.data);
                    this.formData = res.data;
                    if(res.data.sendDocBookType == '1'){
                        this.formData.sendDocBookType = '鉴定书';
                    }
                    if(res.data.sendDocBookType == '2'){
                        this.formData.sendDocBookType = '检验报告';
                    }
                    if(res.data.sendDocBookType == '3'){
                        this.formData.sendDocBookType = '检验意见书';
                    }
                })
        },
        onSubmit(){
            this.formData.type='6';
            var obj={
                type :'6',
                registerId:this.formData.registerId,
                oldContent:this.formData.oldContent,
                updateContent:this.formData.updateContent,
                reasonContent:this.formData.reasonContent,
                changeType:this.formData.changeType,
                applyName:this.formData.applyName,
                applyDate:this.formData.applyDate,
                id:this.formData.id,

            }
            this.postHttp("apply/insert", obj, res => {
                if (res.code == '0') {
                    this.notify_success("操作成功");
                    this.$router.push("/docList");
                }else {
                    this.notify_warning("操作失败");
                }
            })
        },
        cancle(){
            this.$router.push("/docList");
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
    #checkEntrustUpdateApply .mainItem {
        width: 98%;
        margin: 10px auto;
        box-sizing: border-box;
    }

    #checkEntrustUpdateApply {
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #checkEntrustUpdateApply .el-date-editor.el-input, #checkEntrustUpdateApply .el-date-editor.el-input__inner{
        width:100%;
    }
    #checkEntrustUpdateApply .normalRow {
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow: auto;
    }

    #checkEntrustUpdateApply .el-row {
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }


    #checkEntrustUpdateApply .normalRow .normalCol {
    height: 3em;
    line-height: 3em;
    overflow: hidden;
  }

  #checkEntrustUpdateApply .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  #checkEntrustUpdateApply .step div {
    display: inline;
  }

  #checkEntrustUpdateApply .doStep {
    color: #409EFF;
    padding-bottom: 10px;
  }

  #checkEntrustUpdateApply .doStepActive {
    border-bottom: solid #409EFF;
  }

  #checkEntrustUpdateApply .el-icon-tickets {
    color: #409EFF;
  }

  #checkEntrustUpdateApply .baseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 16px;
    margin-bottom: 15px
  }

  #checkEntrustUpdateApply .baseInfoTop {
    height: 3em;
    line-height: 3em;
    font-size: 20px;
    font-weight: bold;
  }

  #checkEntrustUpdateApply .rowInfo {
    border-bottom: solid #f0f3fa
  }
  #checkEntrustUpdateApply .el-input__inner{
      width: 80%;
  }

  #checkEntrustUpdateApply .el-select.el-select--small{
    width: 80%;
  }
  #checkEntrustUpdateApply .el-select.el-select--small .el-input__inner{
    width: 100%;
  }
</style>

