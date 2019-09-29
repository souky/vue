<template>
    <div id="authRequ">
        <el-row class="position">
            <el-col :span="20" class="normalCol" >
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                    <el-breadcrumb-item>网上送检</el-breadcrumb-item>
                    <el-breadcrumb-item>网上登记</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>

        <el-row class="step normalRow">
            <el-col :span="22" class="normalCol">
                <el-button type="primary" size="mini">操作步骤提示</el-button>
                <div class="doStep">1.选择鉴定机构</div>
                <i class="icon"><img src="@/assets/img/arrow-right.png"></i>
                <div class="doStep">2.选择鉴定专业</div>
                <i class="icon"><img src="@/assets/img/arrow-right.png"></i>
                <div class="doStep">3.编辑基本信息</div>
                <i class="icon"><img src="@/assets/img/arrow-right.png"></i>
                <div class="doStep">4.编辑被鉴定人信息</div>
                <i class="icon"><img src="@/assets/img/arrow-right.png"></i>
                <div class="doStep">5.编辑检材样本信息</div>
                <i class="icon"><img src="@/assets/img/arrow-right.png"></i>
                <div class="doStep doStepActive">6.选择鉴定要求</div>
                <i class="icon"><img src="@/assets/img/arrow-right.png"></i>
                <div>7.填写提交鉴定</div>
            </el-col>
           <!-- <el-col :span="2" class="normalCol">
                <el-button type="info" round size="mini">温馨提示</el-button>
            </el-col>-->
        </el-row>

        <el-row class="normalRow" style="margin-bottom:10px;">
            <el-col :span="22" class="normalCol">
                <i class="icon">
                    <img src="@/assets/img/tip.png">
                </i>
                <span>[]送检登记</span>
                <i class="el-icon-minus"></i>
                <span>[{{this.temp.aucOrgName}}]</span>
            </el-col>
            <!-- <el-col :span="2" class="normalCol">
                <el-button type="primary" round size="mini">&nbsp;&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-col> -->
        </el-row>

<div class="authdiv">

