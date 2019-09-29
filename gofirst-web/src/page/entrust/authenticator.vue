<template>
  <div id="authenticator">
    <!-- 中间部分 -->
    <div class="mainItem breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>您的位置</el-breadcrumb-item>
        <el-breadcrumb-item>网上送检</el-breadcrumb-item>
        <el-breadcrumb-item>网上登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row class="step mainItem">
      <el-col :span="22" class="normalCol">
        <el-button type="primary" size="mini">操作步骤提示</el-button>

        <div class="doStep">1.选择鉴定机构</div>
        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

        <div class="doStep">2.选择鉴定专业</div>
        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

        <div class="doStep">3.编辑基本信息</div>
        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

        <div class="doStep doStepActive">4.编辑被鉴定人信息</div>
        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

        <div>5.编辑检材样本信息</div>
        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

        <div>6.选择鉴定要求</div>
        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

        <div>7.填写提交</div>
        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

        <div>8.打印委托书</div>
      </el-col>
      <el-col :span="2" class="normalCol rightSide">
      </el-col>
    </el-row>

    <div class="choiceOrg mainItem">
      <div class="choice">
        <div class="img">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABMklEQVQ4T2NkoDJgpLJ5DFgNlE25G/mY8986hsmqP0m1EGygROJt0Rc8DJ8YJqv8kku9O/M/A0PS/38MGk8+KT+SEXhgyfD/D0Gf/GZhvPZyhsorsELZtDtrGf8zyP9nYLjMwMgQxvif0f/RbOU9smm3sxkZGKcQ48r//xmmPJ6tkgs2UDL5njwL07+tDAz/Jf8xsDg/na14gRhDsKmBe0Uq7ZkI099vAk/mqtwh1zCQPpyRwvyHaf2DBYo/SDUcd6QwMWo+eaf0kPJIYWCI/c/AEPpktsp6siNFKu2+BvP/P4cYGBiFYIaR6lWYekSkJN6RZWZi4H88V+UKuYYNh0hJvZ3FyMg4lagg+P9/zaPZqqHgMKRJpMil39b6949R/slsle1EuQiHIoKlCKmGD34DAfEOpxXqZm3xAAAAAElFTkSuQmCC"/>
        </div>
        <div class="baseInfo">
          [ {{orgName}} ] 送检登记 - [ {{aucOrgName}} ]
        </div>
      </div>
      <!-- <div class="goBack" @click="goback">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABMklEQVQ4T72TvyuFURzGP0+K/8Aiyq+FQTJKSlaLv0EmPxaZFEUmZZTllvWWhcWADExKKQwWxSDKYqZHp+4t3HPf19t7cpYznOd8zvP9nucrEi8l5hEF2u4CDoExSe9FHm0A2u4DjoEFSQdFYEH7A2h7ADgB1iTtFoXFgAYegMcM2CdwDZwCR5I+vmt/O5wFNoF54LkJtAXoBqaB3rBLuq1rYz2cA5aBUUlPWWXbXgQ2gBFJ9w0l1y/bXgKmJI3n9dH2as3lUFNgOLDdLun1D8A24AWYkHSVJNi2q7UPqqQCVoBLSTupgGfAiqTz0kDbncAF0BMyWQpoO2QyjGdV0l7mL+fkLxiZBNaBG0kz0WDb3gaGc6LSCgwCd8CWpP2s0esHOnKAYd6Dq7eYrlQP/wX4BdJ2ZRVkmCy0AAAAAElFTkSuQmCC"/>
        返 回
      </div> -->
    </div>

    <!-- table开始 -->
    <div class="tables mainItem">
      <div class="deleteRows">
        <div class="text">第2步：被鉴定人情况：</div>
        <div>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="openNew" :disabled="isdisabledFn">新&nbsp;&nbsp;增</el-button>
        </div>
      </div>
      <DynamicTable :tableData="dynamicData" @edit="handleEdit" @deletes="handleDelete"></DynamicTable>
      <div class="nextMove" v-if="flag != '1'">
        <el-button type="primary" @click="goback">上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
      <div class="nextMove" v-if="flag == '1'">
        <el-button type="primary" @click="goback">返 回</el-button>
      </div>
    </div>
    <!-- 弹框开始 -->
    <el-dialog :title="addOrEdit" width="30%" :visible.sync="dialogAddOrEdit">
      <DynamicForm :formDatas="dynamicData" ref="addForm"></DynamicForm>
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
        isdisabledFn: false,
        limObjectId: '',
        msg: '',
        orgName: '',
        aucOrgName: '',
        tableData: [],
        registerId: '',
        id: '',
        sex: '',
        birthday: '',
        addOrEdit: '新增',
        dialogAddOrEdit: false,
        flag: '',

        dialogQuery: false,
        querys: {},
        queryData: [],
        page: {
          pageNum: 1,
          pageSize: 10,
        },
        loading: true,
        dynamicData: {
          data: [],
          hasCheck: '0',
          hasIndex: '0',
          align: 'center',
          hasEdit: '1',
          hasEditButton: '1',
          hasDeleteButton: '1',
          headers: [],
          form: {
            style: "width:90%;margin:auto",
            ref: 'addform',
            labelWidth: "100px",
            model: {
              c002: '',
              c003: '',
              c004: '',
            },
            rules: {}
          }
        },
      }
    },
    created: function () {
      this.dynamicData.form.rules = this.$DefaultRules.rules
    },
    activated: function () {
      this.$set(this.dynamicData, 'data', []);
      this.registerId = this.getData("registerId");
      this.aucOrgName = this.getData("aucOrgCname");
      this.orgName = this.getData("orgName");
      // 获取表头
      let data = {aucOrgId: this.getData('aucOrgId'), type: '1'};
      this.postHttp("evidenceColumn/selectListByAucOrgId", data, res => {
        this.dynamicData.headers = res.data;
      });
      this.query();
      this.flag = this.getData('entrustInfoEditFlag');

    },
    methods: {
      // 实现自动生成生日，性别，年龄
      go() {
        let iden = this.dynamicData.form.model.c002;
        let sex = null;
        let birth = null;
        if (iden && iden.length == 18) {
          sex = iden.substring(16, 17);
          birth = iden.substring(6, 10) + "-" + iden.substring(10, 12) + "-" + iden.substring(12, 14);

          if (sex % 2 === 0) {
            sex = '2';
          } else {
            sex = '1';
          }
          this.$set(this.dynamicData.form.model, 'c004', sex);
          this.$set(this.dynamicData.form.model, 'c003', birth);
        }
      },

      //查询
      query() {
        let data = {registerId: this.registerId, type: '1'};
        this.postHttp("evidengesExtd/getEvidengesExtdList", data, res => {
          if (res.code == '0') {
            this.dynamicData.data = res.data;
            //控制新增按钮的显示和置灰
            if (this.dynamicData.data.length > 0) {
              this.isdisabledFn = true;
            } else {
              this.isdisabledFn = false;
            }
            this.loading = false;
          } else {
            this.notify_warning(res.msg);
          }
        })
      },
      //下一步
      nextStep() {
        /* if (this.dynamicData.data.length == 0) {
           this.notify_warning("请点击新增填写被鉴定人信息！");
         } else {

         }*/
        //1是编辑
        let url = this.getData('entrustInfoEditFlag') == '1' ? 'entrustInfo' : 'entrustInspection';
        this.$router.push(url);
      },
      //点击确定把弹窗内容填充到表格一行，保存到数据库
      save() {
        this.$refs['addForm'].getForm().validate((valid) => {
          if (valid) {
            let data = this.dynamicData.form.model;
            data['registerId'] = this.registerId;
            data['type'] = '1';
            delete data['createDatetime'];
            this.postHttp("evidengesExtd/insertAndUpdateEvidengesExtd", data, res => {
              if (res.code == '0') {
                this.query();
                this.notify_success("操作成功");
                this.dialogAddOrEdit = false;
              } else {
                this.notify_warning(res.msg);
              }
            })
          } else {
            return false;
          }
        });
      },
      //失去焦点
      bindBlur() {
        setTimeout(res => {
          // 身份证绑定changes
          let nodes = document.getElementsByClassName('el-input__inner');
          if (nodes) {
            for (let e = 0; e < nodes.length; e++) {
              let data = nodes[e];
              if (data.getAttribute('placeholder') == '身份证号码' || data.getAttribute('maxlength') == "18") {
                data.onblur = res => {
                  this.go();
                }
              }
            }
          }
        }, 100);
      },
      //新增
      openNew() {
        this.dynamicData.form.model = {};
        this.dialogAddOrEdit = true;
        if (this.$refs['addForm']) {
          this.$refs['addForm'].getForm().resetFields();
        }
        this.bindBlur();
      },
      //编辑
      handleEdit() {
        let data = {registerId: this.registerId, type: '1'};
        this.postHttp("evidengesExtd/getEvidengesExtdList", data, res => {
          if (res.code == '0') {
            res.data.forEach(item => {
              this.dynamicData.form.model = item;
            });
            this.dialogAddOrEdit = true;
            this.addOrEdit = "修改";
            this.bindBlur();
          }
        });
      },
      //删除
      handleDelete(row) {
        this.$confim("是否确认删除此条数据?", '提示', data => {
          this.postHttp('evidengesExtd/deleteEvidengesExtd', {id: row.id}, res => {
            if (res.code == '0') {
              this.query();
              this.notify_success('删除成功');
            } else {
              this.notify_error('删除失败');
            }
          })
        })
      },
      goback() {
        this.setData("registerId", this.getData("registerId"));
        let url = this.getData('entrustInfoEditFlag') == '1' ? 'entrustInfo' : 'entrustBaseInfo';
        this.$router.push(url);
      },
    }
  }
