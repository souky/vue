<template>
	<div id="entrustInspection">
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

		        <div class="doStep ">4.编辑被鉴定人信息</div>
		        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

		        <div class="doStep doStepActive">5.编辑检材样本信息</div>
		        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

		        <div>6.选择鉴定要求</div>
		        <i class="icon"><img src="@/assets/img/arrow-right.png"></i>

		        <div>7.填写提交</div>
		    </el-col>
		    <el-col :span="2" class="normalCol rightSide">
		    </el-col>
		</el-row>

		<div class="choice mainItem">
			<div class="choiceTxt">
				<div class="img">
					<img src="@/assets/img/list.png" />
				</div>
				<div class="text">选择检验情况</div>
				<div class="baseInfo">
					[ {{orgName}} ]   送检登记 - [ {{aucOrgCname}} ]
				</div>
			</div>
			<!-- <div class="goBack" @click="goback">
				<img src="@/assets/img/goback.png" />
				返 回
			</div> -->
		</div>

		<!-- table开始 -->
		<div class="tables mainItem" v-loading="loading">
			<div class="deleteRows">
				<div>
					<el-button type="primary" icon="el-icon-document" size="mini" @click="getMaterial" :loading="btnLoading">提取物证</el-button>
				</div>
				<div>
					<el-button type="primary" icon="el-icon-plus" size="mini"  @click="openAdd">新增</el-button>
				</div>
			</div>
			<DynamicTable :tableData="dynamicData" @edit="edit" @deletes="deletes" @upload="upload"></DynamicTable>
			<div class="nextMove" v-if="flag != '1'">
				<el-button type="primary" @click="goback">上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
			<div class="nextMove" v-if="flag == '1'">
				<el-button type="primary" @click="goback">返    回</el-button>
      </div>
		</div>

		<!-- 弹框开始 -->
		<el-dialog :title="addOrEdit" width="65%" :visible.sync="dialogAddOrEdit" :close-on-click-modal='false'>
		  <!-- <el-form :model="GfLimEvidences" style="width:85%" :rules="addRules" ref="addForm">
			<el-upload :action="action" list-type="picture-card" ref="upload" :http-request="uploadFile" :file-list="GfLimEvidences.imgList"
			:data="GfLimEvidences" :multiple="true" :auto-upload="false" :on-remove="handleRemove">
				<i class="el-icon-plus"></i>
			</el-upload>
		  </el-form> -->
			<DynamicForm :formDatas="dynamicData" ref="formOne"></DynamicForm>
		  <div slot="footer" class="dialog-footer">
				<el-button @click="dialogAddOrEdit = false">取 消</el-button>
				<el-button type="primary" @click="saves">确 定</el-button>
		  </div>
		</el-dialog>

		<el-dialog title="上传图片" width="440px" :visible.sync="dialogUpload" :close-on-click-modal='false'>
			<el-upload :action="action" list-type="picture-card" ref="upload" :file-list='imgList' :data="livEvi" :on-remove="handleRemove" :multiple="true" :http-request="uploadFile" :auto-upload="false" >
				<i class="el-icon-plus"></i>
			</el-upload>
			<div class="photo" @click="open_photo">
				<div class="text">
					拍照区域,单击打开摄像头
				</div>
				<div class="take">
					<el-button  icon="el-icon-camera" circle @click.prevent='take_photo'></el-button>
				</div>
				<vue-webcam ref='webcam'></vue-webcam>
			</div>
		  <div slot="footer" class="dialog-footer">
				<el-button @click="cancle">取 消</el-button>
				<el-button type="primary" @click="uploads">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>

