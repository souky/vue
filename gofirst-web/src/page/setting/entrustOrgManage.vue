<template>
    <div class="entrustOrgManage">
        <div class="mainItem breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>您的位置</el-breadcrumb-item>
            <el-breadcrumb-item>配置</el-breadcrumb-item>
            <el-breadcrumb-item>流水号管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
    <div class="mainItem">
      <el-tabs type="border-card">
        <!-- 委托机构 -->
        <el-tab-pane label="委托机构">
              <el-table :data="tableData" align="center" style="width: 100%">
                   <el-table-column type="expand">
                      <template slot-scope="props">
                          <el-form label-position="left" class="list-table-expand">
                              <el-table :data="props.row.autNumList" align="center" style="width: 98% ">
                                  <el-table-column label="序号" type="index" width="50" ></el-table-column>
                                  <el-table-column align="center" prop="auth" label="属性"></el-table-column>
                                  <el-table-column align="center" prop="value" label="模板值"></el-table-column>
                                  <el-table-column align="center" prop="valueNow" label="当前流水号"></el-table-column>
                                  <el-table-column align="center" prop="num" label="当前数值" width="80">
                                    <template slot-scope="scope">
                                      <el-input v-model="scope.row.num"></el-input>
                                    </template>
                                  </el-table-column>
                                  <el-table-column label="操作" align="center" width="90">
                                      <template slot-scope="scope">
                                          <el-button type="primary" size="mini" plain @click="saveNum(scope.$index, scope.row)">保存</el-button>
                                      </template>
                                  </el-table-column>
                              </el-table>
                          </el-form>
                      </template>
                  </el-table-column>
                  <el-table-column align="center" prop="orgCname" label="委托单位"></el-table-column>
                  <el-table-column align="center" prop="orgAddr" label="机构地址"></el-table-column>
                  <el-table-column align="center" prop="orgTel" label="联系电话"></el-table-column>
                  <el-table-column label="操作" align="center" width="120">
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="aucOrgShow(scope.row.orgId,'orgId')">创建流水号</el-button>
                      </template>
                  </el-table-column>
              </el-table>
      </el-tab-pane>
      <!-- 鉴定机构 -->
      <el-tab-pane label="鉴定机构">
          <el-row>
  			<el-table	ref="aucOrgTable"	:data="aucOrgTableData"	tooltip-effect="dark" style="width: 100%">
          <el-table-column type="expand">
              <template slot-scope="props">
                  <el-form label-position="left" class="list-table-expand">
                      <el-table :data="props.row.autNumList" align="center" style="width: 98% ">
                          <el-table-column label="序号" type="index" width="50" ></el-table-column>
                          <el-table-column align="center" prop="auth" label="属性"></el-table-column>
                          <el-table-column align="center" prop="value" label="模板值"></el-table-column>
                          <el-table-column align="center" prop="valueNow" label="当前流水号"></el-table-column>
                          <el-table-column align="center" prop="num" label="当前数值" width="80">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.num"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" align="center" width="90">
                              <template slot-scope="scope">
                                  <el-button type="primary" size="mini" plain @click="saveNum(scope.$index, scope.row)">保存</el-button>
                              </template>
                          </el-table-column>
                      </el-table>
                  </el-form>
              </template>
          </el-table-column>
  				<el-table-column prop="aucOrgCname" label="鉴定专业全称"></el-table-column>
  				<el-table-column prop="aucOrgName" label="鉴定专业简称" ></el-table-column>
  				<el-table-column prop="aucOrgFatherStr" label="鉴定专业父类" ></el-table-column>
  				<el-table-column align='center'  class-name="operations" label="操作" width="250">
  					<template slot-scope="scope">
  						<el-button type="primary" size="mini" @click="aucOrgShow(scope.row.aucOrgId,'aucOrgId')">创建流水号</el-button>
  					</template>
  				</el-table-column>
  			</el-table>
  		</el-row>
          </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :title="numberTitle" :visible.sync="numberdialogVisible" width="40%">
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

    <el-dialog :title="numberTitle" :visible.sync="aucOrgDialog" width="70%">
      <!-- <p class="instertP"></p> -->
      <el-row class="rowInfo">
            <el-col class="baseInfo" :span="24"></el-col>
            <el-col :span="11">
            <el-button type="primary" @click="addAutNumber('0')" size="mini" v-if="editTypeFlag">新增</el-button>
            <el-button type="danger" @click="deleteAutNumber()" size="mini" v-if="editTypeFlag">删除</el-button>
            <el-table :data="autNumberTableData" style="width: 100%" @selection-change="autNumberHandleSelectionChange" @row-click="autNumberClickRow">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="auth" label="所属" width="70"></el-table-column>
                <el-table-column prop="value" label="模板值" width="220px" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" v-if="editTypeFlag">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="addAutNumber('1',scope.row)">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
            </el-col>
            <el-col :span="11" :offset="2">
            <el-button type="primary" @click="addNumber('0')" size="mini" v-if="editTypeFlag">新增</el-button>
            <el-button type="danger" @click="deleteNumber()" size="mini" v-if="editTypeFlag">删除</el-button>
            <el-table :data="numberTableData" style="width: 100%" @selection-change="numberHandleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="key" label="名称"></el-table-column>
                <el-table-column prop="value" label="值"></el-table-column>
                <el-table-column prop="digit" label="位数"></el-table-column>
                <el-table-column label="操作" v-if="editTypeFlag">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="addNumber('1',scope.row)">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
            </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-col :span="17" style="color:#F00">两个变动的值：'year'会随着年份而变化,'num'是初始值！！</el-col>
          <el-button @click="aucOrgDialog = false" size="mini">关 闭</el-button>
          <!-- <el-button type="primary" @click="submitNumber()" size="mini">确 定</el-button> -->
        </span>
    </el-dialog>


    <el-dialog :title="autNumberTitle" :visible.sync="autNumberdialogVisible" width="30%">
        <el-form ref="autNumberForm" :model="autNumber" label-width="80px">
          <el-form-item label="所属:">
            <el-select v-model="autNumber.auth" placeholder="请选择" v-if="editTypeFlag" filterable clearable>
              <el-option v-for="item in autNumberAuthList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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

      <el-dialog :title="numberTitle" :visible.sync="numberdialogVisible" width="40%">
        <el-form ref="numberForm" :model="numberContent" label-width="80px">
          <el-form-item label="名称:">
            <el-input v-model="numberContent.key"></el-input>
          </el-form-item>
          <el-form-item label="值:">
            <el-input v-model="numberContent.value"></el-input>
          </el-form-item>
          <el-form-item label="位数:">
            <el-input v-model="numberContent.digit"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="numberdialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="submitNumber()" size="mini">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>
