<template>
  <div id="vestige" data-title="痕迹鉴定">



    <el-form ref="form" :model="form" label-width="140px" size='small'>
      <div class="title-center">痕迹鉴定</div>
      <div class="title-level one"><i class="el-icon-tickets"></i>基本信息</div>
      <div class="form-body">
        <el-form-item class="form-items" label="温度(℃):">
          <el-input v-model="form.c001"></el-input>
        </el-form-item>
        <el-form-item class="form-items" label="湿度(%):">
          <el-input v-model="form.c002"></el-input>
        </el-form-item>
        <el-form-item class="form-items" label="是否出鉴定书:">
          <el-radio-group v-model="form.c003">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-items" label="实验室:">
          <el-select v-model="form.checkRoom" placeholder="请选择">
            <el-option label="实验室1" value="1"></el-option>
            <el-option label="实验室2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验方法:">
          <el-checkbox-group v-model="form.checkMethod">
            <el-checkbox label="1">指纹鉴定法(IFSJS-23607-2016)</el-checkbox>
            <el-checkbox label="2">掌纹鉴定法(IFSJS-23608-2016)</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-items rows" label="检验设备:">
          <el-checkbox-group v-model="form.instrumentEquipment">
            <el-checkbox label="1">
              放大镜
              <el-input size="mini" class="checkbox-input" v-model="form.c004"></el-input>
            </el-checkbox>
            <el-checkbox label="2">
              显微镜
              <el-input size="mini" class="checkbox-input" v-model="form.c005"></el-input>
            </el-checkbox>
            <el-checkbox label="3">指纹自动识别系统</el-checkbox>
            <el-checkbox label="4">扫描仪</el-checkbox>
            <el-checkbox label="5">分规</el-checkbox>
            <el-checkbox label="6">其它</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-items rows-half" label="备注:">
          <el-input v-model="form.c006" type="textarea" resize="none" :rows="3"></el-input>
        </el-form-item>
      </div>
      <div class="title-level one"><i class="el-icon-tickets"></i>检验过程</div>
      <div class="editor-body">
        <tinymce-editor ref="editor" v-model="form.checkResultContent" ></tinymce-editor>
      </div>

    </el-form>

    <div class="btns">
      <el-button type="info" size="small" plain>返  回</el-button>
      <el-button type="primary" size="small" plain @click="save">保  存</el-button>
    </div>
  </div>
</template>

<script>
import TinymceEditor from "@/components/tinymce-editor"
export default {
  components: {
    TinymceEditor
  },
  data(){
    return {
      form:{
      },
      options:['checkMethod','instrumentEquipment','c008','c009','c013'],
    }
  },
  activated:function(){
    //this.dealData();
    //this.dealData(this.form,options)
  },
  methods:{
    dealData(){
      // this.postHttp("check/selectByPrimaryKey","",res=>{
      //
      // })

      let options = this.options;
      for(let x in options){
        if(this.form[options[x]]){
          this.$set(this.form, options[x], this.form[options[x]].split(","));
        }else{
          this.$set(this.form, options[x], []);
        }
      }
    },
    save(){
      let data = this.unBinding(this.form);
      data = this.dealSendData(data);
      this.postHttp("check/insertOrUpdateSelective",data,res=>{
        console.log(res);
      })
    },
    dealSendData(data){
      let options = this.options;
      for(let x in options){
        let dataItem = data[options[x]];
        if(dataItem.length > 0){
          dataItem = dataItem.join(",");
        }else{
          dataItem = '';
        }
        data[options[x]] = dataItem;
      }
      return data;
    }
  }
}
</script>

<style>
</style>