</div>
        <el-form  label-width="80px" :model="authForm"  :rules="rulesForm" ref="ruleForm">
            <el-form-item label="鉴定项目:">
                <div>{{this.temp.aucOrgName}}鉴定</div>
            </el-form-item>
            <el-form-item label="鉴定要求:" prop="entrustRequire">

                <el-cascader ref="cascader" :options="temp.entrustProgList" v-model="cascaderValue" @change='changeRequire' :props="props" :show-all-levels="false" style="width:20%;margin-bottom:10px;"></el-cascader>
                <el-input type="textarea" v-model="authForm.entrustRequire" ></el-input>
            </el-form-item>
            <el-form-item label="鉴定方法约定:" prop="entrustMeth">
                <el-radio-group v-model="authForm.entrustMeth">
                    <el-radio v-for="item in temp.entrustMethList" :key="item.dictKey" :label="item.dictKey">
                        {{item.dictValue}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文书送达方式约定:" prop="sendType">
                <el-radio-group v-model="authForm.sendType">
                    <el-radio v-for="item in temp.sendTypeList" :key="item.dictKey" :label="item.dictKey">
                         {{item.dictValue}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="对检材使用处理约定:" prop="handlingOpinions">
                <el-radio-group v-model="authForm.handlingOpinions">
                    <el-radio v-for="item in temp.handlingOpinionsList" :key="item.dictKey" :label="item.dictKey">
                         {{item.dictValue}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="检材样本特殊说明:" prop="sendGoods">
                <el-input type="textarea" v-model="authForm.sendGoods" ></el-input>
            </el-form-item> -->
            <el-form-item >

            </el-form-item>
        </el-form>
        <div class="nextMove" v-if="flag != '1'">
          <el-button type="primary" @click="backstep">上一步</el-button>
          <el-button type="primary" @click="onSubmit('authForm')">下一步</el-button>
        </div>
  			<div class="nextMove" v-if="flag == '1'">
  				<el-button type="primary" @click="goback">返    回</el-button>
          <el-button type="primary" @click="onSubmit('authForm')">保    存</el-button>
        </div>
    </div>
</template>

<script>
import { log } from 'util';
let id = 0;
  export default {
        data() {
            return {
                cascaderConfig: {
                    label: 'dictValue',
                    value: 'dictKey',
                    children: 'children'
                },
                authForm: {
                    registerId:'',
                    entrustProg: [],
                    entrustRequire: '',
                    entrustMeth: '',
                    sendType: '',
                    handlingOpinions: '',
                    sendGoods: ''
                },
                temp:{
                    entrustProgList:[],
                    entrustMethList:[],
                    sendTypeList:[],
                    handlingOpinionsList:[],
                    entrustInfoEditFlag:'',
                    aucOrgName:'',
                    aucOrgId:'',
                    aucOrgItem:'',
                    aucOrgTipList:[],
                },
                orgId:'',
                parentOrgId:'',
                rulesForm: {
                    entrustRequire: [
                        { required: true, message: '请选鉴定要求', trigger: 'blur' }
                    ],
                    entrustMeth: [
                        { required: true, message: '请选择一个鉴定方法约定', trigger: 'change' }
                    ],
                    sendType: [
                        { required: true, message: '请选择一个文书送达约定', trigger: 'change' }
                    ],
                    handlingOpinions: [
                        { required: true, message: '请选择一个处理约定', trigger: 'change' }
                    ]
                },
                cascaderValue:[],
                props: {
                    lazy: true,
                    label: 'dictValue',
                    value: 'dictValue',
                    ids:'dictKey',
                    children: 'children',
                    multiple:true,
                    lazyLoad:(node, resolve)=>{
                        const { level } = node;
                        if(level == 1){
                            this.handleItemChange(node.data.ids,resolve);
                        }
                    }
                },
                flag:0,
            }
        },
        methods: {

            /**
             * 获取字典项信息
             *
             * DOCSENDTYPE 文书送达方式约定
             * EVIDENCEUSETYPE 对检材使用处理约定
             * AUTHENTICATIONMETHOD 鉴定方法约定
             * AUTHENTICATIONITEM 鉴定项目
             */
            getDictInfo(){
                var data = {
                    "parentKeyList":["DOCSENDTYPE","EVIDENCEUSETYPE","AUTHENTICATIONMETHOD"]
                };
                this.postHttpForLogin("dict/getDictInfo",data,res =>{
                    if(res.code == '0'){
                        this.temp.entrustMethList=res.data.AUTHENTICATIONMETHOD;
                        this.temp.sendTypeList=res.data.DOCSENDTYPE;
                        this.temp.handlingOpinionsList=res.data.EVIDENCEUSETYPE;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
            },
            /**
             * 回显信息
             */
            backInfo(){
                this.getHttp("registers/selectInfoAll",{registerId:this.authForm.registerId},res =>{
                    if(res.code == '0'){
                        this.authForm=res.data;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
            },
            /**
             * 获取检验专业
             */
            getRegisterId(){
                this.getHttp("aucOrg/getAucOrgNameByRegisterId",{registerId:this.authForm.registerId},res =>{
                    if(res.code == '0'){
                        this.temp.aucOrgName=res.data;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
            },
            getIdentificationProject(){
                this.postHttp("aucOrg/selectByAucOrgIdWithColumn",this.temp.aucOrgId,res =>{
                    if(res.code == '0'){
                        console.log('aucOrgItem', res.data.aucOrg.aucOrgItem)
                        var data = {
                            "parentKey":res.data.aucOrg.aucOrgItem
                        };
                        this.postHttpForLogin("dict/getDictInfo",data,res =>{
                            if(res.code == '0'){
                                for(let x in res.data){
                                    res.data[x].children = [];
                                    res.data[x].ids = res.data[x].dictKey;
                                    res.data[x].dictKey = res.data[x].dictValue;
                                }
                                this.temp.entrustProgList=res.data;

                            }else{
                                this.notify_warning(res.msg);
                            }
                        });
                    }else{
                        this.notify_warning(res.msg);
                    }
                });

            },
            handleItemChange(val,resolve){

                var data = {"parentKey":val };
                this.postHttpForLogin("dict/getDictInfo",data,res =>{
                    if(res.code == '0'){
                        for(let x in res.data){
                            res.data[x].leaf = true;
                        }
                        resolve(res.data)
                    }else{
                        resolve([]);
                    }

                });

            },
            changeRequire(){
                let arrays = [];
                for(let x in this.cascaderValue){

                    arrays.push(this.cascaderValue[x][1]);
                }

                this.authForm.entrustRequire = '' + arrays.join('、');
            },
            loadChilen(){
                 for (let index = 0; index < this.temp.entrustProgList.length; index++) {
                    const element = this.temp.entrustProgList[index];
                    console.log('dictKey', element.dictKey)

                    this.temp.entrustProgList[index].children = [];
                    this.temp.aucOrgTipList = [];
                    console.log('aucOrgTipList', this.temp.aucOrgTipList)

                }

            },
            /**
             * from 表单信息提交
             */
            onSubmit(formName) {
                this.$refs['ruleForm'].validate((valid) => {
                 if (valid) {
                        this.authForm.entrustProg = this.temp.aucOrgName+'鉴定';
                        this.authForm.orgId=this.parentOrgId;
                        let dataLet = this.unBinding(this.authForm);
                        this.postHttp("registers/updateRegisterById",dataLet,res =>{
                            if(res.code == '0'){
                                this.notify_success("信息添加成功!");
                                this.$router.push('/entrustInfo');
                            }else{
                                this.notify_warning(res.msg);
                            }
                        });
                    }else{
                        console.log("error check!!");
                    }
                }
                );
            },
            /**
             * 返回上一步
             */
            backstep() {
                this.$router.push('/entrustInspection');
            },
            goback(){
              this.$router.push('/entrustInfo');
            },
            getParentOrg(orgId){
                console.log("sfs");
                console.log(orgId);
                this.getHttpForLogin("orgsController/selectParentOrgByChildrenId",{orgId:orgId},res =>{
                            if(res.code == '0'){
                               this.parentOrgId = res.data.orgId;
                               console.log(this.parentOrgId);
                            }else{
                                this.notify_warning(res.msg);
                            }
                        });
            },
            getRegisterInfo(){
                this.getHttp("registers/selectInfoAll",{registerId:this.authForm.registerId},res =>{
                    if(res.code == '0'){
                        //this.orgId=res.data.orgId;
                        console.log("res.data.orgId");
                        console.log(res.data.orgId);
                        this.getParentOrg(res.data.orgId);
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
            }

        },
        activated:function () {
            this.authForm = {
                registerId:'',
                entrustProg: [],
                entrustRequire: '',
                entrustMeth: '',
                sendType: '',
                handlingOpinions: '',
                sendGoods: ''
            }
            this.authForm.registerId = this.getData('registerId');
            this.temp.aucOrgId = this.getData('aucOrgId');
            this.flag = this.getData('entrustInfoEditFlag');
            this.temp.entrustInfoEditFlag = this.getData('entrustInfoEditFlag');
            this.getRegisterId();
            if (this.getData('entrustInfoEditFlag')=='1') {
                    this.backInfo();
            }else{

            }
            //获取字典数据
            this.getDictInfo();
            this.getIdentificationProject();
            this.getRegisterInfo();
        }
    }
</script>

<style >
    #authRequ  *{
        font-size: 13px;
    }
    #authRequ{
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow:auto;
    }
    #authRequ .el-form{
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color:white;
    }
    #authRequ .normalRow{
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow:auto;
    }
    #authRequ .el-row{
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }
    #authRequ .normalRow .normalCol{
        height: 3em;
        line-height: 3em;
    }
    #authRequ  .el-breadcrumb{
        height: 3em;
        line-height: 3em;
    }
    #authRequ .el-icon-tickets{
        color: #409EFF;
    }
    #authRequ .baseInfo{
        height: 4em;
        line-height: 4em;
        border-bottom:solid #f0f3fa;
        font-size: 16px;
        margin-bottom: 15px
    }
    #authRequ .rowInfo{
        border-bottom:solid #f0f3fa
    }
    /* #authRequ .el-input__inner{
        width:80%;
    } */

    #authRequ .footerRow{
        padding-top: 10px;
    }
    #authRequ .el-form-item__label{
        width: 250px !important;
        text-align: center;
        /* background-color:RGB(223,237,255); */
        height: 118px;
        /* line-height: 110px; */
        font-size: 15px !important;
    }
    #authRequ .el-textarea{
        width: 90%;
    }
    #authRequ .el-textarea__inner{
        width: 500px;
        height: 50px;
    }
    /* #authRequ .authdiv{
        height: 5%;
    } */
    #authRequ .el-form-item__content{
        margin-left: 280px !important;
    }
    #authRequ .el-form-item {
        margin-bottom: 1px;
    }
    #authRequ .commitback{
        margin-left: 200px !important;
    }
    #authRequ .commit{
        margin-left: 180px !important;
    }
    #authRequ .el-form-item__error{
        position: initial !important;
    }
    #authRequ .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    #authRequ .el-icon-arrow-down {
        font-size: 12px;
    }
    #authRequ .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }

    /* next move*/
  	#authRequ .nextMove{
  		display: flex;
  		display: -webkit-flex;
  		justify-content: center;
  		margin-top:20px;
  	}
</style>
