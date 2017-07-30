<template>
  <div class="role-container">
    <el-row type="flex" class="row-bg pt20 ml20" justify="start">
      <el-col :span="4" class="w280">
        <el-input class="w200 l" placeholder="请输入搜索内容"></el-input>
        <el-button type="success" class="l pl20 pr20" style="border-radius: 0;">搜索</el-button>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg mt20 ml20" justify="start">
      <el-col :span="4" class="w250">
        <el-button type="primary" class="w100" style="float: left;"><i class="fa fa-plus-square-o fa-lg mr5"></i>新增</el-button>
      </el-col>
    </el-row>

    <div class="main-container">
      <!--表格部分-->
      <div class="table-striped mt20">
        <table class="ktable">
          <thead>
          <tr>
            <th>角色名称</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr class="tc">
            <td>音乐</td>
            <td>音乐</td>
            <td>
              <i class="fa fa-pencil-square-o fa-lg" ></i>
              <i class="fa fa-trash fa-lg" ></i>
            </td>
          </tr>
          <tr class="tc">
            <td>音乐</td>
            <td>音乐</td>
            <td>
              <i class="fa fa-pencil-square-o fa-lg" ></i>
              <i class="fa fa-trash fa-lg" ></i>
            </td>
          </tr>
          <tr class="tc">
            <td>音乐</td>
            <td>音乐</td>
            <td>
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

<style scoped>
  .table-striped tbody tr td {
    line-height: 40px;
  }
  .el-button--primary{
    color: #272727;
    border: 0;
    background: none;
  }

</style>