<template>
  <div id="authenticateItemEdit" style="height: 100%;">
    <el-row class="yourAddress normalRow">
      <el-col :span="12" class="normalCol">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>您的位置</el-breadcrumb-item>
          <el-breadcrumb-item>配置</el-breadcrumb-item>
          <el-breadcrumb-item>编辑鉴定专业</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="2" :offset="10" class="normalCol">
        <el-button type="primary" size="mini" @click="goBack()">返回</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-form
        :rules="formDataRules"
        ref="formInfo"
        :model="formData"
        label-width="130px"
        size="small"
      >
        <el-row class="rowInfo">
          <el-col class="baseInfo" :span="24">
            <el-col :span="4">鉴定专业</el-col>
            <el-col :span="4" :offset="16">
              <el-button
                type="primary"
                size="mini"
                @click="saveAucOrg('0')"
                v-if="!editFlag && editType =='0'"
              >保存</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="saveAucOrg('1')"
                v-if="editFlag && (editType =='0' || editType =='1')"
              >保存</el-button>
            </el-col>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称:" prop="aucOrgCname">
              <el-col>
                <el-input v-model="formData.aucOrgCname" v-if="editTypeFlag"></el-input>
                <div v-if="!editTypeFlag">{{formData.aucOrgCname}}</div>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="简称:" prop="aucOrgName">
              <el-col>
                <el-input v-model="formData.aucOrgName" v-if="editTypeFlag"></el-input>
                <div v-if="!editTypeFlag">{{formData.aucOrgName}}</div>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="鉴定父类:" prop="aucOrgFatherId">
              <el-col>
                <el-select
                  v-model="formData.aucOrgFatherId"
                  placeholder="请选择"
                  v-if="editTypeFlag"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in authenticFather"
                    :key="item.dictId"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  >
                    <span style="float: left">{{ item.dictValue }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.rootKey }}</span>
                  </el-option>
                </el-select>
                <div v-if="!editTypeFlag">{{formData.aucOrgFatherId}}</div>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="鉴定要求:" prop="aucOrgName">
              <el-select
              v-model="formData.aucOrgItem"
              placeholder="请选择"
              v-if="editTypeFlag"
              filterable
              clearable
            >
              <el-option
                v-for="item in allDictInfo"
                :key="item.dictId"
                :label="item.dictKey"
                :value="item.dictKey"
              >
                <span style="float: left">{{ item.dictValue }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.rootKey }}</span>
              </el-option>
            </el-select>
            </el-form-item>

            <div v-if="!editTypeFlag">{{formData.aucOrgItem}}</div>
          </el-col>

        </el-row>
      </el-form>

      <p class="instertP"></p>
      <el-row class="rowInfo">
        <el-col class="baseInfo" :span="24">
          <el-col :span="2">编号模板</el-col>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="addAutNumber('0')" size="mini" v-if="editTypeFlag">新增</el-button>
          <el-button type="danger" @click="deleteAutNumber()" size="mini" v-if="editTypeFlag">删除</el-button>
          <el-table
            :data="autNumberTableData"
            style="width: 100%"
            @selection-change="autNumberHandleSelectionChange"
            @row-click="autNumberClickRow" align="center"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="auth" align="center" label="所属" ></el-table-column>
            <el-table-column prop="value" label="模板值" align="center" width="240"></el-table-column>
            <el-table-column label="操作" v-if="editTypeFlag" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="addAutNumber('1',scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="10" :offset="4">
          <el-button type="primary" @click="addNumber('0')" size="mini" v-if="editTypeFlag">新增</el-button>
          <el-button type="danger" @click="deleteNumber()" size="mini" v-if="editTypeFlag">删除</el-button>
          <el-table
            :data="numberTableData"
            style="width: 100%" align="center"
            @selection-change="numberHandleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="key" align="center" label="名称" width="180"></el-table-column>
            <el-table-column prop="value" align="center" label="值" ></el-table-column>
            <el-table-column label="操作" align="center" v-if="editTypeFlag">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="addNumber('1',scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <p class="instertP"></p>
      <el-row class="rowInfo">
        <el-col class="baseInfo" :span="24">
          <el-col :span="2">被鉴定人</el-col>
          <el-col :span="4" :offset="18" v-if="editTypeFlag">
            <el-button type="primary" size="mini" @click="addColumnInfo('1')">新增</el-button>
            <el-button type="danger" size="mini" @click="deleteColumnInfo('1')">删除</el-button>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            :data="authenticatorTableData"
            tooltip-effect="dark"
            style="width: 100%" align="center"
            @selection-change="authenticatorHandleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="name" align="center" label="列名称" width="150"></el-table-column>
            <el-table-column prop="wordRelationshipStr" align="center" label="word关联字段" width="150"></el-table-column>
            <el-table-column prop="align" align="center" label="列对齐模式" width="150"></el-table-column>
            <el-table-column prop="label" align="center" label="列显示名称" width="150"></el-table-column>
            <el-table-column
              prop="formatter"
              label="是否格式化"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column prop="formatType" align="center" label="格式化格式" width="150"></el-table-column>
            <el-table-column prop="width" align="center" label="列宽度" width="150"></el-table-column>
            <el-table-column
              prop="operations"
              label="是否是操作按钮" align="center"
              width="150"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column
              prop="overflow"
              label="是否隐藏列数据"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column
              prop="tableShow"
              label="是否在table上显示"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column prop="placeholder" label="占位符" width="150"></el-table-column>
            <el-table-column
              prop="readonly"
              label="是否只读"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column
              prop="disabled"
              label="是否禁用"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column prop="formType" align="center" label="form类型" width="150"></el-table-column>
            <el-table-column prop="maxlength" align="center" label="最大输入长度" width="150"></el-table-column>
            <el-table-column prop="rowsSize" align="center" label="textarea显示行数" width="150"></el-table-column>
            <el-table-column prop="resize" align="center" label="是否可缩放" width="150"></el-table-column>
            <el-table-column prop="dictName" align="center" label="字典" width="150"></el-table-column>
            <el-table-column prop="validateContent" align="center" label="验证规则" width="150"></el-table-column>
            <el-table-column
              class-name="operations"
              label="操作"
              width="100" align="center"
              v-if="editTypeFlag"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editColumnInfo(scope.row,'1')">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <p class="instertP"></p>
      <el-row class="rowInfo">
        <el-col class="baseInfo" :span="24">
          <el-col :span="2">检材样本</el-col>
          <el-col :span="4" :offset="18" v-if="editTypeFlag">
            <el-button type="primary" size="mini" @click="addColumnInfo('2')">新增</el-button>
            <el-button type="danger" size="mini" @click="deleteColumnInfo('2')">删除</el-button>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            :data="materialTableData"
            tooltip-effect="dark"
            style="width: 100%" align="center"
            @selection-change="materialHandleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="name" align="center" label="列名称" width="150"></el-table-column>
            <el-table-column prop="wordRelationshipStr" align="center" label="word关联字段" width="150"></el-table-column>
            <el-table-column prop="align" align="center" label="列对齐模式" width="150"></el-table-column>
            <el-table-column prop="label" align="center" label="列显示名称" width="150"></el-table-column>
            <el-table-column
              prop="formatter"
              label="是否格式化"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column prop="formatType" align="center" label="格式化格式" width="150"></el-table-column>
            <el-table-column prop="width" align="center" label="列宽度" width="150"></el-table-column>
            <el-table-column
              prop="operations"
              label="是否是操作按钮"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column
              prop="overflow"
              label="是否隐藏列数据"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column
              prop="tableShow"
              label="是否在table上显示"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column prop="placeholder" align="center" label="占位符" width="150"></el-table-column>
            <el-table-column
              prop="readonly"
              label="是否只读"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column
              prop="disabled"
              label="是否禁用"
              width="150" align="center"
              :formatter="flagListFormatter"
            ></el-table-column>
            <el-table-column prop="formType" align="center" label="form类型" width="150"></el-table-column>
            <el-table-column prop="maxlength" align="center" label="最大输入长度" width="150"></el-table-column>
            <el-table-column prop="rowsSize" align="center" label="textarea显示行数" width="150"></el-table-column>
            <el-table-column prop="resize" align="center" label="是否可缩放" width="150"></el-table-column>
            <el-table-column prop="dictName" align="center" label="字典" width="150"></el-table-column>
            <el-table-column prop="validateContent" align="center" label="验证规则" width="150"></el-table-column>
            <el-table-column
              align="center"
              class-name="operations"
              label="操作"
              width="100"
              v-if="editTypeFlag"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editColumnInfo(scope.row,'2')">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-dialog :title="title" :visible.sync="authenticatorDialog" width="43%">
        <el-form
          label-width="140px"
          :inline="true"
          size="small"
          ref="authenticatorAddForm"
          :model="authenticator"
        >
          <el-form-item label="名称:" prop="name">
            <el-input v-model="authenticator.name" style="width:203px"></el-input>
          </el-form-item>
          <el-form-item label="word关联字段:" prop="align">
            <el-select
              v-model="authenticator.wordRelationship"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="item in wordRelationshipDictInfo"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="列对齐模式:" prop="align">
            <el-select v-model="authenticator.align" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in alignList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="列显示名称:" prop="label">
            <el-input v-model="authenticator.label" style="width:203px"></el-input>
          </el-form-item>
          <el-form-item label="格式化类型:" prop="formatType">
            <el-select v-model="authenticator.formatType" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in formatTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="格式化格式:" prop="formatter">
            <el-input v-model="authenticator.formatter" style="width:203px"></el-input>
          </el-form-item>
          <el-form-item label="列宽度:" prop="width">
            <el-input v-model="authenticator.width" style="width:203px"></el-input>
          </el-form-item>
          <el-form-item label="是否是操作按钮:" prop="operations">
            <el-select v-model="authenticator.operations" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in flagList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否隐藏列数据:" prop="overflow">
            <el-select v-model="authenticator.overflow" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in flagList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否在table上显示:" prop="tableShow">
            <el-select v-model="authenticator.tableShow" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in flagList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="占位符:" prop="placeholder">
            <el-input v-model="authenticator.placeholder" style="width:203px"></el-input>
          </el-form-item>
          <el-form-item label="是否只读:" prop="readonly">
            <el-select v-model="authenticator.readonly" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in flagList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否禁用:" prop="disabled">
            <el-select v-model="authenticator.disabled" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in flagList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="form类型:" prop="formType">
            <el-select v-model="authenticator.formType" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in formTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最大输入长度:" prop="maxlength">
            <el-input v-model="authenticator.maxlength" style="width:203px"></el-input>
          </el-form-item>
          <el-form-item label="textarea显示行数:" prop="rowsSize">
            <el-input v-model="authenticator.rowsSize" style="width:203px"></el-input>
          </el-form-item>
          <el-form-item label="是否可缩放:" prop="resize">
            <el-select v-model="authenticator.resize" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in resizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字典:" prop="dictName">
            <el-select
              v-model="authenticator.dictName"
              placeholder="请选择"
              v-if="editTypeFlag"
              filterable
              clearable
            >
              <el-option
                v-for="item in allDictInfo"
                :key="item.dictId"
                :label="item.dictKey"
                :value="item.dictKey"
              >
                <span style="float: left">{{ item.dictValue }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.rootKey }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="验证规则:">
            <el-select v-model="authenticator.validateContent" placeholder="请选择">
              <el-option value>无</el-option>
              <el-option
                v-for="item in validateContent"
                :key="item.dictId"
                :value="item.dictValue"
              >{{item.dictValue}}</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addReset()" size="mini">取 消</el-button>
          <el-button type="primary" @click="addSubmit()" size="mini" v-if="!columnEditFlag">确 定</el-button>
          <el-button type="primary" @click="updateSubmit()" size="mini" v-if="columnEditFlag">更 新</el-button>
        </span>
      </el-dialog>

      <el-dialog :title="autNumberTitle" :visible.sync="autNumberdialogVisible" width="30%">
        <el-form ref="autNumberForm" :model="autNumber" label-width="80px">
          <el-form-item label="所属:">
            <el-select
              v-model="autNumber.auth"
              placeholder="请选择"
              v-if="editTypeFlag"
              filterable
              clearable
            >
              <el-option
                v-for="item in autNumberAuthList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模板值:">
            <el-input v-model="autNumber.value"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="autNumberdialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="submitAutNumber()" size="mini">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog :title="numberTitle" :visible.sync="numberdialogVisible" width="30%">
        <el-form ref="numberForm" :model="numberContent" label-width="80px">
          <el-form-item label="名称:">
            <el-input v-model="numberContent.key"></el-input>
          </el-form-item>
          <el-form-item label="值:">
            <el-input v-model="numberContent.value"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="numberdialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="submitNumber()" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      editType: "",
      formData: {},
      aucOrgId: "",
      formDataRules: {
        aucOrgCname: [
          { required: true, message: "鉴定专业名称不能为空", trigger: "blur" }
        ],
        aucOrgName: [
          { required: true, message: "鉴定专业简称不能为空", trigger: "blur" }
        ],
        aucOrgFatherId: [
          { required: true, message: "鉴定项目不能为空", trigger: "blur" }
        ]
      },
      action: "",
      title: "",
      type: "",
      editFlag: "",
      authenticatorDialog: false,
      authenticatorTableData: [],
      materialTableData: [],
      columnEditFlag: false,
      authenticatorHandleSelectionChangeList: [],
      materialHandleSelectionChangeList: [],
      authenticator: {},
      editTypeFlag: true,
      allDictInfo: [],
      validateContent: [],
      autNumberdialogVisible: false,
      autNumber: {},
      autNumberTableData: [],
      autNumberHandleSelectionChangeList: [],
      autNumberTitle: "",
      autId: "",
      numberTableData: [],
      numberdialogVisible: false,
      numberEditFlag: "",
      numberHandleSelectionChangeList: [],
      numberTitle: "",
      numberContent: {},
      wordRelationshipDictInfo: [],
      authenticFather: [],
      autNumberAuthList: [
        {
          value: "委托",
          label: "委托"
        },
        {
          value: "受理",
          label: "受理"
        },
        {
          value: "鉴定",
          label: "鉴定"
        },
        {
          value: "检材",
          label: "检材"
        },
        {
          value: "样本",
          label: "样本"
        }
      ],
      flagList: [
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
        }
      ],
      alignList: [
        {
          value: "center",
          label: "center"
        },
        {
          value: "left",
          label: "left"
        },
        {
          value: "right",
          label: "right"
        }
      ],
      formatTypeList: [
        {
          value: "0",
          label: "none"
        },
        {
          value: "1",
          label: "string"
        },
        {
          value: "2",
          label: "date"
        }
      ],
      formTypeList: [
        {
          value: "input",
          label: "input"
        },
        {
          value: "select",
          label: "select"
        },
        {
          value: "date",
          label: "date"
        },
        {
          value: "switch",
          label: "switch"
        },
        {
          value: "checkbox",
          label: "checkbox"
        },
        {
          value: "radios",
          label: "radios"
        },
        {
          value: "textarea",
          label: "textarea"
        }
      ],
      resizeList: [
        {
          value: "none",
          label: "none"
        },
        {
          value: "both",
          label: "both"
        },
        {
          value: "horizontal",
          label: "horizontal"
        },
        {
          value: "vertical",
          label: "vertical"
        }
      ]
    };
  },
  methods: {
    submitNumber() {
      var numberEditFlag = this.numberEditFlag;
      var url = "";
      if (numberEditFlag == "0") {
        url = "number/insert";
      } else if (numberEditFlag == "1") {
        url = "number/update";
      }
      this.numberContent["autId"] = this.autId;
      this.postHttp(url, this.numberContent, res => {
        if (res.code == "0") {
          this.notify_success("操作成功");
        } else {
          this.notify_warning(res.msg);
        }
        this.numberdialogVisible = false;
        this.getNumberTableData(this.autId);
      });
    },
    getNumberTableData(autId) {
      this.postHttp("number/selectByAutId", autId, res => {
        if (res.code == "0") {
          this.numberTableData = res.data;
        } else {
          this.notify_warning(res.msg);
        }
      });
    },
    numberHandleSelectionChange(rows) {
      this.numberHandleSelectionChangeList = rows;
    },
    autNumberClickRow(row) {
      this.autId = row.id;
      //numberTableData:[],
      this.getNumberTableData(this.autId);
    },
    deleteAutNumber() {
      if (this.autNumberHandleSelectionChangeList.length == 0) {
        this.notify_warning("请选择要删除的编号模板信息!");
      } else {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.postHttp(
              "autNumber/delete",
              this.autNumberHandleSelectionChangeList,
              res => {
                if (res.code == "0") {
                  this.notify_success("操作成功!");
                  this.getAutNumberTableData(this.formData.aucOrgId);
                  this.getNumberTableData(this.autId);
                } else {
                  this.notify_warning(res.msg);
                }
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    deleteNumber() {
      if (this.numberHandleSelectionChangeList.length == 0) {
        this.notify_warning("请选择要删除的编号信息!");
      } else {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.postHttp(
              "number/delete",
              this.numberHandleSelectionChangeList,
              res => {
                if (res.code == "0") {
                  this.notify_success("操作成功!");
                  this.getNumberTableData(this.autId);
                } else {
                  this.notify_warning(res.msg);
                }
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    autNumberHandleSelectionChange(rows) {
      this.autNumberHandleSelectionChangeList = rows;
    },
    submitAutNumber() {
      var autNumberEditFlag = this.autNumberEditFlag;
      var url = "";
      if (autNumberEditFlag == "0") {
        url = "autNumber/insert";
      } else if (autNumberEditFlag == "1") {
        url = "autNumber/update";
      }
      this.autNumber["aucOrgId"] = this.formData.aucOrgId;
      this.postHttp(url, this.autNumber, res => {
        if (res.code == "0") {
          this.notify_success("操作成功");
        } else {
          this.notify_warning(res.msg);
        }
        this.autNumberdialogVisible = false;
        this.getAutNumberTableData(this.formData.aucOrgId);
      });
    },
    addAutNumber(type, row) {
      if (type == "0") {
        this.autNumber = {};
        this.autNumberTitle = "新增编号模板";
      } else if (type == "1") {
        this.autNumber = row;
        this.autNumberTitle = "编辑编号模板";
      }
      this.autNumberEditFlag = type;
      this.autNumberdialogVisible = true;
    },
    addNumber(type, row) {
      if (type == "0") {
        if (!this.autId) {
          this.notify_warning("请先选择要添加的编码模板!");
          return;
        }
        this.numberContent = {};
        this.numberTitle = "新增编号内容";
      } else if (type == "1") {
        this.numberContent = row;
        this.numberTitle = "编辑编号内容";
      }
      this.numberEditFlag = type;
      this.numberdialogVisible = true;
    },
    formatTypeFormatter(row, column, cellValue, index) {
      var str = "";
      for (let i in this.formatTypeList) {
        if (this.formatTypeList[i]["value"] == cellValue) {
          str = this.formatTypeList[i]["label"];
        }
      }
      return str;
    },
    flagListFormatter(row, column, cellValue, index) {
      if (cellValue == "0") {
        return "否";
      } else if (cellValue == "1") {
        return "是";
      }
    },
    selectByAucOrgIdWithColumn(aucOrgId) {
      this.postHttp("aucOrg/selectByAucOrgIdWithColumn", aucOrgId, res => {
        if (res.code == "0") {
          console.log(res);
          this.formData = res.data.aucOrg;
          this.authenticatorTableData = res.data.authenticatorList;
          this.materialTableData = res.data.materialList;
        } else {
          this.notify_warning(res.msg);
        }
      });
    },
    saveAucOrg(type) {
      this.$refs["formInfo"].validate(valid => {
        if (valid) {
          var url = "";
          if (type == "0") {
            url = "aucOrg/insert";
          } else if (type == "1") {
            url = "aucOrg/update";
          }
          console.log(this.formData);
          this.postHttp(url, this.formData, res => {
            if (res.code == "0") {
              this.notify_success("操作成功");
              this.formData.aucOrgId = res.data.aucOrgId;
              this.editFlag = true;
            } else {
              this.notify_warning(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addNewAucOrg() {
      this.formData = {
        aucOrgId: "",
        aucOrgCname: "",
        aucOrgName: "",
        aucOrgFatherId: "",
      };
      this.authenticatorTableData = [];
      this.materialTableData = [];
      this.editInfoShowFlag = false;
      this.editFlag = false;
    },
    addColumnInfo(type) {
      if (!this.formData.aucOrgId) {
        this.notify_warning("请先配置鉴定专业!");
        return false;
      }
      //新增被鉴定人
      if (type == "1") {
        this.title = "被鉴定人";
        this.type = "1";
      } else if (type == "2") {
        this.title = "检材样本";
        this.type = "2";
      }
      this.authenticator = {
        formatType: "0",
        operations: "0",
        overflow: "0",
        tableShow: "1",
        readonly: "0",
        disabled: "0",
        align: "center",
        name: "c0",
        wordRelationship: "0"
      };
      this.authenticatorDialog = true;
      this.columnEditFlag = false;
    },
    deleteColumnInfo(type) {
      if (!this.formData.aucOrgId) {
        this.notify_warning("请先配置鉴定专业!");
        return false;
      }
      var list = [];
      if (type == "1") {
        list = this.authenticatorHandleSelectionChangeList;
      } else if (type == "2") {
        list = this.materialHandleSelectionChangeList;
      }
      if (!list || list.length == 0) {
        this.notify_warning("请选择删除的数据!");
        return false;
      }

      list.forEach((item)=>{
        item['aucOrgId']=this.formData.aucOrgId;
        item['type']=type;
      })
      this.$confirm("此操作将删除选中的信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.postHttp("evidenceColumn/deleteBatch", list, res => {
            if (res.code == "0") {
              this.notify_success("删除成功!");
              this.selectByAucOrgIdWithColumn(this.formData.aucOrgId);
            } else {
              this.notify_warning(res.msg);
            }
          });
        })
        .catch(() => {
          //取消
        });
    },
    editColumnInfo(obj, type) {
      if (!this.formData.aucOrgId) {
        this.notify_warning("请先配置鉴定专业!");
        return false;
      }
      //新增被鉴定人
      if (type == "1") {
        this.title = "被鉴定人";
        this.type = "1";
      } else if (type == "2") {
        this.title = "检材样本";
        this.type = "2";
      }
      this.authenticator = obj;
      this.authenticatorDialog = true;
      this.columnEditFlag = true;
    },
    addSubmit() {
      this.authenticator["aucOrgId"] = this.formData.aucOrgId;
      this.authenticator["type"] = this.type;
      this.postHttp("evidenceColumn/insert", this.authenticator, res => {
        if (res.code == "0") {
          this.notify_success("新增成功!");
          this.authenticator = {};
          this.authenticatorDialog = false;
          this.selectByAucOrgIdWithColumn(this.formData.aucOrgId);
        } else {
          this.notify_warning(res.msg);
        }
      });
    },
    updateSubmit() {
      this.postHttp("evidenceColumn/update", this.authenticator, res => {
        if (res.code == "0") {
          this.notify_success("修改成功!");
          this.authenticator = {};
          this.authenticatorDialog = false;
          this.selectByAucOrgIdWithColumn(this.formData.aucOrgId);
        } else {
          this.notify_warning(res.msg);
        }
      });
    },
    addReset() {
      this.authenticator = {};
      this.authenticatorDialog = false;
    },
    authenticatorHandleSelectionChange(rows) {
      this.authenticatorHandleSelectionChangeList = rows;
    },
    materialHandleSelectionChange(rows) {
      this.materialHandleSelectionChangeList = rows;
    },
    editInfo(editType, aucOrgId) {
      this.setData("editType", editType);
      this.setData("aucOrgId", aucOrgId);
      this.$router.push("authenticateItemEdit");
    },
    goBack() {
      //this.$router.push("authenticateItem");
      this.$router.go(-1);
    },
    getAllDictInfo() {
      this.postHttpForLogin("dict/getAllDictInfo", this.authenticator, res => {
        if (res.code == "0") {
          this.allDictInfo = res.data;
        } else {
          this.notify_warning(res.msg);
        }
      });
    },
    getAuthenticFather() {
      var data = {
          "parentKeyList": ["AUTHENTICFATHERTYPE"]
        };
      this.postHttpForLogin("dict/getDictInfo", data, res => {
          if (res.code == '0') {
            this.authenticFather = res.data.AUTHENTICFATHERTYPE;
          } else {
            this.notify_warning(res.msg);
          }
        });
    },
    getAutNumberTableData(aucOrgId) {
      this.postHttp("autNumber/selectAllListByAucOrgId", aucOrgId, res => {
        if (res.code == "0") {
          this.autNumberTableData = res.data;
        } else {
          this.notify_warning(res.msg);
        }
      });
    },
    getValidateContent() {
      this.postHttpForLogin(
        "dict/getDictInfo",
        { parentKey: "VALIDATE", parentValue: "验证规则" },
        res => {
          if (res.code == "0") {
            this.validateContent = res.data;
          } else {
            this.notify_warning(res.msg);
          }
        }
      );
    },
    getWordRelationshipDictInfo() {
      var data = {
        parentKeyList: ["WORDRELATIONSHIP"]
      };
      this.postHttpForLogin("dict/getDictInfo", data, res => {
        if (res.code == "0") {
          this.wordRelationshipDictInfo = res.data.WORDRELATIONSHIP;
        } else {
          this.notify_warning(res.msg);
        }
      });
    }
  },
  activated: function() {
    var editType = this.getData("editType");
    var aucOrgId = this.getData("aucOrgId");
    this.editType = editType;
    this.formData.aucOrgId = aucOrgId;
    if (editType == "0") {
      //新增
      this.editTypeFlag = true;
      this.formData = {
        aucOrgId: "",
        aucOrgCname: "",
        aucOrgName: "",
        aucOrgFatherId: "",
      };
      this.authenticatorTableData = [];
      this.materialTableData = [];
      this.editFlag = false;
    } else if (editType == "1") {
      //编辑
      this.editFlag = true;
      this.editTypeFlag = true;
      this.selectByAucOrgIdWithColumn(aucOrgId);
      this.getAutNumberTableData(aucOrgId);
    } else if (editType == "2") {
      //查看
      this.editTypeFlag = false;
      this.selectByAucOrgIdWithColumn(aucOrgId);
      this.getAutNumberTableData(aucOrgId);
    }
    var baseUrl = this.getBaseUrl();
    this.action = baseUrl + "upload/uploadSingle";
    this.getAllDictInfo();
    this.getValidateContent();
    this.getWordRelationshipDictInfo();
    this.getAuthenticFather();
  }
};
</script>

<style>
* {
  font-size: 13px;
}
#authenticateItemEdit {
  background-color: #f0f3fa;
  width: 100%;
  height: 100%;
  overflow: auto;
}

#authenticateItemEdit .normalRow {
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  padding-left: 10px;
  background-color: #ffffff;
  overflow: hidden;
}
#authenticateItemEdit .el-row {
  margin-left: 15px;
  margin-right: 15px;
  padding-left: 10px;
  background-color: #ffffff;
}
#authenticateItemEdit .normalRow .normalCol {
  height: 3em;
  line-height: 3em;
}
#authenticateItemEdit .el-breadcrumb {
  height: 3em;
  line-height: 3em;
}

/* 树形图 css */
#authenticateItemEdit .tree {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#authenticateItemEdit .choicedName {
  text-align: center;
  height: 40px;
  line-height: 40px;
  position: relative;
}
#authenticateItemEdit .sendChoice {
  position: absolute;
  right: 0px;
  top: 0px;
  color: #fff;
  background: #1e66dc;
  height: 30px;
  line-height: 30px;
  margin: 5px 10px;
  width: 130px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
}
#authenticateItemEdit .backLevel {
  position: absolute;
  right: 140px;
  top: 0px;
  color: #fff;
  background: #1e66dc;
  height: 30px;
  line-height: 30px;
  margin: 5px 10px;
  width: 130px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
}
#authenticateItemEdit .tree .items {
  width: 10%;
  margin: 20px 1%;
  box-sizing: border-box;
  height: 100px;
  padding: 20px 10px;
  line-height: 20px;
  text-align: center;
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 4px 20px #d4d4d4;
  font-size: 16px;
  cursor: pointer;
  position: relative;
}
#authenticateItemEdit .tree .items .children {
  position: absolute;
  width: 100%;
  text-align: center;
  color: #666;
  height: 30px;
  line-height: 30px;
  left: 0;
  bottom: 0;
  z-index: 999;
}
#authenticateItemEdit .tree .items.active {
  background: #5588fe;
  color: #fff;
}
#authenticateItemEdit .tree .items.active .children {
  color: #fff;
}

/*中间部分 css*/
#authenticateItemEdit .orgName {
  background: #dde7ff;
  border-radius: 4px;
  width: 97%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 10px auto;
  color: #000;
}

#authenticateItemEdit .rowInfo {
  border-bottom: solid #f0f3fa;
}

#authenticateItemEdit .baseInfo {
  height: 3em;
  line-height: 3em;
  border-bottom: solid #f0f3fa;
  font-size: 16px;
  margin-bottom: 8px;
  background-color: gainsboro;
  margin-left: -34px;
  color: black;
  padding-left: 10px;
}
#authenticateItemEdit .baseInfoTop {
  height: 3em;
  line-height: 3em;
  font-size: 20px;
  font-weight: bold;
}

#authenticateItemEdit .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#authenticateItemEdit .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
#authenticateItemEdit .avatar-uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
#authenticateItemEdit .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
#authenticateItemEdit .el-input.el-input--small {
  width: 215px !important;
}
.instertP {
  height: 20px;
}
</style>
