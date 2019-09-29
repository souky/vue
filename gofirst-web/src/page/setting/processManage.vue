<template>
  <div class="processManage">
    <el-row class="yourAddress normalRow">
      <el-col :span="12" class="normalCol">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>您的位置</el-breadcrumb-item>
          <el-breadcrumb-item>配置</el-breadcrumb-item>
          <el-breadcrumb-item>流程配置界面</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

    </el-row>

    <div class="auc-div">
      <span class="aucSpecialty">请选择鉴定专业：</span>
      <el-select v-model="aucSpecialty" filterable placeholder="请选择" @change="changeAuc" @visible-change="visibleChange"
                 size="mini">
        <el-option
          v-for="item in aucOptions"
          :key="item.aucOrgId"
          :label="item.aucOrgCname"
          :value="item.aucOrgId"
        ></el-option>
      </el-select>
    </div>

    <section class="main">
      <div class="container">
        <div class="drag-box">
          <div class="drag-box-item">
            <div class="item-title el-row">
              <el-col :span="18">
                <div class="grid-content bg-purple"></div>
                基本流程
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
                <el-button type="primary" size="mini" @click="addBase">新增</el-button>
              </el-col>
            </div>
            <draggable v-model="flowBase" @remove="removeHandle" :options="dragOptions">
              <transition-group tag="div" id="flowBase" class="item-ul">
                <div v-for="(item,index) in flowBase" class="drag-list" :key="item.code">
                  <div class="tx-item">
                    {{item.name}}
                  </div>
                  <div class="ud-item">
                    <el-button size="mini" type="warning" class="update" @click="baseEdit(item)" plain>编辑</el-button>
                    <el-button size="mini" type="danger" class="del" @click="baseDelete(item,index)" plain>删除
                    </el-button>
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>
          <div class="serialNum">
            <div class="serialNum-title">序号</div>
            <draggable v-model="serialNum">
              <div class="item-ul">
                <div v-for="(item) in serialNum" class="serial-drag-list" :key="item.id">{{item.content}}</div>
              </div>
            </draggable>
          </div>
          <div class="drag-box-item">
            <div class="item-title el-row">
              <el-col :span="18">
                <div class="grid-content bg-purple"></div>
                应用流程
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
                <el-button type="primary" size="mini" @click="saveworkFlowList">应用</el-button>
              </el-col>
            </div>
            <draggable v-model="workFlowList" @remove="removeHandle" :move="moveTest" :options="dragOptions">
              <transition-group tag="div" id="workFlowList" class="item-ul">
                <div v-for="item in workFlowList" class="workFlowList-drag-list" :key="item.code"
                     @click="clickInfo(item)">{{item.name}}
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
    </section>

    <div class="left-seting">
      <div class="baseRowInfo" v-if="applyFlag1">
        <el-row class="setBaseInfo" :span="24">
          <el-col :span="6">{{applyName}} - 模板选择</el-col>
        </el-row>

        <div class="auc-div">
          <span class="aucSpecialty">选择类型：</span>
          <el-select v-model="modelsSel" filterable placeholder="请选择" @change="changeModel" size="mini">
            <el-option
              v-for="item in models"
              :key="item.modelName"
              :label="item.modelName"
              :value="item.type"
            ></el-option>
          </el-select>
        </div>

        <div class="model-item" v-for="e in modelsFou" :key="e.modelName">
          <div class="model-title">{{e.modelName}}</div>
          <div class="model-body">
            <div @click="activeModel(ee.key)" :class="ee.key == modelKey?'items active':'items'" v-for="ee in e.model"
                 :key="ee.key">
              <img :src="ee.key == modelKey?'static/img/model/modelActive.png':'static/img/model/model.png'" alt="">
              <div class="name">{{ee.name}}</div>
            </div>
          </div>

        </div>
        <div class="auc-div">
          <el-button size="mini" type="" class="update" @click="selectEmpsBtn()" plain>请选择对应的审核人</el-button>
          <div id="userList">
            <div v-for ='item in flowEmps'>{{item.userName}}</div>
          </div>
        </div>



        <!-- <el-row class="setBaseInfo" :span="24">
          <el-col :span="2">{{applyName}}</el-col>
          <el-col :span="2" :offset="17">
            <el-button type="primary" size="mini" @click="saveTypeTem()">保存</el-button>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple"></div>
              <el-form-item label="选择类型">
                <el-select v-model="form.typeWork" placeholder="请选择类型">
                  <el-option label="检验记录" value="1"></el-option>
                  <el-option label="提交归档" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple"></div>
              <el-form-item label="选择模板">
                <el-select v-model="form.model" placeholder="请选择模板">
                  <el-option label="模板一" value="1"></el-option>
                  <el-option label="模板二" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
      </div>

      <el-row class="rowInfo" v-if="applyFlag">
        <el-col class="baseInfo" :span="24">
          <el-col :span="2">{{applyName}}</el-col>
          <el-col :span="4" :offset="18">
            <el-button type="primary" size="mini" @click="addColumnInfo()">新增</el-button>
            <el-button type="danger" size="mini" @click="deleteColumnInfo()">删除</el-button>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-table ref="columnInfoTable" :data="columnInfoTableData" tooltip-effect="dark" style="width: 100%"
                    @selection-change="columnInfoHandleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="列名称" width="150"></el-table-column>
            <el-table-column prop="align" label="列对齐模式" width="150"></el-table-column>
            <el-table-column prop="label" label="列显示名称" width="150"></el-table-column>
            <el-table-column prop="formatter" label="是否格式化" width="150"
                             :formatter="flagListFormatter"></el-table-column>
            <el-table-column prop="formatType" label="格式化格式" width="150"></el-table-column>
            <el-table-column prop="width" label="列宽度" width="150"></el-table-column>
            <el-table-column prop="operations" label="是否是操作按钮" width="150"
                             :formatter="flagListFormatter"></el-table-column>
            <el-table-column prop="overflow" label="是否隐藏列数据" width="150"
                             :formatter="flagListFormatter"></el-table-column>
            <el-table-column prop="tableShow" label="是否在table上显示" width="150"
                             :formatter="flagListFormatter"></el-table-column>
            <el-table-column prop="placeholder" label="占位符" width="150"></el-table-column>
            <el-table-column prop="readonly" label="是否只读" width="150" :formatter="flagListFormatter"></el-table-column>
            <el-table-column prop="disabled" label="是否禁用" width="150" :formatter="flagListFormatter"></el-table-column>
            <el-table-column prop="formType" label="form类型" width="150"></el-table-column>
            <el-table-column prop="maxlength" label="最大输入长度" width="150"></el-table-column>
            <el-table-column prop="rowsSize" label="textarea显示行数" width="150"></el-table-column>
            <el-table-column prop="resize" label="是否可缩放" width="150"></el-table-column>
            <el-table-column prop="dictName" label="字典" width="150"></el-table-column>
            <el-table-column prop="validateContent" label="验证规则" width="150"></el-table-column>
            <el-table-column align="center" class-name="operations" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editColumnInfo(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <!-- 基本流程弹框 -->
    <el-dialog :title="aeFlowBase" width="30%" :visible.sync="dialog4FlowBase">
      <el-form :model="flowBaseInfoTmp" style="width:85%">
        <el-form-item label="序号/编号" label-width="150px">
          <el-input v-model="flowBaseInfoTmp.code" autocomplete="off" :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="中文名称" label-width="150px">
          <el-input v-model="flowBaseInfoTmp.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="150px">
          <el-col size="large">
            <el-select v-model="flowBaseInfoTmp.type" class="normalType">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog4FlowBase = false">取 消</el-button>
        <el-button type="primary" @click="saveFlowBase">确 定</el-button>
      </div>
    </el-dialog>

    <!-- column字段弹窗 -->
    <el-dialog :title="columnTitle" :visible.sync="columnIfoDialog" width="43%">
      <el-form label-width="140px" :inline="true" size="small" ref="columnInfoAddForm" :model="columnInfo">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="columnInfo.name" style="width:203px"></el-input>
        </el-form-item>
        <el-form-item label="列对齐模式:" prop="align">
          <el-select v-model="columnInfo.align" placeholder="请选择" filterable clearable>
            <el-option v-for="item in alignList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="列显示名称:" prop="label">
          <el-input v-model="columnInfo.label" style="width:203px"></el-input>
        </el-form-item>
        <el-form-item label="格式化类型:" prop="formatType">
          <el-select v-model="columnInfo.formatType" placeholder="请选择" filterable clearable>
            <el-option v-for="item in formatTypeList" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="格式化格式:" prop="formatter">
          <el-input v-model="columnInfo.formatter" style="width:203px"></el-input>
        </el-form-item>
        <el-form-item label="列宽度:" prop="width">
          <el-input v-model="columnInfo.width" style="width:203px"></el-input>
        </el-form-item>
        <el-form-item label="是否是操作按钮:" prop="operations">
          <el-select v-model="columnInfo.operations" placeholder="请选择" filterable clearable>
            <el-option v-for="item in flagList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否隐藏列数据:" prop="overflow">
          <el-select v-model="columnInfo.overflow" placeholder="请选择" filterable clearable>
            <el-option v-for="item in flagList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否在table上显示:" prop="tableShow">
          <el-select v-model="columnInfo.tableShow" placeholder="请选择" filterable clearable>
            <el-option v-for="item in flagList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="占位符:" prop="placeholder">
          <el-input v-model="columnInfo.placeholder" style="width:203px"></el-input>
        </el-form-item>
        <el-form-item label="是否只读:" prop="readonly">
          <el-select v-model="columnInfo.readonly" placeholder="请选择" filterable clearable>
            <el-option v-for="item in flagList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否禁用:" prop="disabled">
          <el-select v-model="columnInfo.disabled" placeholder="请选择" filterable clearable>
            <el-option v-for="item in flagList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="form类型:" prop="formType">
          <el-select v-model="columnInfo.formType" placeholder="请选择" filterable clearable>
            <el-option v-for="item in formTypeList" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最大输入长度:" prop="maxlength">
          <el-input v-model="columnInfo.maxlength" style="width:203px"></el-input>
        </el-form-item>
        <el-form-item label="textarea显示行数:" prop="rowsSize">
          <el-input v-model="columnInfo.rowsSize" style="width:203px"></el-input>
        </el-form-item>
        <el-form-item label="是否可缩放:" prop="resize">
          <el-select v-model="columnInfo.resize" placeholder="请选择" filterable clearable>
            <el-option v-for="item in resizeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典:" prop="dictName">
          <el-select v-model="columnInfo.dictName" placeholder="请选择" filterable clearable>
            <el-option v-for="item in allDictInfo" :key="item.dictId" :label="item.dictKey" :value="item.dictKey">
              <span style="float: left">{{ item.dictValue }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.rootKey }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验证规则:">
          <el-select v-model="columnInfo.validateContent" placeholder="请选择">
            <el-option value="">无</el-option>
            <el-option v-for="item in validateContent" :key="item.dictId" :value="item.dictValue">{{item.dictValue}}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="columnIfoDialog = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addSubmit()" size="mini" v-if="!columnEditFlag">确 定</el-button>
            <el-button type="primary" @click="updateSubmit()" size="mini" v-if="columnEditFlag">更 新</el-button>
        </span>
    </el-dialog>

   <!-- 人员选择 -->
    <el-dialog :title="aeEmps" width="50%" :visible.sync="dialog4Emp">
        <div style="display:flex">
          <div class="aucSpecialty" style="width:140px;display:flex;align-items:center">
            流程操作人员：
          </div>
          <div style="width:calc(100% - 140px)">
            <el-tag style="margin:4px 3px" v-for="e in flowEmps" type="info" :key="e.empId" closable @close="handleClose(e)">
              {{e.userName}}
            </el-tag>
          </div>
        </div>

        <div class="leftTree">
          <el-tree
              class="filter-tree"
              :node-key="orgData.remark"
              :props="props"
              :data="orgData"
              :load="loadNode"
              @node-click="currentKey"
              lazy
            ></el-tree>
        </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog4Emp = false">关 闭</el-button>
        <el-button type="primary" @click="saveFlowEmp">授 权</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import draggable from "vuedraggable";

  export default {
    data() {
      return {
        roleEmp:'',
        form: {
          key: '',
        },
        //弹出框名称
        aeFlowBase: '',
        //弹出框列表信息
        flowBaseInfo: {},
        flowBaseInfoTmp: {},
        //鉴定专业值
        aucSpecialty: "",
        aucSpecialtyTmp: "",
        //鉴定专业下拉列表
        aucOptions: [],
        //弹出框开关标识
        dialog4FlowBase: false,
        //保存修改标识
        saveUpdateFlag: '',
        //拖拽框配置
        dragOptions: {
          animation: 120,
          scroll: true,
          group: "sortlist",
          ghostClass: "ghost-style"
        },
        options: [{
          value: '1',
          label: '动态配置'
        }, {
          value: '2',
          label: '模板选择'
        }],
        employees: [{
          value: '1',
          label: 'as'
        }, {
          value: '2',
          label: 'fds'
        }],
        //拖拽移动标识
        moveFlag: true,
        //配置显示标识
        applyFlag: false,
        applyFlag1: false,
        //配置标题名称
        applyName: '',
        //列表数据
        columnInfoTableData: [],
        //流程基本信息
        flowBase: [],
        //应用流程信息
        workFlowList: [],
        //应用流程提交封装
        saveAllworkFlowList: {},
        //中间数字回显信息
        serialNum: [],
        //基本流程id
        baseFlowId: '',
        //column字段弹窗标识
        columnIfoDialog: false,
        //添加column对象
        columnInfo: {},
        //字典数据
        allDictInfo: [],
        //验证规则字典项
        validateContent: [],
        //
        columnTitle: '',
        //更新和保存切换
        columnEditFlag: false,
        //指定数据存储类型
        type: '3',
        //
        handleSelectionChangeList: [],
        //
        flagList: [{value: '0', label: '否'},
          {value: '1', label: '是'},],
        //
        alignList: [{value: 'center', label: 'center'},
          {value: 'left', label: 'left'},
          {value: 'right', label: 'right'},],
        //
        formatTypeList: [{value: '0', label: 'none'},
          {value: '1', label: 'string'},
          {value: '2', label: 'date'},],
        //
        formTypeList: [{value: 'input', label: 'input'},
          {value: 'select', label: 'select'},
          {value: 'date', label: 'date'},
          {value: 'switch', label: 'switch'},
          {value: 'checkbox', label: 'checkbox'},
          {value: 'radios', label: 'radios'},
          {value: 'textarea', label: 'textarea'},],
        //
        resizeList: [{value: 'none', label: 'none'},
          {value: 'both', label: 'both'},
          {value: 'horizontal', label: 'horizontal'},
          {value: 'vertical', label: 'vertical'},],


        // modelKey
        modelKey: '',
        modelsSel: '',
        models: [
          {
            type: '1',
            modelName: '专业受理',
            model: [
              {key: '/programAccept', name: '程序受理'},
              {key: '/proAccred', name: '专业受理'},
              {key: '/proAccred_dna', name: 'DNA专业受理'},
            ]
          },
          {
            type: '2',
            modelName: '检验记录',
            model: [
              {key: '/inspectionRecord', name: '检验记录'},
              {key: '/appraisalRecord', name: '报告编写'},
              {key: '/identifyReview', name: '鉴定复核'},
              {key: '/appraisalRecord_dna', name: 'DNA报告编写'},

            ]
          },
          {
            type: '3',
            modelName: '签名模板',
            model: [
              {key: '/authorizeSign', name: '授权人签字'},
              {key: '/directSign', name: '中心主任签名'},
            ]
          },
          {
            type: '4',
            modelName: '报告模板',
            model: [
              {key: '/printReport', name: '打印报告'},
              {key: '/filing', name: '提交归档'},
              {key: '/confirmFile', name: '确认归档'},
              {key: '/sendReport', name: '报告发放'},
            ]
          },
          {
            type: '5',
            modelName: '委托登记',
            model: [
              {key: '/exEntrustInfo', name: '委托登记'},
              {key:'/exEntrustInfo_dna',name:'DNA委托登记'},
              {key: '/acceptCheck', name: '收检'},
              {key: '/acceptCheck_dna', name: 'DNA收检'}

            ]
          },
        ],

        modelsFou: [],
        //人员选择
        props: {
          label: "orgCname",
          children: "nodes",
          isLeaf: "leaf"
        },
        orgData: [],
        dialog4Emp:false,
        aeEmps:'流程授权',
        flowEmps:[],
      };
    },
    components: {
      draggable
    },
    methods: {
      /**
       * 回显鉴定专业列表信息信息
       */
      aucBase() {
        this.postHttp("aucOrg/getGfLimAucOrgList", "", res => {
          if (res.code == "0") {
            this.aucOptions = res.data;
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      /**
       * select的下拉触发事件
       */
      visibleChange() {
        if (!this.moveFlag) {
          this.$message.warning("请先点击应用保存流程信息!");
          return false;
        }
        this.aucSpecialtyTmp = this.aucSpecialty;
      },
      /**
       * select的onchange事件
       */
      changeAuc(event) {
        if (!this.moveFlag) {
          this.aucSpecialty = this.aucSpecialtyTmp;
          return false;
        }
        this.flowBaseRead(event);
        this.applyFlag = false;
        this.applyFlag1 = false;
      },
      /**
       * select的onchange事件
       */
      changeModel(event) {
        this.modelsFou = [];
        if (event != null) {
          let data = this.models[(event - 1)]
          this.modelsFou.push(data);
        }
      },
      /**
       * 回显流程主的信息
       */
      flowBaseRead(event) {
        this.flowBase = [];
        this.workFlowList = [];
        this.getHttp("flow/getSerialNum", '', res => {
          if (res.code == "0") {
            this.serialNum = res.data;
          } else {
            this.notify_warning(res.msg);
          }
        });
        this.getHttp("flow/getAllBaseFlowInfo", {"aucOrgId": event}, res => {
          if (res.code == "0") {
            this.flowBase = res.data.flowBase;
            this.workFlowList = res.data.workFlowList;
          } else {
            this.notify_warning(res.msg);
          }
        });

        // this.serialNum = {};

      },
      /**
       * 弹出新增基础流程信息添加框
       */
      addBase() {
        if (!this.aucSpecialty) {
          this.$message.warning("请先选择鉴定专业!");
        } else {
          this.saveUpdateFlag = 0;
          this.aeFlowBase = '新增基础流程信息';
          this.flowBaseInfoTmp = {
            code: ''
          };
          this.setNextCode();

          this.dialog4FlowBase = true;
        }
      },
      /**
       * 下个节点序号
       */
      setNextCode() {
        this.getHttp("flow/getNextCode", '', res => {
          if (res.code == "0") {
            this.flowBaseInfoTmp.code = res.data;
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      /**
       * 保存流程信息
       */
      saveFlowBase() {
        let dataLet = this.unBinding(this.flowBaseInfoTmp);
        if (this.saveUpdateFlag == 0) {
          this.postHttp("flow/insertBaseFlowInfo", dataLet, res => {
            if (res.code == "0") {
              this.notify_success(res.msg);
              this.flowBaseRead(this.aucSpecialty);
            } else {
              this.notify_warning(res.msg);
            }
          });
        } else if (this.saveUpdateFlag == 1) {
          this.postHttp("flow/updateBaseFlow", dataLet, res => {
            if (res.code == "0") {
              this.notify_success(res.msg);
              this.flowBaseRead(this.aucSpecialty);
            } else {
              this.notify_warning(res.msg);
            }
          });
        }
        this.dialog4FlowBase = false;

      },
      /**
       * 弹出编辑基础流程信息添加框
       */
      baseEdit(event) {
        this.saveUpdateFlag = 1;
        this.aeFlowBase = '编辑基础流程信息';
        let dataLet = this.unBinding(event);
        this.flowBaseInfoTmp = dataLet;
        this.dialog4FlowBase = true;
      },
      /**
       * 删除基础流程信息
       */
      baseDelete(event, index) {
        this.$confim("确定要删除此项？", "提示", data => {
          this.getHttp("flow/delBaseFlow", {"BaseFlowId": event.id}, res => {
            if (res.code == "0") {
              this.flowBase.splice(index, 1);
              this.notify_success(res.msg);
              this.flowBaseRead(this.aucSpecialty);
            } else {
              this.notify_warning(res.msg);
            }
          });
        })
      },
      /**
       * 保存应用流程信息
       */
      saveworkFlowList() {
        if (!this.aucSpecialty) {
          this.$message.warning("请先选择鉴定专业!");
        } else {
          this.saveAllworkFlowList.aucOrgId = this.aucSpecialty;
          this.saveAllworkFlowList.workFlowList = this.workFlowList;
          this.postHttp("flow/insertWorkFlow", this.saveAllworkFlowList, res => {
            if (res.code == "0") {
              this.notify_success(res.msg);
            } else {
              this.notify_warning(res.msg);
            }
          });
          this.moveFlag = true;
        }
      },
      /**
       * 左右移动事件
       */
      removeHandle(event) {
        this.moveFlag = false;
        this.applyFlag = false;
        this.applyFlag1 = false;
        // this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
      },
      /**
       * 内部移动事件
       */
      moveTest(event) {
        this.moveFlag = false;
        this.applyFlag = false;
        this.applyFlag1 = false;
      },
      /**
       * 点击当前流程节点触发的配置页面
       */
      clickInfo(event) {
        this.modelKey = "";
        if (!this.moveFlag) {
          this.$message.warning("请先点击应用保存流程信息!");
          return false;
        } else if (event.type == 2) {
          this.applyFlag = false;
          this.applyFlag1 = true;
          // 查询workFlow
          this.postHttp("flow/selectByBaseIdAndAucId", {baseId: event.id, aucOrgId: this.aucSpecialty}, res => {
            this.modelKey = res.data.model;
            var userStr = res.data.roleId.split(',');
            this.flowEmps=[];
            for(let x in userStr){
                  var tempUserId = userStr[x];
                  this.postHttpForLogin("auth/selectUserById", tempUserId, res => {
                        let obj = new Object();
                        obj.empId = res.data.userId;
                        obj.userName = res.data.userName;
                        this.flowEmps.push(obj);
                  });
              }
            console.log(this.flowEmps);
            this.$set(this, 'modelsSel', res.data.modelId);
            this.changeModel(res.data.modelId);
          })
        } else if (event.type == 1) {
          this.applyFlag = true;
          this.applyFlag1 = false;
        }
        this.applyName = event.name;
        this.baseFlowId = event.id;
        this.selectListByMap();
      },

      /**
       * 获取列表信息
       */
      selectListByMap() {
        var object = {
          aucOrgId: this.aucSpecialty,
          baseFlowId: this.baseFlowId,
          type: '3'
        }
        this.postHttp("evidenceColumn/queryListByAucOrgIdAndBaseFlowId", object, res => {
          if (res.code == "0") {
            this.columnInfoTableData = res.data;
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      /**
       * 打开column新增弹出框
       */
      addColumnInfo() {
        this.columnEditFlag = false;
        this.columnIfoDialog = true;
        this.columnInfo = {
          formatType: '0',
          operations: '0',
          overflow: '0',
          tableShow: '1',
          readonly: '0',
          disabled: '0',
          align: 'center',
          name: 'c0'
        };
      },
      /**
       * column字段新增
       */
      addSubmit() {
        this.columnInfo['aucOrgId'] = this.aucSpecialty;
        this.columnInfo['baseFlowId'] = this.baseFlowId;
        this.columnInfo['type'] = this.type;
        this.postHttp("evidenceColumn/insert", this.columnInfo, res => {
          if (res.code == '0') {
            this.notify_success("新增成功!");
            this.columnInfo = {};
            this.columnIfoDialog = false;
            this.selectListByMap();
          } else {
            this.notify_warning(res.msg);
          }
        });

      },
      /**
       * column字段更新
       */
      updateSubmit() {
        this.postHttp("evidenceColumn/update", this.columnInfo, res => {
          if (res.code == '0') {
            this.notify_success("更新成功!");
            this.columnInfo = {};
            this.columnIfoDialog = false;
            this.selectListByMap();
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      /**
       * column字段删除
       */
      deleteColumnInfo() {
        var list = this.handleSelectionChangeList;
        if (!list || list.length == 0) {
          this.notify_warning("请选择删除的数据!");
          return false;
        }
        this.$confirm('此操作将删除选中的信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postHttp("evidenceColumn/deleteBatch", list, res => {
            if (res.code == '0') {
              this.notify_success("删除成功!");
              this.selectListByMap();
            } else {
              this.notify_warning(res.msg);
            }
          });
        }).catch(() => {
          //取消
        });
      },
      /**
       * 打开column编辑弹出框
       */
      editColumnInfo(event) {
        this.columnEditFlag = true;
        this.columnIfoDialog = true;
        this.columnInfo = event;

      },
      /**
       * 选择的的行数
       */
      columnInfoHandleSelectionChange(rows) {
        this.handleSelectionChangeList = rows;
      },
      /**
       *
       */
      flagListFormatter(row, column, cellValue, index) {
        if (cellValue == '0') {
          return '否';
        } else if (cellValue == '1') {
          return '是';
        }
      },
      /**
       * 获取字典项信息
       */
      getAllDictInfo() {
        this.postHttpForLogin("dict/getAllDictInfo", {}, res => {
          if (res.code == '0') {
            this.allDictInfo = res.data;
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      /**
       * 验证规则字典项列表
       */
      getValidateContent() {
        this.postHttpForLogin("dict/getDictInfo", {"parentKey": "VALIDATE", "parentValue": "验证规则"}, res => {
          if (res.code == '0') {
            this.validateContent = res.data;
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      // 激活model
      activeModel(key) {
        this.form.key = key;
        this.form.type = this.modelsSel;
        this.form['aucOrgId'] = this.aucSpecialty;
        this.form['baseFlowId'] = this.baseFlowId;
        this.postHttp("flow/saveTypeTem", this.form, res => {
          if (res.code == "0") {
            this.modelKey = key;
            this.notify_success(res.msg);
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      //人员信息选择--start
      //左侧树信息查询
    getTree() {
      this.postHttpForLogin("orgsController/getLevelOrgs", {"orgLevel":"320000000000"}, res => {
        if (res.data == "0") {
          this.orgData = [];
        } else {
          this.orgData = res.data;
          console.log("data",res.data)
          this.postHttpForLogin("orgsController/getLevelOrgs", {"orgLevel":res.data[0].remark} , res => {
            if (res.code == "0") {
            } else {
              this.$notify_error("查询失败");
            }
          });
        }
      });
    },
    // 子节点懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.getTree();
      } else {
          this.postHttpForLogin("orgsController/getLevelOrgs", {"orgLevel":node.data.remark}, res => {
            if (res.data == "0") {
              this.orgData = [];
            } else {
              if(res.data.length==0){
                  this.postHttpForLogin("orgsController/getEmpsByOrgId", node.data.orgId, res => {
                    if (res.code == "0") {
                      for(let x in res.data){
                        res.data[x]["orgCname"] = res.data[x].empName;
                        res.data[x]["leaf"] = true;
                      }
                      resolve(res.data);
                    } else {
                      this.$notify_error("查询失败");
                    }
                  });
              }else{
                resolve(res.data);
              }
            }
          });
      }
    },
    currentKey(data, node) {
      if(data.empId){
        let flag = true;
        for(let x in this.flowEmps){
          if(this.flowEmps[x].empId == data.userId){
            flag = false;
          }
        }
        if(flag){
          let obj = new Object();
          obj.empId = data.userId;
          obj.userName = data.userName;
          this.flowEmps.push(obj);
        }
      }

    },
    selectEmpsBtn(){
      this.aeEmps = '流程授权';
      this.aeEmps = this.aeEmps+ ">>>>" +this.applyName;
      this.dialog4Emp = true;
    },
    /**
     * 报错人员权限
     */
    saveFlowEmp() {
      let roleArray = [];
      for(let x in this.flowEmps){
        roleArray.push(this.flowEmps[x].empId);
      }
      var object = {
        aucOrgId: this.aucSpecialty,
        baseId: this.baseFlowId,
        roleId: roleArray.toString(),
      }
      this.postHttp("flow/savePerAcsForBaseIdAndAucId", object, res => {
        if (res.code == "0") {
          // 查询workFlow
          this.postHttp("flow/selectByBaseIdAndAucId", {baseId: this.baseFlowId, aucOrgId: this.aucSpecialty}, res => {
            var userStr = res.data.roleId.split(',');
            this.flowEmps=[];
            for(let x in userStr){
                  var tempUserId = userStr[x];
                  this.postHttpForLogin("auth/selectUserById", tempUserId, res => {
                        let obj = new Object();
                        obj.empId = res.data.userId;
                        obj.userName = res.data.userName;
                        this.flowEmps.push(obj);
                  });
              }
          })
        } else {
          this.notify_warning(res.msg);
        }
      });
    },
    // 标签删除
    handleClose(tag){
      this.flowEmps.splice(this.flowEmps.indexOf(tag), 1);
    },
    //人员选择--end

    },
    activated: function () {
      this.aucBase();
      //获取字典信息
      this.getAllDictInfo();
      this.getValidateContent();
    }
  };
</script>

<style>
  .processManage {
    background-color: #f0f3fa;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .processManage .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  .processManage .el-row {
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    /* background-color: #ffffff; */
  }

  .processManage .normalRow {
    margin-top: 10px;
    margin-bottom: 15px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  .processManage .auc-div {
    margin-top: 10px;
    margin-bottom: 15px;
    margin-left: 15px;
    /* margin-right: 100px; */
    width: 350px;
    padding-left: 10px;
    /* background-color: #ffffff; */
    overflow: hidden;
  }

  .aucSpecialty {
    color: #20a0ff;
  }

  .normalType {
    width: 307px;
  }

  .processManage .main {
    margin-left: 5px;
    width: 34%;
    /* margin-right: 15px; */
    padding-left: 10px;
  }

  .processManage .drag-box {
    display: flex;
    user-select: none;
  }

  .processManage .drag-box-item {
    flex: 1;
    max-width: 290px;
    min-width: 280px;
    background-color: white;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
  }

  .serialNum {
    flex: 1;
    max-width: 75px;
    min-width: 70px;
    background-color: white;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
  }

  .serialNum-title {
    line-height: 38px;
    font-size: 14px;
    height: 44px;
    text-align: center;
    color: #24292e;
    font-weight: 600;
  }

  .processManage .item-title {
    padding: 8px 8px 8px 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #24292e;
    font-weight: 600;
  }

  .processManage .item-ul {
    padding: 0 8px 8px;
    height: 900px;
    overflow-y: scroll;
  }

  .processManage .item-ul::-webkit-scrollbar {
    width: 0;
  }

  .processManage .drag-list {
    border: 1px #e1e4e8 solid;
    text-align: left;
    margin: 5px 0 10px;
    list-style: none;
    background-color: #f0f3fa;
    border-radius: 6px;
    cursor: pointer;
    -webkit-transition: border 0.3s ease-in;
    transition: border 0.3s ease-in;
    display: flex;
    justify-content: space-between;
    height: 43px;
    line-height: 43px
  }

  .tx-item {
    margin-left: 10px;
  }

  .ud-item {
    margin-right: 10px;
    line-height: 41px;
  }

  .processManage .serial-drag-list {
    border: 1px #e1e4e8 solid;
    text-align: center;
    margin: 5px 0 10px;
    list-style: none;
    background-color: #f0f3fa;
    border-radius: 6px;
    cursor: pointer;
    line-height: 43px;
    -webkit-transition: border 0.3s ease-in;
    transition: border 0.3s ease-in;
  }

  .processManage .workFlowList-drag-list {
    border: 1px #e1e4e8 solid;
    text-align: center;
    margin: 5px 0 10px;
    list-style: none;
    background-color: #f0f3fa;
    border-radius: 6px;
    line-height: 43px;
    cursor: pointer;
    -webkit-transition: border 0.3s ease-in;
    transition: border 0.3s ease-in;
  }

  .processManage .drag-list:hover {
    border: 1px solid #20a0ff;
  }

  .processManage .drag-title {
    font-weight: 400;
    line-height: 25px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }

  .processManage .ghost-style {
    display: block;
    color: transparent;
    border-style: dashed;
  }

  .left-seting {
    margin-top: -952px;
    height: 952px;
    margin-right: 15px;
    margin-left: 700px;
    background-color: white;
  }

  .left-seting .rowInfo {
    border-bottom: solid #f0f3fa;
    font-size: 14px;
    color: #24292e;
    font-weight: 600;
    /* height: 933px; */
  }

  .left-seting .baseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .left-seting .baseRowInfo {
    font-size: 14px;
    color: #24292e;
    font-weight: 600;
  }

  .left-seting .setBaseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .processManage .el-input.el-input--small {
    width: 215px !important;
  }

  .left-seting .model-item {
    width: 96%;
    margin: 20px auto;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #409EFF;
    border-radius: 5px;
    position: relative;
  }

  .left-seting .model-title {
    position: absolute;
    left: 20px;
    top: -10px;
    line-height: 20px;
    background: #fff;
    color: #409EFF;
  }

   .left-seting .model-people {

    background: #fff;
    color: #409EFF;
  }

  .left-seting .model-body {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;

  }

  .left-seting .model-body .items {
    width: 140px;
    margin: 10px 0px;
    position: relative;
    cursor: pointer;
  }

  .left-seting .model-body .items img {
    width: 100%;
  }

  .left-seting .model-body .items .name {
    color: #a0a0a0;
    position: absolute;
    height: 30px;
    line-height: 15px;
    left: 25px;
    top: 60px;
    width: 90px;
    text-align: center;
  }

  .left-seting .model-body .items.active .name {
    color: #409EFF;
  }
  #userList{
      display: flex;
      flex-wrap: wrap;

  }
  #userList div{
    width: 60px;
    height: 25px;
    line-height: 25px;
    margin:10px 10px;
    border-radius: 3px;
    color: #409EFF;
    border:1px solid #409EFF;
    font-weight: 300;
    text-align: center;
    cursor: default;
  }
  /* 选择人员 */
  .processManage .leftTree {
    /* width: 500px; */
    padding: 0px 5px;
    background: #fff;
    height: 500px;
    overflow:auto;
  }
  .processManage .leftTree .el-input__inner {
    border: none;
    border-bottom: 1px #c7c7c7 solid;
    border-radius: 0px;
    width: 96%;
    margin: auto;
    display: block;
  }
</style>
