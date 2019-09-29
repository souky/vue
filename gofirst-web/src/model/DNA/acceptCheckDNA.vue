  <template>
  <div id="acceptCheck">
    <el-divider content-position="left"><div class="title-level one"><i class="el-icon-tickets"></i>检材存储</div></el-divider>
    <el-tabs style="width:97%;margin:10px auto;" type="border-card" class="" @tab-click="handleClick" value="1">
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

          <!-- <el-divider content-position="left">受理信息</el-divider> -->
          <el-form :inline="true" :model="evidDeal" class="demo-form-inline" label-width="100px;" style="text-align:right;margin-top:15px">
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


    <el-divider content-position="left"><div class="title-level one"><i class="el-icon-tickets"></i>收检信息</div></el-divider>
    <el-form ref="form" :model="form" label-width="140px" size='small' >
      <div class="form-body">
        <!--<el-form-item class="form-items" label="受理编号:">
          <el-input v-model="form.checkCode" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items" label="文书类型:">
          <el-input v-model="form.checkResultType" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items" label="检验结论:">
          <el-input v-model="form.checkResultContent" disabled></el-input>
        </el-form-item>-->
        <el-form-item class="form-items rows-half" label="收检意见:">
          <el-input :disabled='isFlowShow' v-model="form.reason" resize="none" rows="5" type="textarea"
                    placeholder="收检意见"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-half" label="送检人:">
          <el-input v-model="check.checkPerson" resize="none" disabled></el-input>
          <!-- <el-select v-model="form.label" filterable placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.label"
             ></el-option>
           </el-select>-->
        </el-form-item>
      </div>
    </el-form>
    <!-- <div class="btns">
      <el-button type="primary" v-if="!isFlowShow" size="small" class="baocun" plain @click="save">保 存</el-button>
    </div> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        /*options: [{
          value: '1',
          label: ''
        }],*/
        //人员信息
        empList: [],
        evidDeal: {},
        storage:'',
        condition:'',
        //检材样本列表信息
        checkData: [],
        checkDataSelect: [],
        firstEmp:'',
        dialogImageUrl: '',
        dialogVisible:false,

        action:'',
        imgList:[],
				livEvi:{},
				flag:'',

        textarea: '',
        isFlowShow:false,
        registerId: '',
        form: {
          reason: '确认收检',
        },
        check: {
          checkPerson: '',
        },
				dialogUpload:false,


        physicalData: [],
        personData: [],
        tableData: [],
        Individual: [],
        reserve4:'',
      }
    },

    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.workFlowId = this.getData("workflowId");
      this.check.checkPerson = this.getData("userName");
      this.getEmpList();
      this.getDictInfo();
      this.queryAccept();
      this.getEvidDeal();

      this.postHttp("physical/queryPhysical", {consignmentId:this.regRow.registerId}, res => {
        this.physicalData = res.data.physicalList;
        this.personData = res.data.personInfos;
        this.Individual = res.data.individuals;
      });
    },

    methods: {
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
        getDictInfo() {
        var data = {
          "parentKeyList": ["STORAGE","CONDITION"]
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
      queryAccept() {
        let data = {};
        data['workflowId'] = this.getData("workflowId");
        data['registerId'] = this.regRow.registerId;
        this.postHttp("history/getHistory", data, res => {
          if (res.data != null) {
            this.form = res.data;
          }
        })
      },
      //保存
      save() {
        this.setData("reason", this.form.reason);
      },

      dateFormat(row, column, cellValue, index) {
        var date = cellValue;
        if (date == undefined || date == '') {
          return "";
        }
        return this.timeF(date).format("YYYY-MM-DD HH:mm:ss");
      },

      // 检材处理——start
      saveEvidDeal(){
        let dataLet = this.unBinding(this.evidDeal);
        dataLet['status'] = "2";
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
        dataLet['status'] = "2";
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

    }
  }
</script>

<style>
  #acceptCheck .mainItem {
    padding: 20px 0;
  }

  .normalColen .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 225px;
  }

  #acceptCheck {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #acceptCheck .el-row .normalCol {
    height: 3em;
    line-height: 3em;
    font-size: 14px;
  }

  #acceptCheck .yourAddress .ban {

  }

  #acceptCheck .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  #acceptCheck .el-col-4 {
    width: 14%;
  }


  #acceptCheck .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  #acceptCheck .tabb .el-table__header tr,
  #acceptCheck .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #c5cbce;
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  #acceptCheck .tabb .el-table__body tr,
  #acceptCheck .tabb .el-table__body td {
    padding: 0;
    height: 40px;
  }

  #boddy .input1,
  #boddy .input2 {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 50%;
  }

  .xianshi {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 95px;
    background-color: white;
  }

  .textareas {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 210px;
    background-color: white;
  }

  #acceptCheck .photo{
		width:400px;
		height:300px;
		margin:10px auto;
		box-sizing: border-box;
		border:1px #a7a7a7 dashed;
		position: relative;
	}
	#acceptCheck .photo .text{
		width:400px;
		height:150px;
		position: absolute;
		text-align: center;
		line-height: 150px;
		font-size: 20px;
		top:75px;
	}
	#acceptCheck .photo .take{
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
	#acceptCheck .photo video{
		position: absolute;
		left: 0px;
		right: 0px;
	}
  #acceptCheck .btns{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }

</style>
