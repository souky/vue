<template >
  <div id="test">
    <HolidaySetting :times="times"></HolidaySetting>
  </div>
</template>

<script>
import Region from "@/js/common/regions"
export default {
  data(){
    return{
      times:'2019',
    }
  }
}
</script>
<style>
  #test{
    width: 100%;
    margin:200px auto;
    border: 1px #c7c7c7 solid;
  }
</style>
