// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/router.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill';
// jsonP
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp)

//引入axios
import axios from 'axios';

/* axios配置 */
axios.defaults.withCredentials = false
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
//token xinxi
axios.defaults.headers.common['Authorization'] = window.localStorage.getItem("Authorization");

Vue.prototype.$axios = axios

//ajax数据处理
var querystring = require('querystring');
/* 时间转化 */
Vue.prototype.timeF = require('moment');
//示例 this.timeF(date).format("YYYY-MM-DD HH:mm:ss");

//后台基础地址

var basePath = "/auc/";


// 登录地址

var userCenterUrl = "/center/";

var baseUrl = 'http://localhost:8883/';
//var baseUrl = 'http://222.92.23.166:18883/';



/*
 * 封装ajax
 * data : ajax传入后台data数据
 * address : ajax接口地址
 * fn : 成功返回方法  带参数  obj,data  obj : this data : response 懵懂
 * */
Vue.prototype.postHttp =  function(address,data,fn){
	this.$axios.post(basePath+address,data).then(response => {
			if(response.data.code == '3'){
				this.$router.push(this.getData('loginURL'));
			}else{
				fn(response.data);
			}
    },response => {
			this.$notify({
					title: '网络错误',
					message: '网络错误',
					offset: 100,
					duration:1500,
					type:'error'
	    });
	})
}

/*
 * 数字证书登录
 * */
Vue.prototype.usbkeyLogin =  function(fn){
	this.$axios.post('/outside/usbKeyLogin',{}).then(response => {
			let data = {usbkeyCode:response.data}
			this.$axios.post('/center/auth/login',data).then(response => {
					fn(response.data);
		    },response => {
					this.$notify({
							title: '网络错误',
							message: '网络错误',
							offset: 100,
							duration:1500,
							type:'error'
			    });
			})
    },response => {
			this.$notify({
					title: '网络错误',
					message: '网络错误',
					offset: 100,
					duration:1500,
					type:'error'
	    });
	})
}


/*
 * 封装ajax
 * data : ajax传入后台data数据
 * address : ajax接口地址
 * fn : 成功返回方法  带参数  obj,data  obj : this data : response 懵懂
 * */
Vue.prototype.getHttp =  function(address,data,fn){
	this.$axios.get(basePath+address,{params: data}).then(response => {
			if(response.data.code == '3'){
				this.$router.push(this.getData('loginURL'));
			}else{
				fn(response.data);
			}
    },response => {
			this.$notify({
					title: '网络错误',
					message: '网络错误',
					offset: 100,
					duration:1500,
					type:'error'
	    });
	})
}

//对象解绑
Vue.prototype.unBinding = function(obj){
	let objNew = new Object();
	objNew = JSON.parse(JSON.stringify(obj));
	return objNew;
}




/*
 * 封装ajax
 * data : ajax传入后台data数据
 * address : ajax接口地址
 * fn : 成功返回方法  带参数  obj,data  obj : this data : response 懵懂
 * */
Vue.prototype.getHttpForLogin =  function(address,data,fn){
	this.$axios.get(userCenterUrl+address,{params: data}).then(response => {
			fn(response.data);
    },response => {
			this.$notify({
					title: '网络错误',
					message: '网络错误',
					offset: 100,
					duration:1500,
					type:'error'
	    });
	})
}

/*
 * 封装ajax
 * data : ajax传入后台data数据
 * address : ajax接口地址
 * fn : 成功返回方法  带参数  obj,data  obj : this data : response
 * */
Vue.prototype.postHttpForLogin =  function(address,data,fn){
	this.$axios.post(userCenterUrl+address,data).then(response => {
			fn(response.data);
    },response => {
			this.$notify({
					title: '网络错误',
					message: '网络错误',
					offset: 100,
					duration:1500,
					type:'error'
	    });
	})
}

/*
 * 封装sessionStorage
 * key : 键 string
 * value : 值 object
 * */
Vue.prototype.setData = function(key,value){
	window.sessionStorage.setItem(key,value);
}
Vue.prototype.getData = function(key){
	return window.sessionStorage.getItem(key);
}


/*
 * 封装提示
 * title : 标题
 * message : 提示内容
 * type : 提示类型  success warning error
 * */
