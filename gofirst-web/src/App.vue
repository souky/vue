<template>

  <keep-alive>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </keep-alive>
</template>

<style>
    /* @import "./assets/css/main.css"; */
    @import "./assets/css/app.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
<script>
  export default{
    mounted:function(){
      // 判断浏览器
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Chrome") < 0) {
        alert("请使用谷歌浏览器")
        location.href = this.getBaseUrl() + 'downloader?fileName=chorme.exe&filePath=/templates/downloader';
      }
    }
  }
</script>
