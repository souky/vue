/**
 * @description 测试数据
 */

export default {
	dynamicData:{
    // 表格内部数据
    data:[
      {
        cell1:'1',
        cell2:'2',
        cell3:1554280508410,
        cell4:'4'
      },
      {
        cell1:'大娃娃达瓦达瓦达瓦阿瓦达伟大啊伟大伟大伟大啊伟大伟大伟大伟大伟大伟大达瓦伟大大大物提前五天请问亲请问请问',
        cell2:'1',
        cell3:1554280508410,
        cell4:'4'
      }
    ],
		// 是否有多选框
		hasCheck:'0',
		// 多选值
		checkList:[],
		// 是否有序号
		hasIndex:'1',
    // 表头对齐模式 center left right
    align:'center',
    // 是否含有编辑删除项
    hasEdit:'1',
		// 是否有上传按钮
		hasUploadButton:'1',
		// 是否有修改按钮
		hasEditButton:'1',
		// 是否有删除按钮
		hasDeleteButton:'1',
    // 表格列信息
    headers:[
      {
        // 内部数据对应名称
        name:'cell1',
        // 列对齐模式 center left right
        align:'center',
        // 列显示名称
        label:'第一列',
        // 格式化类型 0:none 1:string 2:date
        formatType:'0',
        // 是否需要格式化 需要格式化传递{key:value} date类型传递YYYY-MM-DD HH:mm:ss
        formatter:null,
        // 列宽度
        width:200,
        // 是否属于操作按钮
        operations:'0',
				// 是否隐藏列数据
        overflow:'1',
				// 是否在table上显示
				tableShow:'1',
				// form settings
				// placeholder
				placeholder:'请输入文字',
				// 是否只读
				readonly:'0',
				// 是否禁用
				disabled:'0',
				// form类型  input select date switch checkbox radios textarea
				formType:'input',
				// 最大输入长度  在类型为input textarea中有效
				maxlength:20,
				// textarea的最大显示行数
				rowsSize:5,
				// 是否可缩放textarea none, both, horizontal, vertical
				resize:'none',
				// 如果使用select,checkbox,radios 必须带有options
				options:[],
				// 验证规则
				validateContent:'phone',
      },
      {
        name:'cell2',
        align:'center',
        label:'第二列',
        formatType:'1',
        formatter:'{"1":"sss","2":"dddd"}',
        operations:'0',
				tableShow:'1',
				formType:'select',
				options:[{label:'选项1',value:1},{label:'选项2',value:2}],
      },
      {
        name:'cell3',
        align:'center',
        label:'第三列',
				formatType:'2',
				formatter:'YYYY-MM-DD HH:mm:ss',
        operations:'0',
				tableShow:'1',
				formType:'date',
      },
			{
        name:'cell4',
        align:'center',
        label:'第四列',
				formatType:'0',
        operations:'0',
				tableShow:'0',
				formType:'switch',

      },
			{
        name:'cell5',
        align:'center',
        label:'第五列',
				formatType:'0',
				operations:'0',
				tableShow:'0',
				formType:'checkbox',
				options:[{label:'选项1',value:1},{label:'选项2',value:2}],
				validateContent:'notNullSelect',
      },
			{
        name:'cell6',
        align:'center',
        label:'第六列',
				formatType:'0',
				operations:'0',
				tableShow:'0',
				formType:'radios',
				options:[{label:'选项1',value:1},{label:'选项2',value:2}],
				validateContent:'notNullSelect',
      },
			{
        name:'cell7',
        align:'center',
        label:'第七列',
				formatType:'0',
				operations:'0',
				tableShow:'0',
				rowsSize:5,
				resize:'none',
				formType:'textarea',
      },
      {
        align:'center',
        label:'操作',
        formatter:null,
        width:140,
        operations:'1',
				tableShow:'1',
      },
    ],
		form:{
			style:"width:85%;margin:auto",
			ref:'addform',
			labelWidth:"80px",
			// 如果formType为 checkbox 对应的值一定为集合 否则会赋值全选
			model:{
				cell5:[],
			},
			rules:{

			}
		}
  }

}
