<template data-title="检验记录">
  <div id="inspectionRecord">
    <el-table v-if="!show" class="dynamicTable" :data="aucEvidList" style="width:100%;">
      <el-table-column align="center" show-overflow-tooltip label="受理号">
        {{bookNo}}
      </el-table-column>
      <el-table-column align="center"  prop="aucTipId" label="检验记录"  width="200" :formatter="aucTipIdFormatter"></el-table-column>
      <el-table-column align="center" prop="evidId" label="检材"  width="200" :formatter="evidIdFormatter"></el-table-column>
      <el-table-column align="center" prop="createUser" label="收检人员"></el-table-column>
      <el-table-column align="center" label="是否收检" width="100">
          <template slot-scope="scope">
              {{ scope.row.evidFlag == '1' ? '是': '否' }}
          </template>
      </el-table-column>
      <el-table-column v-if='!isFlowShow' align="center" label="操作" width="100" class-name="operations">
        <template slot-scope="scope">
          <div class="op_items" >
            <el-button size="mini" plain type="primary" @click="ed_func(scope.row)">检验记录</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-else align="center" label="操作" width="100" class-name="operations">
        <template slot-scope="scope">
          <div class="op_items" >
            <el-button size="mini" plain type="primary" @click="ed_func(scope.row)">查看记录</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <router-view v-if="show" v-on:back="back"></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      aucEvidList:[],
      show:false,
      checkData:[],
      empList:[],
      aucData:[],
      bookNo:'',
      isFlowShow:false,
    }
  },
  mounted:function(){
    this.regRow = JSON.parse(this.getData("regRow"));
    this.show = false;
    this.getAucEvidList();
    this.getCheckData();
    this.getEmpList();
    this.getBookNo();
    this.aucDataList();
    this.isFlowShow = eval(this.getData('isFlowShow'));
    this.show = false;
  },
  methods:{
    ed_func(row){
      let number = [];
      let status = [];
      let names = [];
      for(let x in row.evidId){
        for(let e in this.checkData){
          if(this.checkData[e].id == row.evidId[x]){
            number.push(this.checkData[e].materialSerialNum);
            status.push(this.checkData[e].MATERIALATTRIBUTE);
            names.push(this.checkData[e].NAME);
          }
        }
      }
      row['number'] = number.join(",");
      row['status'] = status.join(",");
      row['names'] = names.join(",");
      row['bookNo'] = this.bookNo;
      this.setData("rows",JSON.stringify(row));

      if(row.aucTipId){
        this.show = true;
        this.$router.push("/"+row.aucTipId);
      }else{
        this.notify_error("未分配检验记录！");
      }
    },
    back(){
      this.show = false;
      this.$emit('saveHis');
    },
    getAucEvidList(){
         this.getHttp("eviAuc/getAucEvidList",{"registerId":this.regRow.registerId},res =>{
            if(res.code == '0'){
                for (let index = 0; index < res.data.length; index++) {
                    const element = res.data[index];
                     element.evidId =  eval(element.evidId);
                }
                this.aucEvidList=res.data;
            }else{
                this.$notify_warning(res.msg);
            }
        });
    },
    aucDataList(){
        this.postHttp("eviAuc/getAucTipList",{"aucOrgId":this.regRow.aucOrgId,"type":1},res =>{
            if(res.code == '0'){
                this.aucData = res.data;
            }else{
                this.$notify_warning(res.msg);
            }
        });
    },
    /**
     * 获取人员信息
     */
    getEmpList(){
      let empPto = {};
      empPto['orgId'] = this.regRow.orgId;
      this.postHttpForLogin("empsController/selectAllEmps",empPto,res =>{
          if(res.code == '0'){
              this.empList=res.data;
          }
      });
    },
    /**
    获取检材样本列表信息
     */
    getCheckData(){
      this.getHttp("evidences/getEvidenceListForReal",{"registerId":this.regRow.registerId},res =>{
          if(res.code == '0'){
              this.checkData=res.data;
          }else{
              this.$notify_warning(res.msg);
          }
      });
    },
    /**
    获取受理号
     */
    getBookNo(){
      this.getHttp("previews/getPreviews",{"registerId":this.regRow.registerId},res =>{
          if(res.code == '0'){
              this.bookNo = res.data.acceptBookNo;
          }else{
              this.$notify_warning(res.msg);
          }
      });
    },
    /**
     * 遍历回显aucTipId
     */
    aucTipIdFormatter(row,value,cell){
        let returnString = '';
        let checkTipTemp = this.aucData;
        for(let e in checkTipTemp){
            if(checkTipTemp[e].model == cell){
                returnString = checkTipTemp[e].name;
            }
        }
        return returnString;
    },
    evidIdFormatter(row,value,cell){
      let returnString = '';
      let arrayTmp = [];
      let checkTipTemp = this.checkData;
      for(let e in checkTipTemp){
          cell.forEach(element => {
              if(checkTipTemp[e].id == element){
                  arrayTmp.push(checkTipTemp[e].NAME);
              }
          });
      }
      returnString = arrayTmp.join(",");
      row.aucName = returnString;
      return returnString;
    },
  }
}
</script>

<style>
#inspectionRecord{
  width:90%;
  margin:auto;
  padding-bottom:20px;
}
</style>
