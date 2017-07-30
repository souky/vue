<template>
  <div class="my-account-container pt30">
    <div class="">
      <el-row type="flex" class="row-bg" justify="space-around">
          <div class="account-first l">
            <el-row class="title">
              <el-col :span="20" class="tc f16">帐户信息</el-col>
              <el-col :span="4" class="tc" style="color: #66BB6A;">修改</el-col>
            </el-row>

            <el-row type="flex" class="row-bg" justify="space-around">
              <div class="admin_set">
              <ul>
                <li>
                  <span class="w160 tr">帐户名：</span><span>ssg</span>
                </li>
                <li>
                  <span>帐户角色：</span><span>shuaishuaige</span>
                </li>
                <li>
                  <span>真实姓名：</span><span>帅帅哥</span>
                </li>
                <li>
                  <span>学校：</span><span>一中</span>
                </li>
                <li>
                  <span>职位：</span><span>开发</span>
                </li>
                <li>
                  <span>联系电话：</span><span>123456</span>
                </li>
                <li>
                  <span>联系邮箱：</span><span>abc@qq.com</span>
                </li>
                <li>
                  <span>个人简历：</span><span>无</span>
                </li>
              </ul>
            </div>

              <div class="admin_set">
              <ul>
                <li>
                  <span>个人照片</span>
                  <el-upload
                          class="avatar-uploader mt20"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </li>
              </ul>
            </div>
            </el-row>
          </div>

          <div class="account-first l">
            <el-row class="title">
              <el-col class="tc f16">帐户安全</el-col>
            </el-row>
            <el-row>
              <el-col :span="4" class="tc mt20 ml20" style="color: #66BB6A;">修改密码</el-col>
            </el-row>

          </div>
      </el-row>

    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        msg:'hello vue'
      }
    }
  }
</script>

<style lang="scss">
  .account-first {
    width: 560px;
    padding-bottom: 30px;
    background: white;
    .title {
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid #66BB6A;
    }
    .admin_set{
      width: 45%;
      /*background-color: #F9FAFC;*/
      margin: 20px auto 0;
      ul > li{
        padding: 10px;
        span{
          width: 100%;
          color: #666;
          display: inline-block ;
        }
        span:first-child {
          width: 40%;
          text-align: right;
        }
        span:last-child {
          width: 60%;
          text-align: left;
        }
      }
    }
  }
</style>