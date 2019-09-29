  <template>
  <div id="acceptCheck">
    <el-divider content-position="left"><div class="title-level one"><i class="el-icon-tickets"></i>检材存储</div></el-divider>
          <el-table :data="checkDataSelect" align='center' style="width: 98%" height="350">
              <el-table-column prop="materialSerialNum" align='center' label="物证编号" show-overflow-tooltip width="200"></el-table-column>
              <el-table-column prop="NAME" align='center' label="物证名称" ></el-table-column>
              <el-table-column prop="c021" align='center' label="数量" ></el-table-column>
              <el-table-column prop="UNIT" align='center' label="单位" ></el-table-column>
              <el-table-column prop="checkPic" align='center' label="附件/照片" >
                <template slot-scope="scope">
                  <el-button size="small" type="primary" plain @click="upload(scope.row)">图片</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="c022" align='center' label="交接数量" width="150">
                <template slot-scope="scope">
                  <el-input-number :disabled='isFlowShow' v-model ="scope.row.c022" :step="1" :min="0" :max="parseInt(scope.row.c021, 10)" size="small" type="primary" plain ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column fixed="right" align='center' label="提交人" >
                       {{this.firstEmp}}
              </el-table-column>
          </el-table>

          <!-- <el-divider content-position="left">受理信息</el-divider> -->
          <el-form :inline="true" :model="evidDeal" class="demo-form-inline" label-width="100px;" style="text-align:right;margin-top:15px">
              <el-form-item label="交接日期">
                <el-date-picker :disabled='isFlowShow' v-model="evidDeal.acceptDatetime" type="datetime" placeholder="交接日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="接收人">
                <el-select :disabled='isFlowShow' v-model="evidDeal.empId" clearable  placeholder="接收人">
                    <el-option
                      v-for="item in this.empList"
                      :key="item.empNo"
                      :label="item.empName"
                      :value="item.empNo">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="放置位置">
                <el-select :disabled='isFlowShow' v-model="evidDeal.storage" clearable  placeholder="放置位置">
                  <el-option
                      v-for="item in this.storage"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="保存条件">
                <el-select :disabled='isFlowShow' v-model="evidDeal.condition" clearable  placeholder="保存条件">
                    <el-option
                      v-for="item in this.condition"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="保存期限(天)">
                <el-select :disabled='isFlowShow' v-model="evidDeal.saveTime" clearable  placeholder="保存期限（天）">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="5" value="5"></el-option>
                  <el-option label="7" value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="rows" v-if="!isFlowShow">
                <el-button type="primary" @click="saveEvidDeal">保存</el-button>
              </el-form-item>
          </el-form>


    <el-divider content-position="left"><div class="title-level one"><i class="el-icon-tickets"></i>收检信息</div></el-divider>
    <el-form ref="form" :model="form" label-width="140px" size='small' >
      <div class="form-body">
        <!--<el-form-item class="form-items" label="受理编号:">
          <el-input v-model="form.checkCode" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items" label="文书类型:">
          <el-input v-model="form.checkResultType" disabled></el-input>
        </el-form-item>
        <el-form-item class="form-items" label="检验结论:">
          <el-input v-model="form.checkResultContent" disabled></el-input>
        </el-form-item>-->
        <el-form-item class="form-items rows-half" label="收检意见:">
          <el-input :disabled='isFlowShow' v-model="form.reason" resize="none" rows="5" type="textarea"
                    placeholder="收检意见"></el-input>
        </el-form-item>
        <el-form-item class="form-items rows-half" label="送检人:">
          <el-input v-model="check.checkPerson" resize="none" disabled></el-input>
          <!-- <el-select v-model="form.label" filterable placeholder="请选择">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.label"
             ></el-option>
           </el-select>-->
        </el-form-item>
      </div>
    </el-form>
    <!-- <div class="btns">
      <el-button type="primary" v-if="!isFlowShow" size="small" class="baocun" plain @click="save">保 存</el-button>
    </div> -->
    <el-dialog title="上传图片" width="440px" :visible.sync="dialogUpload">
			<el-upload :action="action" list-type="picture-card" ref="upload" :file-list='imgList' :data="livEvi" :on-remove="handleRemove" :multiple="true" :http-request="uploadFile" :auto-upload="false" :on-preview="handlePictureCardPreview">
				<i class="el-icon-plus"></i>
			</el-upload>
			<div class="photo" @click="open_photo">
				<div class="text">
					拍照区域,单击打开摄像头
				</div>
				<div class="take">
					<el-button  icon="el-icon-camera" circle @click.prevent='take_photo'></el-button>
				</div>
				<vue-webcam ref='webcam'></vue-webcam>
			</div>
		  <div slot="footer" class="dialog-footer">
				<el-button @click="cancle">取 消</el-button>
				<el-button type="primary" @click="uploads">确 定</el-button>
		  </div>
		</el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        /*options: [{
          value: '1',
          label: ''
        }],*/
        //人员信息
        empList: [],
        evidDeal: {},
        storage:'',
        condition:'',
        //检材样本列表信息
        checkData: [],
        checkDataSelect: [],
        firstEmp:'',
        dialogImageUrl: '',
        dialogVisible:false,

        action:'',
        imgList:[],
				livEvi:{},
				flag:'',

        textarea: '',
        isFlowShow:false,
        registerId: '',
        form: {
          reason: '确认收检',
        },
        check: {
          checkPerson: '',
        },
				dialogUpload:false,
      }
    },

    mounted: function () {
      this.isFlowShow = eval(this.getData('isFlowShow'));
      this.regRow = JSON.parse(this.getData("regRow"));
      this.workFlowId = this.getData("workflowId");
      this.check.checkPerson = this.getData("userName");
      this.getEmpList();
      this.getDictInfo();
      this.queryAccept();
      this.getEvidDeal();
      this.getCheckData();
    },

    methods: {
     /**
       * 获取人员信息
       */
      getEmpList() {
       // 查询workFlow
        this.postHttp("aucOrgUser/selectEmpListByWorkFlowId", this.workFlowId, res => {
            if (res.code == '0') {
                  this.empList = res.data;
                }
          })
        },
        getDictInfo() {
        var data = {
          "parentKeyList": ["STORAGE","CONDITION"]
        };
        this.postHttpForLogin("dict/getDictInfo", data, res => {
          if (res.code == '0') {
            this.storage = res.data.STORAGE;
            this.condition = res.data.CONDITION;
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      queryAccept() {
        let data = {};
        data['workflowId'] = this.getData("workflowId");
        data['registerId'] = this.regRow.registerId;
        this.postHttp("history/getHistory", data, res => {
          if (res.data != null) {
            this.form = res.data;
          }
        })
      },
      //保存
      save() {
        this.setData("reason", this.form.reason);
      },

      dateFormat(row, column, cellValue, index) {
        var date = cellValue;
        if (date == undefined || date == '') {
          return "";
        }
        return this.timeF(date).format("YYYY-MM-DD HH:mm:ss");
      },

      // 检材处理——start
      saveEvidDeal(){
        this.saveMaterial();
        let dataLet = this.unBinding(this.evidDeal);
        dataLet['status'] = "2";
        dataLet['registerId'] = this.regRow.registerId;
        this.postHttp("eviAuc/inOrUpEvidDeal", dataLet, res => {
          if (res.code == "0") {
            this.notify_success(res.msg);
          } else {
            this.notify_warning(res.msg);
          }
        });
      },

       saveMaterial() {
        this.checkDataSelect.forEach(element => {
          let submitParam = {};
          submitParam = element;
          if(element.checkAccept == '1'||element.checkAccept == '3'){
              this.postHttp("evidengesExtd/insertAndUpdateEvidengesExtd", submitParam, res => {
                if (res.code == '0') {

                } else {
                  this.$notify_warning(res.msg);
                }
              });

          }
        });
        this.getCheckData();
      },
      getEvidDeal(){
        let dataLet = {};
        dataLet['status'] = "2";
        dataLet['registerId'] = this.regRow.registerId;
        this.postHttp("eviAuc/getEvidDeal", dataLet, res => {
          if (res.code == "0") {
            if(res.data){
              this.evidDeal = res.data;
            }
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      getFirstEmp(){
        let dataLet = {};
        dataLet['status'] = "1";
        dataLet['registerId'] = this.regRow.registerId;
        this.postHttp("eviAuc/getEvidDeal", dataLet, res => {
          if (res.code == "0") {
            if(res.data){
              for (let index = 0; index < this.empList.length; index++) {
                const element = array[index];
                if(element.empId ==  res.data.empId){
                    this.firstEmp = element.empName;
                    console.log('firstEmp', this.firstEmp)
                }
              }
            }
          } else {
            this.notify_warning(res.msg);
          }
        });
      },


       /**
       获取检材样本列表信息
       */
      getCheckData() {
        this.getHttp("evidences/getEvidenceListForReal", {"registerId": this.regRow.registerId}, res => {
          if (res.code == '0') {
            this.checkData = res.data;
            this.setCheckDataSelect();
          } else {
            this.$notify_warning(res.msg);
          }
        });
      },
      /**
       * 获取受理后的检材信息
       */
      setCheckDataSelect() {
        this.checkDataSelect = [];
        for (let index = 0; index < this.checkData.length; index++) {
          if (this.checkData[index].checkAccept == "1"||this.checkData[index].checkAccept == "3") {
            this.checkDataSelect.push(this.checkData[index]);
          }
        }
      },
      // 检材处理——end

      // 图片处理
      // 上传
			upload(row){
				this.postHttp("evidencesImg/selectByEviId",row.id,res =>{
					if(res.data.length > 0){
						for(let x in res.data){
							res.data[x]['url'] = res.data[x].address;
						}
						this.imgList = res.data;
					}else{
						this.imgList = [];
					}
					this.dialogUpload = true;
					this.livEvi.id = row.id;
					this.fileData = new FormData();

				});
			},
			cancle(){
				this.$refs.webcam.pause();
				this.dialogUpload = false;
			},
			// 上传方法
			uploads(){
				this.submitUpload();
			},
			uploadFile(file){
					this.fileData.append('file', file.file);
			},
			submitUpload: function () {

			    this.fileData = new FormData();
					this.fileData.append('id', this.livEvi.id);
					this.fileData.append('registerId', this.regRow.registerId);
					this.$refs.upload.submit();
					this.fileData.delete('createDatetime');
					this.fileData.delete('updateDatetime');
					let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
					this.$axios.post(this.action,this.fileData,config).then(response => {
				  		if(response.data.code == '0'){
								this.dialogUpload = false;
								this.notify_success('操作成功');
								this.loadData();
							}else{
								this.notify_error(response.data.msg);
							}
				    },response => {
							this.notify_error('网络错误');
					})
			},
			//单独删除
			handleRemove(file, fileList) {
        this.postHttp("evidencesImg/deleteEvidenceImg",file,res=>{
				})
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
			open_photo(){
        //打开摄像头
        this.$refs.webcam.open();
      },
			take_photo(){
				let file = this.dataURLtoBlob();

				if(null != file){
					let files = {
		        status: 'ready',
		        name: file.name,
		        size: file.size,
		        percentage: 0,
		        uid: file.uid,
		        raw: file,
						url:URL.createObjectURL(file)
		      };
		      this.$refs.upload.uploadFiles.push(files);
					this.$refs.upload.onChange(files, this.$refs.upload.uploadFiles);

					this.fileData.append('file',file);

				}
			},
			dataURLtoBlob() {
				let url = this.$refs.webcam.getPhoto();

				if(url == null || url == undefined){
					return null;
				}
        let arr = this.$refs.webcam.getPhoto().split(','),
         		mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
				let bolb = new Blob([u8arr], { type: mime });
				bolb.lastModifiedDate = new Date();
				let file = new File([bolb], new Date().getTime()+'.jpg', {type: mime, lastModified: Date.now()});
				file.uid = new Date().getTime();

        return file;
      },
    }
  }
</script>

<style>
  #acceptCheck .mainItem {
    padding: 20px 0;
  }

  .normalColen .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 225px;
  }

  #acceptCheck {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #acceptCheck .el-row .normalCol {
    height: 3em;
    line-height: 3em;
    font-size: 14px;
  }

  #acceptCheck .yourAddress .ban {

  }

  #acceptCheck .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  #acceptCheck .el-col-4 {
    width: 14%;
  }


  #acceptCheck .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  #acceptCheck .tabb .el-table__header tr,
  #acceptCheck .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: #c5cbce;
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  #acceptCheck .tabb .el-table__body tr,
  #acceptCheck .tabb .el-table__body td {
    padding: 0;
    height: 40px;
  }

  #boddy .input1,
  #boddy .input2 {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 50%;
  }

  .xianshi {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 95px;
    background-color: white;
  }

  .textareas {
    padding-right: 30px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    height: 210px;
    background-color: white;
  }

  #acceptCheck .photo{
		width:400px;
		height:300px;
		margin:10px auto;
		box-sizing: border-box;
		border:1px #a7a7a7 dashed;
		position: relative;
	}
	#acceptCheck .photo .text{
		width:400px;
		height:150px;
		position: absolute;
		text-align: center;
		line-height: 150px;
		font-size: 20px;
		top:75px;
	}
	#acceptCheck .photo .take{
		width:40px;
		height:40px;
		position: absolute;
		text-align: center;
		line-height: 40px;
		font-size: 20px;
		bottom: 10px;
		right: 10px;
		z-index: 9999;
	}
	#acceptCheck .photo video{
		position: absolute;
		left: 0px;
		right: 0px;
	}
  #acceptCheck .btns{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }

</style>
