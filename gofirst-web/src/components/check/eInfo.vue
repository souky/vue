<template>
  <div>
    <el-form label-width="130px" size="small">

      <el-row class="rowInfo">
          <el-col class="baseInfo">委托单位</el-col>
          <el-col :span="8">
              <el-form-item label="名称:" prop="orgName">
                  {{orgInfo.orgName}}
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

      <el-row class="rowInfo">
          <el-col class="baseInfo">送检人信息</el-col>
          <el-col v-for="(item,index) in sendPeopleList" :key="index">
              <el-row>
                  <el-col :span="1">
                      <el-form-item :label="'送检人'+(index+1)"></el-form-item>
                  </el-col>
                  <el-col :span="4">
                      <el-form-item label="姓名:" prop="sendPeople1_name">
                          {{item.empName}}
                      </el-form-item>
                  </el-col>
                  <el-col :span="4">
                      <el-form-item label="职务:">
                          {{item.dutyStr}}
                      </el-form-item>
                  </el-col>
                  <el-col :span="4">
                      <el-form-item label="证件类型:">
                          {{item.empCrednameStr}}
                      </el-form-item>
                  </el-col>
                  <el-col :span="4">
                      <el-form-item label="证件号码:" prop="sendPeople1_credNo">
                           {{item.empCredno}}
                      </el-form-item>
                  </el-col>
                  <el-col :span="4">
                      <el-form-item label="联系电话:">
                          {{item.empTel}}
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-col>
      </el-row>

      <el-row class="rowInfo">
          <el-col class="baseInfo">案件信息</el-col>
          <el-col :span="8">
              <el-form-item label="案（事）件类型:" prop="caseType">
                  <el-col :span="20">
                      {{caseInfo.caseTypeStr}}
                  </el-col>
              </el-form-item>
          </el-col>
          <el-col :span="24">
              <el-form-item label="案（事）件类别:" prop="caseKeyType">
                  {{caseInfo.caseKeyTypeStr}}
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

    </el-form>
  </div>
</template>

<script>
export default{
  data:function(){
    return {
      sendPeopleList:[],
      caseInfo:{},
      registerInfo:{},
      orgInfo:{},
      registerId:'',
      caseInfoForm:{},
      regRow:{}
    }
  },
  activated:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    this.getParam();
    //获取送检信息
    this.getRegisterInfo();
    //获取字典数据
    this.getDictInfo();
  },
  methods:{
    getParam(){
        this.registerId = this.regRow.registerId;
    },
    getRegisterInfo(){
      var data={
          'registerId':this.registerId,
      }
      this.postHttp("registers/selectInfoById",data,res =>{
        if(res.code == '0'){
            this.registerInfo=res.data;
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
            //查询机构信息
            var orgInfo={
                'orgId':res.data.sendOrgId
            }
            this.postHttpForLogin("orgsController/selectById",orgInfo,res =>{
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
                    this.caseInfoForm.caseKeyType=res.data.caseTypeKey;
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

            this.postHttp("evidences/getEvidenceList",this.registerId,res=>{
                this.attachmentTableData = res.data;
            });
        }
      });
    },
    getDictInfo(){
      var data = {
          "parentKeyList":["CASETYPE","CASEKEYTYPE"]
      };
      this.postHttpForLogin("dict/getDictInfo",data,res =>{
        if(res.code == '0'){
                  this.caseTypeList=res.data.CASETYPE;
                  this.caseKeyTypeList=res.data.CASEKEYTYPE;
        }else{
          this.notify_warning(res.msg);
        }
      });
    },
  }
}
</script>
<style scoped>
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
