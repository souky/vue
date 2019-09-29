
import dynamicTableComponent from './dynamicTable.vue'

const dynamicTable = {
    install:function(Vue){
        Vue.component('DynamicTable',dynamicTableComponent)
    }
};

export default dynamicTable;
