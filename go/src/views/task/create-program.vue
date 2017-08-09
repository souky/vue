<template>
  <div id="createProgram" class="create-program-container">
    <!--查询-->
    <el-row type="flex" class="row-bg pt20 pl20" justify="start">
        <!-- 节目类型 -->
        <el-col :span="4" class="pct25 mr20">
          <label class="mr20">节目类型</label>
          <el-select v-model="value" class="pct70" placeholder="请输入节目名">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <!-- 节目名 -->
        <el-col :span="4" class="pct25 mr20">
          <label class="mr20">录课班级</label>
          <el-select v-model="value" class="pct70" placeholder="请输入录课班级">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="pct25 mr20"></el-col>
        <!-- 查询 -->
       <el-col :span="4" class="pct25">
                <el-button type="success" class="pct70">查询</el-button>
       </el-col>
      </el-row>

    <div class="main-container">
      <!--表格部分-->
      <div class="table-striped">
        <table class="ktable">
          <thead>
          <tr>
            <th>
            	<el-date-picker v-model="queryStartDate" @change="time_change()" :clearable="false"  type="datetime" placeholder="选择开始日期"></el-date-picker>
            </th>
	        	<th>
        				<div class="dataW">星期一</div>
            		<div id="week_0" class="dataW">2017/04/11</div>
            </th>
            <th>
            		<div class="dataW">星期二</div>
            		<div id="week_1" class="dataW">2017/04/12</div>
            </th>
            <th>
            		<div class="dataW">星期三</div>
            		<div id="week_2" class="dataW">2017/04/13</div>
            </th>
            <th>
            		<div class="dataW">星期四</div>
            		<div id="week_3" class="dataW">2017/04/14</div>
            </th>
            <th>
            		<div class="dataW">星期五</div>
            		<div id="week_4" class="dataW">2017/04/15</div>
            </th>
            <th>
            		<div class="dataW">星期六</div>
            		<div id="week_5" class="dataW">2017/04/16</div>
            </th>
            <th>
            		<div class="dataW">星期日</div>
            		<div id="week_6" class="dataW">2017/04/17</div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="tc">
            <td>9:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          <tr class="tc">
           	<td>10:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          <tr class="tc">
            <td>11:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          <tr class="tc">
            <td>12:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          <tr class="tc">
            <td>13:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          <tr class="tc">
            <td>14:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          <tr class="tc">
            <td>15:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          <tr class="tc">
            <td>16:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          <tr class="tc">
            <td>17:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          <tr class="tc">
            <td>18:00</td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
            <td class="poi itemsTd"></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
		
		<el-dialog :visible.sync="dialog_program" :show-close="false">
    	<div class="infoTitle">新建节目单</div>
  		<div class="editBody">
			</div>
			<div class="editBottom fix">
				<div class="l">
					<div class="saveInfo tc poi auto" @click="saveRole()">保存</div>
				</div>
				<div class="l">
					<div class="cancleInfo tc poi auto" @click="dialog_program = false">取消</div>								
				</div>
			</div>
    </el-dialog>


  </div>
</template>



<script>
	import jQuery from 'jquery';
	
  export default{
    data () {
      return {
        msg:'hello vue',
	      options: [{
	          value: '1',
	          label: '黄金糕'
	        }, {
	          value: '2',
	          label: '双皮奶'
	        }, {
	          value: '3',
	          label: '蚵仔煎'
	        }, {
	          value: '4',
	          label: '龙须面'
	        }, {
	          value: '5',
	          label: '北京烤鸭'
	      }],
	      value:'',
	      tableData:[],
	      queryStartDate:'',
	      dialog_program:false,
      }
    },
    methods:{
    	time_change(){
    		data_init(this.queryStartDate,this); 
    	}
    },
    mounted:function(){
    	var dateNow = new Date();
    	data_init(dateNow,this); 
    }
  }
  
  function data_init(datenow,obj){
  	var weeknow = datenow.getUTCDay();
  	if(weeknow!=0){
  		datenow.setDate(datenow.getDate()-weeknow);
  	}
  	for(var i = 0;i<7;i++){
			datenow.setDate(datenow.getDate()+1);
			var html = ''+obj.timeF(datenow).format("YYYY/MM/DD");
			jQuery("#week_"+i).html(html);
  	}
  	
  	jQuery(".itemsTd").dblclick(function(){
  		obj.dialog_program = true;
  	})
  }
</script>

<style>
	#createProgram .table-striped{margin-top:40px;}
	#createProgram .table-striped th,td{width:12.5%}
	#createProgram .table-striped tr{height:60px;line-height:60px;}
	#createProgram .el-icon-time:before {content: "\E611";}
	#createProgram .el-date-editor input{display: none;}
	#createProgram .el-date-editor .el-input__icon{position: relative;color:#66BB6A;}
	.dataW{line-height: 20px;height: 20px;}
	.itemsTd:hover{background:#66BB6A;color:#fff}
</style>