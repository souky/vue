<template>
  <div id="accountList" class="account-list-container">
		<el-row type="flex" class="row-bg pt20 pl20" justify="start">
        <el-col :span="4" class="pct25 mr20 ">
            <label class="mr20">学校  </label>
            <el-select v-model="optionSchool_val" class="pct70" placeholder="请选择学校" @change="school_chage()">
                <el-option v-for="item in optionSchool" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20">年级</label>
            <el-select v-model="optionGrand_val" class="pct70" placeholder="请选择年级">
                <el-option v-for="item in optionGrand" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20">账户名</label>
            <el-input class="pct70" v-model="userName_q" placeholder="请输入账户名"></el-input>
        </el-col>
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20">姓名</label>
            <el-input class="pct70" v-model="name_q" placeholder="请输入姓名"></el-input>
        </el-col>
    </el-row>
    <el-row type="flex" class="row-bg mt20 pl20" justify="start">
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20"></label>
        </el-col>
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20"></label>
        </el-col>
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20"></label>
        </el-col>
        <el-col :span="4" class="pct25 mr20">
        		<label class="mr20 l"></label>
            <el-button type="success" class="pct70 l" @click="query_user()">查询</el-button>
        </el-col>
    </el-row>
    
    <div class="addNew" @click="dialogadd()">
    	<i class="el-icon-plus" ></i>新建
    </div>

    <div class="main-container">
      <!--表格部分-->
      <el-table :data="tableData" stripe row-key="id" style="width:100%;margin-top: 20px;">
    		<el-table-column prop="orgId" label="学校" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="role" label="角色" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="userName" label="账户名" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="name" label="姓名" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="phone" label="联系电话" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column label="操作" align="center" show-overflow-tooltip min-width="150px">
    			<template scope="scope">
		    			<i title="编辑" class="el-icon-edit" @click="dialogEdits(scope.row.id)"></i>
		    			<i title="删除" class="el-icon-delete"></i>
		    	</template>
    		</el-table-column>
    	</el-table>
    	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum"
			      :page-sizes="[10, 20, 50]"
			      :page-size="pageSize"
			      layout="sizes, prev, pager, next, jumper"
			      :total="total" class="tc mt20"
			      >
	    </el-pagination>
    </div>
    
    <el-dialog :visible.sync="dialogaccount" :show-close="false">
  		<div class="infoTitle" :model="infoTitles">{{infoTitles}}</div>
  		<div class="editBody">
				    	<el-form :inline="true" class="demo-form-inline">
				    		<div class="secondTitle">基本信息</div>
				    		<el-form-item label="学校" >
						        <el-select v-model="user.orgId">
						        	<el-option v-for="item in optionSchool" :key="item.id" :label="item.name" :value="item.id">
											</el-option>
								    </el-select>
						    </el-form-item>
						    <el-form-item label="角色">
						        <el-select v-model="user.role">
							    </el-select>
						    </el-form-item>
						    <el-form-item label="账户名">
						      <el-input v-model="user.userName" ></el-input>
						    </el-form-item>
						    <el-form-item label="姓名">
						      <el-input v-model="user.name" ></el-input>
						    </el-form-item>
						    <el-form-item label="联系电话">
						      <el-input v-model="user.phone" ></el-input>
						    </el-form-item>
						    <div v-if="infoTitles=='新建账户'">
							    <div class="secondTitle">设置密码</div>
					    		<el-form-item label="初始密码">
							      <el-input v-model="psw" ></el-input>
							    </el-form-item>
							    <el-form-item label=" ">
							    </el-form-item>
							    <el-form-item label="确认密码">
							      <el-input v-model="psw_c" ></el-input>
							    </el-form-item>
						    </div>
						    <div v-else>
						    	<div class="secondTitle">密码管理</div>
						    	<el-form-item label=" ">
							      <el-button type="success reset" class="pct100 l">重置密码</el-button>
							    </el-form-item>
						    </div>
						    <div class="infotext" v-if="passwordnew!=''">
						    	该账户的新密码为<font style="color:#66BB6A">{{passwordnew}}</font>,请管理员尽快将该密码告知用户
						    </div>
						</el-form>
					</div>
			<div class="editBottom fix">
				<div class="l">
					<div class="saveInfo tc poi auto" @click="saveUser()">保存</div>
				</div>
				<div class="l">
					<div class="cancleInfo tc poi auto" @click="dialogaccount = false">取消</div>								
				</div>
			</div>
		</el-dialog>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        msg:'hello vue',
        optionSchool:null,
        optionGrand:null,
        optionSchool_val:'',
        optionGrand_val:'',
        userName_q:'',
        name_q:'',
        
        infoTitles:'新建账户',
        dialogaccount:false,
        passwordnew:'',
        user:[],
        tableData:[],
        pageNum:1,
        pageSize:10,
        total:0,
        
        psw:'',
        psw_c:'',
        
      }
    },
    methods:{
    	dialogadd(){
    		this.infoTitles = "新建账户";
    		this.user = [];
    		this.dialogaccount = true;
    	},
    	dialogEdits(id){
    		this.infoTitles = "编辑账户";
    		this.dialogaccount = true;
    		var data = {id:id};
    		this.postHttp(this,data,"user/queryUserById",this.editHandle);
    	},
    	editHandle(obj,data){
    		this.user = data.result;
    		delete this.user["createDate"];
    		delete this.user["updateDate"];
    	},
    	school_chage(){
    		var id = this.optionSchool_val;
    		if(id!=""){
    			this.get_options(this,id,"optionGrand");
    		}
    	},
    	handleSizeChange(val) {
    		this.pageSize = val;
    		this.pageNum = 1;
		  	var data = ajaxDate(this);
		  	initDate(this,data);
		  },
		  handleCurrentChange(val) {
		  	this.pageNum = val;
		  	var data = ajaxDate(this);
		   initDate(this,data);
		  },
    	dataHandle(obj,data){
    		this.tableData = data.result.list;
    		this.pageNum = data.result.pageNum;
    		this.pageSize = data.result.pageSize;
    		this.total = data.result.total;
    	},
    	saveUser(){
    		var data = this.user;
    		this.postHttp(this,data,"user/updateUser",this.ajax_handle);
    	},
    	ajax_handle(obj,data){
    		if(data.code=="10000"){
    			this.notify_jr(this,this.infoTitles,'操作成功','success');
    			this.dialogaccount = false;
    			var data_s = ajaxDate(this);
    			initDate(this,data_s);
    		}else{
					this.notify_jr(this,this.infoTitles,data.message,'error');    			
    		}
    	},
    	query_user(){
    		var data_s = ajaxDate(this);
    		initDate(this,data_s);
    	}
    },
    mounted:function(){
    	this.get_options(this,"","optionSchool");
    	
    	var data = ajaxDate(this);
    	initDate(this,data);
    }

  }
  function initDate(obj,data){
  	obj.postHttp(obj,data,"user/queryUsers",obj.dataHandle);
  }
  function ajaxDate(obj){
  	var pageNum = obj.pageNum;
  	var pageSize = obj.pageSize;
  	var orgId = obj.optionSchool_val;
  	var gradeId = obj.optionGrand_val;
  	var userName = obj.userName_q;
  	var name = obj.name_q;
  	var data = {pageNum:pageNum,pageSize:pageSize,orgId:orgId,gradeId:gradeId,uesrName:userName,name:name};
  	console.log(data+"-"+pageSize);
  	return data;
  }
</script>

<style>
	#accountList .addNew{padding:20px 30px 0px 30px;cursor: pointer;}
	#accountList .addNew i{border:1px #272727 solid;color:#272727;padding:2px;margin-right:6px;border-radius: 2px;}
	#accountList .editBody .el-select{width:100%;}
	#accountList .reset{color:#66BB6A;background: #fff;}
	#accountList .infotext{padding-left:10%;font-size:16px;color:#000;}
	
	#accountList .el-form--inline .el-form-item{margin-right:0px;width:49%;}
	#accountList .infoBody .el-input__inner{width:220px;}
	#accountList .el-form-item__label{width:35%}
	#accountList .el-form-item__content{width:61%;}
	#accountList .el-cascader.is-opened .el-input__inner{border-color: #66BB6A;width:400px}
	#accountList .el-cascader .el-input__inner{width: 400px;}
</style>