<template>
  <div id="appraisal" class="appraisal" style="height: 100%;">

    <div class="mainItem breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>您的位置</el-breadcrumb-item>
        <el-breadcrumb-item>网上鉴定</el-breadcrumb-item>
        <el-breadcrumb-item>鉴定列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="mainItem">
      <el-form ref="form" :model="query" label-width="110px" size='small'>
        <div class="form-body">
          <el-form-item class="form-items" label="操作状态:">
            <el-select v-model="query.status" placeholder="操作状态" clearable>
              <el-option
                size="small"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-items" label="委托单位:">
            <el-input placeholder="委托单位" v-model="query.entrustNum" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="受理编号:">
            <el-input placeholder="受理编号" v-model="query.acceptBookNo" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="案件名称:">
            <el-input placeholder="案件名称" v-model="query.caseName" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-items" label="我的任务:">
            <el-select v-model="query.task" placeholder="我的任务" clearable>
              <el-option
                size="small"
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-items" label="鉴定专业:">
            <el-select v-model="query.aucOrgId" placeholder="鉴定专业" clearable>
              <el-option
                size="small"
                v-for="item in optionAuc"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-items" label="经办人:">
            <el-input placeholder="经办人" v-model="query.empName" clearable></el-input>
          </el-form-item>
          <!--<el-form-item class="form-items" label="委托日期:">
            <el-date-picker
              v-model="query.entrustDate"
              type="daterange" range-separator="至" start-placeholder="委托日期"
              end-placeholder="委托日期"></el-date-picker>
          </el-form-item>-->
          <div class="search rows">
            <el-button size="small" type="primary" style="" @click="querys()">搜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;索</el-button>
            <el-button size="small" type="info" style="" @click="reset()">重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
          </div>
        </div>
      </el-form>
    </div>

    <div id="tabb" class="tabb mainItem dynamicTable">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @row-dblclick="storageDetail"
                @selection-change="handleSelectionChange">
        <el-table-column align='center' type="selection"></el-table-column>
        <el-table-column align='center' prop="acceptBookNo" show-overflow-tooltip label="受理编号"
        ></el-table-column>
        <el-table-column align='center' prop="acceptDate" :formatter='dateFormat' label="受理时间" show-overflow-tooltip
        ></el-table-column>
        <el-table-column align='center' prop="aucOrgCname" label="鉴定专业" show-overflow-tooltip></el-table-column>
        <el-table-column align='center' prop="consignOrgName" label="委托单位" show-overflow-tooltip
        ></el-table-column>
        <el-table-column align='center' prop="caseName" label="案件名称" show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="identifyRequest" align='center' label="鉴定要求" show-overflow-tooltip
        ></el-table-column>
        <el-table-column align='center' prop="entrustDate" :formatter='dateFormat' label="要求完成时间"
                         show-overflow-tooltip
        >15个工作日
        </el-table-column>
        <el-table-column align='center' prop="name" label="状态"></el-table-column>
        <el-table-column align='center' prop="empName" label="经办人"></el-table-column>
        <el-table-column align='center' prop="materialStatus" label="检材状态" width="100px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.materialStatus == '1'" type="primary" size="mini" @click="getAccept(scope.row)">已&#8194;领&#8194;取</el-button>
            <el-button v-if="scope.row.materialStatus == '2'" type="danger" size="mini" @click="getAccept(scope.row)">待&#8194;领&#8194;取</el-button>
            <el-button v-if="scope.row.materialStatus == '3'" type="warning" size="mini" @click="getAccept(scope.row)">
              部分领取
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align='center' class-name="operations" prop="oldpermissionOrg" label="操作" width='220'>
          <template slot-scope="scope">
            <template v-if="scope.row.name==='鉴定复核'||scope.row.name === '检验记录' || scope.row.name === '报告编写' || scope.row.name === '鉴定复核'
            || scope.row.name === '授权人签字'">

              <template v-if="scope.row.applyState=='0' || scope.row.applyState=='1' || scope.row.applyState=='2'">
                <div class="op_items" v-if="scope.row.name!='中心主任签名'">
                  <el-button type="warning" size="mini" @click="delayed(scope.row.registerId,scope.row.sort)" plain>延迟</el-button>
                </div>
                <div class="op_items" v-if="scope.row.name!='中心主任签名'">
                  <el-button type="danger" size="mini" @click="pause(scope.row.registerId,scope.row.sort)" plain>中止</el-button>
                </div>
                <div class="op_items">
                  <el-button type="danger" size="mini" @click="end(scope.row.registerId,scope.row.sort)" plain>终止</el-button>
                </div>
              </template>

              <template v-if="scope.row.applyState=='3'">
                <div class="op_items" >
                  <el-button type="warning" size="mini" plain>申请中止审核中</el-button>
                </div>
              </template>

              <template v-if="scope.row.applyState=='4'">
                <div class="op_items" v-if="scope.row.name!='中心主任签名'">
                  <el-button type="danger" size="mini" @click="recover(scope.row.registerId,scope.row.sort)" plain>恢复</el-button>
                </div>
                <div class="op_items">
                  <el-button type="danger" size="mini" @click="end(scope.row.registerId,scope.row.sort)" plain>终止</el-button>
                </div>
              </template>

              <template v-if="scope.row.applyState=='5'">
                <div class="op_items" >
                  <el-button type="warning" size="mini" plain>申请终止审核中</el-button>
                </div>
              </template>

              <template v-if="scope.row.applyState=='7'">
                <div class="op_items" >
                  <el-button type="warning" size="mini" plain>申请恢复审核中</el-button>
                </div>
              </template>

            </template>
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


    <!-- deal material -->
    <el-dialog :title="aeMaterial" width="80%" class="dynamicForm" style="text-align: center;"
               :visible.sync="dialog4Material">
      <div style="width:100%;height:600px;overflow-y:auto">

        <!-- 专业受理 -->
        <el-divider content-position="left" v-if='firstMaterialShow'>
          <div class="title-level one"><i class="el-icon-tickets"></i>专业受理</div>
        </el-divider>
        <el-table :data="checkDataSelect" align='center' style="width: 98%" height="350" v-if='firstMaterialShow'>
          <el-table-column prop="materialSerialNum" align='center' label="物证编号" show-overflow-tooltip
                           width="200"></el-table-column>
          <el-table-column prop="NAME" align='center' label="物证名称"></el-table-column>
          <el-table-column prop="NUM" align='center' label="数量"></el-table-column>
          <el-table-column prop="UNIT" align='center' label="单位"></el-table-column>
          <el-table-column prop="checkPic" align='center' label="附件/照片">
            <template slot-scope="scope">
              <el-button size="small" type="primary" plain @click="upload(scope.row)">图片</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="c021" align='center' label="交接数量" width="100"></el-table-column>
          <el-table-column fixed="right" align='center' label="提交人">
            {{this.firstEmp}}
          </el-table-column>
        </el-table>
        <el-form :inline="true" v-if='firstMaterialShow' :model="firstEvidDeal" class="demo-form-inline"
                 label-width="100px;" style="text-align:right;margin-top:15px">
          <el-form-item label="交接日期">
            <el-date-picker :disabled='showBack' v-model="firstEvidDeal.acceptDatetime" type="datetime"
                            placeholder="交接日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="接收人">
            <el-select :disabled='showBack' v-model="firstEvidDeal.empId" clearable placeholder="接收人">
              <el-option
                v-for="item in this.empList"
                :key="item.empId"
                :label="item.empName"
                :value="item.empId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="放置位置">
            <el-select :disabled='showBack' v-model="firstEvidDeal.storage" clearable placeholder="放置位置">
              <el-option
                v-for="item in this.storage"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保存条件">
            <el-select :disabled='showBack' v-model="firstEvidDeal.condition" clearable placeholder="保存条件">
              <el-option
                v-for="item in this.condition"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保存期限(天)">
            <el-select :disabled='showBack' v-model="firstEvidDeal.saveTime" clearable placeholder="保存期限（天）">
              <el-option label="1" value="1"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="7" value="7"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 收检处理 -->
        <el-divider content-position="left" v-if='secondMaterialShow'>
          <div class="title-level one"><i class="el-icon-tickets"></i>收检处理</div>
        </el-divider>
        <el-table :data="checkDataSelect" align='center' style="width: 98%" height="350" v-if='secondMaterialShow'>
          <el-table-column prop="materialSerialNum" align='center' label="物证编号" show-overflow-tooltip
                           width="200"></el-table-column>
          <el-table-column prop="NAME" align='center' label="物证名称"></el-table-column>
          <el-table-column prop="c021" align='center' label="数量"></el-table-column>
          <el-table-column prop="UNIT" align='center' label="单位"></el-table-column>
          <el-table-column prop="checkPic" align='center' label="附件/照片">
            <template slot-scope="scope">
              <el-button size="small" type="primary" plain @click="upload(scope.row)">图片</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="c022" align='center' label="交接数量" width="100"></el-table-column>
          <el-table-column fixed="right" align='center' label="提交人">
            {{this.firstEmp}}
          </el-table-column>
        </el-table>
        <el-form :inline="true" v-if='secondMaterialShow' :model="secondEvidDeal" class="demo-form-inline"
                 label-width="100px;" style="text-align:right;margin-top:15px">
          <el-form-item label="交接日期">
            <el-date-picker :disabled='showBack' v-model="secondEvidDeal.acceptDatetime" type="datetime"
                            placeholder="交接日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="接收人">
            <el-select :disabled='showBack' v-model="secondEvidDeal.empId" clearable placeholder="接收人">
              <el-option
                v-for="item in this.empList"
                :key="item.empId"
                :label="item.empName"
                :value="item.empId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="放置位置">
            <el-select :disabled='showBack' v-model="secondEvidDeal.storage" clearable placeholder="放置位置">
              <el-option
                v-for="item in this.storage"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保存条件">
            <el-select :disabled='showBack' v-model="secondEvidDeal.condition" clearable placeholder="保存条件">
              <el-option
                v-for="item in this.condition"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保存期限(天)">
            <el-select :disabled='showBack' v-model="secondEvidDeal.saveTime" clearable placeholder="保存期限（天）">
              <el-option label="1" value="1"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="7" value="7"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 退还处理 -->
        <el-divider content-position="left" v-if='lastMaterialShow'>
          <div class="title-level one"><i class="el-icon-tickets"></i>退还处理</div>
        </el-divider>
        <el-table :data="checkDataSelect" align='center' style="width: 98%" height="350" v-if='lastMaterialShow'>
          <el-table-column prop="materialSerialNum" align='center' label="物证编号" show-overflow-tooltip
                           width="200"></el-table-column>
          <el-table-column prop="NAME" align='center' label="物证名称"></el-table-column>
          <el-table-column prop="c022" align='center' label="数量"></el-table-column>
          <el-table-column prop="UNIT" align='center' label="单位"></el-table-column>
          <el-table-column prop="checkPic" align='center' label="附件/照片">
            <template slot-scope="scope">
              <el-button size="small" type="primary" plain @click="upload(scope.row)">图片</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="c023" align='center' label="退还数量" width="150">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.c023" :step="1" :min="0" :max="parseInt(scope.row.c022, 10)"
                               size="small" type="primary" plain></el-input-number>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align='center' label="领取确认">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="backMaterial(scope.row)" plain>退还</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider content-position="center" v-if='lastMaterialShow'>
          <el-button type="primary" size="mini" @click="saveMaterial">全部退还</el-button>
        </el-divider>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelMaterial">取 消</el-button>
        <!-- <el-button type="primary" @click="saveMaterial">确定分配</el-button> -->
      </div>

    </el-dialog>

    <el-dialog title="上传图片" width="440px" :visible.sync="dialogUpload">
      <el-upload :action="action" list-type="picture-card" ref="upload" :file-list='imgList' :data="livEvi"
                 :on-remove="handleRemove" :multiple="true" :http-request="uploadFile" :auto-upload="false"
                 :on-preview="handlePictureCardPreview">
        <i class="el-icon-plus"></i>
      </el-upload>
      <div class="photo" @click="open_photo">
        <div class="text">
          拍照区域,单击打开摄像头
        </div>
        <div class="take">
          <el-button icon="el-icon-camera" circle @click.prevent='take_photo'></el-button>
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
        query: {
          status: '',
          acceptBookNo: '',
          entrustNum: '',
          caseNo: '',
          caseName: '',
          task: '',
          empName: '',
          aucOrgId:'bcf0a78d580f47e385de758c50556b5c'
        },
        optionAuc:[
          {id:'bcf0a78d580f47e385de758c50556b5c',label:'毒品'},{id:'9c181b4edffd4881a05d58a8bbf9f5fa',label:'微物'},{id:'6e3babd91f0747ce939374530fffccd5',label:'毒物'}
        ],
        page: {pageNum: 1, pageSize: 10,},
        options: [{value: '1', label: '程序受理'}, {value: '2', label: '专业受理'}, {value: '3', label: '收检'}, {
          value: '4',
          label: '检验记录'
        },
          {value: '5', label: '报告编写'}, {value: '6', label: '鉴定复核'}, {value: '7', label: '授权人签字'}, {
            value: '8',
            label: '中心主任签名'
          },
          {value: '9', label: '打印报告'}, {value: '10', label: '报告发放'}, {value: '11', label: '提交归档'}, {
            value: '12',
            label: '确认归档'
          }],
        options1: [{value: '1', label: '我的待办'}, {value: '2', label: '科室待办'}],
        tableData: [],
        registerId: '',
        sort: '',
        applyState:'',
        multipleSelection: [],
        type: '',
        showDelayed: false,
        showPause: false,
        showEnd: false,

        regRow: '',
        dialog4Material: false,
        aeMaterial: '',
        dialogUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,

        //人员信息
        empList: [],
        firstEvidDeal: {},
        secondEvidDeal: {},
        storage: '',
        condition: '',
        //检材样本列表信息
        checkData: [],
        checkDataSelect: [],
        firstEmp: '',
        secondEmp: '',

        action: '',
        imgList: [],
        livEvi: {},
        flag: '',
        isFlowShow: false,
        firstMaterialShow: false,
        secondMaterialShow: false,
        lastMaterialShow: false,
        showBack: true,
      }
    },
    activated: function () {
      this.regRow = JSON.parse(this.getData("regRow"));
      this.querys();
      this.getDictInfo();
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

      //双击
      storageDetail(row) {
        console.log(row);
        this.setData("regRow", JSON.stringify(row));
        this.$router.push("examine_dna");
        this.setData("isFlowShow", false);
        this.setData("isShowBtn", true);
        /* this.setData("registerId", row.registerId);
         this.setData("aucOrgId", row.aucOrgId);
         this.$router.push("entrustInfo");*/
      },
      //延迟
      delayed(registerId, sort) {
        this.setData("registerId", registerId);
        this.setData("sort", sort);
        this.setData("type", 1);
        this.$router.push("delayed");
      },
      //恢复
      recover(registerId, sort) {
        this.setData("registerId", registerId);
        this.setData("sort", sort);
        this.$router.push("recover");
      },
      //中止
      pause(registerId, sort) {
        this.setData("registerId", registerId);
        this.setData("sort", sort);
        this.setData("type", 2);
        this.$router.push("pause");
      },
      //终止
      end(registerId, sort) {
        this.setData("registerId", registerId);
        this.setData("sort", sort);
        this.setData("type", 3);
        this.$router.push("end");
      },

      //审核操作
      examine(row) {
        this.setData("regRow", JSON.stringify(row));
        this.setData("isFlowShow", false);
        this.setData("isShowBtn", true);
        this.$router.push("/examine");
      },
      reset() {
        this.query = {
          status: '',
          acceptBookNo: '',
          entrustNum: '',
          caseNo: '',
          caseName: '',
          task: '',
          empName: '',
          aucOrgId:'bcf0a78d580f47e385de758c50556b5c'
        };
        this.querys();
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
        /* data['registerId'] = this.regRow.registerId;*/
        this.postHttp("consignment/appraisalList", data, res => {
          res.data.list.forEach(items => {
            if (items.name == null) {
              items.name = "鉴定完成"
            }
          });
          console.log("===============");
          console.log(res.data);
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


      /**
       * 获取人员信息
       */
      getEmpList(row) {
        let empPto = {};
        empPto['orgId'] = row.orgId;
        this.postHttpForLogin("empsController/selectAllEmps", empPto, res => {
          if (res.code == '0') {
            this.empList = res.data;
            //专业受理处理人
            let dataLet = {};
            dataLet['status'] = "1";
            dataLet['registerId'] = row.registerId;
            this.postHttp("eviAuc/getEvidDeal", dataLet, res => {
              if (res.code == "0") {
                if (res.data) {
                  this.firstMaterialShow = true;
                  for (let index = 0; index < this.empList.length; index++) {
                    const element = this.empList[index];
                    if (element.empId == res.data.empId) {
                      this.firstEmp = element.empName;
                    }
                  }
                }
              }
            });
            //收检处理人
            let dataSecond = {};
            dataSecond['status'] = "2";
            dataSecond['registerId'] = row.registerId;
            this.postHttp("eviAuc/getEvidDeal", dataSecond, res => {
              if (res.code == "0") {
                if (res.data) {
                  this.secondMaterialShow = true;
                  for (let index = 0; index < this.empList.length; index++) {
                    const element = this.empList[index];
                    if (element.empId == res.data.empId) {
                      this.secondEmp = element.empName;
                    }
                  }
                }
              } else {
                this.notify_warning(res.msg);
              }
            });
          }
        });
      },

      getDictInfo() {
        var data = {
          "parentKeyList": ["STORAGE", "CONDITION"]
        };
        this.postHttpForLogin("dict/getDictInfo", data, res => {
          if (res.code == '0') {
            this.storage = res.data.STORAGE;
            this.condition = res.data.CONDITION;
          } else {
            this.notify_warning(res.msg);
          }
        });
      },

      // 检材处理——start
      getFirstEvidDeal(row) {
        let dataLet = {};
        dataLet['status'] = "1";
        dataLet['registerId'] = row.registerId;
        this.postHttp("eviAuc/getEvidDeal", dataLet, res => {
          if (res.code == "0") {
            if (res.data) {
              this.firstEvidDeal = res.data;
            }
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      getSecondEvidDeal(row) {
        let dataLet = {};
        dataLet['status'] = "2";
        dataLet['registerId'] = row.registerId;
        this.postHttp("eviAuc/getEvidDeal", dataLet, res => {
          if (res.code == "0") {
            if (res.data) {
              this.secondEvidDeal = res.data;
            }
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      getFirstEmp() {
        let dataLet = {};
        dataLet['status'] = "1";
        dataLet['registerId'] = this.regRow.registerId;
        this.postHttp("eviAuc/getEvidDeal", dataLet, res => {
          if (res.code == "0") {
            if (res.data) {
              for (let index = 0; index < this.empList.length; index++) {
                const element = array[index];
                if (element.empId == res.data.empId) {
                  this.firstEmp = element.empName;
                }
              }
            }
          } else {
            this.notify_warning(res.msg);
          }
        });
      },


      /**
       获取检材样本列表信息
       */
      getCheckData(row) {
        this.getHttp("evidences/getEvidenceListForReal", {"registerId": row.registerId}, res => {
          if (res.code == '0') {
            this.checkData = [];
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
          if (this.checkData[index].checkAccept == "1" || this.checkData[index].checkAccept == "3") {
            this.checkDataSelect.push(this.checkData[index]);
          }
        }
      },

      getAccept(row) {
        console.log('row', row)
        this.aeMaterial = '检材信息处理';
        this.dialog4Material = true;
        this.getEmpList(row);
        this.getCheckData(row);
        this.getFirstEvidDeal(row);
        this.getSecondEvidDeal(row);
        if (row.nextFlow >= 10) {
          this.lastMaterialShow = true;
        }
      },
      cancelMaterial() {
        this.dialog4Material = false;
        this.firstMaterialShow = false;
        this.secondMaterialShow = false;
        this.lastMaterialShow = false;
        this.querys();
      },
      /**
       *  单个退还
       */
      backMaterial(row) {
        let evidMaterial = {};
        evidMaterial = row;
        if (evidMaterial.c022 == evidMaterial.c023) {
          evidMaterial['c024'] = '1';
        } else {
          evidMaterial['c024'] = '0';
        }
        this.postHttp("evidengesExtd/insertAndUpdateEvidengesExtd", evidMaterial, res => {
          if (res.code == '0') {
            this.$notify({
              title: '成功',
              message: '退还成功！！',
              type: 'success'
            });
          } else {
            this.$notify_warning(res.msg);
          }
        });
      },
      /**
       * 全部退还
       */
      saveMaterial() {
        this.checkDataSelect.forEach(element => {
          let submitParam = {};
          submitParam = element;
          submitParam['c023'] = submitParam.c022;
          submitParam['c024'] = '1';
          if (element.checkAccept == '1' || element.checkAccept == '3') {
            this.postHttp("evidengesExtd/insertAndUpdateEvidengesExtd", submitParam, res => {
              if (res.code == '0') {

              } else {
                this.$notify_warning(res.msg);
              }
            });

          }
        });
        this.$notify({title: '成功', message: '全部退还成功！！', type: 'success'});
        this.getCheckData();
      },
      // 检材处理——end

      // 图片处理
      // 上传
      upload(row) {
        this.postHttp("evidencesImg/selectByEviId", row.id, res => {
          if (res.data.length > 0) {
            for (let x in res.data) {
              res.data[x]['url'] = res.data[x].address;
            }
            this.imgList = res.data;
          } else {
            this.imgList = [];
          }
          this.dialogUpload = true;
          this.livEvi.id = row.id;
          this.fileData = new FormData();

        });
      },
      cancle() {
        this.$refs.webcam.pause();
        this.dialogUpload = false;
      },
      // 上传方法
      uploads() {
        this.submitUpload();
      },
      uploadFile(file) {
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
        this.$axios.post(this.action, this.fileData, config).then(response => {
          if (response.data.code == '0') {
            this.dialogUpload = false;
            this.notify_success('操作成功');
            this.loadData();
          } else {
            this.notify_error(response.data.msg);
          }
        }, response => {
          this.notify_error('网络错误');
        })
      },
      //单独删除
      handleRemove(file, fileList) {
        this.postHttp("evidencesImg/deleteEvidenceImg", file, res => {
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      open_photo() {
        //打开摄像头
        this.$refs.webcam.open();
      },
      take_photo() {
        let file = this.dataURLtoBlob();

        if (null != file) {
          let files = {
            status: 'ready',
            name: file.name,
            size: file.size,
            percentage: 0,
            uid: file.uid,
            raw: file,
            url: URL.createObjectURL(file)
          };
          this.$refs.upload.uploadFiles.push(files);
          this.$refs.upload.onChange(files, this.$refs.upload.uploadFiles);

          this.fileData.append('file', file);

        }
      },
      dataURLtoBlob() {
        let url = this.$refs.webcam.getPhoto();

        if (url == null || url == undefined) {
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
        let bolb = new Blob([u8arr], {type: mime});
        bolb.lastModifiedDate = new Date();
        let file = new File([bolb], new Date().getTime() + '.jpg', {type: mime, lastModified: Date.now()});
        file.uid = new Date().getTime();

        return file;
      },

    }
  }
</script>

<style>
  #appraisal .search {
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 1%;
    width: 100%;
    margin: 10px 0;
  }

  #appraisal .mainItem {
    width: 98%;
    margin: 10px auto;
    box-sizing: border-box;
  }

  #appraisal .form-body {
    padding: 0;
  }

  .appraisal .yourAddress .el-input--prefix .el-input__inner {
    padding-left: 30px;
    margin-top: 4px;
  }

  .appraisal .yourAddress .el-input--suffix .el-input__inner {
    padding-right: 30px;
    margin-top: 4px;
  }

  .appraisal .searchBoddy {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 114px;
    background-color: white;
  }

  .appraisal {
    background-color: #f0f3fa;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .appraisal .el-row .normalCol {
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

  .searchButton {
    display: flex;
    justify-content: flex-end;

  }

  .appraisal .el-row .normalCol {
    font-size: 14px;
  }

  .appraisal .yourAddress .ban {

  }

  .appraisal .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  .appraisal .el-col-4 {
    width: 14%;
  }

  /**设置点击事件变为小手*/
  .appraisal .hand {
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


  .appraisal .photo {
    width: 400px;
    height: 300px;
    margin: 10px auto;
    box-sizing: border-box;
    border: 1px #a7a7a7 dashed;
    position: relative;
  }

  .appraisal .photo .text {
    width: 400px;
    height: 150px;
    position: absolute;
    text-align: center;
    line-height: 150px;
    font-size: 20px;
    top: 75px;
  }

  .appraisal .photo .take {
    width: 40px;
    height: 40px;
    position: absolute;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    bottom: 10px;
    right: 10px;
    z-index: 9999;
  }

  .appraisal .photo video {
    position: absolute;
    left: 0px;
    right: 0px;
  }

  .appraisal .btns {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }

</style>
