<template>
	<div id="entrustChoice">

		<!-- 中间部分 -->
		<div class="mainItem breadcrumb">
			<el-breadcrumb separator=">">
			  <el-breadcrumb-item>您的位置</el-breadcrumb-item>
			  <el-breadcrumb-item>网上送检</el-breadcrumb-item>
			  <el-breadcrumb-item>网上登记</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="choice mainItem">
			<div class="choiceTxt">
				<div class="img">
					<img src="@/assets/img/list.png" />
				</div>
				<div class="text">选择鉴定机构</div>
			</div>
		</div>

		<div class="mainItem choicedName">
			{{choiceNames}}
		</div>

		<!-- 横向树状图 -->
		<div class="tree" v-loading="loading">
			<div :class="e.orgId == choiceId?'active items':'items'" v-for="e in orgData" @dblclick="sendChoices(e)" :key="e.orgId">
				{{e.orgCname}}
				<div class="children" @click="showMore(e)" v-if="e.listChildren != null && e.listChildren.length > 0">
					<i class="el-icon-arrow-down"></i>
				</div>
			</div>
		</div>


		<!-- 右边提示 -->
		<div class="rightTips">
			<div class="top clearfix">
				<div class="rightFinger">
					<img src="@/assets/img/pointer.png" />
				</div>
				<div class="topText">
					操作步骤提示
				</div>
			</div>
			<div class="body">
				<div class="items active">
					<div class="point"><div class="innerCircle"></div></div>
					<div class="text">第1步：选择鉴定机构</div>
				</div>
				<div class="items">
					<div class="point"><div class="innerCircle"></div></div>
					<div class="text">第2步：选择送检专业</div>
				</div>
				<div class="items ">
					<div class="point"><div class="innerCircle"></div></div>
					<div class="text">第3步：填写基本信息</div>
				</div>
				<div class="items">
					<div class="point"><div class="innerCircle"></div></div>
					<div class="text">第4步：被鉴定人信息</div>
				</div>
				<div class="items ">
					<div class="point"><div class="innerCircle"></div></div>
					<div class="text">第5步：检材样本信息</div>
				</div>
				<div class="items">
					<div class="point"><div class="innerCircle"></div></div>
					<div class="text">第6步：选择鉴定要求</div>
				</div>
				<div class="items">
					<div class="point"><div class="innerCircle"></div></div>
					<div class="text">第7步：填写提交鉴定</div>
				</div>
			</div>
			<div class="top clearfix">
				<div class="rightFinger">
					<img src="@/assets/img/pointer.png" />
				</div>
				<div class="topText">
					温馨提示
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { log } from 'util';
	export default {
    data: function(){
        return {
					msg:'',
					choiceId:'',
					choiceNames:'尚未选择鉴定机构',
					orgTempData:[],
					orgTempData_:[],
					orgData:[],
					loading:true,
					dnaInfo:{}
        }
    },
	activated:function(){
		this.choiceId = '';
		this.choiceNames = '尚未选择鉴定机构'
		this.postHttpForLogin("orgsController/getDNACheckOrgList",{},res => {
			this.orgData = res.data;
			this.loading = false;
		});
		this.getDnaOrgInfo();
	},
    methods: {
       choiced(obj){
		   this.choiceId = obj.orgId;
		   this.choiceNames = obj.orgCname;
	   },
	   showMore(obj){
			if(this.orgTempData.length == 0){
				this.orgTempData = this.orgData;
				this.orgData = obj.listChildren;
			}else{
				this.orgTempData_ = this.orgData;
				this.orgData = obj.listChildren;
			}

			event.stopPropagation();
	   },
	   backLevel(){
		   if(this.orgTempData_.length != 0){
			   this.orgData = this.orgTempData_;
			   this.orgTempData_ = [];
		   }else{
			   this.orgData = this.orgTempData;
			   this.orgTempData = [];
		   }

	   },
	   //送检
	   sendChoices(e){
		   //直接跳转到委托基本新页面
			this.choiceId = e.orgId;
			this.choiceNames = e.orgCname;
			//放入sessionStorage
			this.setData('orgId',this.choiceId);
			this.setData('orgName',this.choiceNames);
			//添加DNA专业信息
			this.setData("entrustInfoEditFlag","0");
			this.setData("aucOrgId",this.dnaInfo.aucOrgId);
			this.setData("aucOrgCname",this.dnaInfo.aucOrgName)
			this.$router.push("entrustBaseInfo_dna");
	   },
	   getDnaOrgInfo(){
		   this.postHttp("consignment/getDNAAucOrgInfo", {}, res => {
			   console.log(res.data);
			   this.dnaInfo = res.data;
		   })
	   }
    },
		beforeDestroy:function(){
			this.choiceId = '';
			this.choiceNames = '';
			this.orgData = [];
			this.orgTempData = [];
			this.orgTempData_ = [];
		}
	}
</script>

<style>
	#entrustChoice{
		width:calc(100% - 210px);
		background:#f0f3fa;
		height:100%;
		overflow: auto;
		position: relative;
		font-family: "microsoft yahei";
	}

	/* 树形图 css */
	#entrustChoice .tree{
		display: -webkit-flex; /* Safari */
		display: flex;
		flex-wrap:wrap;
		justify-content:center;
	}
	#entrustChoice .choicedName{
		text-align: center;
		height: 40px;
		line-height: 40px;
		position: relative;
	}
	#entrustChoice .sendChoice{
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
	#entrustChoice .backLevel{
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
	#entrustChoice .tree .items{
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
	#entrustChoice .tree .items .children{
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
	#entrustChoice .tree .items.active{
		background: #5588fe;
		color:#fff;
	}
	#entrustChoice .tree .items.active .children{
		color:#fff;
	}

	/*中间部分 css*/
	#entrustChoice .orgName{
		background: #dde7ff;
		border-radius:4px;
		width:97%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin:10px auto;
		color:#000;
	}

</style>
