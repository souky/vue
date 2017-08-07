<template>
    <div id="program" class="program-container">
        <!-- Tab 部分 -->
        <ul class="tab-bor">
            <li name="programPoi" class="poi active" @click="choiseType('LIVE',$event)">直播</li>
            <li name="programPoi" class="poi" @click="choiseType('RECORD',$event)">录制</li>
            <li name="programPoi" class="poi" @click="choiseType('点播',$event)">点播</li>
        </ul>

        <el-row type="flex" class="row-bg mt20 pl20" justify="start">
            <el-col :span="4" class="pct25 mr20 ">
                <label class="mr20">学校  </label>
                <el-select v-model="value" class="pct70" placeholder="请选择学校">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" class="pct25 mr20">
                <label class="mr20">年级</label>
                <el-select v-model="value" class="pct70" placeholder="请选择年级">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" class="pct25 mr20">
                <label class="mr20">教师</label>
                <el-select v-model="value" class="pct70" placeholder="请选择教师">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" class="pct25">
                <label class="mr20">学科</label>
                <el-select v-model="value" class="pct70" placeholder="请选择学科">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg mt20 pl20" justify="start">
            <!-- 节目名 -->
            <el-col :span="4" class="pct25 mr20">
                <label class="mr20">节目</label>
                <el-input class="pct70" placeholder="请输入节目名"></el-input>
            </el-col>
            <!-- 开始 -->
            <el-col :span="4" class="pct25 mr20">
	            <label class="mr20">开始</label>
	            <el-date-picker v-model="startTime" type="datetime" class="pct70" placeholder="选择开始日期"></el-date-picker>
	        </el-col>
	        <!-- 结束 -->
	        <el-col :span="4" class="pct25 mr20">
	            <label class="mr20">——</label>
	            <el-date-picker v-model="endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
	        </el-col>
            <!-- 查询 -->
            <el-col :span="4" class="pct25">
            	<label class="mr20"></label>
                <el-button type="success" class="pct70 l">查询</el-button>
            </el-col>
        </el-row>

        <div class="main-container">
            <!--表格部分-->
                <el-table
			    	:data="tableData"
				    stripe
				    row-key="id"
				    style="width:100%"
				    >
				    <el-table-column
				      prop="schoolName"
				      label="学校"
				      align="center" show-overflow-tooltip
				      >
				    </el-table-column>
				    <el-table-column
				      prop="gradeName"
				      label="年级"
				      align="center"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="sourceName"
				      label="录制源"
				      align="center"
				      show-overflow-tooltip
				      >
				    </el-table-column>
				    <el-table-column
				      prop=""
				      label="播放机构"
				      align="center"
				      show-overflow-tooltip min-width="100px;"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="subject"
				      label="学科"
				      align="center"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="teacherName"
				      label="教师"
				      align="center">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="节目名"
				      align="center" show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="startDate"
				      label="开始时间"
				      align="center"  min-width="160px">
				    </el-table-column>
				    <el-table-column
				      prop="endDate"
				      label="结束时间"
				      align="center" min-width="160px">
				    </el-table-column>
				    <el-table-column
				      prop="status"
				      label="状态"
				      align="center">
				    </el-table-column>
				    <el-table-column label="操作" align="center" min-width="150px">
				    	<template scope="scope">
				    			<i title="查看详细" class="el-icon-information" @click="dialogInfos(scope.row.id)"></i>
				    			<i title="编辑" class="el-icon-edit" @click="dialogEdits(scope.row.id)"></i>
				    			<i title="删除" class="el-icon-delete"></i>
				    	</template>
				    </el-table-column>
			  	</el-table>
		  		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum"
			      :page-sizes="[10, 20, 50]"
			      :page-size="pageSize"
			      layout="sizes, prev, pager, next, jumper"
			      :total="totals" class="tc mt20"
			      >
			    </el-pagination>
			  	
        </div>
        
        <el-dialog :visible.sync="dialogInfo" :show-close="true">
        	<div class="infoTitle">详情</div>
        	<div class="infoBody" v-model="program">
        		<div class="secondTitle">节目信息</div>
        		<div class="fix">
        			<div class="infoItems fix l">
        				<div class="l part tr">节目名:</div>
        				<div class="l part tl ell" :title="program.name">{{program.name}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">状态:</div>
        				<div class="l part tl">{{program.status}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">开始时间:</div>
        				<div class="l part tl">{{program.startDate}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">结束时间:</div>
        				<div class="l part tl">{{program.endDate}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">是否属于课程:</div>
        				<div class="l part tl" v-if="program.isCourse==1">是</div>
        				<div class="l part tl" v-else>否</div>
        			</div>
        		</div>
        		<div class="secondTitle" v-if="program.isCourse==1">课程信息</div>
        		<div class="fix" v-if="program.isCourse==1">
        			<div class="infoItems fix l">
        				<div class="l part tr">学校:</div>
        				<div class="l part tl">{{program.schoolName}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">年级:</div>
        				<div class="l part tl">{{program.gradeName}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">教师:</div>
        				<div class="l part tl">{{program.teacherName}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">学科:</div>
        				<div class="l part tl">{{program.subject}}</div>
        			</div>
        		</div>
        		<div class="secondTitle">录制信息</div>
        		<div class="fix">
        			<div class="infoItems fix l">
        				<div class="l part tr">录制源:</div>
        				<div class="l part tl">{{program.sourceName}}</div>
        			</div>
        		</div>
        		<div class="secondTitle" >播放信息</div>
        		<div v-if="program.programShowList == undefined" class="noList">暂无数据</div>
        		<div class="fix" v-for="(ee,index) in program.programShowList">
        			<div class="infoItems fix l" >
        				<div class="l part tr" v-if="index == 0">播放机构:</div>
        				<div class="l part tr" v-else></div>
        				<div class="l part tl" >{{ee.id}}</div>
        			</div>
        		</div>
        		<div class="secondTitle">视频参数</div>
        		<div class="fix">
        			<div class="infoItems fix l">
        				<div class="l part tr">编码类型:</div>
        				<div class="l part tl">{{program.encoding}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">分辨率:</div>
        				<div class="l part tl">{{program.resolution}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">码率:</div>
        				<div class="l part tl">{{program.codeRate}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">码流控制:</div>
        				<div class="l part tl">{{program.rateControl}}</div>
        			</div>
        			<div class="infoItems fix l">
        				<div class="l part tr">帧率:</div>
        				<div class="l part tl">{{program.frameRate}}</div>
        			</div>
        		</div>
        		<div class="secondTitle" v-show="false">错误详情</div>
        	</div>
    	</el-dialog>
    	
    	<el-dialog :visible.sync="dialogEdit" :show-close="false">
    		<el-tabs v-model="activeName">
			    <el-tab-pane label="节目详情" name="first">
			    	<div class="editBody">
				    	<el-form :inline="true" :model="program" class="demo-form-inline">
				    		
				    		<div class="secondTitle">节目信息</div>
						    <el-form-item label="节目名">
						      <el-input v-model="program.name" name="name"></el-input>
						    </el-form-item>
						    <el-form-item label="是否属于课程" style="width: 45%;padding-left: 4%;">
						    	<el-radio-group  style="margin-left:30px;" v-model="program.isCourse">
							      <el-radio :label="1" name="isCourse">是</el-radio>
							      <el-radio :label="0" name="isCourse">否</el-radio>
							    </el-radio-group>
						    </el-form-item>
						    
						    <el-form-item label="学校" v-if="program.isCourse == 1">
						        <el-select v-model="program.schoolId">
							      <el-option label="区域一" value="22"></el-option>
							      <el-option label="区域二" value="23"></el-option>
							    </el-select>
						    </el-form-item>
						    <el-form-item label="年级" v-if="program.isCourse == 1">
						        <el-select v-model="program.gradeId">
							      <el-option label="区域一" value="3"></el-option>
							      <el-option label="区域二" value="4"></el-option>
							    </el-select>
						    </el-form-item>
						    <el-form-item label="教师" v-if="program.isCourse == 1">
						        <el-select v-model="program.teacherId">
							      <el-option label="区域一" value="12"></el-option>
							      <el-option label="区域二" value="123"></el-option>
							    </el-select>
						    </el-form-item>
						    <el-form-item label="学科" v-if="program.isCourse == 1">
						        <el-select v-model="program.subject">
							      <el-option label="区域一" value="shanghai"></el-option>
							      <el-option label="区域二" value="beijing"></el-option>
							    </el-select>
						    </el-form-item>
						    <el-form-item label="大纲" v-if="program.isCourse == 1">
						        <el-cascader :options="optionss" v-model="selectedOptions" style="width: 400px;">
							    </el-cascader>
						    </el-form-item>
						    
						    <div class="secondTitle">录制信息</div>
						    <el-form-item label="录制源">
						      <el-input v-model="program.sourceName" readonly></el-input>
						    </el-form-item>
						    <el-form-item label="">
						      <el-input type="hidden" readonly></el-input>
						    </el-form-item>
						    <el-form-item label="开始时间">
							    <el-date-picker v-model="program.startDate" type="datetime">
							    </el-date-picker>
						    </el-form-item>
						    <el-form-item label="结束时间">
							    <el-date-picker v-model="program.endDate" type="datetime">
							    </el-date-picker>
						    </el-form-item>
						    
						    <div class="secondTitle">播放信息</div>
						</el-form>
					</div>
					<div class="editBottom fix">
						<div class="l">
							<div class="saveInfo tc poi auto" @click="saveprogarm()">保存</div>
						</div>
						<div class="l">
							<div class="cancleInfo tc poi auto" @click="dialogEdit = false">取消</div>								
						</div>
					</div>
			    </el-tab-pane>
			    
			    <el-tab-pane label="高级设置" name="second">
			    	<div class="editBody" v-model="program">
			    		<el-form :inline="true" :model="program" class="demo-form-inline">
			    			<div class="secondTitle">视频参数</div>
			    			<el-form-item label="编码类型">
						        <el-select v-model="program.encoding" disabled>
							      <el-option label="H.264" value="0"></el-option>
							      <el-option label="H.265" value="1"></el-option>
							    </el-select>
						    </el-form-item>
						    <el-form-item label="分辨率">
						        <el-select v-model="program.resolution" disabled>
							      <el-option label="1280*720P" value="0"></el-option>
							      <el-option label="1280*960" value="1"></el-option>
							      <el-option label="1920*1080P" value="2"></el-option>
							      <el-option label="2048*1536" value="3"></el-option>
							    </el-select>
						    </el-form-item>
						    <el-form-item label="码率">
						        <el-select v-model="program.codeRate" disabled>
							      <el-option label="256" value="256"></el-option>
							      <el-option label="512" value="512"></el-option>
							      <el-option label="1024" value="1024"></el-option>
							      <el-option label="2048" value="2048"></el-option>
							      <el-option label="3072" value="3072"></el-option>
							      <el-option label="4096" value="4096"></el-option>
							      <el-option label="6144" value="6144"></el-option>
							      <el-option label="8192" value="8192"></el-option>
							      <el-option label="12288" value="12288"></el-option>
							      <el-option label="16384" value="16384"></el-option>
							    </el-select>
						    </el-form-item>
						    <el-form-item label="码流控制">
						        <el-select v-model="program.rateControl" disabled>
							      <el-option label="区域一" value="22"></el-option>
							      <el-option label="区域二" value="23"></el-option>
							    </el-select>
						    </el-form-item>
						    <el-form-item label="帧率">
						        <el-select v-model="program.frameRate" disabled>
							      <el-option label="50" value="50"></el-option>
							      <el-option label="1/16" value="1/16"></el-option>
							    </el-select>
						    </el-form-item>
						    
			    		</el-form>
			    	</div>
			    	<div class="editBottom fix">
						<div class="l">
							<div class="saveInfo tc poi auto" @click="saveprogarm()">保存</div>
						</div>
						<div class="l">
							<div class="cancleInfo tc poi auto" @click="dialogEdit = false">取消</div>								
						</div>
					</div>
			    </el-tab-pane>
		  	</el-tabs>
    	</el-dialog>
    	
    	
    </div>
</template>

<script>
  var moment = require("moment");
  export default{
    data () {
      return {
        options: [{
          
        }],
        value: '',
        startTime:'',
        endTime:'',
        tableData:[],
        dialogInfo:false,
        dialogEdit:false,
        activeName:'first',
        selectedOptions:[],
    	pageNum:1,
		pageSize:1,
		totals:5,
        optionss: [{
          
        }],
        program:[{
        	
        }]
        
      }
    },
    mounted:function(){
    	var dataS = {pageNum:1,pageSize:10};
		//programInit(this,dataS);
		this.postHttp(this,dataS,'program/findPrograms',programInit);
	},
	methods: {
      dialogInfos(id){
    	getHttp(this,id,'dialogInfo');
	  },
	  dialogEdits(id){
		getHttp(this,id,'dialogEdit');
	  },
	  changeCourse(){
		var iscourse = this.program.isCourse
	  },
	  saveprogarm(){
		var data = this.program;
		data.programShowList = arrayToJson(data.programShowList);
		this.$http.post('http://localhost:8888/balanced-education/program/saveProgram',data,{emulateJSON: true,credientials:false}).then(response => {
	    	console.log(response);
		},response => {
			console.log(response);
		})
	  },
	  handleSizeChange(val) {
	  	var dataS = {pageNum:1,pageSize:val};
	  	programInit(this,dataS);
	  },
	  handleCurrentChange(val) {
	  	var pageS = this.pageSize;
	  	var dataS = {pageNum:val,pageSize:pageS};
	    programInit(this,dataS);
	  },
	  choiseType(type,event){
	  	var obje = event.currentTarget;
	  	var reg = new RegExp('(\\s|^)active(\\s|$)');  
	  	var list = document.getElementsByName("programPoi");
	  	for(var i = 0;i<list.length;i++){
	  		var e = list[i];
	  		e.className = e.className.replace(reg,' ');
	  	}
	  	obje.className += ' active';
  		var dataS = {pageNum:1,pageSize:10,type:type};
	  	programInit(this,dataS);
  	  }
    }
  }
  
  
  function getHttp(obj,id,evenst){
  	obj.$http.get('http://localhost:8888/balanced-education/program/getProgram?id='+id,{},{emulateJSON: true,credientials:false}).then(response => {
		var lists = response.data.result;
		var startDates = moment(lists.startDate).format("YYYY-MM-DD HH:mm:ss");
		var endDates = moment(lists.endDate).format("YYYY-MM-DD HH:mm:ss");
		lists.startDate = startDates;
		lists.endDate = endDates;
        obj.program = lists;
        if(evenst == "dialogInfo"){
        	obj.dialogInfo = true;
        }
        if(evenst == "dialogEdit"){
        	obj.dialogEdit = true;
        }
    },response => {
		console.log(response);
	})
  }
  
  function programInit(obj,dataS){
    obj.tableData = lists;
//  obj.pageNum = response.data.result.pageNum;
//  obj.pageSize = response.data.result.pageSize;
//  obj.totals = response.data.result.total;
	console.log(dataS)
  }
  
  
  function arrayToJson(o) {
    var r = [];
    if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    if (typeof o == "object") {
      if (!o.sort) {
        for (var i in o)
          r.push(i + ":" + arrayToJson(o[i]));
        if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
          r.push("toString:" + o.toString.toString());
        }
        r = "{" + r.join() + "}";
      } else {
        for (var i = 0; i < o.length; i++) {
          r.push(arrayToJson(o[i]));
        }
        r = "[" + r.join() + "]";
      }
      return r;
    }
    return o.toString();
  }
  
</script>

<style>
    #program .main-container{
    	margin-top:20px;
    }
    #program .tab-bor .active{font-weight: normal;}
    #program .main-container i{margin: auto 4px;font-size:22px;cursor:pointer;}
    
    
    #program .el-tabs__header{margin:0px;}
    #program .el-tabs__nav{width:100%;}
    #program .el-tabs__active-bar{height:0px;}
    #program .el-tabs__item{width:50%;background: #E4E4E4;color:#272727;text-align: center;height: 50px;line-height: 50px;}
    #program .el-tabs__item.is-active{background:#66BB6A;color: #FFFFFF;}
    
    #program .el-form--inline .el-form-item{margin-right:0px;width:49%;}
    #program .infoBody .el-input__inner{width:220px;}
    #program .el-form-item__label{width:35%}
    #program .el-form-item__content{width:61%;}
    #program .el-cascader.is-opened .el-input__inner{border-color: #66BB6A;width:400px}
    #program .el-cascader .el-input__inner{width: 400px;}
    
    #program .editBody .el-date-editor.el-input{width:220px;}
    
    #program .el-tabs__nav-wrap{border-top-left-radius: 4px;border-top-right-radius: 4px;}
</style>