<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <z-header></z-header>
    <div class="content-container">
      <el-row style="height: 100%;">
        <!-- 菜单 -->
        <z-menu></z-menu>
        <!-- 主体 -->
        <el-col :span="20" class="work-container">
          <div class="router-container">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import ZHeader from './core/header'
  import ZMenu from './core/menu'
  import ZHome from './home/home'

  export default {
    name: 'app',
    data () {
      return {}
    },
    components: {ZHeader, ZMenu,ZHome},
    mounted:function(){
    	document.getElementsByClassName("el-menu-item")[0].click();
    }
    
  }
</script>




