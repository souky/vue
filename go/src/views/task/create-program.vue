<template>
  <div class="create-program-container">
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
            <th><i class="fa fa-calendar fa-lg" style="color:#66BB6A;"></i></th>
            <th>星期一<br/>2017/04/12</th>
            <th>星期二<br/>2017/04/12</th>
            <th>星期三<br/>2017/04/12</th>
            <th>星期四<br/>2017/04/12</th>
            <th>星期五<br/>2017/04/12</th>
            <th>星期六<br/>2017/04/12</th>
            <th>星期日<br/>2017/04/12</th>
          </tr>
          </thead>
          <tbody>
          <tr class="tc">
            <td>第一小学</td>
            <td>二年</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>英语</td>
            <td>帅帅哥</td>
            <td>节目名</td>
            <td>2017/09/08  09:48</td>
          </tr>
          <tr class="tc">
            <td>第一小学</td>
            <td>二年</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>英语</td>
            <td>帅帅哥</td>
            <td>节目名</td>
            <td>2017/09/08  09:48</td>
          </tr>
          <tr class="tc">
            <td>第一小学</td>
            <td>二年</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>英语</td>
            <td>帅帅哥</td>
            <td>节目名</td>
            <td>2017/09/08  09:48</td>
          </tr>
          <tr class="tc">
            <td>第一小学</td>
            <td>二年</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>英语</td>
            <td>帅帅哥</td>
            <td>节目名</td>
            <td>2017/09/08  09:48</td>
          </tr>
          <tr class="tc">
            <td>第一小学</td>
            <td>二年</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>英语</td>
            <td>帅帅哥</td>
            <td>节目名</td>
            <td>2017/09/08  09:48</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>



  </div>
</template>

<script>
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
	      value:''
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .table-striped{
    tr,td {
      height: 40px;
      line-height: 40px;
    }
    td,th {
      border-right: 1px solid #e9e9e9;
    }
    th:last-child{
      border-right:0;
    }
    td:last-child {
      border-right:0;
    }
    tr:last-child td{
      border-bottom: 0;
    }
  }
</style>