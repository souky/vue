<template>
	<div class="dynamicTable">
		<div v-if="tableData.headers.length == 0" style="width:100%;height:50px;line-height:50px;text-align:center;cursor:default;color:#c7c7c7">
			此项无内容
		</div>
    <!-- table setting -->
    <el-table v-else :data="tableData.data" :align='tableData.align' style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column v-if="tableData.hasCheck == '1'" type="selection" width="55"></el-table-column>
			<el-table-column v-if="tableData.hasIndex == '1'" align='center' type="index" width="60" label="序号" :index="indexMethod"></el-table-column>
      <template v-for="(e,index) in tableData.headers">

				<template v-if="e.tableShow == '1'">
					<el-table-column fixed="right"  v-if="e.operations == '1' && tableData.hasEdit == '1'" :align='e.align' :width="e.width" class-name="operations" :label="e.label">
	          <template slot-scope="scope">
							<div class="op_items" v-if="tableData.hasUploadButton == '1'">
	              <el-button size="mini" plain type="warning" @click="upload(scope.row)">图片</el-button>
	            </div>
	            <div class="op_items" v-if="tableData.hasEditButton == '1'">
	              <el-button size="mini" plain type="warning" @click="edit(scope.row)">修改</el-button>
	            </div>
	            <div class="op_items" v-if="tableData.hasDeleteButton == '1'">
	              <el-button size="mini" plain type="danger" @click="deletes(scope.row)">删除</el-button>
	            </div>
	          </template>
	        </el-table-column>

	        <template v-if="e.operations == '0'">

	          <el-table-column :show-overflow-tooltip="e.overflow == '1'?true:false" :align='e.align' :prop="e.name" :width="e.width" :label="e.label"
	          v-if="e.formatType == '0'"
	          ></el-table-column>

	          <el-table-column :show-overflow-tooltip="e.overflow == '1'?true:false" :align='e.align' :prop="e.name" :width="e.width" :label="e.label"
	          v-if="e.formatType == '1'" :formatter="formatterArray" :filtered-value="e.options"
	          ></el-table-column>

	          <el-table-column :show-overflow-tooltip="e.overflow == '1'?true:false" :align='e.align' :prop="e.name" :width="e.width" :label="e.label"
	          v-if="e.formatType == '2'" :formatter="formatterDate" :filter-placement="e.formatter"
	          ></el-table-column>
	        </template>
				</template>
      </template>

    </el-table>

    <!-- dialog setting -->

  </div>
</template>

<script type="text/javascript">

export default {
  data() {
      return {
          msg:'',
      }
  },
  props:['tableData'],
  methods:{
    edit(row) {
      this.$emit('edit', row);
    },
		upload(row) {
      this.$emit('upload', row);
    },
    deletes(row) {
      this.$emit('deletes', row);
    },
    formatterArray(row, column, cellValue, index){
			let array = column.filteredValue
			for(let x in array){
				if(array[x].dictKey == cellValue){
					return array[x].dictValue;
				}
			}
    },
    formatterDate(row, column, cellValue, index){
			if(null == cellValue){
				return '';
			}else{
				return this.timeF(new Date(cellValue)).format(column.filterPlacement);
			}
    },
		handleSelectionChange(value){
			this.tableData.checkList = value;
		},
		indexMethod(index) {
			return index + 1;
		},
  }
}
</script>
