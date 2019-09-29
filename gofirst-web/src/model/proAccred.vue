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

          <el-table :data="checkData" align="center" style="width: 100%" height="350">
            <el-table-column prop="materialSerialNum" align="center" label="物证编号" width="200"></el-table-column>
            <el-table-column prop="NAME" align="center" label="物证名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="MATERIALTYPE" align="center" label="物证类型" width="100">
              <template slot-scope="scope">
                {{ scope.row.MATERIALTYPE == '1' ? '检材': '样本' }}
              </template>
            </el-table-column>
            <el-table-column prop="NUM" align="center" label="数量" width="100"></el-table-column>
            <el-table-column prop="UNIT" align="center" label="单位" width="100"></el-table-column>
            <el-table-column label="处置情况" align="center" width="300">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.checkAccept" :disabled="isdisabledFn">
                  <el-radio label="1">受理</el-radio>
                  <el-radio label="2">不受理</el-radio>
                  <el-radio label="3">取样后退回</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column prop="checkPic" v-if="!isFlowShow" align="center" label="附件/照片" width="90">
              <template slot-scope="scope">
                <el-button size="small" type="primary" plain @click="upload(scope.row)">图片</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <div class="btns" >
          <el-button v-if="!isFlowShow" type="primary" style="" @click="acceptUpdate">修改</el-button>
          <el-button v-if="!isFlowShow" type="primary" style="" @click="accept" :disabled="isdisabledFn">确认受理</el-button>
          <el-button size="small" type="primary" plain @click="wordList">查看回执单</el-button>
        </div>
      <!-- </el-tab-pane> -->
      <!-- 受理分配 -->
      <!-- <el-tab-pane label="受理分配"> -->
      <el-divider content-position="left"><div class="title-level one"><i class="el-icon-tickets"></i>受理分配</div></el-divider>
        <el-form :model="acceptInfo" :rules="rulesDoc" ref="ruleFormDoc" label-width="180px" class="demo-ruleForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="文书类型" prop="wordType">
                <el-select :disabled='isFlowShow' v-model="acceptInfo.wordType" clearable placeholder="文书类型" @change="changeWordType">
                  <el-option
                    v-for="item in wordTypeTemp"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="文书对应模板" prop="materialDeal">
                <el-select :disabled='isFlowShow' v-model="acceptInfo.materialDeal" clearable placeholder="文书对应模板"
                           @change="changeMaterialDeal">
                  <el-option
                    v-for="item in temp.docData"
                    :key="item.model"
                    :label="item.name"
                    :value="item.model">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addCheck"  v-if="!isFlowShow" size="small">添加分配</el-button>
            </el-col>
          </el-row>

          <!-- <div class="grid-content bg-purple">
            <el-col :span="21">检验记录和检材关联信息</el-col>
            <el-col :span="3">
              <el-button type="primary" @click="addCheck"  v-if="!isFlowShow" size="small">添加分配</el-button>
            </el-col>
          </div> -->

          <el-table :data="aucEvidList" align='center' style="width: 100%" height="400" class="baseTable" highlight-current-row>
            <el-table-column prop="acceptBookNo" align='center' label="受理号" >{{this.acceptForm.acceptBookNo}}
            </el-table-column>
            <el-table-column prop="aucTipId" align='center' label="检验记录"  :formatter="aucTipIdFormatter"></el-table-column>
            <el-table-column prop="evidId" align='center' label="检材" show-overflow-tooltip :formatter="evidIdFormatter"></el-table-column>
            <el-table-column prop="createUser" align='center' label="收检人员" ></el-table-column>
            <el-table-column prop="evidFlag" align='center' label="是否收检" width="100">
              <template slot-scope="scope">
                {{ scope.row.evidFlag == '1' ? '是': '否' }}
              </template>
            </el-table-column>
            <el-table-column align='center'  v-if="!isFlowShow" label='操作' >
              <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="editAucEvid(scope.$index, scope.row)" plain>编辑</el-button>
                <el-button size="mini" type="danger" @click="delAucEvid(scope.$index, scope.row)" plain>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark"></div>
            </el-col>
          </el-row>
        </el-form>
      <!-- </el-tab-pane> -->
      <!-- 检材处理 -->
       <!-- <el-tab-pane label="检材处理"> -->
        <el-divider content-position="left"><div class="title-level one"><i class="el-icon-tickets"></i>检材存储</div></el-divider>
          <el-table :data="checkDataSelect" align='center' style="width: 98%" height="350">
              <el-table-column prop="materialSerialNum" align='center' label="物证编号" show-overflow-tooltip width="200"></el-table-column>
              <el-table-column prop="NAME" align='center' label="物证名称" ></el-table-column>
              <el-table-column prop="NUM" align='center' label="数量" ></el-table-column>
              <el-table-column prop="UNIT" align='center' label="单位" ></el-table-column>
              <el-table-column prop="checkPic" align='center' label="附件/照片" >
                <template slot-scope="scope">
                  <el-button size="small" type="primary" plain @click="upload(scope.row)">图片</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="c021" align='center' label="交接数量" width="150">
                <template slot-scope="scope">
                  <el-input-number :disabled='isFlowShow' v-model ="scope.row.c021" :step="1" :min="0" :max="parseInt(scope.row.NUM, 10)" size="small" type="primary" plain ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="c009" align='center' label="提交人" ></el-table-column>
          </el-table>

          <!-- <el-divider content-position="left">受理信息</el-divider> -->
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
              <el-form-item class="rows" v-if="!isFlowShow">
                <el-button type="primary" @click="saveEvidDeal">保存</el-button>
              </el-form-item>
          </el-form>
      <!-- </el-tab-pane> -->

      <!--<el-tab-pane label="文档处理">
          <el-form ref="form" :model="wordForm" label-width="200px" size="mini">
              <el-form-item label="专业受理号为">

              </el-form-item>
              <el-form-item label="受理鉴定登记表">

              </el-form-item>
              <el-form-item label="鉴定事项记录表">

              </el-form-item>
              <el-form-item label="打印受理回执">

              </el-form-item>
              <el-form-item label="打印物证标签(条形码)">
                  <a href="">点击</a>
              </el-form-item>
              <el-form-item label="打印物证保全样式物证标签">
                 <a href="">点击</a>
              </el-form-item>
              <el-form-item label="活动形式">
              </el-form-item>
          </el-form>
      </el-tab-pane> -->
    <!--  -->


    <!-- 系统弹框开始 -->
    <el-dialog :title="aeAucEvid" width="30%" class="dynamicForm" style="text-align: center;"
               :visible.sync="dialog4AucEvid">
      <el-form :model="aucEvid" style="width:85%">
        <el-form-item label="受理号" label-width="150px" v-if="acceptFlag">
          <el-input v-model="aucEvid.sysNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="检验记录" label-width="150px">
          <el-select v-model="aucEvid.aucTipId" clearable placeholder="请选择检验记录">
            <el-option
              v-for="item in temp.aucData"
              :key="item.aucTipId"
              :label="item.name"
              :value="item.model">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检材选择" label-width="150px">
          <el-select v-model="aucEvid.evidId" multiple placeholder="请选择">
            <el-option
              v-for="item in checkDataSelect"
              :key="item.id"
              :label="item.NAME"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="收检人员" label-width="150px">
            <el-select v-model="aucEvid.empId" filterable placeholder="请选择">
                <el-option
                v-for="item in empList"
                :key="item.empId"
                :label="item.empName"
                :value="item.empId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否收检" class="switch" label-width="150px">
            <el-switch
                v-model="aucEvid.evidFlag"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <el-form-item label="备注" label-width="150px">
           <el-input v-model="aucEvid.remark" ></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAucEvid">取 消</el-button>
        <el-button type="primary" @click="saveAucEvid">确定分配</el-button>
      </div>
    </el-dialog>

    <el-dialog title="上传图片" width="440px" :visible.sync="dialogUpload">
			<el-upload :action="action" list-type="picture-card" ref="upload" :file-list='imgList' :data="livEvi" :on-remove="handleRemove" :multiple="true" :http-request="uploadFile" :auto-upload="false" :on-preview="handlePictureCardPreview">
				<i class="el-icon-plus"></i>
			</el-upload>
			<div class="photo" @click="open_photo">
				<div class="text">
					拍照区域,单击打开摄像头
				</div>
				<div class="take">
					<el-button  icon="el-icon-camera" circle @click.prevent='take_photo'></el-button>
				</div>
				<vue-webcam ref='webcam'></vue-webcam>
			</div>
		  <div slot="footer" class="dialog-footer">
				<el-button @click="cancle">取 消</el-button>
				<el-button type="primary" @click="uploads">确 定</el-button>
		  </div>
		</el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

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
      aucDataList(type) {
        this.postHttp("eviAuc/getAucTipList", {"aucOrgId": this.regRow.aucOrgId, "type": type}, res => {
          if (res.code == '0') {
            if (type == 1) {
              this.temp.aucData = res.data;
            } else {
              this.temp.docData = res.data;
            }
          } else {
            this.$notify_warning(res.msg);
          }
        });
      },
      /**
       获取检材样本列表信息
       */
      getCheckData() {
        this.getHttp("evidences/getEvidenceListForReal", {"registerId": this.regRow.registerId}, res => {
          if (res.code == '0') {
            this.checkData = res.data;
            this.setCheckDataSelect();
          } else {
            this.$notify_warning(res.msg);
          }
        });
      },
      /**
       * 获取受理后的检材信息
       */
      setCheckDataSelect() {
        this.checkDataSelect = [];
        for (let index = 0; index < this.checkData.length; index++) {
          if (this.checkData[index].checkAccept == "1"||this.checkData[index].checkAccept == "3") {
            this.checkDataSelect.push(this.checkData[index]);
          }
        }
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
       * 保存检材样本受理信息
       */
      saveMaterialNum() {
        let xNum = 0;
        let yNum = 0;
        this.checkData.forEach(element => {
          let submitParam = {};
          submitParam = element;
          submitParam['aucOrgId'] = this.regRow.aucOrgId;
          if(element.checkAccept == '1'||element.checkAccept == '3'){
            if (element.MATERIALTYPE == '1') {
              xNum++;
              submitParam['materialTypeNo'] = '1';
              submitParam['c020'] = xNum;
              this.postHttp("evidengesExtd/insertAndUpdateEvidengesExtd", submitParam, res => {
                if (res.code == '0') {
  
                } else {
                  this.$notify_warning(res.msg);
                }
              });
            } else {
              yNum++;
              submitParam['materialTypeNo'] = '2';
              submitParam['c020'] = yNum;
              this.postHttp("evidengesExtd/insertAndUpdateEvidengesExtd", submitParam, res => {
                if (res.code == '0') {
  
                } else {
                  this.$notify_warning(res.msg);
                }
              });
            }
          }

        });
        this.getCheckData();

      },
      /**
       * 确认受理
       */
      accept() {
        //保存检材样本受理信息
        this.saveMaterialNum();
        let submitParam = {};
        submitParam = this.acceptForm;
        submitParam['registerId'] = this.regRow.registerId;
        submitParam['aucOrgId'] = this.regRow.aucOrgId;
        submitParam['workFlowId'] = this.workFlowId;

        if (this.sbumitFlag) {
          this.acceptForm['wordFlag'] = '1';
          this.postHttp("previews/uploadAllPreviewsForRegisterId", submitParam, res => {
            if (res.code == '0') {
              this.notify_success(res.msg);
              this.queryAcceptInfo();
              this.getCheckData();
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
              this.getCheckData();
              this.flowInsert();
            } else {
              this.notify_warning(res.msg);
            }
          });
        }
        ;

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
      /**
       * 选择文书类型
       */
      changeWordType(event) {
        let commt = {};
        commt['sendDocBookType'] = event;
        commt['registerId'] = this.regRow.registerId;
        this.postHttp("previews/uploadAllPreviewsForRegisterId", commt, res => {
          if (res.code == '0') {
            this.notify_success(res.msg);
            this.queryAcceptInfo();
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      /**
       * 选择文书对应模板类型
       */
      changeMaterialDeal(event) {
        let commt = {};
        commt['docForModel'] = event;
        commt['registerId'] = this.regRow.registerId;
        this.postHttp("previews/uploadAllPreviewsForRegisterId", commt, res => {
          if (res.code == '0') {
            this.notify_success(res.msg);
            this.queryAcceptInfo();
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      /**
       * 获取检材列表
       */
      getAucEvidList() {
        this.getHttp("eviAuc/getAucEvidList", {"registerId": this.regRow.registerId}, res => {
          if (res.code == '0') {
            for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index];
              element.evidId = eval(element.evidId);
            }
            this.aucEvidList = res.data;
          } else {
            this.$notify_warning(res.msg);
          }
        });
      },
      /**
       * 遍历回显aucTipId
       */
      aucTipIdFormatter(row, value, cell) {
        let returnString = '';
        let checkTipTemp = this.temp.aucData;
        for (let e in checkTipTemp) {
          if (checkTipTemp[e].model == cell) {
            returnString = checkTipTemp[e].name;
          }
        }
        return returnString;
      },
      /**
       * 遍历回显evidId
       */
      evidIdFormatter(row, value, cell) {
        let returnString = '';
        let arrayTmp = [];
        let checkTipTemp = this.checkData;
        for (let e in checkTipTemp) {
          cell.forEach(element => {
            if (checkTipTemp[e].id == element) {
              arrayTmp.push(checkTipTemp[e].NAME);
            }
          });
        }
        returnString = arrayTmp.join(",");
        return returnString;
      },

      /**
       * 新增专业小类检材信息(弹窗框)
       */
      addCheck() {
        this.aeAucEvid = '添加检验记录和检材关联信息';
        this.dialog4AucEvid = true;
        this.aucEvid = {};

      },
      /**
       * 取消添加专业小类检材信息(弹窗框)
       */
      cancelAucEvid() {
        this.dialog4AucEvid = false;
        this.aucEvid = {};
      },
      /**
       * 编辑专业小类检材信息(弹窗框)
       */
      editAucEvid(index, row) {
        this.aeAucEvid = '编辑检验记录和检材关联信息';
        this.aucEvid = row;
        if (row.evidFlag == '1') {
          this.aucEvid.evidFlag = true;
        } else {
          this.aucEvid.evidFlag = false;
        }
        this.dialog4AucEvid = true;
      },
      /**
       * 保存专业小类检材信息
       */
      saveAucEvid() {
        let dataLet = this.unBinding(this.aucEvid);
        dataLet['registerId'] = this.regRow.registerId;
        if (dataLet.evidFlag) {
          dataLet.evidFlag = '1';
        } else {
          dataLet.evidFlag = '2';
        }
        this.postHttp("eviAuc/insertAucEvid", dataLet, res => {
          if (res.code == "0") {
            this.notify_success(res.msg);
            this.dialog4AucEvid = false;
            this.getAucEvidList();
          } else {
            this.notify_warning(res.msg);
          }
        });

      },
      /**
       * 删除专业小类检材信息
       */
      delAucEvid(index, row) {
        this.$confim("是否确认删除此条数据?", '提示', data => {
          this.getHttp("eviAuc/delAucEvid", {"aucEvidId": row.aucEvidId}, res => {
            if (res.code == '0') {
              this.notify_success(res.msg);
              this.getAucEvidList();

            } else {
              this.$notify_warning(res.msg);
            }
          });
        })
      },
      /**
       * word编辑
       */
      wordList() {
        this.pageOffice('word/acceptWordList.html', {registerId: this.regRow.registerId});
      },
      save() {
        if (!this.acceptInfo.wordType) {
          this.notify_warning("请完善受理分配信息！！");
          return 'error';
        } else {
          return 'success'
        };
        if (!this.acceptInfo.materialDeal) {
          this.notify_warning("请完善受理分配信息！！");
          return 'error';
        } else {
          return 'success'
        }
      },


      // 上传
			upload(row){
				this.postHttp("evidencesImg/selectByEviId",row.id,res =>{
					if(res.data.length > 0){
						for(let x in res.data){
							res.data[x]['url'] = res.data[x].address;
						}
						this.imgList = res.data;
					}else{
						this.imgList = [];
					}
					this.dialogUpload = true;
					this.livEvi.id = row.id;
					this.fileData = new FormData();

				});
			},
			cancle(){
				this.$refs.webcam.pause();
				this.dialogUpload = false;
			},
			// 上传方法
			uploads(){
				this.submitUpload();
			},
			uploadFile(file){
					this.fileData.append('file', file.file);
			},
			submitUpload: function () {

			    this.fileData = new FormData();
					this.fileData.append('id', this.livEvi.id);
					this.fileData.append('registerId', this.regRow.registerId);
					this.$refs.upload.submit();
					this.fileData.delete('createDatetime');
					this.fileData.delete('updateDatetime');
					let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
					this.$axios.post(this.action,this.fileData,config).then(response => {
				  		if(response.data.code == '0'){
								this.dialogUpload = false;
								this.notify_success('操作成功');
								this.loadData();
							}else{
								this.notify_error(response.data.msg);
							}
				    },response => {
							this.notify_error('网络错误');
					})
			},
			//单独删除
			handleRemove(file, fileList) {
        this.postHttp("evidencesImg/deleteEvidenceImg",file,res=>{
				})
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
			open_photo(){
        //打开摄像头
        this.$refs.webcam.open();
      },
			take_photo(){
				let file = this.dataURLtoBlob();

				if(null != file){
					let files = {
		        status: 'ready',
		        name: file.name,
		        size: file.size,
		        percentage: 0,
		        uid: file.uid,
		        raw: file,
						url:URL.createObjectURL(file)
		      };
		      this.$refs.upload.uploadFiles.push(files);
					this.$refs.upload.onChange(files, this.$refs.upload.uploadFiles);

					this.fileData.append('file',file);

				}
			},
			dataURLtoBlob() {
				let url = this.$refs.webcam.getPhoto();

				if(url == null || url == undefined){
					return null;
				}
        let arr = this.$refs.webcam.getPhoto().split(','),
         		mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
				let bolb = new Blob([u8arr], { type: mime });
				bolb.lastModifiedDate = new Date();
				let file = new File([bolb], new Date().getTime()+'.jpg', {type: mime, lastModified: Date.now()});
				file.uid = new Date().getTime();

        return file;
      },
      // 检材处理——start
      saveEvidDeal(){
        this.saveMaterial();
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

      saveMaterial() {
        this.checkDataSelect.forEach(element => {
          let submitParam = {};
          submitParam = element;
          if(element.checkAccept == '1'||element.checkAccept == '3'){
              this.postHttp("evidengesExtd/insertAndUpdateEvidengesExtd", submitParam, res => {
                if (res.code == '0') {
  
                } else {
                  this.$notify_warning(res.msg);
                }
              });
            
          }
        });
        this.getCheckData();
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
      // 检材处理——end

    },
    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.workFlowId = this.getData("workflowId");
      this.action = '/auc/evidengesExtd/saveImgs';
      this.getEmpList();
      this.getDictInfo();
      this.getCheckData();
      this.getAucEvidList();
      this.aucDataList(1);
      this.aucDataList(2);
      this.queryAcceptInfo();
      this.getEvidDeal();
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
