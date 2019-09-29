<template>
    <div id="authenticateItem" style="height: 100%;">
        <el-row class="yourAddress normalRow">
            <el-col :span="12" class="normalCol" >
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>您的位置</el-breadcrumb-item>
                    <el-breadcrumb-item>配置</el-breadcrumb-item>
                    <el-breadcrumb-item>鉴定专业配置</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
			<el-col :span="4" :offset="8" class="normalCol">
				<el-button type="primary" size="mini" @click="editInfo('0','')">新增</el-button>
				<el-button type="danger" size="mini" @click="deleteAucOrgInfo()">删除</el-button>
				<el-button type="primary" size="mini" @click="activeAction('0')">启用</el-button>
				<el-button type="danger" size="mini" @click="activeAction('1')">停用</el-button>
			</el-col>
        </el-row>

		<el-row>
			<el-table
				ref="aucOrgTable"
				:data="aucOrgTableData"
				tooltip-effect="dark"
				style="width: 100%"
        align="center"
				@selection-change="aucOrgSelectionChange">
				<el-table-column type="selection" align="center" width="55"></el-table-column>
				<el-table-column prop="aucOrgCname" align="center" label="鉴定专业全称"  width="300"></el-table-column>
				<el-table-column prop="aucOrgName" align="center" label="鉴定专业简称"></el-table-column>
				<el-table-column prop="aucOrgFatherStr" align="center" label="鉴定专业父类" width="200"></el-table-column>
				<el-table-column align='center'  class-name="operations" label="操作" width="160">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="editInfo('1',scope.row.aucOrgId)">编辑</el-button>
						<el-button type="warning" size="mini" @click="editInfo('2',scope.row.aucOrgId)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
			formData:{
				// aucOrgId:'',
				// aucOrgCname:'',
				// aucOrgName:'',
				// aucOrgLogo:''
			},
			formDataRules:{
				'aucOrgCname' : [{required: true, message: '鉴定专业名称不能为空', trigger: 'blur'}],
				'aucOrgName' : [{required: true, message: '鉴定专业简称不能为空', trigger: 'blur'}],
				'aucOrgItem' : [{required: true, message: '鉴定项目不能为空', trigger: 'blur'}],
			},
            orgData:[],
			aucOrgId:'',
			editFlag:false,
			authenticatorTableData:[],
			materialTableData:[],
			columnEditFlag:false,
			authenticatorHandleSelectionChangeList:[],
			materialHandleSelectionChangeList:[],
			aucOrgTableData:[],
			aucOrgSelectionChangeList:[],


        }
    },
    methods:{
        aucOrgSelectionChange(rows){
			this.aucOrgSelectionChangeList=rows;
        },
		deleteAucOrgInfo(){
			if(this.aucOrgSelectionChangeList.length==0){
				this.notify_warning("请选择删除的数据!");
				return false;
			}
			//删除鉴定专业
			this.$confirm('此操作将删除鉴定专业及相关配置, 是否继续?', '提示', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
          		type: 'warning'
        	}).then(() => {
				this.postHttp("aucOrg/deleteAucOrgWithColumn",this.aucOrgSelectionChangeList,res =>{
					if(res.code == '0'){
						this.notify_success("删除成功");
						this.getAucOrgList();
					}else{
						this.notify_warning(res.msg);
					}
				});
				}).catch(() => {
				//取消
			});

		},
		getAucOrgList(){
			var data = {};
			this.postHttp("aucOrg/getGfLimAucOrgList",data,res =>{
				if(res.code == '0'){
					this.aucOrgTableData=res.data;
				}else{
					this.notify_warning(res.msg);
				}
			});
		},
		editInfo(editType,aucOrgId){
			this.setData("editType",editType);
			this.setData("aucOrgId",aucOrgId);
			if(editType == '0'){
				this.setData("editFlag",false);
			}else if(editType == '1'){
				this.setData("editFlag",true);
			}

			this.$router.push("authenticateItemEdit");
		},
		activeAction(type){
			//0 启用 1 停用
			var warnInfo='';
			var askInfo='';
			if(type == '0'){
				warnInfo='请选择启用的数据';
				askInfo='此操作将启用鉴定专业及相关配置, 是否继续?';
			}else if(type == '1'){
				warnInfo='请选择停用的数据';
				askInfo='此操作将停用鉴定专业及相关配置, 是否继续?';
			}
			if(this.aucOrgSelectionChangeList.length==0){
				this.notify_warning(warnInfo);
				return false;
			}
			this.aucOrgSelectionChangeList.forEach(item=>{
				item['deleteFlag']=type;
			})
			//删除鉴定专业
			this.$confirm(askInfo, '提示', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
          		type: 'warning'
        	}).then(() => {
				this.postHttp("aucOrg/activeAction",this.aucOrgSelectionChangeList,res =>{
					if(res.code == '0'){
						this.notify_success("删除成功");
						this.getAucOrgList();
					}else{
						this.notify_warning(res.msg);
					}
				});
				}).catch(() => {
				//取消
			});
		}
    },
	activated: function () {
		this.getAucOrgList();
	}
}
</script>

