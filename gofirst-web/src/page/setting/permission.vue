<template>
  <div id="permission" class="permission" style="height: 100%;">
    <div class="mainItem breadcrumb">
			<el-breadcrumb separator=">">
			  <el-breadcrumb-item>您的位置</el-breadcrumb-item>
			  <el-breadcrumb-item>配置</el-breadcrumb-item>
			  <el-breadcrumb-item>权限配置</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

    <div class="mainItem">
      <el-form ref="form" :model="query" label-width="110px" size='small'>
        <div class="form-body">
          <el-form-item class="form-items" label="机构:">
            <el-select v-model="query.userNo" placeholder="机构">
              <el-option size="small" v-for="item in options1" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-items" label="部门:">
            <el-input placeholder="部门" v-model="query.userName" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="角色:">
            <el-input placeholder="角色" v-model="query.userPd" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="用户名:">
            <el-input placeholder="用户名" v-model="query.userType" clearable></el-input>
          </el-form-item>
          <div class="search">
            <el-button size="small" type="primary" style="" @click="querys()">搜&nbsp;&nbsp;&nbsp;&nbsp;索</el-button>
            <el-button size="small" type="info" style="" @click="openNew()">新&nbsp;&nbsp;&nbsp;&nbsp;增</el-button>
          </div>
        </div>
      </el-form>
    </div>

    <!-- 弹框开始 -->
    <el-dialog :title="addOrEdit" width="30%" :visible.sync="dialogAddOrEdit">
      <el-form :rules="rule" :model="GfLimEvidences" ref="addForm" style="width:85%">
        <el-form-item label="用户姓名" prop="userName" label-width="150px">
          <el-input v-model="GfLimEvidences.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userNo" label-width="150px">
          <el-input v-model="GfLimEvidences.userNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPd" label-width="150px">
          <el-input v-model="GfLimEvidences.userPd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address" label-width="150px">
          <el-input v-model="GfLimEvidences.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="company" label-width="150px">
          <el-input v-model="GfLimEvidences.company" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddOrEdit = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <div id="tabb" class="tabb mainItem">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column align='center' type="selection"></el-table-column>
          <el-table-column align='center' prop="userName" label="用户姓名" style="width: 12%"></el-table-column>
          <el-table-column align='center' prop="userNo" label="用户名" show-overflow-tooltip
                           style="width: 8%"></el-table-column>
          <el-table-column align='center' prop="createUser" label="创建人" show-overflow-tooltip
                           style="width: 8%"></el-table-column>
          <el-table-column :formatter='dateFormat' style="width: 10%" align='center' prop="createDatetime" show-overflow-tooltip
                           label="创建时间"></el-table-column>
          <el-table-column align='center' prop="userType" label="用户类型" show-overflow-tooltip
                           style="width: 12%"></el-table-column>
          <el-table-column align='center' prop="userStatus" label="状态"
                           style="width: 10%">
            <template slot-scope="scope">
              {{ scope.row.userStatus == '0' ? '停用': '' }}
              {{ scope.row.userStatus =='1' ? '启用': '' }}
            </template>
          </el-table-column>
          <el-table-column align='center' prop="oldpermissionOrg" label="操作" width='280'>
            <template slot-scope="scope">
              <el-button type="warning" size="mini" @click="edit(scope.row.userId)" plain>编辑</el-button>
              <el-button type="danger" size="mini" @click="see(scope.row.userId)" plain>查看</el-button>
              <el-button type="warning" size="mini" @click="enable(scope.row.userId)"
                         v-if="scope.row.userStatus=='0'" plain>
                启用
              </el-button>
              <el-button type="danger" size="mini" @click="disenable(scope.row.userId)"
                         v-if="scope.row.userStatus=='1'" plain>
                停用
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <div class="pages">
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="pageSizeChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            :current-page.sync="page.pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        query: {},
        user: {
          userId: '',
        },
        addOrEdit: '新增',
        dialogAddOrEdit: false,
        dialogQuery: false,

        GfLimEvidences: {
          userName: '',
          userNo: '',
          userPd: '',
          address: '',
          company: '',
        },
        rule: {
          'userName': [{required: true, message: '用户姓名不能为空', trigger: 'blur'}],
          'userNo': [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          'userPd': [{required: true, message: '密码不能为空', trigger: 'blur'}],
          'address': [{required: true, message: '住址不能为空', trigger: 'blur'}],
          'company': [{required: true, message: '单位不能为空', trigger: 'blur'}],
        },
        page: {
          pageNum: 1,
          pageSize: 10,
        },
        options1: [{
          value: '1',
          label: '鉴定受理'
        }, {
          value: '2',
          label: '检验记录'
        }, {
          value: '3',
          label: '报告编写'
        }],
        options2: [{
          value: '1',
          label: '请选择'
        }, {
          value: '2',
          label: '我的代办'
        }, {
          value: '3',
          label: '科室代办'
        }],
        flag: '',
        tableData: [],
        registerId: '',
        userStatus: '',
        multipleSelection: []
      }
    },
    mounted: function () {
      this.querys();
    },
    methods: {
      handleCurrentChange(val) {
        this.page.pageNum = val;
        this.querys();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      pageSizeChange(val) {
        this.page.pageSize = val;
        this.querys();
      },
      //审核操作
      examine(row) {
        this.setData("regRow", JSON.stringify(row));
        this.$router.push("examine");
      },
      reset() {
        this.$refs.query.resetFields()
      },
      //新增
      openNew() {
        this.flag = 0;
        this.GfLimEvidences = {};
        this.dialogAddOrEdit = true;
      },
      //弹窗保存
      save() {
        let url;
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            if (this.flag == 0) {
              url = "auth/saveUser";
            } else if (this.flag == 1) {
              url = "auth/updateUserById";
            }
            this.postHttpForLogin(url, this.GfLimEvidences, res => {
              if (res.code == '0') {
                this.querys();
                this.notify_success("保存成功")
                this.dialogAddOrEdit = false;
              } else {
                this.notify_warning("保存失败");
              }
            });
          } else {
            return false;
          }
        });
      },
      disenable(userId) {
        let flag = 0;
        this.user.userId = userId;
        this.user['flag'] = flag;
        this.postHttpForLogin("auth/updateUserById", this.user, res => {
          this.tableData = res.data.list;
          this.querys();
        })
      },
      enable(userId) {
        let flag = 1;
        this.user.userId = userId;
        this.user['flag'] = flag;
        this.postHttpForLogin("auth/updateUserById", this.user, res => {
          this.tableData = res.data.list;
          this.querys();
        })
      },
      //查看
      see(userId) {
        this.addOrEdit = "查看";
        this.postHttpForLogin("auth/selectUserById", userId, res => {
          this.GfLimEvidences = res.data;
          this.dialogAddOrEdit = true;
        })
      },
      //编辑
      edit(userId) {
        this.addOrEdit = "编辑";
        this.dialogAddOrEdit = true;
        this.postHttpForLogin("auth/selectUserById", userId, res => {
          this.GfLimEvidences = res.data;
          this.flag = 1;
        })
      },
      /*//删除操作
      delet() {
        let registerList = [];
        if (this.multipleSelection.length > 0) {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            registerList.push(this.multipleSelection[i].registerId);
          }
          this.postHttp("registers/delete", registerList.toString(), res => {
            if (res.code == '0') {
              //删除成功之后从新调用查询方法
              this.querys();
              this.tableData = res.list;
            } else {
              this.notify_warning(res.msg);
            }
          })
        } else {
          this.notify_warning("请选择要删除的行！")
        }
      },*/
      /* //双击进去详情页面
       storageDetail(row) {
         this.setData("registerId", row.registerId);
         this.setData("aucOrgId", row.aucOrgId);
         this.$router.push("entrustInfo");
       },*/
      //查询操作
      querys() {
        var data = this.query;
        data['pageNum'] = this.page.pageNum;
        data['pageSize'] = this.page.pageSize;
        this.postHttpForLogin("auth/selectAllUser", data, res => {
          this.tableData = res.data.list;
          this.page.pageNum = res.data.pageNum;
          this.page.pageSize = res.data.pageSize;
          this.page.total = res.data.total;
        })
      },
      dateFormat(row, column, cellValue, index) {
        var date = cellValue;
        if (date == undefined || date == '') {
          return "";
        }
        return this.timeF(date).format("YYYY-MM-DD HH:mm:ss");
      },
    }
  }
