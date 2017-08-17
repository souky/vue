<template>
  <div id="courseVideo" class="course-video-container">
  	
  	<ul class="tab-bor">
	    <li name="programPoi" class="poi active" @click="choiseType('video',$event)" >课堂视频</li>
	    <li name="programPoi" class="poi" @click="choiseType('supplementary',$event)">教辅文件</li>
	</ul>
    <el-row type="flex" class="row-bg pt20 pl20" justify="start">
        <el-col :span="4" class="pct25 mr20 ">
            <label class="mr20">学校  </label>
            <el-select v-model="value" class="pct70" placeholder="请选择学校" >
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20">年级</label>
            <el-select v-model="value" class="pct70" placeholder="请选择年级">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20">教师</label>
            <el-select v-model="value" class="pct70" placeholder="请选择教师">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col>
        <el-col :span="4" class="pct25">
            <label class="mr20">学科</label>
            <el-select v-model="value" class="pct70" placeholder="请选择学科" >
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col>
    </el-row>

    <el-row type="flex" class="row-bg mt20 pl20" justify="start">
        <!-- 课程名 -->
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20">课程</label>
            <el-input class="pct70" placeholder="请输入课程名"></el-input>
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
        <el-col :span="4" class="pct25">
        		<label class="mr20"></label>
            <el-button type="primary" class="pct70 l" @click="upload()">上传教辅文件</el-button>
        </el-col>
    </el-row>

    <div class="main-container">
      <!--表格部分-->
    	<el-table :data="tableData" stripe row-key="id" style="width:100%;margin-top: 20px;">
    		<el-table-column prop="schoolName" label="学校" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="gradeName" label="年级" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="subject" label="学科" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="teacherName" label="教师" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="courseName" label="课程名" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="videoName" label="视频名" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="startDate" label="创建时间" align="center" show-overflow-tooltip min-width="160px"> </el-table-column>
    		<el-table-column prop="timeout" label="时长" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="ispublic" :formatter=isPublic label="是否公开" align="center" show-overflow-tooltip></el-table-column>
    		<el-table-column label="操作" align="center" show-overflow-tooltip min-width="150px">
    			<template scope="scope">
		    			<i title="编辑" class="el-icon-edit" @click="dialogEdits(scope.row.id)"></i>
		    			<i title="删除" class="el-icon-delete"></i>
		    	</template>
    		</el-table-column>
    	</el-table>
    </div>
    
    <el-dialog :visible.sync="dialogUpload" :show-close="false" >
  		<div class="infoTitle">上传教辅文件</div>
  		<div class="editBody fix">
  			<el-form :inline="true" :model="course" class="demo-form-inline">
    			<div class="secondTitle">文件信息</div>
    			<el-form-item label="文件名">
    				
            <el-upload class="upload-demo" drag :action="urls"  ref="upload"  :auto-upload="true" :with-credentials="true" :before-upload="beforeupload" :on-success="upload_success">
            	<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							
            </el-upload>
			      <!--<el-input v-model="course.name" icon="search"></el-input>-->
			    </el-form-item><br />
			    <el-form-item label="是否公开" style="width: 45%;padding-left: 4%;">
			    	<el-radio-group  style="margin-left:30px;" v-model="course.ispublic">
				      <el-radio :label="1" name="isCourse">是</el-radio>
				      <el-radio :label="0" name="isCourse">否</el-radio>
				    </el-radio-group>
			    </el-form-item><br  />
			  
			    <el-form-item label="资源类型" v-if="supplementary">
			        <el-select :model="course.source"  :key="course.source" :value="course.source">
					      <el-option label="DOC" value="1"></el-option>
					      <el-option label="EXCLE" value="2"></el-option>
					    </el-select>
			    </el-form-item>
			    <el-form-item label="资源简介" class="moreinfo" v-if="supplementary">
				    <el-input type="textarea" :rows="4" resize="none"></el-input>
				  </el-form-item>
				  <el-form-item label="课程简介" class="moreinfo" v-else>
				    <el-input type="textarea" :rows="4" resize="none"></el-input>
				  </el-form-item>
			    <div class="secondTitle">当前教辅信息</div>
			    <el-form-item label="学校" >
			        <el-select v-model="course.schoolId"  @change="change_school()">
				      <el-option v-for="item in optionSchool" :key="item.id" :label="item.name" :value="item.id"></el-option>
				      </el-select>
			    </el-form-item>
			    <el-form-item label="年级" >
			        <el-select v-model="course.gradeId" >
				      <el-option v-for="item in optionGrand" :key="item.id" :label="item.name" :value="item.id"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="教师" >
			        <el-select v-model="course.teacherId">
				      <el-option v-for="item in optionTeacher" :key="item.id" :label="item.name" :value="item.id"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="学科" >
			        <el-select v-model="course.subject" @change="change_subject()">
				      <el-option v-for="item in optionSubject" :key="item.dicName" :label="item.dicName" :value="item.dicName"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="大纲" >
			        <el-cascader :options="optionss" v-model="selectedOptions" style="width: 400px;">
				    </el-cascader>
			    </el-form-item>
    		</el-form>
			</div>
			<div class="editBottom fix">
				<div class="l">
					<div class="saveInfo tc poi auto" @click="saveprogarm()">保存</div>
				</div>
				<div class="l">
					<div class="cancleInfo tc poi auto" @click="dialogUpload = false">取消</div>								
				</div>
			</div>
		</el-dialog>
		
		
		<el-dialog :visible.sync="dialogEdit" :show-close="false" >
  		<div class="infoTitle">修改    </div>
  		<div class="editBody fix">
  			<el-form :inline="true" :model="course" class="demo-form-inline">
  				<div class="secondTitle">视频信息</div>
  				
  				<el-form-item label="是否公开" style="width: 45%;padding-left: 4%;">
			    	<el-radio-group  style="margin-left:30px;" v-model="course.ispublic">
				      <el-radio :label="1" name="isCourse">是</el-radio>
				      <el-radio :label="0" name="isCourse">否</el-radio>
				    </el-radio-group>
			    </el-form-item>
			    
			    <el-form-item label="课程简介" class="moreinfo">
				    <el-input type="textarea" :rows="4" resize="none"></el-input>
				  </el-form-item>
				  <div class="secondTitle">当前课程信息</div>
			    <el-form-item label="学校" >
			        <el-select v-model="course.schoolId" @change="change_school()">
				      <el-option v-for="item in optionSchool" :key="item.id" :label="item.name" :value="item.id"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="年级" >
			        <el-select v-model="course.gradeId" >
				      <el-option v-for="item in optionGrand" :key="item.id" :label="item.name" :value="item.id"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="教师" >
			        <el-select v-model="course.teacherId">
				      <el-option label="区域一" value="12"></el-option>
				      <el-option label="区域二" value="123"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="学科" >
			        <el-select v-model="course.subject" @change="change_subject()">
				      <el-option v-for="item in optionSubject" :key="item.dicName" :label="item.dicName" :value="item.dicName"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="大纲" >
			        <el-cascader :options="optionss" v-model="selectedOptions" style="width: 400px;">
				    </el-cascader>
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
		</el-dialog>
  </div>
