<template lang="html">
  <div id="holiday">
    <div class="year">
      {{times}}节假日
      <div class="info">
        <div class="block"></div><span>标记为节假日</span>
      </div>
    </div>
    <div class="items" v-for="month,index in months" :key="index">
      <div class="title">{{month.text}}</div>
      <div class="weeks">
        <div class="weeks_items" v-for="week,index in weeks" :key="index">{{week}}</div>
      </div>
      <div class="days">
        <div :class="day.class" @click="setHoliday(day)" v-for="day,index in month.days" :key="index">{{day.dayTime}}</div>
      </div>
    </div>
    <div style="display:flex;justify-content: center;margin:20px;width:100%;">
       <el-button type="primary" @click="save">保存数据</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          msg:'',
          months:[{text:'一月'},{text:'二月'},{text:'三月'},{text:'四月'},{text:'五月'},{text:'六月'},{text:'七月'},{text:'八月'},{text:'九月'},{text:'十月'},{text:'十一月'},{text:'十二月'}],
          weeks:['日','一','二','三','四','五','六'],
          holidays:[],
          times:'2019',
      }
  },
  mounted: function () {
    //this.init();
  },
  methods:{
    reload(){
      this.postHttp("holidays/getHolidaysByYear",this.times,res=>{
        this.holidays = res.data;
        for(let x in this.months){
          let days = this.months[x].days;
          for(let y in days){
            if(this.holidays.indexOf(days[y].id) > -1){
              this.$set(days[y],"class","days_items holiday_");
            }
          }
        }
      })
    },
    init(times){
      // 组装数据
      this.times = times;
      let date = new Date();
      date.setFullYear(this.times);
      for(let x in this.months){
        date.setMonth(x);
        date.setDate(1);
        let days = this.getMonthDay(this.times,x);
        let week = date.getDay();
        let days_ = 1;
        let days_array = [];
        for(let y=0;y<(days+week);y++){
          if(y > (week-1)){
            let obj = new Object();
            obj.dayTime = days_;
            let a = this.times;
            let xx = parseInt(x);
            let b = (xx+1)<10?'0'+(xx+1):''+(xx+1);
            let c = days_<10?'0'+days_:''+days_;
            obj.id = a+"\/"+ b +"\/"+c;
            if((y+1) % 7 == 0 || y % 7 == 0){
              obj.class = "days_items sunday";
              obj.isSunday = 1;
            }else{
              obj.class = "days_items"
            }
            days_array.push(obj);
            days_++;
          }else{
            let obj = new Object();
            obj.dayTime = " ";
            obj.id = " ";
            obj.class = "days_items"
            days_array.push(obj);
          }
        }
        this.$set(this.months[x],"days",days_array);
      }
      this.reload();
    },
    getMonthDay(year, month) {
      let days = [31,28,31,30,31,30,31,31,30,31,30,31];
      if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
        days[1] = 29
      }
      return days[month];
    },
    setHoliday(obj){
      let className = "days_items ";
      if(obj.class == 'days_items holiday_' ){
        if(obj.isSunday == '1'){
          className += "sunday";
        }
        this.holidays.splice(this.holidays.indexOf(obj.id),1);
      }else{
        className += "holiday_";
        this.holidays.push(obj.id);
      }
      this.$set(obj,"class",className);
    },
    setSundayHoliday(){
      for(let x in this.months){
        let days = this.months[x].days;
        for(let y in days){
          if(days[y].isSunday == '1' && this.holidays.indexOf(days[y].id) < 0){
            this.holidays.push(days[y].id);
          }
        }
      }
      this.save();
    },
    save(){
      let data = {year:this.times,holidays:this.holidays};
      this.postHttp("holidays/insertHolidays",data,res=>{
        if(res.code == "0"){
          this.notify_success("保存成功")
          this.reload();
        }
      })
    }
  }
}
</script>

<style>
body{
  overflow: auto;
}
#holiday{
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
#holiday .year{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  color:#666;
  text-align: center;
  position: relative;
}
#holiday .year .info{
  width: 140px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 16px;
  display: flex;
}
#holiday .year .info .block{
  background: #409EFF;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 10px;
  margin-top: 5px;
}
#holiday .items{
  width: 280px;
  margin:10px;
  background: #fff;
  box-shadow: 1px 1px 10px #c7c7c7;
  cursor: default;
  padding: 10px;
}
#holiday .items .title{
  text-align: center;
  color:#949494;
  font-size: 20px;
  line-height: 40px;
}
#holiday .items .weeks{
  display: flex;
}
#holiday .items .weeks .weeks_items{
  display: flex;
  width: 40px;
  height:30px;
  justify-content: center;
}
#holiday .items .weeks .weeks_items:nth-child(1),#holiday .items .weeks .weeks_items:nth-child(7){
  color:#f40;
}
#holiday .items .days{
  display: flex;
  flex-wrap: wrap;
}
#holiday .items .days .days_items{
  display: flex;
  width: 34px;
  height: 34px;
  line-height: 34px;
  border-radius: 34px;
  margin: 3px;
  justify-content: center;
}
#holiday .items .days .days_items.sunday{
  color:#f40;
}
#holiday .items .days .days_items.holiday_{
  background: #409EFF;
  color: #fff;
}
</style>