</script>

<style>
  #permission .search {
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 1%;
    width: 66%;
    margin: 10px 0;
  }
  #permission .mainItem {
    width: 98%;
    margin: 10px auto;
    box-sizing: border-box;
  }
  #permission .form-body{
    padding:0;
  }
  .permission .yourAddress .el-input--prefix .el-input__inner {
    padding-left: 30px;
    margin-top: 4px;
  }

  .permission .yourAddress .el-input--suffix .el-input__inner {
    padding-right: 30px;
    margin-top: 4px;
  }

  .searchBoddy {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 52px;
    background-color: white;
  }

  .permission {
    background-color: #f0f3fa;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .permission .el-row .normalCol {
    font-size: 14px;
    margin-top: 6px;
    /* width: 100; */
  }

  .normalCol .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 250px;
  }

  #but .el-button + .el-button {
    margin-left: 10px;
    margin-right: 6px;
  }

  #but .sousou {
    margin-top: 4px;
  }

  #but .xinzeng {
    margin-top: 4px;
  }

  .searchButton {
    display: flex;
    justify-content: flex-end;

  }

  .permission .el-row .normalCol {
    font-size: 14px;
  }

  .permission .yourAddress .ban {

  }

  .permission .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  .permission .el-col-4 {
    width: 14%;
  }

  /**设置点击事件变为小手*/
  .permission .hand {
    cursor: pointer;
  }

  .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  .tabb .el-table__header tr,
  .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: RGB(85, 136, 254);
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  .tabb .el-table__body tr,
  .tabb .el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
