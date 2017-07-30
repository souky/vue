<template>
  <div class="course-video-container">
    <el-row type="flex" class="row-bg pt20" justify="end">
      <el-col :span="4" class="w250 mr20">
        <label class="mr20">学校</label>
        <el-select class="w180" placeholder="请选择学校">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="w250 mr20">
        <label class="mr20">年级</label>
        <el-select class="w180" placeholder="请选择年级">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="w250 mr20">
        <label class="mr20">教师</label>
        <el-select class="w180" placeholder="请选择教师">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="w250">
        <label class="mr20">学科</label>
        <el-select class="w180" placeholder="请选择学科">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg mt20" justify="end">
      <!-- 视频名 -->
      <el-col :span="4" class="w250" style="margin-right: 35px;">
        <label class="mr20">视频名</label>
        <el-input class="w180" placeholder="请输入视频名"></el-input>
      </el-col>
      <!-- 开始 -->
      <el-col :span="4" class="w250 mr20">
        <label class="mr20">开始</label>
        <el-date-picker
                type="datetime"
                class="w180"
                placeholder="选择日期时间">
        </el-date-picker>
      </el-col>
      <!-- 查询 -->
      <el-col :span="4" class="w250">
        <el-button type="success" icon="search" class="w180" style="float: right;margin-right: 16px;">查询</el-button>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg mt20" justify="end">
      <!-- 新增课程 -->
      <el-col :span="4" class="w250">
        <el-button type="primary" class="w180" style="float: right;margin-right: 16px;">上传课堂视频</el-button>
      </el-col>
    </el-row>

    <div class="main-container">
      <!--表格部分-->
      <div class="table-striped mt20">
        <table class="ktable">
          <thead>
          <tr>
            <th>学校</th>
            <th>年级</th>
            <th>学科</th>
            <th>教师</th>
            <th>课程名</th>
            <th>开课日期</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr class="tc">
            <td>第一小学</td>
            <td>二年</td>
            <td>第一小学</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>2017/09/08  09:48</td>
            <td>
              <i class="fa fa-exclamation-circle fa-lg" ></i>
              <i class="fa fa-pencil-square-o fa-lg" ></i>
              <i class="fa fa-trash fa-lg" ></i>
            </td>
          </tr>
          <tr class="tc">
            <td>第一小学</td>
            <td>二年</td>
            <td>第一小学</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>2017/09/08  09:48</td>
            <td>
              <i class="fa fa-exclamation-circle fa-lg" ></i>
              <i class="fa fa-pencil-square-o fa-lg" ></i>
              <i class="fa fa-trash fa-lg" ></i>
            </td>
          </tr>
          <tr class="tc">
            <td>第一小学</td>
            <td>二年</td>
            <td>第一小学</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>2017/09/08  09:48</td>
            <td>
              <i class="fa fa-exclamation-circle fa-lg" ></i>
              <i class="fa fa-pencil-square-o fa-lg" ></i>
              <i class="fa fa-trash fa-lg" ></i>
            </td>
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
      }
    },

  }
</script>

<style scoped="scoped">
  .el-input__icon {
    width: 55px;
  }
  .el-date-editor.el-input {
    width: 180px;
  }
</style>