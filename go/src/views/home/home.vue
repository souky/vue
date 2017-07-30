
<template>
  <div class="home-container main-container">
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
      <div style="float:left;"><z-charts></z-charts></div>
      <div style="float:left;"><z-charts-two></z-charts-two></div>
      <div style="float:left;"><z-charts-three></z-charts-three></div>
    </div>

    <!-- 标题 -->
    <p class="f16 lh40">课程资源统计</p>
    <!-- 表格 -->
    <div class="table-striped">
      <table class="ktable">
        <thead>
          <tr style="background: #fff;">
            <td colspan="14" class="tr" style="border-bottom: 1px solid #66BB6A;cursor: pointer;">显示全部</td>
          </tr>
          <tr>
            <th>资源类型</th>
            <th>一年级</th>
            <th>二年级</th>
            <th>三年级</th>
            <th>四年级</th>
            <th>五年级</th>
            <th>六年级</th>
            <th>七年级</th>
            <th>八年级</th>
            <th>九年级</th>
            <th>高一</th>
            <th>高二</th>
            <th>高三</th>
            <th>总计</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>

  </div>
  
</template>
<script>
  import ZCharts from './components/charts-first';
  import ZChartsTwo from './components/charts-second';
  import ZChartsThree from './components/charts-three';
	var moment = require('moment');
  export default{
    data () {
      return {
        msg:'hello vue',
        tableData:[]
      }
    },
    components: { ZCharts,ZChartsTwo,ZChartsThree},
    mounted:function(){
    	this.$http.post('http://localhost:8888/balanced-education/program/findPrograms',{pageNum:'1',pageSize:'10'},{emulateJSON: true,credientials:false}).then(response => {
    			var lists = response.data.result.list;
    			for(var i = 0 ;i<lists.length;i++){
    				var startDates = moment(lists[i].startDate).format("YYYY-MM-DD HH:mm:ss");
    				var endDates = moment(lists[i].endDate).format("YYYY-MM-DD HH:mm:ss");
    				lists[i].startDate = startDates;
    				lists[i].endDate = endDates;
    			}
		      this.tableData = lists;
		  },response => {
				console.log(response);
			})
    }
      
  }
  
  
  
</script>


<style scoped="scoped">
  .echarts {
    width: 100%;
    height: 145px;
    background: #fff;
  }
  .showall{
  	background:#fff;
  	padding-right:20px;
  	text-align: right;
  	cursor: pointer;
  }
	.cell{
		display: block;
	}
</style>