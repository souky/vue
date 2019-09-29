<template>
  <div class="proAccred">
      <!-- 受理确认 -->
      <!-- <el-tab-pane label="受理确认"> -->
      <el-divider content-position="left"><div class="title-level one"><i class="el-icon-tickets"></i>受理确认</div></el-divider>
        <el-form :model="acceptForm" :rules="rules" ref="ruleForm" label-width="180px"
                 class="dynamicForm demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="鉴定方法评审" prop="checkMethod">
                <el-select v-model="acceptForm.checkMethod" clearable placeholder="鉴定方法评审" :disabled="isdisabledFn">
                  <el-option
                    v-for="item in temp.checkMethodList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检验鉴定周期约定" prop="checkDay">
                <el-select v-model="acceptForm.checkDay" clearable placeholder="检验鉴定周期约定" :disabled="isdisabledFn">
                  <el-option
                    v-for="item in temp.checkDayList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文书发放要求" prop="docSendType">
                <el-select v-model="acceptForm.docSendType" clearable placeholder="文书发放要求" :disabled="isdisabledFn">
                  <el-option
                    v-for="item in temp.docSendTypeList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检材/样本处理要求" prop="materialDeal">
                <el-select v-model="acceptForm.materialDeal" clearable placeholder="检材/样本处理要求" :disabled="isdisabledFn">
                  <el-option
                    v-for="item in temp.materialDealList"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-divider content-position="left">检材处置</el-divider> -->

          <el-tabs type="border-card" class="" @tab-click="handleClick" value="1">
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
        </el-form>

        <el-form :inline="true" :model="evidDeal" class="demo-form-inline" label-width="100px;" style="text-align:right;margin-top:10px">
              <el-form-item label="交接日期">
                <el-date-picker :disabled='isFlowShow' v-model="evidDeal.acceptDatetime" type="datetime" placeholder="交接日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="接收人">
                <el-select :disabled='isFlowShow' v-model="evidDeal.empId" clearable  placeholder="接收人">
                    <el-option
                      v-for="item in this.empList"
                      :key="item.empNo"
                      :label="item.empName"
                      :value="item.empNo">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="放置位置">
                <el-select :disabled='isFlowShow' v-model="evidDeal.storage" clearable  placeholder="放置位置">
                  <el-option
                      v-for="item in this.storage"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="保存条件">
                <el-select :disabled='isFlowShow' v-model="evidDeal.condition" clearable  placeholder="保存条件">
                    <el-option
                      v-for="item in this.condition"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="保存期限(天)">
                <el-select :disabled='isFlowShow' v-model="evidDeal.saveTime" clearable  placeholder="保存期限（天）">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="5" value="5"></el-option>
                  <el-option label="7" value="7"></el-option>
                </el-select>
              </el-form-item>
          </el-form>

        <div class="btns" >
          <el-button v-if="!isFlowShow" type="primary" style="" @click="acceptUpdate">修改</el-button>
          <el-button v-if="!isFlowShow" type="primary" style="" @click="accept" :disabled="isdisabledFn">确认受理</el-button>
          <el-button size="small" type="primary" plain @click="wordList">查看回执单</el-button>
        </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        evidDeal: {
        },
        storage:'',
        condition:'',
        //
        isdisabledFn: true,
        workFlowId: '',
        //
        regRow: {},
        //受理信息
        acceptForm: {
          checkMethod: '1',
          checkDay: '2',
          docSendType: '1',
          materialDeal: '1'
        },
        //
        sbumitFlag: false,
        //受理信息补充
        acceptInfo: {},
        //检材样本列表信息
        checkData: [],
        checkDataSelect: [],
        //受理分配
        allotCheck: {},
        //受理书编号
        acceptBookNo: '',
        aucEvid: {},
        aucEvidList: [],
        //
        aeAucEvid: '',
        wordTypeTemp: [],
        temp: {
          checkMethodList: [],
          checkDayList: [],
          docSendTypeList: [],
          materialDealList: [],
          aucData: [],
          docData: [],
        },
        //人员信息
        empList: [],
        //系统弹窗框标识
        dialog4AucEvid: false,
        //
        acceptFlag: false,

        //文档处理
        wordForm: {},
        rules: {
          name: [{required: true, message: '请输入联系人名称', trigger: 'blur'}],
          tel: [{required: true, message: '请输入电话', trigger: 'change'}],
          phone: [{required: true, message: '请输入手机', trigger: 'change'}],
          checkMethod: [{checkMethod: 'array', required: true, message: '请至少选择一个鉴定方法评审', trigger: 'change'}],
          checkDay: [{checkDay: 'array', required: true, message: '请至少选择一个约定周期', trigger: 'change'}],
          docSendType: [{docSendType: 'array', required: true, message: '请至少选择一个文书发放要求', trigger: 'change'}],
          materialDeal: [{materialDeal: 'array', required: true, message: '请至少选择一个检材/样本处理要求', trigger: 'change'}]
        },
        rulesDoc: {
          wordType: [{ required: true, message: '请至少选择一个文书类型', trigger: 'change'}],
          materialDeal: [{ required: true, message: '请至少选择一个文书对应模板', trigger: 'change'}]
        },

				action:'',
				dialogUpload:false,
				imgList:[],
				livEvi:{},
				flag:'',
        isFlowShow:false,
        dialogImageUrl: '',
        dialogVisible:false,


        physicalData: [],
        personData: [],
        tableData: [],
        Individual: [],
        reserve4:'',

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
       * CHECKTIMEAPPOINT 检验鉴定约定周期
       * DOCUMENTTYPE 文书类型
       */
      getDictInfo() {
        var data = {
          "parentKeyList": ["DOCSENDTYPE", "EVIDENCEUSETYPE", "AUTHENTICATIONMETHOD", "AUTHENTICATIONITEM", "CHECKTIMEAPPOINT", "DOCUMENTTYPE","STORAGE","CONDITION"]
        };
        this.postHttpForLogin("dict/getDictInfo", data, res => {
          if (res.code == '0') {
            this.temp.checkMethodList = res.data.AUTHENTICATIONMETHOD;
            this.temp.checkDayList = res.data.CHECKTIMEAPPOINT;
            this.temp.docSendTypeList = res.data.DOCSENDTYPE;
            this.temp.materialDealList = res.data.EVIDENCEUSETYPE;
            this.wordTypeTemp = res.data.DOCUMENTTYPE;
            this.storage = res.data.STORAGE;
            this.condition = res.data.CONDITION;
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      /**
       * 获取人员信息
       */
      getEmpList() {
       // 查询workFlow
        this.postHttp("aucOrgUser/selectEmpListByWorkFlowId", this.workFlowId, res => {
            if (res.code == '0') {
                  this.empList = res.data;
                }
          })
        },

      /**
       * 确认受理
       */
      accept() {
        this.saveEvidDeal();
        let submitParam = {};
        submitParam = this.acceptForm;
        submitParam['registerId'] = this.regRow.registerId;
        submitParam['aucOrgId'] = this.regRow.aucOrgId;
        submitParam['workFlowId'] = this.workFlowId;
        //DNA  默认鉴定书
        submitParam['sendDocBookType'] = "1";

        if (this.sbumitFlag) {
          this.acceptForm['wordFlag'] = '1';
          this.postHttp("previews/uploadAllPreviewsForRegisterId", submitParam, res => {
            if (res.code == '0') {
              this.notify_success(res.msg);
              this.queryAcceptInfo();
              this.flowInsert();
            } else {
              this.notify_warning(res.msg);
            }
          });
        } else {
          //保存受理信息
          this.postHttp("previews/insertPreviews", submitParam, res => {
            if (res.code == '0') {
              this.notify_success(res.msg);
              this.queryAcceptInfo();
              this.flowInsert();
            } else {
              this.notify_warning(res.msg);
            }
          });
        };
        this.isdisabledFn = true;
      },

      flowInsert() {
        let data = {};
        data['registerId'] = this.regRow.registerId;
        data['aucOrgId'] = this.regRow.aucOrgId;
        data['workflowId'] = this.getData("workflowId");
        data['reason'] = this.getData('reason');
        data['sort'] = this.getData('sort');
        data['status'] = '1';
        this.postHttp("wfData/insertHistory", data, res => {
          if (res.code == '0') {
            this.notify_success("操作成功");
          } else {
            this.notify_error(res.msg)
          }
        });
      },
      /**
       * 修改
       */
      acceptUpdate() {
        this.isdisabledFn = false;
      },
      /**
       *
       */
      isDisabled() {
        if (this.acceptForm.limPreviewId) {
          this.isdisabledFn = true;
        }
      },
      /**
       * 获取受理详情
       */
      queryAcceptInfo() {
        this.getHttp("previews/getPreviews", {"registerId": this.regRow.registerId}, res => {
          if (res.code == '0') {
            if (res.data != null) {
              this.acceptForm = res.data;
              //this.acceptInfo['wordType'] = this.acceptForm.sendDocBookType;
              //this.acceptInfo['materialDeal'] = this.acceptForm.docForModel;
              this.$set(this.acceptInfo,'wordType',res.data.sendDocBookType);
              this.$set(this.acceptInfo,'materialDeal',res.data.docForModel);
              if (!this.acceptForm) {
                this.isdisabledFn = false;
              } else {
                this.sbumitFlag = true;
              }
            } else {
              this.isdisabledFn = false;
            }
          } else {
            this.$notify_warning(res.msg);
          }
        });
      },

      saveEvidDeal(){
        let dataLet = this.unBinding(this.evidDeal);
        dataLet['status'] = "1";
        dataLet['registerId'] = this.regRow.registerId;
        this.postHttp("eviAuc/inOrUpEvidDeal", dataLet, res => {
          if (res.code == "0") {
            this.notify_success(res.msg);
          } else {
            this.notify_warning(res.msg);
          }
        });
      },

      getEvidDeal(){
        let dataLet = {};
        dataLet['status'] = "1";
        dataLet['registerId'] = this.regRow.registerId;
        this.postHttp("eviAuc/getEvidDeal", dataLet, res => {
          if (res.code == "0") {
            if(res.data){
              this.evidDeal = res.data;
            }
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      /**
       * word编辑
       */
      wordList() {
        this.pageOffice('word/acceptWordList.html', {registerId: this.regRow.registerId});
      },
      save() {
        // if (!this.acceptInfo.wordType) {
        //   this.notify_warning("请完善受理分配信息！！");
        //   return 'error';
        // } else {
        //   return 'success'
        // };
      },
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

    },
    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.workFlowId = this.getData("workflowId");
      this.getEmpList();
      this.getDictInfo();
      this. getEvidDeal();
      this.queryAcceptInfo();


      this.postHttp("physical/queryPhysical", {consignmentId:this.regRow.registerId}, res => {
        this.physicalData = res.data.physicalList;
        this.personData = res.data.personInfos;
        this.Individual = res.data.individuals;
      });
    }
  }
</script>

<style>
  .proAccred {
    margin-left: 1px;
    margin-right: 10px;
    padding-left: 10px;
  }

  .proAccred .switch .el-form-item__content {
    display: flex;
    justify-content: start;
    height: 40px;
    align-items: center;
    padding-left: 2px;
  }

  .proAccred .bg-purple {
    background: #dae0e2;
  }

  .proAccred .grid-content {
    height: 50px;
    line-height: 50px;
    border-radius: 4px;
    min-height: 36px;
    box-sizing: border-box;
    padding-left:10px;
  }

  .proAccred .baseTable .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  .proAccred .baseTable .el-table__body tr,
  .proAccred .baseTable .el-table__body td {
    padding: 0;
    height: 40px;
  }

  .proAccred .baseTable .el-table__body tr.current-row > td {
    background: rgba(57, 82, 94, 0.445) !important;
    color: #fff;
  }
  .proAccred .el-upload-list--picture-card .el-upload-list__item{
		width:100px;
		height: 100px;
		margin:0px 10px;
	}
	.proAccred .el-upload--picture-card{
		width:100px;
		height: 100px;
		line-height: 100px;
		margin-left:10px;
	}

	.proAccred .photo{
		width:400px;
		height:300px;
		margin:10px auto;
		box-sizing: border-box;
		border:1px #a7a7a7 dashed;
		position: relative;
	}
	.proAccred .photo .text{
		width:400px;
		height:150px;
		position: absolute;
		text-align: center;
		line-height: 150px;
		font-size: 20px;
		top:75px;
	}
	.proAccred .photo .take{
		width:40px;
		height:40px;
		position: absolute;
		text-align: center;
		line-height: 40px;
		font-size: 20px;
		bottom: 10px;
		right: 10px;
		z-index: 9999;
	}
	.proAccred .photo video{
		position: absolute;
		left: 0px;
		right: 0px;
	}
  .proAccred .btns{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
</style>