</template>

<script>
  export default{
    data () {
      return {
      	urls:"http://192.168.128.213:8888/balanced-education/teachingfile/upload",
        msg:'hello vue',
        optionSchool:null,
        optionGrand:null,
        optionSubject:null,
        optionTeacher:null,
        optionTeacher_val:'',
        optionSchool_val:'',
        optionGrand_val:'',
        optionSubject_val:'',
      
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value:'',
        startTime:'',
        endTime:'',
        optionss: [{
          
        }],
        selectedOptions:[],
        dialogUpload:false,
        dialogEdit:false,
        supplementary:false,
        tableData:[
	        {
	        	id:1,
	        	schoolName:'苏州小学',
	        	gradeName:'二年级',
	        	subject:'第一学科',
	        	teacherName:'测试老师',
	        	courseName:'语文',
	        	videoName:'第一册',
	        	startDate:'2017-07-31 15:30:49',
	        	timeout:'45分',
	        	ispublic:1
	        },{
	        	id:2,
	        	schoolName:'苏州小学',
	        	gradeName:'三年级',
	        	subject:'第儿学科',
	        	teacherName:'测试老师',
	        	courseName:'数学',
	        	videoName:'第一册',
	        	startDate:'2017-07-31 15:30:49',
	        	timeout:'45分',
	        	ispublic:0
	        }
        ],
		    course:{
		    	ispublic:1,
		    	source:1,
		    	schoolId:'',
		    	subject:'',
		    	gradeId:'',
		    }
      }
    },
		methods:{
			upload(){
				this.dialogUpload = true;
				this.course={
		    	ispublic:1,
		    	source:1,
		    	schoolId:'',
		    	subject:'',
		    	gradeId:'',
		    	teacherId:'',
		    	
		    }
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
		  	
		  	
		  	
		  	
		  	
				if(type=="supplementary"){
					this.supplementary = true;
				}else{
					this.supplementary = false;
				}
			},
			isPublic(row, column){
				if(row.ispublic=="1"){
					return "是";
				}else{
					return "否";
				}
			},
			dialogEdits(id){
				
				
				this.dialogEdit = true;
				
			
			},
			beforeupload(file){
				var upFileName = file.name;
        var index1=upFileName.lastIndexOf(".");
        var index2=upFileName.length;
        var suffix=upFileName.substring(index1+1,index2);//后缀名
				if(suffix == "docx" || suffix == "excel" || suffix == "ppt" || suffix == "pdf"){
					  
				}else{
					 this.notify_jr(this,"提示","上传文件格式错误","warning")
					  return false;
				}
				var objs =document.getElementsByClassName("el-upload-list__item")[0];
				if(objs!=undefined){
					objs.remove();
				}
			},
			upload_success(response, file, fileList){
				var code = response.code;
				if(code=="60000" || code=="50000"){
					this.$router.push({ path: '/login' });
				}else if(code=="10000"){
					this.notify_jr(this,"提示","上传文件成功","success");
				}else{
					this.notify_jr(this,"提示","失败"+response.message,"error");
				}
			},
			change_school(){
		  	var id = this.course.schoolId;
		  	this.optionGrand = null;
		  	this.get_options(this,id,"optionGrand");
			},
			change_subject(){
		  	var subject = this.course.subject
		  	var data = {subject:subject,pageNum:1,pageSize:50};
		  	this.postHttp(this,data,"material/queryMaterials",function(obj,data){
		  		obj.optionMaterial = data.result.list;
		  	})
		  },
		  user_handle(obj,data){
		  	this.optionTeacher = data.result.list;
		  },
		},
		
		mounted:function(){
    	this.get_options(this,"","optionSchool");
			var data_user = {role:'教师',pageNum:1,pageSize:30};
	  	this.postHttp(this,data_user,"user/queryUsers",this.user_handle);
			
			this.get_options(this,"","optionSchool");
			var data_code ={code:'SUBJECT'};
  		this.postHttp(this,data_code,"dictionary/getDictionarysBySupCode",function(obj,data){
  			obj.optionSubject = data.result;
  		})
		}
  }
</script>

<style>
  #courseVideo .el-input__icon {
    width: 55px;
  }
  #courseVideo .pct18{height:1px;}
  #courseVideo .main-container i{margin: auto 4px;font-size:22px;cursor:pointer;}
  
  #courseVideo .tab-bor .active{font-weight: normal;}
  #courseVideo .moreinfo{width:100%!important;}
  #courseVideo .moreinfo label{width:17%!important;}
  #courseVideo .editBody{background: #fff;min-height: 500px;padding:10px 40px;}
  #courseVideo .el-form--inline .el-form-item{margin-right:0px;width:49%;}
  #courseVideo .el-form-item__label{width:35%}
	#courseVideo .el-form-item__content{width:61%;}
	#courseVideo .el-cascader.is-opened .el-input__inner{border-color: #66BB6A;width:400px}
	#courseVideo .el-cascader .el-input__inner{width: 400px;}
	#courseVideo .el-upload-dragger{height:40px;border:solid 1px #bfcbd9}
</style>