<script>
export default {
    data(){
        return {
            autNumber:{
                id:'',
                auth:'委托',
                value:'',
                orgId:'',
            },
            numberContent:{
                key:'',
                value:'',
                digit:''
            },
            tableData:[],
            dialogVisible:false,
            aucOrgDialog:false,
            numberdialogVisible:false,
            numberHandleSelectionChangeList:[],
            numberTitle:'',
            requestInfo:{},
            aucOrgTableData:[],
            editTypeFlag: true,
            autNumberdialogVisible: false,
            autNumber: {},
            autNumberWt:[],
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
            tempId : '',
            tempType:'',
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



        }
    },
    methods:{
        getEntrustOrgInfo(){
            this.postHttp("autNumber/getOrgListWithNumList", '', res => {
                if (res.code == "0") {
                    this.tableData = res.data;
                } else {
                    this.notify_warning(res.msg);
                }
            });
        },
        handleEdit(index,info){
            this.dialogVisible = true;
            this.requestInfo=info;
            //查询是否有 autNumber
            this.postHttp("autNumber/selectAllListByOrgId", this.requestInfo.orgId, res => {
                if (res.code == "0") {
                    //this.notify_success("操作成功");
                    console.log(res.data);
                    this.autNumber=res.data[0];
                    //查询number数据
                    this.getNumberTableData(this.autNumber.id);
                } else {
                    this.notify_warning(res.msg);
                }
            });
        },
        addNumber(type, row) {
            if (type == "0") {
                if (!this.autNumber.id) {
                    this.notify_warning("请先添加的编码模板!");
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
        numberHandleSelectionChange(rows) {
            this.numberHandleSelectionChangeList = rows;
        },
        submitNumber() {
            var numberEditFlag = this.numberEditFlag;
            var url = "";
            if (numberEditFlag == "0") {
                url = "number/insert";
            } else if (numberEditFlag == "1") {
                url = "number/update";
            }
            this.numberContent["autId"] = this.autNumber.id;
            this.postHttp(url, this.numberContent, res => {
                if (res.code == "0") {
                this.notify_success("操作成功");
                } else {
                this.notify_warning(res.msg);
                }
                this.numberdialogVisible = false;
                this.getNumberTableData(this.autNumber.id);
            });
        },
        submitAutNumber() {
            var url = "";
            if (this.autNumber.id == '' || this.autNumber.id == undefined) {
                url = "autNumber/insert";
            } else {
                url = "autNumber/update";
            }

            this.autNumber[this.tempType] = this.tempId;
            this.postHttp(url, this.autNumber, res => {
                if (res.code == "0") {
                    this.notify_success("操作成功");
                } else {
                    this.notify_warning(res.msg);
                }
                this.autNumberdialogVisible = false;
                this.getAutNumberTableData(this.tempId);
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
                            this.getNumberTableData(this.autNumber.id);
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

        getAucOrgList(){
			var data = {};
			this.postHttp("autNumber/getAucOrgListWithNumList",data,res =>{
				if(res.code == '0'){
					this.aucOrgTableData=res.data;
				}else{
					this.notify_warning(res.msg);
				}
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
                  this.getAutNumberTableData(this.aucOrgId);
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
    aucOrgShow(param,type){
        this.tempId = param;
        this.tempType = type;
        this.aucOrgDialog = true;
        this.$set(this,'numberTableData',[]);
        this.getAutNumberTableData(param);
    },
    getAutNumberTableData(aucOrgId) {
      let url = '';
      if(this.tempType == 'orgId'){
        url = 'autNumber/selectAllListByOrgId';
      }else{
        url = 'autNumber/selectAllListByAucOrgId';
      }
      this.postHttp(url, aucOrgId, res => {
        if (res.code == "0") {
          this.autNumberTableData = res.data;
        } else {
          this.notify_warning(res.msg);
        }
      });
    },
    autNumberHandleSelectionChange(rows) {
      this.autNumberHandleSelectionChangeList = rows;
    },

    submitAutNumberWt() {
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
    numberHandleSelectionChange(rows) {
      this.numberHandleSelectionChangeList = rows;
    },
    autNumberClickRow(row) {
      this.autId = row.id;
      this.getNumberTableData(this.autId);
    },
    saveNum(index,row){
      console.log('saveNum', row)
      this.postHttp("autNumber/update", row, res => {
          if (res.code == "0") {
            this.notify_success("保存成功！！");
          } else {
            this.notify_warning(res.msg);
          }
        //this.getAucOrgList();
      });
    }

    },
    activated:function(){
        this.getEntrustOrgInfo();
        this.getAucOrgList();
    }
}
</script>

<style>
    .entrustOrgManage {
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow:auto;
    }
    .entrustOrgManage .yourAddress{
        height: 3em;
        line-height: 3em;
    }
</style>
