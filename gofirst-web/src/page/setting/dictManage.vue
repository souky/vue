<template>
<div class="dictManage">

        <el-row class="yourAddress normalRow">
            <el-col :span="12" class="normalCol" >
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                    <el-breadcrumb-item>配置</el-breadcrumb-item>
                    <el-breadcrumb-item>字典项配置界面</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>

    <div class="parentTitle">
       <i class="el-icon-setting"></i>
       <span>父类字典列表</span>
    </div>

    <div  class="parentDiv">
        <el-table  :data="tableParent.filter(data => !searchParent || data.dictKey.toLowerCase().includes(searchParent.toLowerCase()) || data.dictValue.toLowerCase().includes(searchParent.toLowerCase()))"
                    class="tableParent"
                    height="500"
                    @row-click="clickRow"

                    highlight-current-row>
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="list-table-expand">
                <el-form-item label="字典KEY">
                    <span>{{ props.row.dictKey }}</span>
                </el-form-item>
                <el-form-item label="字典值">
                    <span>{{ props.row.dictValue }}</span>
                </el-form-item>
                <el-form-item label="根节点KEY">
                    <span>{{ props.row.rootKey }}</span>
                </el-form-item>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column  prop="dictKey"  label="字典KEY"    width="250"></el-table-column>
            <el-table-column  prop="dictValue" label="字典值"   width="250"></el-table-column>
            <el-table-column  prop="rootKey"  label="根节点KEY"  width="250"></el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-row>
                        <el-col :span="18"><el-input v-model="searchParent" size="mini" placeholder="输入关键字搜索"/></el-col>
                        <el-col :span="6"><el-button type="primary"  @click="addParent" size="small" >新增</el-button></el-col>
                    </el-row>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" type="warning" @click="parentEdit(scope.$index, scope.row)" plain>编辑</el-button>
                    <el-button size="mini" type="danger" @click="parentDelete(scope.$index, scope.row)" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

   <div class="sonTitle">
       <i class="el-icon-setting"></i>
       <span>子类字典列表</span>
   </div>

   <div class="sonDiv" >
        <el-table   :data="tableSon.filter(data => !searchSon || data.dictKey.toLowerCase().includes(searchSon.toLowerCase()) || data.dictValue.toLowerCase().includes(searchSon.toLowerCase()))"
                    class="tableSon"
                    height="400">
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="list-table-expand">
                <el-form-item label="字典KEY">
                    <span>{{ props.row.dictKey }}</span>
                </el-form-item>
                <el-form-item label="字典值">
                    <span>{{ props.row.dictValue }}</span>
                </el-form-item>
                <el-form-item label="父类KEY">
                    <span>{{ props.row.parentKey }}</span>
                </el-form-item>
                <el-form-item label="字典顺序">
                    <span>{{ props.row.dictSort }}</span>
                </el-form-item>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column  prop="dictKey"  label="字典KEY"  width="180"></el-table-column>
            <el-table-column  prop="dictValue"  label="字典值" width="200"></el-table-column>
            <el-table-column  prop="parentKey"  label="父类KEY" width="200"></el-table-column>
            <el-table-column  prop="dictSort"  label="字典顺序" width="150"></el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-row>
                        <el-col :span="18"><el-input  v-model="searchSon" size="mini" placeholder="输入关键字搜索"/></el-col>
                        <el-col :span="6"><el-button type="primary"  @click="addSon" size="small" >新增</el-button></el-col>
                    </el-row>
                </template>
            <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="sonEdit(scope.$index, scope.row)" plain>编辑</el-button>
                <el-button size="mini" type="danger"  @click="sonDelete(scope.$index, scope.row)" plain>删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- 父类弹框开始 -->
    <el-dialog :title="aeParent"
                width="30%"
                :visible.sync="dialog4Parent">
      <el-form :model="parentDictInfo"
                style="width:85%">
        <el-form-item label="机构" label-width="150px">
          <el-input v-model="parentDictInfo.orgId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典编号" label-width="150px" >
          <el-input v-model="parentDictInfo.dictKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典中文"  label-width="150px">
          <el-input v-model="parentDictInfo.dictValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="根节点" label-width="150px">
          <el-input v-model="parentDictInfo.rootKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" label-width="150px">
            <el-switch v-model="parentDictInfo.readonlyFlag" autocomplete="off"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog4Parent = false">取 消</el-button>
        <el-button type="primary" @click="saveParent">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 子类弹框开始 -->
    <el-dialog :title="aeSon"
                width="30%"
                :visible.sync="dialog4Son">
      <el-form :model="sonDictInfo"
                style="width:85%">
        <el-form-item label="机构" label-width="150px">
          <el-input v-model="sonDictInfo.orgId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典编号"  label-width="150px" prop="dictKey">
          <el-input v-model="sonDictInfo.dictKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典中文"  label-width="150px">
          <el-input v-model="sonDictInfo.dictValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典顺序"  label-width="150px" prop="dictSort"
                :rules="[{required: true, message: '必填项', trigger: 'change'},
                        {type: 'number', message: '必须为数字值', trigger: 'blur'}
                        ]">
            <el-input v-model.number="sonDictInfo.dictSort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" label-width="150px">
            <el-switch v-model="sonDictInfo.readonlyFlag" autocomplete="off"></el-switch>
        </el-form-item>
        <el-form-item label="父节点"  label-width="150px">
          <el-input v-model="sonDictInfo.parentKey" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="父节名称"  label-width="150px">
          <el-input v-model="sonDictInfo.parentValue" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog4Son = false">取 消</el-button>
        <el-button type="primary" @click="saveSon">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
  export default {
    data() {
      return {
        aeSon:'',
        aeParent:'',
        editFlag:'',
        tableParent: [],
        tableSon: [],
        searchParent: '',
        searchSon: '',
        parentDictInfo:{},
        sonDictInfo:{},
        infoId:{
            dictId:''
        },
        dialog4Parent:false,
        dialog4Son:false,
        temp:{
             dictLevel: "0"
            },
        sonRow:{
            parentKey: "",
            parentValue:'',
        }
      }
    },
    methods: {
        clickRow(row){
            this.sonRow.parentKey = row.dictKey;
            this.sonRow.parentValue = row.dictValue;
            this.searchSon = '';
            this.sonBase();
        },
         /**
         * 父类的基本信息
         */
        parentBase(){
            this.postHttpForLogin("dict/getDictInfo",this.temp,res =>{
                if(res.code == '0'){
                    this.tableParent=res.data;
                }else{
                    this.notify_warning(res.msg);
                }
            });
        },
        /**
         * 子类的基本信息
         */
        sonBase(){
            this.postHttpForLogin("dict/getDictInfo",this.sonRow,res =>{
                if(res.code == '0'){
                    this.tableSon=res.data;
                }else{
                    this.notify_warning(res.msg);
                }
            });
        },
        /**
         * 弹出父类添加框
         */
        addParent(){
            this.editFlag = '0';
            this.aeParent = '新增父类字典';
            this.parentDictInfo = {};
            this.parentDictInfo.readonlyFlag = true;
            this.dialog4Parent = true;
        },
        /**
         * 回显父类框
         */
        parentEdit(i,row){
            this.aeParent = '编辑父类字典';
            this.infoId.dictId = row.dictId;
            this.postHttpForLogin("dict/getDictInfo",this.infoId,res =>{
                if(res.code == '0'){
                    this.parentDictInfo=res.data;
                    if(this.parentDictInfo.readonlyFlag == 'true'){
                        this.parentDictInfo.readonlyFlag = true;
                    }

                }else{
                    this.notify_warning(res.msg);
                }
            });
            this.editFlag = '1';
            this.dialog4Parent = true ;
        },
        /**
         * 弹出子类添加框
         */
        addSon(){
            this.editFlag = '0';
            this.aeSon = '新增子类字典';
            this.sonDictInfo = {};
            this.sonDictInfo.parentKey = this.sonRow.parentKey;
            this.sonDictInfo.parentValue = this.sonRow.parentValue;
            this.sonDictInfo.readonlyFlag = true;
            if(this.sonDictInfo.parentKey){
                this.dialog4Son = true
            }else{
                this.notify_warning("请选择一个父字典项");
            }

        },
        /**
         * 回显子类框
         */
        sonEdit(i,row){
            this.editFlag = '1';
            this.aeSon = '编辑子类字典';
            this.infoId.dictId = row.dictId;
            this.postHttpForLogin("dict/getDictInfo",this.infoId,res =>{
                if(res.code == '0'){
                    this.sonDictInfo=res.data;
                    this.sonDictInfo.parentValue = this.sonRow.parentValue;
                    if(this.sonDictInfo.readonlyFlag == 'true'){
                        this.sonDictInfo.readonlyFlag = true;
                    }
                }else{
                    this.notify_warning(res.msg);
                }
            });
            this.dialog4Son = true ;
        },
        /**
          * 删除父类
          */
        parentDelete(i,row){
            this.$confim("确定要删除此项？","提示",data=>{
                this.getHttpForLogin("dict/delDict",{"dictId":row.dictId},res =>{
                    if(res.code == '0'){
                            this.$message({
                                message: '字典项 《 '+row.dictValue +' 》 删除成功!',
                                type: 'success'
                            });
                            this.parentBase();
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
			})

        },
         /**
          * 删除子类
          */
        sonDelete(i,row){
            this.$confim("确定要删除此项？","提示",data=>{
                this.getHttpForLogin("dict/delDict",{"dictId":row.dictId},res =>{
                    if(res.code == '0'){
                            this.$message({
                                message: '字典项 《 '+row.dictValue +' 》 删除成功!',
                                type: 'success'
                            });
                            this.sonBase();
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
			})

        },
        /**
         * 保存父类信息
         */
        saveParent(){
            let dataLet = this.unBinding(this.parentDictInfo);
            dataLet.dictLevel = "0";
            console.log(dataLet)
            if(this.editFlag == '0'){
                this.postHttpForLogin("dict/insertDictInfo",dataLet,res =>{
                    if(res.code == '0'){
                                this.$notify({
                                        title: '成功',
                                        message: '添加成功！',
                                        type: 'success'
                                        });
                        this.dialog4Parent = false ;
                        this.parentBase();
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
            }else if(this.editFlag == '1'){
                this.postHttpForLogin("dict/updateDict",dataLet,res =>{
                    if(res.code == '0'){
                        this.sonRow.parentKey = dataLet.dictKey;
                        this.sonRow.parentValue = dataLet.dictValue;
                        this.notify_warning("修改成功！");
                        this.dialog4Parent = false ;
                        this.parentBase();
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
            }
        },
        /**
         * 保存子类信息
         */
        saveSon(){
            let dataLet = this.unBinding(this.sonDictInfo);
            dataLet.dictLevel = "1";
            if(!dataLet.readonlyFlag == true){
                dataLet.readonlyFlag = "1"
            }
            console.log(dataLet)
            if(this.editFlag == '0'){
                this.postHttpForLogin("dict/insertDictInfo",dataLet,res =>{
                    if(res.code == '0'){
                            this.$message({
                                message: '字典项 《 '+dataLet.dictValue +' 》 添加成功!',
                                type: 'success'
                            });
                        this.dialog4Son = false ;
                        this.sonBase();
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
            }else if(this.editFlag == '1'){
                this.postHttpForLogin("dict/updateDict",dataLet,res =>{
                    if(res.code == '0'){
                            this.$message({
                                message: '字典项 《 '+dataLet.dictValue +' 》 修改成功!',
                                type: 'success'
                            });
                        this.dialog4Son = false ;
                        this.sonBase();
                    }else{
                        this.notify_warning(res.msg);
                    }
                });
            }
        },
    },
    activated:function () {
           this.parentBase();
    }
  }
</script>

<style >
    .dictManage {
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow:auto;
    }
    .dictManage .el-breadcrumb{
        height: 3em;
        line-height: 3em;
    }
    .dictManage .el-row{
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        /* background-color: #ffffff; */
    }
    .dictManage .normalRow{
        margin-top: 10px;
		margin-bottom: 15px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow:hidden;
    }
    .parentDiv {
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;

    }
    .sonDiv {
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
    }
    .parentTitle{
        text-align: center;
        font-size: 16px;
        background-color: #f0f3fa;
        height: 50px;
        line-height: 50px;
    }
    .sonTitle{
        text-align: center;
        background-color: #f0f3fa;
        font-size: 16px;
        height: 50px;
        line-height: 50px;

    }
    .dictManage .el-table th div {
        height: 29px;
        line-height: 29px;
    }
    .dictManage .el-table__header tr,
    .dictManage .el-table__header th {
        padding: 0;
        height: 40px;
        background-color: #c5cbce;
        color: white;
        /* border-bottom: 1px rgb(72, 169, 224) solid; */
    }
    .dictManage .el-table__body tr,
    .dictManage .el-table__body td {
        padding: 0;
        height: 40px;
    }
    .el-table__body tr.current-row>td {
        background: RGB(85,136,254) !important;
        color:#fff;
    }
   .dictManage .el-table{
        width: 100% !important;
    }
   .tableSon {
        width: 100%;
        height: 80%;
    }
    .list-table-expand {
        font-size: 0;
        margin-left: 80px;
   }
   .list-table-expand label {
        width: 90px;
        color: #99a9bf;
   }
   .list-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 80%;
   }
</style>
