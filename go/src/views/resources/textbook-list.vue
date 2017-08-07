<template>
  <div id="textBook" class="textbook-list-container">
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
            <label class="mr20">出版社</label>
            <el-select v-model="value" class="pct70" placeholder="请选择教师">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col>
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
            <el-button type="primary" class="pct70 l" @click="addTextbook()">新增教材</el-button>
        </el-col>
    </el-row>

    <div class="main-container">
    	<el-table :data="tableData" stripe row-key="id" style="width:100%;margin-top: 20px;">
    		<el-table-column prop="subject" label="学科" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="gradeName" label="年级" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="teacherName" label="出版社" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column prop="startDate" label="出版时间" align="center" show-overflow-tooltip min-width="160px"> </el-table-column>
    		<el-table-column prop="timeout" label="课本名" align="center" show-overflow-tooltip> </el-table-column>
    		<el-table-column label="操作" align="center" show-overflow-tooltip min-width="150px">
    			<template scope="scope">
		    			<i title="查看详细" class="el-icon-information" @click="dialogInfos(scope.row.id)"></i>
		    			<i title="编辑" class="el-icon-edit" @click="dialogEdits(scope.row.id)"></i>
		    			<i title="删除" class="el-icon-delete"></i>
		    	</template>
    		</el-table-column>
    	</el-table>
    </div>
    
    <el-dialog :visible.sync="dialogaddbook" :show-close="false" style="top:-14%">
  		<div class="infoTitle" :model="infoTitles">{{infoTitles}}</div>
  		<div class="addBody fix" >
  			<el-form :label-position="labelPosition" label-width="80px" :model="textbook">
  				<div class="leftPart l">
  					<el-form-item label="课本名">
					    <el-input v-model="textbook.courseName"></el-input>
					  </el-form-item>
					  <el-form-item label="出版社">
					    <el-input v-model="textbook.courseName"></el-input>
					  </el-form-item>
					  <el-form-item label="出版时间">
					    <el-date-picker v-model="textbook.startDate" type="datetime" placeholder="选择开课日期"></el-date-picker>
					  </el-form-item>
					  <el-form-item label="学科">
					  	<el-select v-model="value"  placeholder="请选择学科">
					   		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					   	</el-select>
					  </el-form-item>
					  <el-form-item label="年级">
					   <el-select v-model="value"  placeholder="请选择年级">
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
					<div class="cancleInfo tc poi auto" @click="dialogaddbook = false">取消</div>								
				</div>
			</div>
		</el-dialog>
		
		<el-dialog :visible.sync="dialoginfobook" :show-close="true" >
  		<div class="infoTitle">详情</div>
  		<div class="infoBody fix" v-model="textbook">
  			<div class="leftPart l">
  				<div class="fix">
	    			<div class="infoItems fix l">
	    				<div class="l part tr">课本名:</div>
	    				<div class="l part tl ell" :title="textbook.name">{{textbook.name}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">学科:</div>
	    				<div class="l part tl">{{textbook.endDate}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">年级:</div>
	    				<div class="l part tl">{{textbook.endDate}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">出版社:</div>
	    				<div class="l part tl">{{textbook.startDate}}</div>
	    			</div>
	    			<div class="infoItems fix l">
	    				<div class="l part tr">出版时间:</div>
	    				<div class="l part tl">{{textbook.status}}</div>
	    			</div>
	    		</div>
  			</div>
  			<div class="rightPart l fix">
  				<div class="l ml30">课程图片</div>
  				<div class="l rightImg">
  					<img src="">
  				</div>
				</div>
				<div class="l el-form-item" style="width: 120%;margin-top: 20px;">
					<label class="el-form-item__label" style="width: 90px;padding-top:6px;color:#272727;">课程大纲</label>
					<div class="el-form-item__content" style="margin-left: 90px;">
						<div class="bigSteel">asdasd</div>
					</div>
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
	        	timeout:'语文第一册'
	        },{
	        	id:2,
	        	schoolName:'苏州小学',
	        	gradeName:'三年级',
	        	subject:'第儿学科',
	        	teacherName:'测试老师',
	        	courseName:'数学',
	        	videoName:'第一册',
	        	startDate:'2017-07-31 15:30:49',
	        	timeout:'数学第一册'
	        }
        ],
        value:'',
        dialogaddbook:false,
        dialoginfobook:false,
        infoTitles:'',
        textbook:[]
      }
    },
    methods:{
			addTextbook(){
				this.infoTitles = "新增教材";
				this.dialogaddbook = true;
			},
			dialogInfos(id){
				this.dialoginfobook = true;
			},
			dialogEdits(id){
				this.infoTitles = "编辑教材";
				this.dialogaddbook = true;
			}
		}

  }
</script>

<style scoped="scoped">
  #textBook .el-input__icon {
    width: 55px;
  }
  #textBook .addBody{background:#fff;min-height: 500px;padding:20px 40px;}
  
  #textBook .leftPart{width:40%;}
  #textBook .rightPart{width:60%;}
  #textBook .avatar-uploader-icon{border:1px solid #bfcbd9;}
  #textBook .avatar-uploader-icon:hover{border-color:#66BB6A}
  #textBook .leftPart .el-date-editor.el-input{width:100%;}
  
  #textBook .bigSteel{width: 67%;border:1px #BFCBD9 solid;height: 200px;border-radius: 3px;padding:5px 2%;}
  #textBook .infoItems{width: 100%;}
  
  #textBook .ml30{margin-left:70px}
  #textBook .rightImg{width:122px;height: 140px;background:#D8D8D8;border: 1px solid #979797;margin-left:20px;}
  #textBook .infoItems .tr{width: 30%;}
</style>