<script>
	export default{
		data:function(){
			return {
				msg:'',
				orgName:'',
				aucOrgCname:'',
				registerId:'',

				addOrEdit:'新增',
				dialogAddOrEdit:false,

				action:'',
				dialogUpload:false,
				imgList:[],
				livEvi:{},
				flag:'',

				loading:true,
				dynamicData:{
					data:[],
					hasCheck:'0',
					hasIndex:'1',
			    align:'center',
			    hasEdit:'1',
					hasUploadButton:'1',
					hasEditButton:'1',
					hasDeleteButton:'1',
					headers:[],
					form:{
						style:"width:90%;margin:auto",
						ref:'addform',
						labelWidth:"80px",
						model:{},
						rules:{}
					}
				},
				btnLoading:false,
			}
		},
	  created:function(){
			this.dynamicData.form.rules = this.$DefaultRules.rules
	  },
		activated:function(){
			this.$set(this.dynamicData,'data',[]);
			this.action = '/auc/evidengesExtd/saveImgs';
			this.registerId = this.getData("registerId");
			this.aucOrgCname = this.getData("aucOrgCname");
			this.orgName = this.getData("orgName");
			// 获取表头
			let data = {aucOrgId:this.getData('aucOrgId'),type:'2'}
			this.postHttp("evidenceColumn/selectListByAucOrgId",data,res=>{
				this.dynamicData.headers = res.data;
				this.loadData();
			});
			this.flag = this.getData('entrustInfoEditFlag');
		},
		methods:{
			//查询
			loadData(){
				let data = {registerId:this.registerId,type:'2'}
				this.postHttp("evidengesExtd/getEvidengesExtdList",data,res=>{
					this.dynamicData.data = res.data;
					this.loading = false;
				});
			},
			//打开新增窗口
			openAdd(){
				this.dynamicData.form.model = {};
				this.$DealReceive(this.dynamicData);
				this.dialogAddOrEdit = true;
				if(this.$refs['formOne']){
					this.$refs['formOne'].getForm().clearValidate();
				}
				this.addOrEdit = "新增"
			},
			// 上传
			upload(row){
				this.postHttp("evidencesImg/selectByEviId",row.id,res =>{
					if(res.data.length > 0){
						for(let x in res.data){
							res.data[x]['url'] = res.data[x].address;
						}
						this.imgList = res.data;
					}else{
						this.imgList = [];
					}
					this.dialogUpload = true;
					this.livEvi.id = row.id;
					this.fileData = new FormData();

				});
			},
			cancle(){
				this.$refs.webcam.pause();
				this.dialogUpload = false;
			},
			// 上传方法
			uploads(){
				this.submitUpload();
			},
			uploadFile(file){
					this.fileData.append('file', file.file);
			},
			submitUpload: function () {

			    this.fileData = new FormData();
					this.fileData.append('id', this.livEvi.id);
					this.fileData.append('registerId', this.registerId);
					this.$refs.upload.submit();
					this.fileData.delete('createDatetime');
					this.fileData.delete('updateDatetime');
					let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
					this.$axios.post(this.action,this.fileData,config).then(response => {
				  		if(response.data.code == '0'){
								this.dialogUpload = false;
								this.notify_success('操作成功');
								this.loadData();
							}else{
								this.notify_error(response.data.msg);
							}
				    },response => {
							this.notify_error('网络错误');
					})
			},
			//单独删除
			handleRemove(file, fileList) {
        this.postHttp("evidencesImg/deleteEvidenceImg",file,res=>{
				})
      },
			//保存送检信息
			saves(){
				this.$refs['formOne'].getForm().validate((valid) => {
          if (valid) {
						let data = this.$DealSend(this.dynamicData).form.model;
						data['registerId'] = this.registerId;
						data['type'] = '2';
						delete data['createDatetime'];
						this.postHttp("evidengesExtd/insertAndUpdateEvidengesExtd",data,res=>{
							if(res.code == '0'){
								this.notify_success("操作成功");
								this.dialogAddOrEdit = false;
								this.loadData();
							}else{
								this.notify_error(res.msg)
							}
						});
          } else {
            return false;
          }
        });

			},
			//编辑
			edit(row){
				this.dynamicData.form.model = row;
				this.$DealReceive(this.dynamicData);
				this.dialogAddOrEdit = true;
				this.addOrEdit = "修改"
			},
			//删除
			deletes(row){
				this.$confim("是否确认删除此条数据?",'提示',data => {
					this.postHttp('evidengesExtd/deleteEvidengesExtd',row,res=>{
						if(res.code == '0'){
							this.loadData();
							this.notify_success('操作成功');
						}else{
							this.notify_error('操作失败');
						}
					})
				})
			},
			//下一步
			nextStep(){
				if( this.dynamicData.data.length <= 0){
					this.notify_error('请添加至少一个 检材/样本');
					return;
				}
				let url = this.getData('entrustInfoEditFlag') == '1'?'entrustInfo':'authRequ';
				this.$router.push(url);
			},
			goback(){
				let url = this.getData('entrustInfoEditFlag') == '1'?'entrustInfo':'authenticator';
				this.$router.push(url);
			},
			open_photo(){
        //打开摄像头
        this.$refs.webcam.open();
      },
			take_photo(){
				let file = this.dataURLtoBlob();

				if(null != file){
					let files = {
		        status: 'ready',
		        name: file.name,
		        size: file.size,
		        percentage: 0,
		        uid: file.uid,
		        raw: file,
						url:URL.createObjectURL(file)
		      };
		      this.$refs.upload.uploadFiles.push(files);
					this.$refs.upload.onChange(files, this.$refs.upload.uploadFiles);

					this.fileData.append('file',file);

				}
			},
			dataURLtoBlob() {
				let url = this.$refs.webcam.getPhoto();

				if(url == null || url == undefined){
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
				let bolb = new Blob([u8arr], { type: mime });
				bolb.lastModifiedDate = new Date();
				let file = new File([bolb], new Date().getTime()+'.jpg', {type: mime, lastModified: Date.now()});
				file.uid = new Date().getTime();

        return file;
	    },
			// 提取物证
			getMaterial(){
				this.$confim("提取信息将会删除已经提取的图片,是否继续?",'提示',data => {
					this.btnLoading = true;
					this.postHttp('link/getMaterial',{registerId:this.getData("registerId"),aucOrgId:this.getData("aucOrgId")},res=>{
						this.btnLoading = false;
						if(res.code == '0'){
							this.loadData();
							this.notify_success('提取成功');
						}else{
							this.notify_error(res.msg);
						}
					})
				})

			}
		}
	}
</script>

<style>
	#entrustInspection{
		width: 100%;
		background:#f0f3fa;
		height:100%;
		overflow: auto;
		position: relative;
		font-family: "microsoft yahei";
	}

	/* table */
	#entrustInspection .deleteRows{
		display: -webkit-flex; /* Safari */
		display: flex;
		justify-content:space-between;
	}
	#entrustInspection .tables{
		padding:10px 20px;
		box-sizing: border-box;
	}
	#entrustInspection .queryGet{
		align-self:flex-end!important;
		align-items: flex-end!important;
	}
	#entrustInspection .tables td.operations .cell{
		width: 100%;
		display: flex;
		text-align: center;
	}
	#entrustInspection .tables td.operations .cell .op_items{
		margin:auto 3px;
	}

	/* query */
	#entrustInspection .query{
		width:97%;
		margin:auto;
		display: flex;
		display: -webkit-flex;
		flex-wrap:wrap;
		padding:10px 0px 10px 0px;
		border-bottom: 1px #c7c7c7 solid;
	}
	#entrustInspection .query .query_items{
		width:32%;
		height:40px;
		line-height: 40px;
		padding:10px 0.5%;
		display: -webkit-flex;
		flex-wrap:wrap;
	}
	#entrustInspection .query .query_items .text{
		width:30%;
		font-size:14px;
		text-align: center;
		color: #444;
	}
	#entrustInspection .query .query_items .inputs{
		width:70%;
	}
	#entrustInspection .query .query_button{
		width: 70%;
		margin-left:30%;
		text-align: right;
	}



	/* upload */
	#entrustInspection .uploads{
		width:90%;
		margin: 10px auto;
	}

	/* next move*/
	#entrustInspection .nextMove{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		margin-top:20px;
	}

	/* element css */
	#entrustInspection .el-select{
		width:100%;
	}
	#entrustInspection .queryDia .el-dialog__body{
		padding:0;
	}
	#entrustInspection .el-upload-list--picture-card .el-upload-list__item{
		width:100px;
		height: 100px;
		margin:0px 10px;
	}
	#entrustInspection .el-upload--picture-card{
		width:100px;
		height: 100px;
		line-height: 100px;
		margin-left:10px;
	}

	#entrustInspection .photo{
		width:400px;
		height:300px;
		margin:10px auto;
		box-sizing: border-box;
		border:1px #a7a7a7 dashed;
		position: relative;
	}
	#entrustInspection .photo .text{
		width:400px;
		height:150px;
		position: absolute;
		text-align: center;
		line-height: 150px;
		font-size: 20px;
		top:75px;
	}
	#entrustInspection .photo .take{
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
	#entrustInspection .photo video{
		position: absolute;
		left: 0px;
		right: 0px;
	}
</style>
