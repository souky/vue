<template>
	<div class="dynamicForm">
    <!-- dialog setting -->
	  <el-form :model="formDatas.form.model" :label-width="formDatas.form.labelWidth" :class="formDatas.headers.length > 8?'doubleLine':''" :style="formDatas.form.style"
      :ref="formDatas.form.ref" status-icon :disabled="formDatas.form.isShow">
      <template v-for="e in formDatas.headers">
        <el-form-item :label="e.label" :prop="e.name" v-if="e.operations == '0'" :rules="formDatas.form.rules[e.validateContent]">
          <!-- input -->
          <el-input v-if="e.formType == 'input'" :disabled="e.disabled == '1'?true:false" :readonly="e.readonly == '1'?true:false"
          v-model="formDatas.form.model[e.name]" :placeholder="e.placeholder" :maxlength="e.maxlength"></el-input>
          <!-- select -->
          <el-select v-if="e.formType == 'select'" :disabled="e.disabled == '1'?true:false" :readonly="e.readonly == '1'?true:false"
           v-model="formDatas.form.model[e.name]" :placeholder="e.placeholder">
            <el-option v-for="ee in e.options" :key="ee.dictKey" :label="ee.dictValue" :value="ee.dictKey"></el-option>
          </el-select>
          <!-- date -->
          <el-date-picker v-if="e.formType == 'date'" :disabled="e.disabled == '1'?true:false" :readonly="e.readonly == '1'?true:false"
           v-model="formDatas.form.model[e.name]" :placeholder="e.placeholder" type="datetime"></el-date-picker>
          <!-- switch  -->
          <el-switch  v-if="e.formType == 'switch'" v-model="formDatas.form.model[e.name]"></el-switch>
          <!-- checkbox  -->
          <el-checkbox-group v-if="e.formType == 'checkbox'" v-model="formDatas.form.model[e.name]"
          :disabled="e.disabled == '1'?true:false" :readonly="e.readonly == '1'?true:false">
            <el-checkbox v-for="ee in e.options" :key="ee.dictKey" :label="ee.dictKey" :name="e.name">{{ee.dictValue}}</el-checkbox>
          </el-checkbox-group>
          <!-- radios  -->
          <el-radio-group v-if="e.formType == 'radios'" v-model="formDatas.form.model[e.name]"
          :disabled="e.disabled == '1'?true:false" :readonly="e.readonly == '1'?true:false">
            <el-radio v-for="ee in e.options" :key="ee.dictKey" :label="ee.dictKey">{{ee.dictValue}}</el-radio>
          </el-radio-group>
          <!-- textarea  -->
          <el-input v-if="e.formType == 'textarea'" v-model="formDatas.form.model[e.name]" :maxlength="e.maxlength"
          :rows="e.rowsSize" :resize='e.resize' type="textarea" :disabled="e.disabled == '1'?true:false" :readonly="e.readonly == '1'?true:false"></el-input>
        </el-form-item>
      </template>
	  </el-form>
  </div>
</template>

<script type="text/javascript">

export default {
  data() {
      return {
          msg:'',
      }
  },
  props:['formDatas'],
	mounted:function(){
	},
  methods:{
		getForm(){
			return this.$refs[this.formDatas.form.ref];
		}
  }
}
</script>
