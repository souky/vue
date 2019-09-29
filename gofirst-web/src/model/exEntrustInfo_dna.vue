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
                <span>[{{consignment.consignOrgName}}]送检登记</span>
                <i class="el-icon-minus"></i>
                <span>[{{aucOrgName}}]</span>
            </el-col>
            <!-- <el-col :span="2" class="normalCol">
                <el-button type="primary" round size="mini">&nbsp;&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-col> -->
        </el-row>
        <el-form label-width="100px" size="small">
            <el-row class="rowInfo">
                <el-col :span="4" class="baseInfoTop">基本信息</el-col>
                <el-col :span="2" :offset="18"  class="baseInfoTop" v-if="editFlag">
                    <el-button type="primary" round size="mini" @click="editBaseInfo()">&nbsp;&nbsp;&nbsp;&nbsp;编辑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                </el-col>
            </el-row>
            <el-row class="rowInfo">
                <el-col class="baseInfo">委托单位</el-col>
                <el-col :span="8">
                    <el-form-item label="名称:" prop="orgconsignOrgNameName">
                        {{consignment.consignOrgName}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="通讯地址:">
                        {{consignment.consignOrgAddress}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮编:">
                        {{consignment.consignOrgZipCode}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话:" prop="consignOrgPhone">
                        {{consignment.consignOrgPhone}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="传真:">
                        {{consignment.consignOrgFaxNo}}
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 委托单位 end -->

            <!-- 送检人 start -->

            <el-row class="rowInfo">
                <el-col class="baseInfo">送检人信息</el-col>
                <el-col>
                    <el-row>
                        <el-col :span="1">
                            <el-form-item :label="'送检人1'"></el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="姓名:" prop="consignerName">
                                {{consignment.consignerName}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="职务:">
                                {{consignment.consignerDutyStr}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="证件类型:">
                                {{consignment.consignerCertificateTypeStr}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="1">
                            <el-form-item label="证件号码:" prop="consignerCertificateNo">
                                 {{consignment.consignerCertificateNo}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系电话:">
                                {{consignment.consignerPhone}}
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="1">
                            <el-form-item :label="'送检人2'"></el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="姓名:" prop="consignerName2">
                                {{consignment.consignerName2}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="职务:">
                                {{consignment.consignerDutyStr2}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="证件类型:">
                                {{consignment.consignerCertificateTypeStr2}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="1">
                            <el-form-item label="证件号码:" prop="consignerCertificateNo2">
                                 {{consignment.consignerCertificateNo2}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系电话:">
                                {{consignment.consignerPhone2}}
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
        <el-col :span="8">
          <el-form-item label="案件名称:" prop="caseName">
            <el-col :span="20">
                {{caseInfo.caseName}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案发时间:" prop="occurrenceDatetime">
            <el-col :span="20">
                {{caseInfo.occurrenceDatetimeStr}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案件类型:" prop="caseType">
            <el-col :span="20">
                {{caseInfo.caseTypeStr}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案件性质:" prop="caseProperty">
            <el-col :span="20">
                {{caseInfo.casePropertyStr}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案发地点:" prop="sceneRegionalism">
            <el-col :span="20">
                {{caseInfo.sceneRegionalismStr}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案发地点补充:" prop="scenePlace">
            <el-col :span="20">
                {{caseInfo.scenePlace}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="接警编号:" prop="caseacceptcode">
            <el-col :span="20">
                {{caseInfo.caseacceptcode}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="勘验编号:">
            <el-col :span="20">
                {{caseInfo.scenecode}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案件编号:">
            <el-col :span="20">
                {{caseInfo.caseNo}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否加急:">
            <el-col :span="20">
                {{caseInfo.isUrgentStr}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="加急原因:">
            <el-col :span="20">
                {{caseInfo.urgentReason}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="简要案情:" prop="caseBrief">
            <el-col :span="20">
                {{caseInfo.caseBrief}}
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
    <!-- 案件信息 end -->

     <el-row class="rowInfo">
        <el-col class="baseInfo">原鉴定信息</el-col>
        <el-col :span="24">
          <el-form-item label="原鉴定情况::" prop="originalIdentyInfo">
            <el-col :span="20">
                {{consignment.originalIdentyInfo}}
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="重新鉴定理由:" prop="reIdentyReason">
            <el-col :span="20">
                {{consignment.reIdentyReason}}
            </el-col>
          </el-form-item>
        </el-col>
     </el-row>
        </el-form>
        <el-form ref="oldAppraisalForm" label-width="150px" size="small">
            <!--送检的检材与样本情况 start-->
            <el-row class="rowInfo">
                <el-row class="rowInfo">
                    <el-col :span="4" class="baseInfoTop">送检的检材与样本情况</el-col>
                    <el-col :span="2" class="baseInfoTop" v-if="editFlag">
                        <el-button type="primary" round size="mini" @click="editInspection()">&nbsp;&nbsp;&nbsp;&nbsp;编辑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    </el-col>
                </el-row>
                <el-row>
                        <el-tabs type="border-card" class="mainItem" @tab-click="handleClick" value="1">
                            <el-tab-pane label="物证列表" name="1">
                                <div id="tabb">
                                <el-table class="tabb"
                                            :data="physicalData"
                                            style="width: 100%; margin-top: 20px">

                                    <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-table :data="props.row.sampleInfoVO" class="orgin">
                                        <el-table-column align="center"
                                                        prop="DnaCode"
                                                        label="DNA编号">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="样本名称">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="与对象关系">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="同步国家库lims">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="上报Mis">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="入库时间">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="常+Y数量">
                                        </el-table-column>
                                        </el-table>
                                    </template>
                                    </el-table-column>

                                    <el-table-column
                                    prop="physicalEvidenceName"
                                    label="物证名称">
                                    </el-table-column>
                                    <el-table-column
                                    show-overflow-tooltip
                                    prop="physicalEvidenceNo"
                                    label="现勘物证号">
                                    </el-table-column>
                                    <el-table-column
                                    prop="physicalEvidenceType"
                                    label="物证类型">
                                    </el-table-column>
                                </el-table>
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="人员列表" name="2">
                                <div id="table1">
                                <el-table class="tabb"
                                            :data="personData"
                                            style="width: 100%; margin-top: 20px">

                                    <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-table :data="props.row.sampleInfoVO" class="orgin">
                                        <el-table-column align="center"
                                                        prop="DnaCode"
                                                        label="DNA编号">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="样本名称">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="与对象关系">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="同步国家库lims">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="上报Mis">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="入库时间">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="常+Y数量">
                                        </el-table-column>
                                        </el-table>
                                    </template>
                                    </el-table-column>

                                    <el-table-column
                                    prop="personName"
                                    label="人员名称">
                                    </el-table-column>
                                    <el-table-column
                                    show-overflow-tooltip
                                    prop="gender"
                                    :formatter="formatterArray"
                                    label="性别">
                                    </el-table-column>
                                    <el-table-column
                                    show-overflow-tooltip
                                    prop="idCardNo"
                                    label="身份证号">
                                    </el-table-column>
                                    <el-table-column
                                    prop="inputCategory"
                                    :formatter="formattertype"
                                    label="人员类型">
                                    </el-table-column>
                                </el-table>
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="身份不明个体列表" name="3">
                                <div id="table2">
                                <el-table class="tabb"
                                            :data="Individual"
                                            style="width: 100%; margin-top: 20px">

                                    <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-table :data="props.row.sampleInfoVO" class="orgin">
                                        <el-table-column align="center"
                                                        prop="DnaCode"
                                                        label="DNA编号">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="样本名称">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="与对象关系">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="同步国家库lims">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="上报Mis">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="入库时间">
                                        </el-table-column>
                                        <el-table-column align="center"
                                                        prop="sampleName"
                                                        label="常+Y数量">
                                        </el-table-column>
                                        </el-table>
                                    </template>
                                    </el-table-column>

                                    <el-table-column
                                    prop="personName"
                                    label="人员名称">
                                    </el-table-column>
                                    <el-table-column
                                    show-overflow-tooltip
                                    prop="gender"
                                    :formatter="formatterArray"
                                    label="性别">
                                    </el-table-column>
                                    <el-table-column
                                    show-overflow-tooltip
                                    prop="idCardNo"
                                    label="身份证号">
                                    </el-table-column>
                                    <el-table-column
                                    prop="inputCategory"
                                    :formatter="formattertype"
                                    label="人员类型">
                                    </el-table-column>
                                </el-table>
                                </div>
                            </el-tab-pane>
                            </el-tabs>




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
                        <el-form-item label="鉴定项目:">
                            {{consignment.entrustProg}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="鉴定要求:" prop="oldAppraisalDate">
                            {{consignment.identifyRequestStr}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="鉴定方法约定:" prop="oldAppraisalCon">
                            {{consignment.entrustMethStr}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="文书送达方式约定:">
                            {{consignment.sendTypeStr}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="对检材使用处理约定:">
                            {{consignment.handlingOpinionsStr}}
                        </el-form-item>
                    </el-col>
                </div>
            </el-row>
            <!--鉴定要求 end-->
            <!-- <div class="btns el-row">
              <el-button type="primary" @click="createWord()">生成委托书</el-button>
              <el-button type="primary" @click="submitAuc()" v-if="editFlag">提交鉴定</el-button>
            </div> -->
        </el-form>

    </div>
</template>
<script>
import {formatDate} from '@/js/common/date.js'
export default {
    data() {
        return {
            loading: true,
            consignment: {},
            aucOrgName: 'DNA',
            editFlag: false,
            imageUrl:'',
            imageUrl2: '',
            caseInfo: {
                
            },
            oldAppraisalStr: '111',



            physicalData: [],
            personData: [],
            Individual: [],
            page: {
                pageNum: 1,
                pageSize: 10,
            },
            queryScene: {
            sceneCode: '',
            caseacceptcode: ''
            },
            reserve4: true,




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
        this.postHttp("consignment/selectInfoByIdWhtiExt",this.registerId,res =>{
			if(res.code == '0'){
                console.log('res.data');
                console.log(res.data);
                this.consignment=res.data;
                //this.oldAppraisalStr=res.data.oldAppraisal =='0'?' :无':'';

                //查询送检人1证件照片
                this.postHttp("evidencesImg/selectByObject",{'registerId':res.data.id},res =>{
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

                //查询案件信息
                this.postHttp("caseDna/selectByPrimaryKeyWithDict",res.data.eventId,res =>{
                    if(res.code == '0'){
                        //
                        console.log("case");
                        console.log(res.data);
                        this.caseInfo=res.data;
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
                        console.log('aucOrg data');
                        console.log(res.data);
                        //orgName orgAddr orgZip orgTel orgFax
                        this.aucOrgName="DNA";
                    }else{
                        this.notify_warning(res.msg);
                    }
                });

			}else{
				this.notify_warning(res.msg);
            }

            this.loading=false;
        });
      },
      editBaseInfo(){
          //前往基本信息页面
          this.setData("consignmentId",this.consignment.id);
          this.setData("orgId",this.consignment.orgId);
          this.setData("aucOrgId",this.consignment.aucOrgId);
          //this.setData("empsArr",this.registerInfo.sendPeople1+','+this.registerInfo.sendPeople2);
          this.setData("limCaseId",this.consignment.limCaseId);
          this.setData("sendOrgId",this.consignment.sendOrgId);
          this.setData("entrustInfoEditFlag","1");//0 新增  1编辑
          this.setData("aucOrgCname",this.aucOrgName);
          this.$router.push("/entrustBaseInfo_dna");
      },
      editObjects(){
          //前往被鉴定人页面
        //   this.setData("registerId",this.registerInfo.registerId);
        //    this.setData("aucOrgId",this.registerInfo.aucOrgId);
        //   this.setData("entrustInfoEditFlag","1");//0 新增  1编辑
        //   this.setData("aucOrgCname",this.aucOrgName);
        //   this.setData("orgName",this.orgInfo.orgCname);
        //   this.$router.push("/authenticator");
      },
      editInspection(){
        //   this.setData("registerId",this.registerInfo.registerId);
        //   this.setData("entrustInfoEditFlag","1");//0 新增  1编辑
        //   this.setData("aucOrgId",this.registerInfo.aucOrgId);
        //   this.setData("aucOrgCname",this.aucOrgName);
        //   this.setData("orgName",this.orgInfo.orgCname);
        //   this.$router.push("/entrustInspection");
      },
      editRequire(){
          //前往鉴定要求页面
          this.setData("consignmentId",this.consignment.id);
          this.setData("entrustInfoEditFlag","1");//0 新增  1编辑
          this.setData("aucOrgCname","DNA");
          this.setData("orgName",this.consignment.consignOrgName);
          this.$router.push("/authRequ_dna");
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
        param['registerId']=this.getData("registerId");
        this.getHttp("consignment/getWorkFlowIdForRegId",param,res =>{
              if(res.code == '0'){
                param = res.data;
                param['aucOrgId']=param.AUCORGID;
                param['checkDocType']='';
                param['id']='';
                param['name']='';
                param['registerId']=this.getData("registerId");
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
        param['registerId']=this.getData("registerId");
        param['entrustState']='1';
        this.postHttp("consignment/updateRegisterByIdForAll",param,res =>{
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
        },






        //控制添加图标隐藏/显示
      handleClick(tab, event) {
        if (tab.name == '3') {
          this.reserve4 = false;
        } else {
          this.reserve4 = true;
        }
      },
      formatterArray(row, column, cellValue, index) {
        let reStr = '';
        switch (cellValue) {
          case '0':
            reStr = '未知';
            break;
          case '1':
            reStr = '男';
            break;
          case '2':
            reStr = '女';
            break;
          case '9':
            reStr = '未知';
            break;
        }
        return reStr;
      },

            formattertype(row, column, cellValue, index) {
        let reStr = '';
        switch (cellValue) {
          case '020201':
            reStr = '受害人';
            break;
          case '020202':
            reStr = '失踪受害人';
            break;
          case '020203':
            reStr = '嫌疑人';
            break;
          case '020204':
            reStr = '失踪嫌疑人';
            break;
          case '020205':
            reStr = '案件其他人员';
            break;
        }
        return reStr;
      },
            //查询提取之后的物证
      loadData() {
        var data = this.queryScene;
        data['pageNum'] = 1;
        data['pageSize'] = 10;
        this.postHttp("physical/queryPhysical", data, res => {
          this.clospan = 0;
          this.physicalData = res.data.physicalList;
          this.personData = res.data.personInfos;
          this.Individual = res.data.individuals;
          this.loading = false;
        });
      },

    },
    mounted:function(){
        this.imageUrl = '';
        this.imageUrl2 = '';
        this.imageUrl = '';
        this.imageUrl2 = '';
        console.log("edit:"+this.getData("edit"));
        //获取地址传递的参数
        this.getParam();
        //获取送检信息
        this.getRegisterInfo();
        //获取字典数据
        this.getDictInfo();
        this.setData('backURL','/entrustInfo');

        this.loadData();
    },
    activated:function(){
        this.imageUrl = '';
        this.imageUrl2 = '';
        console.log("edit:"+this.getData("edit"));
        //获取地址传递的参数
        this.getParam();
        //获取送检信息
        this.getRegisterInfo();
        //获取字典数据
        this.getDictInfo();
        this.setData('backURL','/entrustInfo');

        this.loadData();
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
