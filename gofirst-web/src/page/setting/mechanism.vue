<template>
  <div id="mechanism">

    <!-- 中间部分 -->
    <div class="mainItem breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>您的位置</el-breadcrumb-item>
        <el-breadcrumb-item>配置</el-breadcrumb-item>
        <el-breadcrumb-item>机构配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="choice mainItem">
      <div class="choiceTxt">
        <div class="img">
          <img src="@/assets/img/list.png"/>
        </div>
        <div class="text">机构</div>
        <div class="sendChoice" @click="add">新 增</div>
      </div>
    </div>

    <div class="mainItem choicedName">
      {{choiceNames}}
      <div class="backLevel" v-if="orgTempData.length > 0" @click="backLevel()">返回上一级</div>
      <!--<div class="sendChoice" @click="sendChoices()">送 检</div>-->
    </div>

    <!-- 横向树状图 -->
    <div class="tree" v-loading="loading">
      <div :class="e.orgId == choiceId?'active items':'items'" v-for="e in orgData" :key="e.orgId">
        {{e.orgCname}}
        <div class="children" @click="showMore(e)" v-if="e.listChildren != null && e.listChildren.length > 0">
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="setting">
          <i class="el-icon-setting" @click="addInstall(e.orgId)"></i>
          <i class="el-icon-delete" @click="delInstall(e.orgId)"></i>
        </div>
      </div>
    </div>

    <!-- 弹框开始 -->
    <el-dialog :title="addOrEdit" width="62%" :visible.sync="dialogAddOrEdit">
      <div class="dynamicForm">
        <el-form :model="Orgs" ref="addForm" :rules="rulesForm" class="doubleLine" style="width:92%">
          <el-form-item label="是委托单位:" prop="isEntrust" label-width="150px">
            <el-select class="select" v-model="Orgs.isEntrust" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是鉴定单位:" prop="isCheck" label-width="150px">
            <el-select class="select" v-model="Orgs.isCheck" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是DNA鉴定单位:" prop="isDNA" label-width="150px">
            <el-select class="select" v-model="Orgs.isDNA" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构名称:" prop="orgCname" label-width="150px">
            <el-input v-model="Orgs.orgCname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="机构地址:" prop="orgAddr" label-width="150px">
            <el-input v-model="Orgs.orgAddr" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="orgTel" label-width="150px">
            <el-input v-model="Orgs.orgTel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮编:" prop="orgZip" label-width="150px">
            <el-input v-model="Orgs.orgZip" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="传真:" prop="orgFax" label-width="150px">
            <el-input v-model="Orgs.orgFax" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上级机构:" prop="orgBusiUpId" label-width="150px">
            <el-input v-model="Orgs.orgBusiUpId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业:" class="rows" label-width="150px">
            <el-checkbox-group v-model="Orgs.aucOrgId">
              <el-checkbox v-for="e in authenticateData" :key="e.aucOrgId" :label="e.aucOrgId">{{e.aucOrgCname}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddOrEdit = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        options: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        isEntrust: '',
        isCheck: '',
        value: [],
        addOrEdit: '编辑',
        dialogAddOrEdit: false,
        Orgs: {
          aucOrgId: [],
        },
        id: '',
        authenticateData: [],
        orgId: '',
        aucOrgCname: '',
        flag: '',
        msg: '',
        choiceId: '',
        choiceNames: '尚未选择鉴定机构',
        orgTempData: [],
        orgTempData_: [],
        orgData: [],
        loading: true,

        rulesForm: {
          'orgCname': [{required: true, message: '机构名称不能为空', trigger: 'blur'}],
          'orgName': [{required: true, message: '机构地址不能为空', trigger: 'blur'}],
          'orgBusiUpId': [{required: true, message: '上级机构不能为空', trigger: 'blur'}],
        }
      }
    },
    mounted: function () {
      //查询所有鉴定专业
      this.postHttp("aucOrg/selectAuthenticate", {}, res => {
        this.authenticateData = res.data;
      });
      this.query();
    },
    methods: {
      //点击确定保存
      save() {
        let dataLet = this.unBinding(this.Orgs);
        dataLet.aucOrgId = dataLet.aucOrgId.toString();
        dataLet['orgId'] = this.id;
        let url;
        if (this.flag == 0) {
          url = "orgsController/saveOrg";
        } else if (this.flag == 1) {
          url = "orgsController/updateOrg";
        }
        this.postHttpForLogin(url, dataLet, res => {
          if (res.code == '0') {
            this.query();
            this.notify_success("操作成功")
            this.dialogAddOrEdit = false
          } else {
            this.notify_warning(res.msg);
          }
        });
        this.dialogAddOrEdit = false
      },
      //新增
      add() {
        this.flag = 0;
        this.Orgs = {
          aucOrgId: [],
        };
        this.dialogAddOrEdit = true
      },
      //查询
      query() {
        this.postHttpForLogin("orgsController/getAllOrgList", {}, res => {
          this.orgData = res.data;
          this.loading = false;
        })
      },
      //设置，根据orgId查询对象，做修改
      addInstall(orgId) {
        this.id = orgId;
        this.flag = 1;
        this.postHttpForLogin("orgsController/selectById", {orgId: orgId}, res => {
          if (res.code == '0') {
            if (!res.data.aucOrgId) {
              res.data.aucOrgId = [];
              //this.$set(this.Orgs,'aucOrgId',[]);
            } else {
              res.data.aucOrgId = res.data.aucOrgId.split(",");
            }
            console.log(res.data);
            this.Orgs = res.data;
            this.loading = false;
          } else {
            this.notify_warning("查询失败！")
          }
        });
        this.dialogAddOrEdit = true
      },
      //删除
      delInstall(orgId) {
        this.$confim("是否确认删除该机构?", '提示', data => {
          this.postHttpForLogin("orgsController/delOrgList", {orgId: orgId}, res => {
            if (res.code == '0') {
              this.authenticateData = res.data;
              this.notify_success("删除成功！");
              this.query();
              this.loading = false;
            } else if (res.code == '1') {
              this.notify_warning("删除失败，请先删除子节点！")
            } else if (res.code == '2') {
              this.notify_warning("删除失败，不存在该节点！")
            }
          })
        })
      },
      /* choiced(obj){
         this.choiceId = obj.orgId;
         this.choiceNames = obj.orgCname;
       },*/
      showMore(obj) {
        if (this.orgTempData.length == 0) {
          this.orgTempData = this.orgData;
          this.orgData = obj.listChildren;
        } else {
          this.orgTempData_ = this.orgData;
          this.orgData = obj.listChildren;
        }
        event.stopPropagation();
      },
      backLevel() {
        if (this.orgTempData_.length != 0) {
          this.orgData = this.orgTempData_;
          this.orgTempData_ = [];
        } else {
          this.orgData = this.orgTempData;
          this.orgTempData = [];
        }
      },
      //送检
      sendChoices() {
        if (!this.choiceId) {
          this.notify_error("请选择送检单位");
          return;
        }
        //放入sessionStorage
        this.setData('orgId', this.choiceId);
        this.setData('orgName', this.choiceNames);
        this.$router.push("entrustOrg");
      }
    },
    beforeDestroy: function () {
      this.choiceId = '';
      this.choiceNames = '';
      this.orgData = [];
      this.orgTempData = [];
      this.orgTempData_ = [];
    },
  }
