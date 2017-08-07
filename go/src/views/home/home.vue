
<template>
  <div id="home" class="home-container main-container">
    <!-- 标题 -->
    <p class="f16 lh40">节目单</p>
    <!-- 表格 -->
    <div class="lh40 f14 showall">显示全部</div>
		<el-table
    	:data="tableData"
	    stripe
	    style="width:100%"
	    >
	    <el-table-column
	      prop="schoolName"
	      label="学校"
	      align="center"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="sourceName"
	      label="录制源"
	      align="center"
	      show-overflow-tooltip>
	    </el-table-column>
	    <el-table-column
	      prop=""
	      label="播放机构"
	      align="center"
	      
	      >
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="节目名"
	      align="center"
	      width=""
	      show-overflow-tooltip
	      >
	    </el-table-column>
	    <el-table-column
	      prop="type"
	      label="类型"
	      align="center"
	      >
	    </el-table-column>
	    <el-table-column
	      prop="startDate"
	      label="开始时间"
	      align="center">
	    </el-table-column>
	    <el-table-column
	      prop="endDate"
	      label="结束时间"
	      align="center">
	    </el-table-column>
  	</el-table>
  	
    <!-- 标题 -->
    <p class="f16 lh40">统计图</p>
    <div class="echarts">
      <z-charts></z-charts>
    </div>

    <!-- 标题 -->
    <p class="f16 lh40">课程资源统计</p>
    <!-- 表格 -->
		<el-tabs v-model="activeName">
	    <el-tab-pane label="按年级" name="first">
	    	<el-table :data="tableData_grand" stripe style="width:100%;margin-top: 10px;">
	    		<el-table-column prop="schoolName" label="学校" align="center" show-overflow-tooltip> </el-table-column>
	    		<el-table-column prop="gradeName" label="年级" align="center" show-overflow-tooltip> </el-table-column>
	    		<el-table-column prop="subject" label="学科" align="center" show-overflow-tooltip> </el-table-column>
	    		<el-table-column prop="teacherName" label="教师" align="center" show-overflow-tooltip> </el-table-column>
	    		<el-table-column prop="courseName" label="课程名" align="center" show-overflow-tooltip> </el-table-column>
	    		<el-table-column prop="startDate" label="开课日期" align="center" show-overflow-tooltip> </el-table-column>
	    	</el-table>
	    	
	    </el-tab-pane>
	    <el-tab-pane label="按学科" name="second">
	    	
	    	
	    </el-tab-pane>
	  </el-tabs>
  </div>
  
</template>
<script>
  import ZCharts from './components/charts-first';
	var moment = require('moment');
  export default{
    data () {
      return {
        msg:'hello vue',
        tableData:[],
        tableData_grand:[],
        activeName: 'first'
      }
    },
    components: { ZCharts},
    mounted:function(){
    	var data = {pageNum:'1',pageSize:'10'}
    	this.postHttp(this,data,"program/findPrograms",findProgram);
    }
      
  }
  function findProgram(obj,data){
  	var lists = data.result.list;
		for(var i = 0 ;i<lists.length;i++){
			var startDates = moment(lists[i].startDate).format("YYYY-MM-DD HH:mm:ss");
			var endDates = moment(lists[i].endDate).format("YYYY-MM-DD HH:mm:ss");
			lists[i].startDate = startDates;
			lists[i].endDate = endDates;
		}
      obj.tableData = lists;
  }
  
  
</script>


<style>
  #home .echarts {
    width: 100%;
    height: 145px;
    background: #fff;
  }
  #home .showall{
  	background:#fff;
  	padding-right:20px;
  	text-align: right;
  	cursor: pointer;
  }
	#home .cell{
		display: block;
	}
	
	#home .el-tabs__header{margin:0px;}
	#home .el-tabs__nav{width:100%;background: #fff;}
	#home .el-tabs__active-bar{background:#66BB6A;width:100px;}
	#home .el-tabs__item{color:#272727;text-align: center;height: 50px;line-height: 50px;width:100px;}
	#home .el-tabs__item.is-active{color: #66BB6A;}
</style>