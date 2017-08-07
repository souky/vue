<template>
  <div id="schoolFrame" class="tree_main">
  	
  	<el-tree :data="organizadata" :props="defaultProps" node-key="id" :indent="indents" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
		</el-tree>
		
		<el-dialog :visible.sync="dialogorganiza" size="tiny" :show-close="false">
			<div class="infoTitle">新增</div>
  		<div class="editBody">
  			<el-form :inline="true" class="demo-form-inline">
  				<div class="secondTitle">架构信息</div>
  				<el-form-item label="机构名称">
			      <el-input v-model="organzia_name" name="name"></el-input>
			    </el-form-item>
  			</el-form>
			</div>
			<div class="editBottom fix">
				<div class="l">
					<div class="saveInfo tc poi auto" @click="add_organiza()">保存</div>
				</div>
				<div class="l">
					<div class="cancleInfo tc poi auto" @click="dialogorganiza = false">取消</div>								
				</div>
			</div>
		</el-dialog>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        msg:'',
        indents:80,
        organizadata: [{
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogorganiza:false,
        organzia_name:'',
        org_id:'',
        handle_message:''
      }
    },
    mounted:function(){
    	var data = {}
    	this.postHttp(this,data,"organization/queryOrganizations",this.init_organiza)
    },
    methods: {

      renderContent(createElement, { node, data, store }) {
        var self = this;  
        return createElement('span', [  
            createElement('span', node.label),  
            createElement('span', {attrs:{  
                style:"float: right; margin-right: 20px",class:"tree_btn"  
            }},[  
                createElement('i',{attrs:{  
                    class:'el-icon-plus'
                },on:{  
                    click:function() {  
                    	self.org_id = data.id;
                    	self.dialogorganiza = true;
                    	self.organzia_name = "";
                    }  
                }},""),  
                createElement('i',{attrs:{  
                     class:'el-icon-minus'  
                },on:{  
                    click:function() {  
                    	self.org_id = data.id;
                    	self.$confirm('此操作将删除该机构下所有子机构, 是否继续?', '提示', {
							          confirmButtonText: '确定',
							          cancelButtonText: '取消',
							          type: 'warning'
							        }).then(() => {
							        	self.delete_organiza();
							        }).catch(() => {
							        	
							        });
                    }  
                }},""),  
            ]),  
        ]);  
      },
      
      init_organiza(obj,data){
      	this.organizadata = data.result.orgList;
      },
      add_organiza(){
      	var parentId = this.org_id;
      	var orgName = this.organzia_name;
      	var data = {parentId:parentId,name:orgName};
      	this.handle_message = "机构新增";
      	this.postHttp(this,data,"organization/saveOrganization",this.org_handle);
      },
      delete_organiza(){
      	var id = this.org_id;
      	var data = {id:id};
      	this.handle_message = "机构删除";
      	this.postHttp(this,data,"organization/deleteOrganization",this.org_handle);
      },
      org_handle(obj,data){
      	var code = data.code;
      	if(code=="10000"){
      		this.postHttp(this,data,"organization/queryOrganizations",this.init_organiza);
      		this.dialogorganiza = false;
      		this.notify_jr(this,this.handle_message,"操作成功","success");
      	}else{
      		this.notify_jr(this,this.handle_message,data.message,"error");
      	}
      	
      }
    }
  }
</script>

<style>
#schoolFrame .el-tree{background:#f5f5f5;border:none;}
#schoolFrame {padding:20px;}

#schoolFrame i{font-size:14px;padding:3px;margin-right:20px;border-radius:2px;}
#schoolFrame .el-icon-plus{color:#EF5350;border:1px #EF5350 solid;}
#schoolFrame .el-icon-minus{color:#FFCA28;border:1px #FFCA28 solid;}
#schoolFrame .el-tree-node__expand-icon{border-left-color:#202a33;}
#schoolFrame .editBody{min-height: 110px;}
#schoolFrame .el-message-box{vertical-align: unset;}
#schoolFrame .el-message-box .el-button--primary{background:#66BB6A;border-color:#66BB6A;}
</style>