</script>

<style>
  #mechanism {
    width: 100%;
    background: #f0f3fa;
    height: 100%;
    overflow: auto;
    position: relative;
    font-family: "microsoft yahei";
  }

  /* 树形图 css */
  #mechanism .tree {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    position: relative;
    justify-content: center;
    min-height: 200px;
    width: 97%;
    margin: 10px auto;
  }

  #mechanism .tree .setting {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 18px;
  }

  #mechanism .tree .el-icon-setting {
    color: #409eff;
  }

  #mechanism .tree .el-icon-setting:hover {
    color: #66b1ff;
  }

  #mechanism .tree .el-icon-delete {
    color: #f56c6c;
  }

  #mechanism .tree .el-icon-delete:hover {
    color: #f78989;
  }
  #mechanism .tree .el-loading-mask{
    background: none;
  }

  #mechanism .choicedName {
    text-align: center;
    height: 40px;
    line-height: 40px;
    position: relative;
  }

  #mechanism .sendChoice {
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
    margin-top: 65px;
    margin-right: 35px;
  }

  #mechanism .backLevel {
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

  #mechanism .tree .items {
    width: 12%;
    margin: 20px 1%;
    box-sizing: border-box;
    height: 130px;
    padding: 45px 10px 20px 10px;
    line-height: 20px;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 20px #d4d4d4;
    font-size: 16px;
    cursor: pointer;
    position: relative;
  }

  #mechanism .tree .items .children {
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

  #mechanism .tree .items.active {
    background: #5588fe;
    color: #fff;
  }

  #mechanism .tree .items.active .children {
    color: #fff;
  }

  /*中间部分 css*/
  #mechanism .orgName {
    background: #dde7ff;
    border-radius: 4px;
    width: 97%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 10px auto;
    color: #000;
  }

  #mechanism .select {
    width:100%;
  }

</style>