</script>

<style>
  #authenticator {
    width: 100%;
    background: #f0f3fa;
    height: 100%;
    overflow: auto;
    position: relative;
    font-family: "microsoft yahei";
  }

  /*中间部分 css*/
  #authenticator .mainItem {
    background: #fff;
    border-radius: 4px;
    width: 97%;
    margin: 10px auto;
    box-shadow: 1px 1px 10px #e4e4e4;
  }

  #authenticator .breadcrumb {
    height: 40px;
    line-height: 40px;
    padding: 13px 20px;
    box-sizing: border-box;
  }


  #authenticator .choiceOrg {
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #666;
  }

  #authenticator .choiceOrg .choice {
    display: -webkit-flex; /* Safari */
    display: flex;
  }

  #authenticator .choiceOrg .choice .img {
    box-sizing: border-box;
    padding: 6px;
    margin: -2px 3px 0 13px;
  }

  #authenticator .choiceOrg .choice .img img {
    width: 18px;
    height: 18px;
  }

  #authenticator .choiceOrg .goBack {
    position: relative;
    color: #fff;
    background: #409EFF;
    height: 30px;
    line-height: 30px;
    margin: 5px 10px;
    width: 85px;
    margin-right: 20px;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
  }

  #authenticator .choiceOrg .goBack img {
    margin: -4px -1px;
  }

  #authenticator .choiceOrg .baseInfo {
    margin-left: 0px;
  }

  /* table */
  #authenticator .deleteRows {
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
  }

  #authenticator .tables {
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .next {
    margin-top: 10px;
    margin-left: 816px;
  }

  #authenticator .tables td.operations .cell {
    width: 100%;
    display: flex;
    text-align: center;
  }

  #authenticator .tables td.operations .cell .op_items {
    margin: auto 3px;
  }


  #authenticator .nextMove {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