Vue.prototype.notify_jr = function(title,message,type) {
	this.$notify({
      title: title,
      message: message,
      offset: 100,
      duration:1500,
      type:type
    });
}

Vue.prototype.notify_success = function(message) {
	this.$notify({
      title: '操作成功',
      message: message,
      offset: 100,
      duration:1500,
      type:'success'
    });
}

Vue.prototype.notify_error = function(message) {
	this.$notify({
      title: '操作失败',
      message: message,
      offset: 100,
      duration:1500,
      type:'error'
    });
}

Vue.prototype.notify_warning = function(message) {
	this.$notify({
      title: '提示',
      message: message,
      offset: 100,
      duration:1500,
      type:'warning'
    });
}

/*
 * 封装未登录提示
 * */
Vue.prototype.notify_login = function(){
	this.$notify({
      title: '提示',
      message:'请先登录',
      offset: 100,
      duration:1500,
      type:'warning'
    });
}
/**
 * confim
 * message:提示信息
 * title:提示标题
 * confimEvent:确定事件回调
 * */
Vue.prototype.$confim = function(message,title,confimEvent){
	this.$confirm(message, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          	confimEvent();
        }).catch(() => {
             //用户取消不做操作
        });
}

Vue.prototype.getBaseUrl = function(){
	return baseUrl;
}


Vue.use(ElementUI);
Vue.config.productionTip = false

// 全局组件注册 动态表格和表单 具体用法详见 page/dynamicTest  数据格式见 js/DynamicData
import dynamicTable from '@/components/dynamicTable/index';
import dynamicForm from '@/components/dynamicForm/index';
// 节假日选择插件
import holidaySetting from '@/components/holidaySetting/index';
import VueWebcam from '@/components/webCam/index';
Vue.use(dynamicTable);
Vue.use(dynamicForm);
Vue.use(holidaySetting);
Vue.use(VueWebcam);

// 引入公共验证方法
import DefaultRules from '@/js/common/DefaultRules';
Vue.prototype.$DefaultRules = DefaultRules;

// 处理dynamic接收数据 针对checkBox form
Vue.prototype.$DealReceive = function(data){
	let headers = data.headers;
	// 根据headers处理form数据
	if(headers){
		for(let x in headers){
			if('checkbox' == headers[x].formType){
					let dataCheck = data.form.model[headers[x].name];
					if(dataCheck != null){
						this.$set(data.form.model, headers[x].name, dataCheck.split(","));
					}else{
						this.$set(data.form.model, headers[x].name, [])
					}
			}
			if('radios' == headers[x].formType){
					let radios = data.form.model[headers[x].name];
					if(radios == undefined || radios == null){
						radios = ""
					}
					this.$set(data.form.model, headers[x].name, radios)
			}
		}
	}
	return data;
}
// 处理dynamic 发送数据 针对checkBox 附带解绑
Vue.prototype.$DealSend = function(data){
	let objNew = new Object();
	objNew = JSON.parse(JSON.stringify(data));
	let headers = objNew.headers;
	if(headers){
		for(let x in headers){
			if('checkbox' == headers[x].formType){
					objNew.form.model[headers[x].name] = objNew.form.model[headers[x].name].join(",");
			}
		}
	}
	return objNew;
}

// 调取pageOffice
// 参数  url地址  params附带参数(格式为Object)
Vue.prototype.pageOffice = function(url,params){
	let address = "http://127.0.0.1:57070/json.htm";
	// 判断是否安装插件
	this.$jsonp(address, {}).then(json => {
		let paramsArray = [];
		if(null != params && params != undefined){
			for(let e in params){
				paramsArray.push(e+'='+params[e]);
			}
		}
		let urlTemp = baseUrl+url+'?'+paramsArray.join("&");
		location.href = 'PageOffice://|'+urlTemp+'|width=1366px;height=800px;frame=yes;ismodal=false;'
	}).catch(err => {
		alert('请先安装插件');
		location.href = this.getBaseUrl() + 'downloader?fileName=word_plug_in.rar&filePath=/templates/downloader';
	})
}

// 防止鼠标连点效果
Vue.directive('noMoreClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      el.classList.add('is-disabled');
      el.disabled = true;
      setTimeout(() => {
        el.disabled = false;
        el.classList.remove('is-disabled');
      }, 2000)
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
