
import dynamicFormComponent from './dynamicForm.vue'

const dynamicForm = {
    install:function(Vue){
        Vue.component('DynamicForm',dynamicFormComponent)
    }
};

export default dynamicForm;
