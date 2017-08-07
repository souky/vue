<template>
  <div class="course-list-container">
    <el-row type="flex" class="row-bg pt20 pl20" justify="start">
        <el-col :span="4" class="pct25 mr20 ">
            <label class="mr20">学校  </label>
            <el-select v-model="value" class="pct70" placeholder="请选择学校">
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
            <el-select v-model="value" class="pct70" placeholder="请选择学科">
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
            <el-date-picker
            		v-model="startTime"
                    type="datetime"
                    class="pct70"
                    placeholder="选择开始日期">
            </el-date-picker>
        </el-col>
        <!-- 结束 -->
        <el-col :span="4" class="pct25 mr20">
            <label class="mr20">——</label>
            <el-date-picker
            		v-model="endTime"
                    type="datetime"
                    placeholder="选择结束时间">
            </el-date-picker>
        </el-col>
        <!-- 查询 -->
        <el-col :span="4" class="pct25">
        		<div class="pct18 l" ></div>
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
        		<div class="pct18 l" ></div>
            <el-button type="primary" class="pct70 l" @click="addCourse()">新增课程</el-button>
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
    		<el-table-column prop="startDate" label="开课日期" align="center" show-overflow-tooltip min-width="160px"> </el-table-column>
    		<el-table-column label="操作" align="center" show-overflow-tooltip min-width="150px">
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
	      :total="total" class="tc mt20"
	      >
	    </el-pagination>
    </div>
    
    <el-dialog :visible.sync="dialogAdd" :show-close="false" style="top:-14%">
  		<div class="infoTitle" :model="infoTitles">{{infoTitles}}</div>
  		<div class="addBody fix" >
  			<el-form :label-position="labelPosition" label-width="80px" :model="course">
  				<div class="leftPart l">
  					<el-form-item label="名称">
					    <el-input v-model="course.courseName"></el-input>
					  </el-form-item>
					  <el-form-item label="开课日期">
					    <el-date-picker v-model="course.startDate" type="datetime" placeholder="选择开课日期"></el-date-picker>
					  </el-form-item>
					  <el-form-item label="学校">
					  	<el-select v-model="value" placeholder="请选择学校">
					   		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					   	</el-select>
					  </el-form-item>
					  <el-form-item label="年级">
					   <el-select v-model="value"  placeholder="请选择年级">
					   		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					   	</el-select>
					  </el-form-item>
					  <el-form-item label="学科">
					  	<el-select v-model="value"  placeholder="请选择学科">
					   		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					   	</el-select>
					  </el-form-item>
					  <el-form-item label="教师">
					  	<el-select v-model="value"  placeholder="请选择教师">
					   		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					   	</el-select>
					  </el-form-item>
					  <el-form-item label="教材">
					  	<el-select v-model="value"  placeholder="请选择教材">
					   		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					   	</el-select>
					  </el-form-item>
  				</div>
  				<div class="rightPart l tc">
  					<div style="margin-bottom: 10px;">课程图片</div>
  					<el-upload class="" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
  					:on-success="handleAvatarSuccess"
  					:before-upload="beforeAvatarUpload" :auto-upload="false">
  						<img v-if="imageUrl" :src="imageUrl" class="avatar">
  						<i v-else class="el-icon-plus avatar-uploader-icon" style="color:#bfcbd9;"></i>
						</el-upload>
  				</div>
  				
  				<div class="l" style="width:90%;">
  					<el-form-item label="课程简介">
					    <el-input type="textarea" :rows="3" resize="none"></el-input>
					  </el-form-item>
  				</div>
  				
  				<div class="l el-form-item" style="width: 90%;">
  					<label class="el-form-item__label" style="width: 80px;">课程大纲</label>
  					<div class="el-form-item__content" style="margin-left: 80px;">
  						<div class="bigSteel">asdasd</div>
  					</div>
  				</div>
  				
				</el-form>
			</div>
			<div class="editBottom fix">
				<div class="l">
					<div class="saveInfo tc poi auto" @click="saveprogarm()">保存</div>
				</div>
				<div class="l">
					<div class="cancleInfo tc poi auto" @click="dialogAdd = false">取消</div>								
				</div>
			</div>
		</el-dialog>
		
		<el-dialog :visible.sync="dialogInfo" :show-close="false" >
  		<div class="infoTitle">详情</div>
  		<div class="infoBody fix" v-model="course">
  			<div class="leftPart l">
  				<div class="fix">
	    			<div class="infoItems fix l">
	    				<div class="l part tr">课程名:</div>
	    				<div class="l part tl ell" :title="course.name">{{course.name}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">开始日期:</div>
	    				<div class="l part tl">{{course.status}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">学校:</div>
	    				<div class="l part tl">{{course.startDate}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">年级:</div>
	    				<div class="l part tl">{{course.endDate}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">学科:</div>
	    				<div class="l part tl">{{course.endDate}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">教师:</div>
	    				<div class="l part tl">{{course.endDate}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">教材:</div>
	    				<div class="l part tl">{{course.endDate}}</div>
	    			</div>
	    		</div>
  			</div>
  			<div class="rightPart l fix">
  				<div class="l ml30">课程图片</div>
  				<div class="l rightImg">
  					<img src="">
  				</div>
				</div>
				<div class="l el-form-item" style="width: 90%;margin-top:10px">
					<label class="el-form-item__label" style="width: 90px;padding-top:6px;color:#272727;">课程简介</label>
					<div class="el-form-item__content" style="margin-left: 90px;">
						<div class="bigSteel" style="height: 90px;line-height: 30px;">asdasd</div>
					</div>
				</div>
				<div class="l el-form-item" style="width: 90%;">
					<label class="el-form-item__label" style="width: 90px;padding-top:6px;color:#272727;">课程大纲</label>
					<div class="el-form-item__content" style="margin-left: 90px;">
						<div class="bigSteel">asdasd</div>
					</div>
				</div>
			</div>
			<div class="editBottom fix">
				<div class="l">
					<div class="saveInfo tc poi auto" @click="saveprogarm()">保存</div>
				</div>
				<div class="l">
					<div class="cancleInfo tc poi auto" @click="dialogInfo = false">取消</div>								
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
        dialogAdd:false,
        dialogInfo:false,
        course:{
        	schoolName:'测试学校名',
        	gradeName:'测试年级',
        	subject:'测试学科',
        	teacherName:'测试教师名',
        	courseName:'测试课程名',
        	startDate:'2017-07-31 10:18:23',
        },
        pageNum:1,
        pageSize:10,
        total:20,
        tableData:[{
        	id:2001,
        	schoolName:'测试学校名',
        	gradeName:'测试年级',
        	subject:'测试学科',
        	teacherName:'测试教师名',
        	courseName:'测试课程名',
        	startDate:'2017-07-31 10:18:23',
        }],
        imageUrl:'',
        labelPosition: 'right',
        infoTitles:''
      }
    },
    methods: {
    	dialogInfos(id){
    		this.dialogInfo = true;
		  },
		  dialogEdits(id){
		  	this.course = {
        	schoolName:'测试学校名',
        	gradeName:'测试年级',
        	subject:'测试学科',
        	teacherName:'测试教师名',
        	courseName:'测试课程名',
        	startDate:'2017-07-31 10:18:23',
        }
		  	this.dialogAdd = true;
		  	this.infoTitles = "编辑";
		  },
    	handleSizeChange(val) {
		  	var dataS = {pageNum:1,pageSize:val};
		  	//programInit(this,dataS);
		  },
		  handleCurrentChange(val) {
		  	var pageS = this.pageSize;
		  	var dataS = {pageNum:val,pageSize:pageS};
		    //programInit(this,dataS);
		  },
		  handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      addCourse(){
      	this.course = {};
      	this.dialogAdd = true;
      	this.infoTitles = "新增";
      }
    }

  }
</script>

<style scoped="scoped">
  .el-input__icon {
    width: 55px;
  }
  .pct18{height:1px;}
  
  .main-container i{margin: auto 4px;font-size:22px;cursor:pointer;}
  
  .addBody{background:#fff;min-height: 500px;padding:20px 40px;}
  
  .leftPart{width:40%;}
  .rightPart{width:60%;}
  .avatar-uploader-icon{border:1px solid #bfcbd9;}
  .avatar-uploader-icon:hover{border-color:#66BB6A}
  .leftPart .el-date-editor.el-input{width:100%;}
  
  .bigSteel{width: 96%;border:1px #BFCBD9 solid;height: 200px;border-radius: 3px;padding:5px 2%;}
  .infoItems{width: 100%;}
  
  .ml30{margin-left:70px}
  .rightImg{width:122px;height: 140px;background:#D8D8D8;border: 1px solid #979797;margin-left:20px;}
  .infoItems .tr{width: 30%;}
</style>