<template>
    <div id="entrustInfo" v-loading="loading">
        <el-row class="yourAddress normalRow">
            <el-col :span="24" class="normalCol" >
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
                <div class="doStep">
                    1.选择鉴定机构
                </div>
                <i class="icon">
                    <img src="@/assets/img/arrow-right.png">
                </i>
                <div class="doStep">
                   2.选择鉴定专业
                </div>
                <i class="icon">
                    <img src="@/assets/img/arrow-right.png">
                </i>
                <div class="doStep">
                   3.编辑基本信息
                </div>
                <i class="icon">
                    <img src="@/assets/img/arrow-right.png">
                </i>
                <div class="doStep">
                   4.编辑被鉴定人信息
                </div>
                <i class="icon">
                    <img src="@/assets/img/arrow-right.png">
                </i>
                <div class="doStep">
                   5.编辑检材样本信息
                </div>
                <i class="icon">
                    <img src="@/assets/img/arrow-right.png">
                </i>
                <div class="doStep">
                   6.选择鉴定要求
                </div>
                <i class="icon">
                    <img src="@/assets/img/arrow-right.png">
                </i>
                <div class="doStep doStepActive">
                   7.填写提交鉴定
                </div>
            </el-col>
            <el-col :span="2" class="normalCol">
                <!-- <el-button type="info" round size="mini">温馨提示</el-button> -->
                <el-button size="small" type="primary" round @click="wordList">查看委托书</el-button>
            </el-col>
        </el-row>
        <el-row class="normalRow" style="margin-bottom:10px;">
            <el-col :span="22" class="normalCol">
                <i class="icon">
                    <img src="@/assets/img/tip.png">
                </i>
                <span>[{{orgInfo.orgCname}}]送检登记</span>
                <i class="el-icon-minus"></i>
                <span>[{{aucOrgName}}]</span>
            </el-col>
            <!-- <el-col :span="2" class="normalCol">
                <el-button type="primary" round size="mini">&nbsp;&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-col> -->
        </el-row>
        <el-form label-width="130px" size="small">
            <el-row class="rowInfo">
                <el-col :span="4" class="baseInfoTop">基本信息</el-col>
                <el-col :span="2" :offset="18"  class="baseInfoTop" v-if="editFlag">
                    <el-button type="primary" round size="mini" @click="editBaseInfo()">&nbsp;&nbsp;&nbsp;&nbsp;编辑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                </el-col>
            </el-row>
            <el-row class="rowInfo">
                <el-col class="baseInfo">委托单位</el-col>
                <el-col :span="8">
                    <el-form-item label="名称:" prop="orgName">
                        {{orgInfo.orgCname}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="通讯地址:">
                        {{orgInfo.orgAddr}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮编:">
                        {{orgInfo.orgZip}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话:" prop="orgTel">
                        {{orgInfo.orgTel}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="传真:">
                        {{orgInfo.orgFax}}
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 委托单位 end -->

            <!-- 送检人 start -->

            <el-row class="rowInfo">
                <el-col class="baseInfo">送检人信息</el-col>
                <el-col v-for="(item,index) in sendPeopleList" :key="index">
                    <el-row>
                        <el-col :span="1">
                            <el-form-item :label="'送检人'+(index+1)"></el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="姓名:" prop="sendPeople1_name">
                                {{item.empName}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="证件类型:">
                                {{item.empCrednameStr}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="证件号码:" prop="sendPeople1_credNo">
                                 {{item.empCredno}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="联系电话:">
                                {{item.empTel}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>

                <!--送检人证件照片-->
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item label="送检人1照片:">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" height="100em" width="100em">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="送检人2照片:">
                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar" height="100em" width="100em">
                        </el-form-item>
                    </el-col>


                </el-col>
            </el-row>

            <!-- 送检人 end -->

            <!-- 案件信息 start -->

             <el-row class="rowInfo">
                <el-col class="baseInfo">案件信息</el-col>
                <!-- <el-col :span="8">
                    <el-form-item label="案（事）件编号:">
                        <el-col :span="20">
                        <el-input v-model="formData.name"></el-input>
                        </el-col>
                        <el-col :span="1" :offset="1">
                            <el-button type="primary" icon="el-icon-search" circle size="mini"></el-button>
                        </el-col>

                    </el-form-item>
                </el-col> -->
                <el-col :span="8">
                    <el-form-item label="案（事）件类型:" prop="caseType">
                        <el-col :span="20">
                            {{caseInfo.caseTypeStr}}
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="caseInfo.caseTypeKey">
                    <el-form-item label="案（事）件类别:" prop="caseTypeKey">
                        {{caseInfo.caseTypeKey}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="案（事）件名称:" prop="caseName">
                        {{caseInfo.caseName}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="现场勘验号:" prop="investigationNo">
                        {{caseInfo.investigationNo}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="警情编号:">
                        {{caseInfo.receptionNo}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="案（事）件编号:" prop="caseNo">
                       {{caseInfo.caseNo}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="案（事）件级别:">
                        {{caseInfo.caseLevelStr}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="案发地点:" prop="sceneDetail">
                       {{caseInfo.sceneDetail}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="案发时间:" prop="occurrenceDate">
                        {{caseInfo.occurrenceDateStr}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="立案调查时间:" prop="registerCaseDate">
                        {{caseInfo.registerCaseDateStr}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="案发地详址:" prop="investigationPlace">
                        {{caseInfo.investigationPlace}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="简要案情:" prop="caseBrief">
                        {{caseInfo.caseBrief}}
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 案件信息 end -->
        </el-form>
        <el-form ref="oldAppraisalForm" label-width="150px" size="small">
            <!--原鉴定情况 start-->
            <el-row class="rowInfo">
                <el-col class="baseInfo">
                    原鉴定情况 {{oldAppraisalStr}}
                </el-col>
                <div v-if=" registerInfo.oldAppraisal == '1'">
                    <el-col :span="8">
                        <el-form-item label="原鉴定机构:" prop="oldAppraisalOrg">
                            {{registerInfo.oldAppraisalOrg}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="原鉴定时间:" prop="oldAppraisalDate">
                            {{registerInfo.oldAppraisalDateStr}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="原鉴定结论:" prop="oldAppraisalCon">
                            {{registerInfo.oldAppraisalCon}}
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label="案件种类:">
                            {{registerInfo.oldAppraisalCaseTypeStr}}
                        </el-form-item>
                    </el-col> -->
                </div>
            </el-row>
            <!--原鉴定情况 end-->

            <!--被鉴定人 start-->
            <el-row class="rowInfo">
                <el-row class="rowInfo">
                    <el-col :span="4" class="baseInfoTop">被鉴定人信息</el-col>
                    <el-col :span="2" :offset="18" class="baseInfoTop" v-if="editFlag">
                        <el-button type="primary" round size="mini" @click="editObjects()">&nbsp;&nbsp;&nbsp;&nbsp;编辑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <DynamicTable :tableData="dynamicDataObjects"></DynamicTable>
                </el-row>
            </el-row>

            <!--被鉴定人 end-->

            <!--送检的检材与样本情况 start-->
            <el-row class="rowInfo">
                <el-row class="rowInfo">
                    <el-col :span="4" class="baseInfoTop">送检的检材与样本情况</el-col>
                    <el-col :span="2" :offset="16" class="baseInfoTop">
                        <el-button type="primary" round size="mini" @click="showImg()">查看附件</el-button>
                    </el-col>
                    <el-col :span="2" class="baseInfoTop" v-if="editFlag">
                        <el-button type="primary" round size="mini" @click="editInspection()">&nbsp;&nbsp;&nbsp;&nbsp;编辑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <DynamicTable :tableData="dynamicData"></DynamicTable>
                </el-row>
            </el-row>
            <!--送检的检材与样本情况 end-->

            <!--鉴定要求 start-->
            <el-row class="rowInfo">
                <el-row class="rowInfo">
                    <el-col :span="4" class="baseInfoTop">鉴定要求</el-col>
                    <el-col :span="2" :offset="18" class="baseInfoTop" v-if="editFlag">
                        <el-button type="primary" round size="mini" @click="editRequire()">&nbsp;&nbsp;&nbsp;&nbsp;编辑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    </el-col>
                </el-row>
                <div>
                    <el-col :span="8">
                        <el-form-item label="鉴定项目:" prop="oldAppraisalOrg">
                            {{registerInfo.entrustProg}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="鉴定要求:" prop="oldAppraisalDate">
                            {{registerInfo.entrustRequire}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="鉴定方法约定:" prop="oldAppraisalCon">
                            {{registerInfo.entrustMeth}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="文书送达方式约定:">
                            {{registerInfo.sendType}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="对检材使用处理约定:">
                            {{registerInfo.handlingOpinions != null? registerInfo.handlingOpinions:registerInfo.handlingOpinionsOther}}
                        </el-form-item>
                    </el-col>
                </div>
            </el-row>
            <!--鉴定要求 end-->
            <div class="btns el-row">
              <el-button type="primary" @click="createWord()">生成委托书</el-button>
              <el-button type="primary" @click="submitAuc()" v-if="editFlag">提交鉴定</el-button>
            </div>
        </el-form>

        <el-dialog title="附件" :visible.sync="dialogVisibleImg" width="30%">
            <el-table :data="tableDataImg" style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="c002" label="检材名称" width="180"></el-table-column>
                <el-table-column label="图片" prop="list">
                    <template slot-scope="scope">
                        <div v-for="img in scope.row.list" style="display:inline;">
                            <img :src="img.address" style="width:50px;height:50px">
                        </div>
                    </template>
                </el-table-column>
            </el-table>




            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleImg = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleImg = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {formatDate} from '@/js/common/date.js'
export default {
    data() {
        return {
            caseInfoForm:{
                limCaseId:'',
                caseType:'',
                caseTypeKey:'',
                caseName:'',
                caseNo:'',
                investigationNo:'',
                registerId:'',
            },
            activeName:'entrustInfoTab',
            sendPeopleList:[],
            caseInfo:{},
            registerInfo:{},
            orgInfo:{},
            registerId:'',
            tableData:[],
            traceList: [],
            dialogVisible:false,
            caseTypeList:[],
            caseTypeKeyList:[],
            aucOrgName:'',
            inspectionTableData:[],
            attachmentTableData:[],
            attachmentDialogVisible:false,
            fileList:[],
            action:'',
            limEvidenceId:'',
            attachmentFileListDialogVisible:false,
            attachmentFileListTableData:[],
            sels:[],
            attachmentText:'',
            loading:true,
            oldAppraisalStr:'',
            imageUrl :'',
            imageUrl2 :'',
            dialogVisibleImg : false,
            tableDataImg :[],
            editFlag: true,
            dynamicData:{
                data:[],
                hasCheck:'0',
                hasIndex:'1',
			    align:'center',
			    hasEdit:'0',
                hasUploadButton:'1',
                hasEditButton:'1',
                hasDeleteButton:'1',
                headers:[],
                form:{
                    style:"width:90%;margin:auto",
                    ref:'addform',
                    labelWidth:"80px",
                    model:{},
                    rules:{}
                }
            },
            dynamicDataObjects:{
                data:[],
                hasCheck:'0',
                hasIndex:'1',
			    align:'center',
			    hasEdit:'0',
                hasUploadButton:'1',
                hasEditButton:'1',
                hasDeleteButton:'1',
                headers:[],
                form:{
                    style:"width:90%;margin:auto",
                    ref:'addform',
                    labelWidth:"80px",
                    model:{},
                    rules:{}
                }
			},



        }
    },
    methods: {
        showImg(){
            this.dialogVisibleImg = true;
            var object={
                'registerId':this.getData("registerId"),
                'type':'2'
            }
            this.postHttp("evidengesExtd/selectEvidenceAndImg",object,res =>{
                    console.log(res);
                    if(res.code == '0'){
                        this.tableDataImg=res.data;
                    }else{
                        this.notify_warning(res.msg);
                    }
            });

        },
        handleClick(tab, event) {

            if(tab.name== 'traceTab'){
                //获取轨迹
                var traceObj={
                    'registerId':this.registerId
                }

                this.postHttp("trace/selectListByRegisterId",traceObj,res =>{
                    if(res.code == '0'){
                        //orgName orgAddr orgZip orgTel orgFax
                        this.traceList=res.data;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
            }else if(tab.name == 'attachmentTab'){
                //获取附件
                this.postHttp("evidences/getEvidenceList",this.registerId,res =>{
                    if(res.code == '0'){
                        //orgName orgAddr orgZip orgTel orgFax
                        //this.traceList=res.data;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });

            }
            //alert(tab.name);
        },
        formatAddType(){
            return '人工添加';
        },
        formatEvidenceType(row){
            var type = row.materialType;
            if(type == '1'){
                return "检材";
            }else{
                return "样本";
            }
        },
        formatType(row) {
            var type = row.sex;
            if (type == '0') {
            return "男";
            } else if (type == '1') {
            return "女";
            } else {
            return "未知";
            }
      },
      getParam(){
          this.registerId=this.getData("registerId");
      },
      getRegisterInfo(){
        var data={
            'registerId':this.registerId,
        }
        this.postHttp("registers/selectInfoById",data,res =>{
			if(res.code == '0'){
                this.registerInfo=res.data;
                this.oldAppraisalStr=res.data.oldAppraisal =='0'?' :无':'';
                //查询送检人
                var empsInfo={
                    'empsArr':res.data.sendPeople1+","+res.data.sendPeople2
                }
                this.postHttpForLogin("empsController/getSendPeople",empsInfo,res =>{
                    if(res.code == '0'){
                        this.sendPeopleList=res.data;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
                //查询送检人1证件照片
                this.postHttp("evidencesImg/selectByObject",{'registerId':this.registerId},res =>{
                    if(res.code == '0'){
                        //orgName orgAddr orgZip orgTel orgFax
                        res.data.forEach(item =>{
                            if(item.type == '3'){
                                this.imageUrl=item.address;
                            }

                            if(item.type == '4'){
                                this.imageUrl2=item.address;
                            }
                        })
                    }else{
                        this.notify_warning(res.msg);
                    }
                });


                //查询机构信息
                var orgInfo={
                    'orgId':res.data.sendOrgId
                }
                console.log(orgInfo);
                this.postHttpForLogin("orgsController/selectById",orgInfo,res =>{
                    console.log("aaa");
                    console.log(res);
                    if(res.code == '0'){
                        //orgName orgAddr orgZip orgTel orgFax
                        this.orgInfo=res.data;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
                //查询案件信息
                var caseInfo={
                    'limCaseId':res.data.limCaseId
                }

                this.postHttp("cases/selectByCaseIdWithDict",caseInfo,res =>{
                    if(res.code == '0'){
                        //orgName orgAddr orgZip orgTel orgFax
                        this.caseInfo=res.data;
                        this.caseInfoForm.limCaseId=res.data.limCaseId;
                        this.caseInfoForm.caseType=res.data.caseType;
                        this.caseInfoForm.caseTypeKey=res.data.caseTypeKey;
                        this.caseInfoForm.caseName=res.data.caseName;
                        this.caseInfoForm.caseNo=res.data.caseNo;
                        this.caseInfoForm.investigationNo=res.data.investigationNo;
                        this.caseInfoForm.registerId=this.registerId;

                    }else{
                        this.notify_warning(res.msg);
                    }
                });


                //获取被鉴定人信息
                var objects={
                    'registerId':this.registerId
                }
                this.postHttp("objects/selectListByRegisterId",objects,res =>{
                    if(res.code == '0'){
                        //orgName orgAddr orgZip orgTel orgFax
                        this.tableData=res.data;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });

                //获取鉴定单位
                var aucOrg={
                    'aucOrgId':res.data.aucOrgId
                }

                this.postHttp("aucOrg/selectByPrimaryKey",aucOrg,res =>{
                    if(res.code == '0'){
                        //orgName orgAddr orgZip orgTel orgFax
                        this.aucOrgName=res.data.aucOrgName;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });

                //获取轨迹
                var traceObj={
                    'registerId':this.registerId
                }

                this.postHttp("trace/selectListByRegisterId",traceObj,res =>{
                    if(res.code == '0'){
                        //orgName orgAddr orgZip orgTel orgFax
                        this.traceList=res.data;
                    }else{
                        this.notify_warning(res.msg);
                    }
                });

                this.postHttp("evidences/getEvidenceList",this.registerId,res=>{
                    this.attachmentTableData = res.data;
                });
                //送检检材与样本
                let dataEv = {aucOrgId:res.data.aucOrgId,type:'2'}
                this.postHttp("evidenceColumn/selectListByAucOrgId",dataEv,res=>{
                    this.dynamicData.headers = res.data;
                    this.loadData();
                });

                let dataObjects = {aucOrgId:res.data.aucOrgId,type:'1'}
                this.postHttp("evidenceColumn/selectListByAucOrgId",dataObjects,res=>{
                    this.dynamicDataObjects.headers = res.data;
                    this.loadDataObjects();
                });





			}else{
				this.notify_warning(res.msg);
            }

            this.loading=false;
        });
      },
      loadData(){
          let data = {registerId:this.registerId,type:'2'}
            this.postHttp("evidengesExtd/getEvidengesExtdList",data,res=>{
                this.dynamicData.data = res.data;
                this.loading = false;
            });
      },
      loadDataObjects(){
          let data = {registerId:this.registerId,type:'1'}
            this.postHttp("evidengesExtd/getEvidengesExtdList",data,res=>{
                this.dynamicDataObjects.data = res.data;
                this.loading = false;
            });
      },
      editBaseInfo(){
          //前往基本信息页面
          this.setData("registerId",this.registerInfo.registerId);
          this.setData("orgId",this.registerInfo.orgId);
          this.setData("aucOrgId",this.registerInfo.aucOrgId);
          this.setData("empsArr",this.registerInfo.sendPeople1+','+this.registerInfo.sendPeople2);
          this.setData("limCaseId",this.registerInfo.limCaseId);
          this.setData("sendOrgId",this.registerInfo.sendOrgId);
          this.setData("entrustInfoEditFlag","1");//0 新增  1编辑
          this.setData("aucOrgCname",this.aucOrgName);
          this.$router.push("/entrustBaseInfo");
      },
      editObjects(){
          //前往被鉴定人页面
          this.setData("registerId",this.registerInfo.registerId);
           this.setData("aucOrgId",this.registerInfo.aucOrgId);
          this.setData("entrustInfoEditFlag","1");//0 新增  1编辑
          this.setData("aucOrgCname",this.aucOrgName);
          this.setData("orgName",this.orgInfo.orgCname);
          this.$router.push("/authenticator");
      },
      editInspection(){
          this.setData("registerId",this.registerInfo.registerId);
          this.setData("entrustInfoEditFlag","1");//0 新增  1编辑
          this.setData("aucOrgId",this.registerInfo.aucOrgId);
          this.setData("aucOrgCname",this.aucOrgName);
          this.setData("orgName",this.orgInfo.orgCname);
          this.$router.push("/entrustInspection");
      },
      editRequire(){
          //前往鉴定要求页面
          this.setData("registerId",this.registerInfo.registerId);
          this.setData("entrustInfoEditFlag","1");//0 新增  1编辑
          this.setData("aucOrgCname",this.aucOrgName);
          this.setData("orgName",this.orgInfo.orgCname);
          this.$router.push("/authRequ");
      },
      getDictInfo(){
        /**
         * DUTYTYPE 职务
         * CARDTYPE 证件类型
         * CASETYPE 案（事）件类型
         * CASETYPEKEY  案（事）件类别
         * CASELEVEL 案（事）件级别
         * OLDAPPRAISALCASETYPE 原鉴定情况案件种类
         */
        var data = {
            "parentKeyList":["CASETYPE","CASETYPEKEY"]
        };
		this.postHttpForLogin("dict/getDictInfo",data,res =>{
			if(res.code == '0'){
                this.caseTypeList=res.data.CASETYPE;
                this.caseTypeList=res.data.CASETYPEKEY;
			}else{
				this.notify_warning(res.msg);
			}
		});
      },
      openAttachmentDialog(limEvidenceId){
        this.attachmentDialogVisible = true;
        this.limEvidenceId=limEvidenceId;

      },
      /**
       * 生成Word
       */
      createWord(){
        let param = {};
        this.loading = true;
        param['registerId']=this.registerId;
        this.getHttp("registers/getWorkFlowIdForRegId",param,res =>{
              if(res.code == '0'){
                param = res.data;
                param['aucOrgId']=param.AUCORGID;
                param['checkDocType']='';
                param['id']='';
                param['name']='';
                param['registerId']=this.registerId;
                param['serialNo']='1';
                param['workflowId']=param.WORKFLOWID;
                this.postHttp("wordUpload/uploadEntrustBook",param,res =>{
                    this.loading = false;
                    this.notify_success('委托书生成成功');
                });
              }else{
                this.notify_error("委托书生成失败!!!");
              }
          });
      },
         /**
       * 提交鉴定
       */
      submitAuc(){
        let param = {};
        param['registerId']=this.registerId;
        param['entrustState']='1';
        this.postHttp("registers/updateRegisterByIdForAll",param,res =>{
              if(res.code == '0'){
                    this.notify_success('提交成功');
              }else{
                this.notify_error("提交失败!!!");
              }
          });
      },
        /**
         * word编辑
         */
        wordList(){
        this.pageOffice('word/registerWordList.html',{registerId:this.registerId});
        }
    },
    mounted:function(){
        this.imageUrl = '';
        this.imageUrl2 = '';
    },
    activated:function(){
        this.imageUrl = '';
        this.imageUrl2 = '';
        if(this.getData("edit") == '1'){
            this.editFlag =false;
        }else {
          this.editFlag =true;
        }
        //获取鉴定专业
        //this.aucOrgName=this.getData("aucOrgName");
        //获取地址传递的参数
        this.getParam();
        //获取送检信息
        this.getRegisterInfo();
        //获取字典数据
        this.getDictInfo();
        this.setData('backURL','/entrustInfo');
    },
    filters:{
        formatDate(time){
            let date=new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm');
        }
    }
  }
</script>

<style scoped>
    *{
        font-size: 13px;
    }
    #entrustInfo{
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow:auto;
    }
    #entrustInfo .btns{
        display: flex;
        justify-content: center;
        padding-top:10px;
    }
    .normalRow{
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow:auto;
    }
    .el-row{
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }
    .normalRow .normalCol{
        height: 3em;
        line-height: 3em;
        overflow: hidden;
    }
    .el-breadcrumb{
        height: 3em;
        line-height: 3em;
    }
    .step div{
        display: inline;
    }
    .doStep{
        color: #409EFF;
        padding-bottom:10px;
    }
    .doStepActive{
        border-bottom:solid #409EFF;
    }
    .el-icon-tickets{
        color: #409EFF;
    }
    .baseInfo{
        height: 4em;
        line-height: 4em;
        border-bottom:solid #f0f3fa;
        font-size: 16px;
        margin-bottom: 15px
    }
    .baseInfoTop{
        height: 3em;
        line-height: 3em;
        font-size: 20px;
        font-weight:bold;
    }
    .rowInfo{
        border-bottom:solid #f0f3fa
    }
    .el-input__inner{
        width:80%;
    }

    .footerRow{
        padding-top: 10px;
    }

    .tabClass{
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        min-height: 100%;
    }

</style>
