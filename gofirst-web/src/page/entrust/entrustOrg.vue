<template>
	<div id="entrustOrg">

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
				<div class="text">选择送检专业</div>
			</div>
			<!-- <div class="goBack">
				<img src="@/assets/img/goback.png" />
				返 回
			</div> -->
			<!-- <el-button class="clickBack" type="primary" @click="goBack()" >上一步
            </el-button> -->
		</div>

		<div class="orgName">
			{{orgName}}
		</div>

		<div class="mainBody mainItem">

			<div class="items" v-for="e in orgData" :key="e.aucOrgId" @click="nextMove(e.aucOrgId,e.aucOrgName)">
				<div class="top">{{e.aucOrgCname}}</div>
				<div class="main clearfix">
					<div class="body">
						<div class="leftPart">
							<div class="img">
								<img  src="data:image/png;base64,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" />
							</div>
							<div class="text">{{e.aucOrgName}}</div>
						</div>
						<div class="rightPart">
							{{e.aucRemark}}
						</div>
					</div>

					<div v-if="e.aucOrgUrl != '' && e.aucOrgUrl != null" class="bottom" @click="readMore(e.aucOrgUrl)">更多信息</div>
					<div v-else class="bottom">更多信息</div>
				</div>
			</div>

		</div>

	<el-form>
		<el-row class="footerRow">
        <el-col  :offset="12">
          <el-form-item>
            <el-button type="primary" @click="goBack()">上一步
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
	  </el-form>

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
				<div class="items active">
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
export default {
    data(){
        return{
            msg:'',
			orgData:{},
			orgId:'',
			orgName:'',
        }
    },
	mounted: function() {

		//获取从第一步获取的orgId
		//this.orgId = eval(this.$attrs).orgId
		this.orgId = this.getData('orgId');
		this.orgName=this.getData('orgName');

		//示例postHttp请求
		var data = {};
		this.postHttp("aucOrg/getGfLimAucOrgList",data,res =>{
			if(res.code == '0'){
				this.orgData = res.data
				console.log(res)
			}else{
				this.notify_warning(res.msg);
			}
		});

	},
	methods: {
		readMore(url){
			window.open(url,'_blank')
		},
		nextMove(id,aucOrgName){
			if(aucOrgName.indexOf("DNA")!=-1){
				this.$router.push("entrustBaseInfo_dna");
				this.setData("entrustInfoEditFlag","0");
				this.setData("aucOrgId",id);
				this.setData("aucOrgCname",aucOrgName)
			}else{
				this.$router.push("entrustBaseInfo");
				this.setData("entrustInfoEditFlag","0");
				this.setData("aucOrgId",id);
				this.setData("aucOrgCname",aucOrgName)
			}
			
		},
		goBack(){
			this.$router.push('/entrustChoice');
		}
	}
}
</script>

<style>
	#entrustOrg{
		width:calc(100% - 210px);
		background:#f0f3fa;
		height:100%;
		overflow: auto;
		position: relative;
		font-family: "microsoft yahei";
	}


	#entrustOrg .orgName{
		background: #dde7ff;
		border-radius:4px;
		width:97%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin:10px auto;
		color:#000;
	}

	/* 主body样式*/
	#entrustOrg .mainBody{
		display: -webkit-flex; /* Safari */
		display: flex;
		flex-wrap:wrap;
	}
	#entrustOrg .mainBody .items{
		width:27%;
		margin:20px 3%;
	}
	#entrustOrg .mainBody .items .top{
		background: linear-gradient(to right,#5889ff,#306eff);
		color:#fff;
		text-align: center;
		font-size: 18px;
		height: 40px;
		line-height: 40px;
	}
	#entrustOrg .mainBody .items .main{
		background: #eee;
		padding-top: 10px;
	}
	#entrustOrg .mainBody .items .main .body{
		background: #fff;
		height: 120px;
		width: 96%;
		margin:auto;
		display: -webkit-flex; /* Safari */
		display: flex;
	}
	#entrustOrg .mainBody .items .main .body .leftPart .img{
		width: 80px;
		height:80px;
		box-sizing: border-box;
		padding:10px;
	}
	#entrustOrg .mainBody .items .main .body .leftPart .text{
		font-size: 16px;
		color:#2a6fdf;
		width:80px;
		height:40px;
		text-align: center;
	}
	#entrustOrg .mainBody .items .main .body .rightPart{
		color:#666;
		font-size: 14px;
		height: 100px;
		padding-top:10px;
		padding-left:5px;
		padding-right:5px;
		line-height: 20px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		overflow: hidden;
	}
	#entrustOrg .mainBody .items .main .bottom{
		float: right;
		box-sizing: border-box;
		padding-right: 10px;
		color: #aaa;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		width:100px;
		text-align: right;
		cursor: pointer;
	}


</style>