<style>
	*{
        font-size: 13px;
    }
    #authenticateItem{
        background-color: #f0f3fa;
        width: 100%;
        height: 100%;
        overflow:auto;
    }

     #authenticateItem .normalRow{
        margin-top: 10px;
		margin-bottom: 15px;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
        overflow:hidden;
    }
     #authenticateItem .el-row{
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 10px;
        background-color: #ffffff;
    }
     #authenticateItem .normalRow .normalCol{
        height: 3em;
        line-height: 3em;
    }
     #authenticateItem .el-breadcrumb{
        height: 3em;
        line-height: 3em;
    }

    /* 树形图 css */
	 #authenticateItem .tree{
		display: -webkit-flex; /* Safari */
		display: flex;
		flex-wrap:wrap;
		justify-content:center;
    }
    #authenticateItem .choicedName{
		text-align: center;
		height: 40px;
		line-height: 40px;
		position: relative;
	}
	#authenticateItem .sendChoice{
		position: absolute;
		right:0px;
		top:0px;
		color:#fff;
		background: #1e66dc;
		height: 30px;
		line-height: 30px;
		margin:5px 10px;
		width:130px;
		border-radius: 20px;
		text-align: center;
		cursor: pointer;
	}
	#authenticateItem .backLevel{
		position: absolute;
		right:140px;
		top:0px;
		color:#fff;
		background: #1e66dc;
		height: 30px;
		line-height: 30px;
		margin:5px 10px;
		width:130px;
		border-radius: 20px;
		text-align: center;
		cursor: pointer;

	}
	#authenticateItem .tree .items{
		width:10%;
		margin:20px 1%;
		box-sizing: border-box;
		height: 100px;
		padding:20px 10px;
		line-height: 20px;
		text-align: center;
		background: #fff;
		border-radius: 5px;
		box-shadow: 2px 4px 20px #d4d4d4;
		font-size:16px;
		cursor: pointer;
		position: relative;
	}
	#authenticateItem .tree .items .children{
		position: absolute;
		width: 100%;
		text-align: center;
		color:#666;
		height: 30px;
		line-height: 30px;
		left:0;
		bottom: 0;
		z-index: 999;
	}
	#authenticateItem .tree .items.active{
		background: #5588fe;
		color:#fff;
	}
	#authenticateItem .tree .items.active .children{
		color:#fff;
	}

	/*中间部分 css*/
	#authenticateItem .orgName{
		background: #dde7ff;
		border-radius:4px;
		width:97%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin:10px auto;
		color:#000;
	}

	 #authenticateItem .rowInfo{
        border-bottom:solid #f0f3fa
    }

	 #authenticateItem .baseInfo{
        height: 4em;
        line-height: 4em;
        border-bottom:solid #f0f3fa;
        font-size: 16px;
        margin-bottom: 15px
    }
     #authenticateItem .baseInfoTop{
        height: 3em;
        line-height: 3em;
        font-size: 20px;
        font-weight:bold;
    }


 #authenticateItem .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
   #authenticateItem .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
   #authenticateItem .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
   #authenticateItem .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
