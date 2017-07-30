<template>
  <div class="account-list-container">
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
        <label class="mr20">角色</label>
        <el-select class="w180" placeholder="请选择角色">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="w250 mr20">
        <label class="mr20">帐户名</label>
        <el-select class="w180" placeholder="请选择帐户名">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="w250">
        <label class="mr20">姓名</label>
        <el-select class="w180" placeholder="请选择姓名">
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
      <el-col :span="4" class="w250">
        <el-button type="success" class="w180" style="float: right;margin-right: 16px;">查询</el-button>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg mt20 ml20" justify="start">
      <el-col :span="4" class="w250">
        <el-button type="primary" class="w100" style="float: left;"><i class="fa fa-plus-square-o fa-lg mr5"></i>新建</el-button>
      </el-col>
    </el-row>

    <div class="main-container">
      <!--表格部分-->
      <div class="table-striped mt20">
        <table class="ktable">
          <thead>
          <tr>
            <th>学校</th>
            <th>角色</th>
            <th>帐户名</th>
            <th>姓名</th>
            <th>联系电话</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr class="tc">
            <td>第一小学</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>音乐</td>
            <td>音乐</td>
            <td>
              <i class="fa fa-pencil-square-o fa-lg" ></i>
              <i class="fa fa-trash fa-lg" ></i>
            </td>
          </tr>
          <tr class="tc">
            <td>第一小学</td>
            <td>第一小学</td>
            <td>音乐</td>
            <td>音乐</td>
            <td>音乐</td>
            <td>
              <i class="fa fa-pencil-square-o fa-lg" ></i>
              <i class="fa fa-trash fa-lg" ></i>
            </td>
          </tr>
          <tr class="tc">
            <td>第一小学</td>
            <td>第一小学</td>
            <td>音乐</td>
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

<style scoped="scoped">
  .el-button--primary{
    color: #272727;
    border: 0;
    background: none;
  }
</style>