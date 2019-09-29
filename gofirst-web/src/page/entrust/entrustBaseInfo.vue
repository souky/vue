<template>
  <div id="entrustInfo" style="height: 100%;">
    <el-row class="yourAddress normalRow">
      <el-col :span="24" class="normalCol">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>您的位置</el-breadcrumb-item>
          <el-breadcrumb-item>网上送检</el-breadcrumb-item>
          <el-breadcrumb-item>网上登记</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="step normalRow">
      <el-col :span="22" class="normalCol">
        <el-button type="primary" size="mini">操作步骤提示</el-button>
        <div class="doStep">
          1.选择鉴定机构
        </div>
        <i class="icon">
          <img src="@/assets/img/arrow-right.png">
        </i>
        <div class="doStep">
          2.选择鉴定专业
        </div>
        <i class="icon">
          <img src="@/assets/img/arrow-right.png">
        </i>
        <div class="doStep doStepActive">
          3.编辑基本信息
        </div>
        <i class="icon">
          <img src="@/assets/img/arrow-right.png">
        </i>
        <div>
          4.编辑被鉴定人信息
        </div>
        <i class="icon">
          <img src="@/assets/img/arrow-right.png">
        </i>
        <div>
          5.编辑检材样本信息
        </div>
        <i class="icon">
          <img src="@/assets/img/arrow-right.png">
        </i>
        <div>
          6.选择鉴定要求
        </div>
        <i class="icon">
          <img src="@/assets/img/arrow-right.png">
        </i>
        <div>
          7.填写提交鉴定
        </div>
      </el-col>
      <!-- <el-col :span="2" class="normalCol">
        <el-button type="info" round size="mini">温馨提示</el-button>
      </el-col> -->
    </el-row>
    <el-row class="normalRow" style="margin-bottom:10px;">
      <el-col :span="22" class="normalCol">
        <i class="icon">
          <img src="@/assets/img/tip.png">
        </i>
        <span>[{{formData.orgName}}]送检登记</span>
        <i class="el-icon-minus"></i>
        <span>[{{formData.aucOrgCname}}]</span>
      </el-col>
      <!-- <el-col :span="2" class="normalCol">
        <el-button type="primary" round size="mini" @click="goBack()">
          &nbsp;&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;&nbsp;
        </el-button>
      </el-col> -->
    </el-row>
    <el-form ref="formInfo" :rules="formRule" :model="formData" label-width="130px" size="small">
      <el-row class="rowInfo">
        <el-col class="baseInfoTop">基本信息</el-col>
      </el-row>
      <el-row class="rowInfo">
        <el-col class="baseInfo">委托单位</el-col>
        <el-col :span="8">
          <el-form-item label="名称:" prop="orgName">
            <el-col :span="20">
              <el-input v-model="formData.orgName" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通讯地址:">
            <el-col :span="20">
              <el-input v-model="formData.orgAddr" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮编:">
            <el-col :span="20">
              <el-input v-model="formData.orgZip" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话:" prop="orgTel">
            <el-col :span="20">
              <el-input v-model="formData.orgTel" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="传真:">
            <el-col :span="20">
              <el-input v-model="formData.orgFax" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 委托单位 end -->

      <!-- 送检人 start -->

      <el-row class="rowInfo">
        <el-col class="baseInfo">送检人信息</el-col>
        <el-col>
          <el-row>
            <el-col :span="3">
              <el-form-item label-width="100px">
                <el-button type="primary">送检人1</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名:" prop="sendPeople1_name">
                <el-col :span="20">
                  <el-select v-model="formData.sendPeople1" placeholder="请选择" @change="sendPeopleChange($event,'1')"  :disabled="true">
                    <el-option
                      v-for="(item,index) in userInfoListDefault"
                      :key="item.empId"
                      :label="item.empName"
                      :value="item.empId">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="职务:" prop="sendPeople1_duty">
                <el-col :span="20">
                  <el-select v-model="formData.sendPeople1_duty" placeholder="请选择" :disabled="true">
                    <el-option
                      v-for="(item,index) in dutyTypeList"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件类型:">
                <el-col :span="20">
                  <el-select v-model="formData.sendPeople1_credName" placeholder="请选择" :disabled="true">
                    <el-option
                      v-for="(item,index) in cardTypeList"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="3">
              <el-form-item label="证件号码:" prop="sendPeople1_credNo">
                <el-col :span="20">
                  <el-input v-model="formData.sendPeople1_credNo" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话:">
                <el-col :span="20">
                  <el-input v-model="formData.sendPeople1_empTel" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

        <el-col>
          <el-row>
            <el-col :span="3">
              <el-form-item label-width="100px">
                <el-button type="primary">送检人2</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名:" prop="sendPeople2_name">
                <el-col :span="20">
                  <el-select v-model="formData.sendPeople2" filterable placeholder="请选择" @change="sendPeopleChange($event,'2')">
                    <el-option
                      v-for="(item,index) in userInfoListDefault"
                      :key="item.empId"
                      :label="item.empName"
                      :value="item.empId">
                      <span style="float: left">{{ item.empNo }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.empName }}</span>
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="职务:" prop="sendPeople2_duty">
                <el-col :span="20">
                  <el-select v-model="formData.sendPeople2_duty" placeholder="请选择" :disabled="true">
                    <el-option
                      v-for="(item,index) in dutyTypeList"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件类型:">
                <el-col :span="20">
                  <el-select v-model="formData.sendPeople2_credName" placeholder="请选择" :disabled="true">
                    <el-option
                      v-for="(item,index) in cardTypeList"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"   :offset="3">
              <el-form-item label="证件号码:" prop="sendPeople2_credNo">
                <el-col :span="20">
                  <el-input v-model="formData.sendPeople2_credNo" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话:">
                <el-col :span="20">
                  <el-input v-model="formData.sendPeople2_empTel" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <!--送检人证件照片-->
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="送检人1证件照:" prop="validateSendPeopleImgName1">
              <el-button size="mini" type="primary" @click="addAttacgment('1')">上传</el-button>
              <el-button size="mini" type="primary" @click="takePhotoByPeople('1')">拍照</el-button>
              <el-button size="mini" type="primary" v-if="this.imageUrl" @click="deletePhoto('1')">删除</el-button>
              {{formData.sendPeopleImgName1}}
              <img v-if="imageUrl" :src="imageUrl" class="avatar" height="100em" width="100em">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="送检人2证件照:" prop="validateSendPeopleImgName2">
                <el-button size="mini" type="primary" @click="addAttacgment('2')">上传</el-button>
                <el-button size="mini" type="primary" @click="takePhotoByPeople('2')">拍照</el-button>
                <el-button size="mini" type="primary" v-if="this.imageUrl2" @click="deletePhoto('2')">删除</el-button>
                {{formData.sendPeopleImgName2}}
                <img v-if="imageUrl2" :src="imageUrl2" class="avatar" height="100em" width="100em">
            </el-form-item>
          </el-col>


        </el-col>
      </el-row>

      <!-- 送检人 end -->

      <!-- 案件信息 start -->

      <el-row class="rowInfo">
        <el-col class="baseInfo">案件信息</el-col>
        <el-col :span="8">
          <el-form-item label="案件类型:" prop="caseType">
            <el-col :span="20">
              <el-select v-model="formData.caseType" placeholder="请选择">
                <el-option
                  v-for="(item,index) in caseTypeList"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="formData.caseType == '1'">
          <el-form-item label="案（事）件类别:" prop="caseTypeKey">
                <el-col :span="20">
                  <el-input v-model="formData.caseTypeKey" placeholder="请输入内容" :disabled="true"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button icon="el-icon-search" circle type="primary" @click="openCaseDialog" size="small" ></el-button>
                </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案（事）件编号:" prop="caseNo">
            <el-col :span="20">
              <el-input v-model="formData.caseNo" maxlength="30"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button icon="el-icon-search" circle type="primary" @click="searchCase" size="small" ></el-button>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案（事）件名称:" prop="caseName">
            <el-col :span="20">
              <el-input v-model="formData.caseName" maxlength="30"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现场勘验号:">
            <el-col :span="20">
              <el-input v-model="formData.investigationNo" maxlength="30"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="警情编号:">
            <el-col :span="20">
              <el-input v-model="formData.receptionNo" maxlength="30"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案（事）件级别:">
            <el-col :span="20">
              <el-select v-model="formData.caseLevel" placeholder="请选择">
                <el-option
                  v-for="(item,index) in caseLevelList"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案发地点:" prop="sceneDetail">
            <el-col :span="20">
              <el-input v-model="formData.sceneDetail" maxlength="100"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案发时间:" prop="occurrenceDate">
            <el-col :span="20">
              <el-date-picker v-model="formData.occurrenceDate" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="立案调查时间:" prop="registerCaseDate">
            <el-col :span="20">
              <el-date-picker v-model="formData.registerCaseDate" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="案发地详址:" prop="investigationPlace">
            <el-col :span="20">
              <el-input v-model="formData.investigationPlace" maxlength="100"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="简要案情:" prop="caseBrief">
            <el-col :span="20">
              <el-input type="textarea" :rows="3" v-model="formData.caseBrief" maxlength="500"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 案件信息 end -->
    </el-form>
    <el-form ref="oldAppraisalForm" :rules="oldAppraisalFormRule" :model="formData" label-width="130px" size="small">
      <!--原鉴定情况 start-->
      <el-row class="rowInfo">
        <el-col class="baseInfo">
          原鉴定情况
          &nbsp; &nbsp; &nbsp;<el-switch v-model="formData.oldAppraisal" active-text="有" inactive-text="无"></el-switch>
        </el-col>
        <div v-if="formData.oldAppraisal">
          <el-col :span="8">
            <el-form-item label="原鉴定机构:" prop="oldAppraisalOrg">
              <el-col :span="20">
                <el-input v-model="formData.oldAppraisalOrg"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原鉴定时间:" prop="oldAppraisalDate">
              <el-col :span="20">
                <el-date-picker v-model="formData.oldAppraisalDate" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="原鉴定结论:" prop="oldAppraisalCon">
              <el-col :span="20">
                <el-input type="textarea" :rows="2" v-model="formData.oldAppraisalCon"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
      <!--原鉴定情况 end-->


      <el-row class="footerRow">
        <el-col :span="8" :offset="8">
          <el-form-item>
            <el-button type="primary" @click="goBack()" v-no-more-click v-if="this.formData.entrustInfoEditFlag == '0'">上一步</el-button>
            <!-- <el-button @click="resetForm()" v-if="this.formData.entrustInfoEditFlag == '0'">清空</el-button> -->
            <el-button type="primary" @click="submitForm('0')" v-no-more-click v-if="this.formData.entrustInfoEditFlag == '0'">下一步</el-button>


            <el-button type="primary" @click="goBack()" v-no-more-click v-if="this.formData.entrustInfoEditFlag == '2' ">上一步</el-button>
            <!-- <el-button @click="resetForm()" v-if="this.formData.entrustInfoEditFlag == '2'  ">清空</el-button> -->
            <el-button type="primary" @click="submitForm('2')" v-no-more-click v-if="this.formData.entrustInfoEditFlag == '2' ">下一步</el-button>



            <el-button type="primary" @click="goBack()" v-no-more-click v-if="this.formData.entrustInfoEditFlag == '1' ">返回</el-button>
            <el-button type="primary" @click="submitForm('1')" v-no-more-click v-if="this.formData.entrustInfoEditFlag == '1' ">更新</el-button>
          </el-form-item>

        </el-col>
      </el-row>

    </el-form>

    <el-dialog
      title="送检人1"
      :visible.sync="dialogVisibleSendPeople"
      width="30%">
      <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" width="100%">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSendPeople = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleSendPeople = false">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="送检人2"
      :visible.sync="dialogVisibleSendPeople2"
      width="30%">
      <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess2">
      <img v-if="imageUrl2" :src="imageUrl2" class="avatar" width="100%">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSendPeople2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleSendPeople2 = false">确 定</el-button>
      </span>
    </el-dialog>



    <el-dialog
    :title="dialogVisibleTakePhotoTitle"
    :visible.sync="dialogVisibleTakePhotoPeople1"
    width="60%"
    :before-close="takePhotoHandleClose">

      <el-row>
        <el-col :span='12'>
          <vue-webcam ref='webcam'></vue-webcam>
        </el-col>
        <el-col :span='12'>
          <el-row>
            <el-col :span="24"> <h1>采集的照片：</h1></el-col>
          </el-row>

          <img :src="photo" alt="" style="width:380px;height:280px" />
        </el-col>
      </el-row>


    <el-row>
      <el-col :span='24'>
        <el-button type="primary" @click="open_photo">打开摄像头</el-button>
        <el-button type="primary" @click="pause_photo">暂停</el-button>
        <el-button type="primary" @click="take_photo">拍照</el-button>

      </el-col>
    </el-row>


    <span slot="footer" class="dialog-footer">
      <el-button @click="takePhotoHandleClose">取 消</el-button>
      <el-button type="primary" @click="uploadPhotoImg()">确 定</el-button>
    </span>
  </el-dialog>



  <el-dialog
    title="送检人2拍照"
    :visible.sync="dialogVisibleTakePhotoPeople2"
    width="30%">
    <vue-webcam ref='webcam2'></vue-webcam>
    <hr/>
    <img :src="photo" alt="" style="width:400px;height:300px" />
    <hr/>
    <button type="button" @click="take_photo">Take Photo</button>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleTakePhotoPeople2 = false">取 消</el-button>
      <el-button type="primary" @click="uploadPhotoImg('2')">确 定</el-button>
    </span>
  </el-dialog>


  <el-dialog title="案事件类别" :visible.sync="dialogVisibleCaseType" width="30%">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" clearable></el-input>
    <el-tree :data="caseData" node-key="id" class="filter-tree" :filter-node-method="filterNode" ref="tree" accordion @node-click="handleNodeClick"></el-tree>
  </el-dialog>

  </div>
</template>
<script>
import { log } from 'util';
import CASTTYPE from '@/js/caseType';
//import VueWebcam from 'vue-webcam';

  export default {
    data() {
      var validOldAppraisalDate = (rule, value, callback) => {
        // if(this.formData.oldAppraisalDate > this.formData.registerCaseDate){
        //   callback(new Error('原鉴定时间要比立案调查时间晚'));
        // }
        if(this.formData.oldAppraisalDate <= this.formData.occurrenceDate){
          callback(new Error('原鉴定时间判定不能早于案发时间'));
        }
        callback();
      };
      var validateSamePeople = (rule, value, callback) => {
        if(this.formData.sendPeople2_name == undefined || this.formData.sendPeople2_name == ''){
          callback(new Error('第二送检人 姓名不能为空'));
        }
        if (this.formData.sendPeople1_name == this.formData.sendPeople2_name){
          callback(new Error('请选择不同的送检人'));
        }
        callback();
      };
      var validateCaseTypeKey = (rule, value, callback) => {
        if (this.formData.caseType == '1') {
          //刑事案件
          if (!value) {
            callback(new Error('请选择案（事）件类别'));
          } else {
            callback();
          }
        }
      };
      var validateSendPeopleImg1 = (rule, value, callback) => {
        if(this.formData.sendPeopleImg1 == undefined || this.formData.sendPeopleImg1 == ''){
          callback(new Error('请上传送检人1的证件照'));
        }else{
          callback();
        }
      }
      var validateSendPeopleImg2 = (rule, value, callback) => {
        if(this.formData.sendPeopleImg2 == undefined ||this.formData.sendPeopleImg2 == ''){
          callback(new Error('请上传送检人2的证件照'));
        }else{
          callback();
        }
      }
      var validateRegisterCaseDate = (rule, value, callback) => {
        if (!this.formData.registerCaseDate) {
          callback(new Error('案件信息 立案调查时间不能为空'));
        }
        if (this.formData.occurrenceDate) {
          var registerCaseDateT = this.formData.registerCaseDate;
          var occurrenceDateT = this.formData.occurrenceDate;
          if (registerCaseDateT < occurrenceDateT) {
            callback(new Error('立案调查时间要比案发时间晚'));
          }
        }
        callback();

      };
      return {

      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
      },


        formData: {
          //委托相关信息
          orgName: '',
          orgAddr: '',
          orgZip: '',
          orgTel: '',
          orgFax: '',

          sendPeople1: '',
          sendPeolle2: '',
          sendPeople1_name: '',
          sendPeople1_credName: '',
          sendPeople1_credNo: '',
          sendPeople1_empTel: '',
          sendPeople1_duty: '',
          sendPeople2_name: '',
          sendPeople2_credName: '',
          sendPeople2_credNo: '',
          sendPeople2_empTel: '',
          sendPeople2_duty: '',
          // //案件相关信息
          caseType: '',
          caseTypeKey: '',
          caseName: '',
          investigationNo: '',
          receptionNo: '',
          caseNo: '',
          caseLevel: '',
          sceneDetail: '',
          occurrenceDate: '',
          registerCaseDate: '',
          investigationPlace: '',
          caseBrief: '',
          //原鉴定相关信息
          oldAppraisal: false,
          oldAppraisalCon: '无',
          oldAppraisalOrg: '无',
          oldAppraisalDate: '',
          oldAppraisalCaseType: '5',

          orgId: '',//鉴定机构
          aucOrgId: '',//鉴定专业
          sendOrgId: '',//送检机构
          registerId: '',
          empsArr: '',
          entrustInfoEditFlag: '',
          limCaseId: '',
          aucOrgCname: '',

          sendPeopleImg1: "",
          sendPeopleImg2: "",
          sendPeopleImgName1 :"",
          sendPeopleImgName2 :"",
        },
        formRule: {
          'orgName': [{required: true, message: '委托单位 名称不能为空', trigger: 'blur'}],
          //'orgTel': [{required: true, message: '委托单位 联系电话不能为空', trigger: 'blur'}],
          'sendPeople1_name': [{required: true, message: '第一送检人 姓名不能为空', trigger: 'blur'}],
          'sendPeople1_credNo': [{required: true, message: '第一送检人 证件号码不能为空', trigger: 'blur'}],
          'sendPeople2_name': [{validator: validateSamePeople, trigger: 'change',required: true}],
          'sendPeople2_credNo': [{required: true, message: '第二送检人 证件号码不能为空', trigger: 'blur'}],

          'caseType': [{required: true, message: '案件信息 案(事)件类型不能为空', trigger: 'blur'}],
          'caseTypeKey': [{validator: validateCaseTypeKey, trigger: 'blur'}],
          'caseName': [{required: true, message: '案件信息 案(事)件名称不能为空', trigger: 'blur'}],
          'investigationNo': [{required: true, message: '案件信息 现场勘验号不能为空', trigger: 'blur'}],
          'caseNo': [{required: true, message: '案件信息 案(事)件编号不能为空', trigger: 'blur'}],
          'sceneDetail': [{required: true, message: '案件信息 案发地点不能为空', trigger: 'blur'}],
          'occurrenceDate': [{required: true, message: '案件信息 案发时间不能为空', trigger: 'blur'}],
          'registerCaseDate': [{validator: validateRegisterCaseDate, trigger: 'change'}],
          'investigationPlace': [{required: true, message: '案件信息 案发地详址不能为空', trigger: 'blur'}],
          'caseBrief': [{required: true, message: '案件信息 简要案情不能为空', trigger: 'blur'}],
          //'validateSendPeopleImgName1':[{validator: validateSendPeopleImg1, trigger: 'blur'}],
          //'validateSendPeopleImgName2':[{validator: validateSendPeopleImg2, trigger: 'blur'}],
        },
        oldAppraisalFormRule: {
          'oldAppraisalOrg': [{required: true, message: '原鉴定机构不能为空', trigger: 'blur'}],
          'oldAppraisalCon': [{required: true, message: '原鉴定结论不能为空', trigger: 'blur'}],
          'oldAppraisalDate': [{validator: validOldAppraisalDate, trigger: 'change'}],
        },
        userInfoListDefault: [],
        cardTypeList: [],
        caseTypeList: [],
        caseTypeKeyList: [],
        caseLevelList: [],
        oldAppraisalCaseTypeList: [],
        dutyTypeList: [],
        registerInfo: {},
        //第一鉴定人
        dialogVisibleSendPeople: false,
        dialogVisibleSendPeople2: false,
        imageUrl:"",
        imageUrl2:"",
        //送检人图片上传地址
        action : '',
        //是否有被鉴定人 确定下一步流程 0 没有 到检材样本页面 1 有 被鉴定人页面
        hasAuthenticPeople: '',
        photo:'',
        dialogVisibleTakePhotoPeople1:false,
        dialogVisibleTakePhotoPeople2:false,
        openCameraFlag:true,//是否打开摄像头
        dialogVisibleTakePhotoTitle:'',
        dialogVisibleCaseType: false,
        filterText:'',
        caseData: [],
      }
    },
    methods: {
      clearImg(){
          this.formData.sendPeopleImg1 = '';
          this.formData.sendPeopleImgName1 = '';
          this.imageUrl = '';
          this.formData.sendPeopleImg2 = '';
          this.formData.sendPeopleImgName2 = '';
          this.imageUrl2 = '';
      },
      submitForm(editType) {
        this.$refs['formInfo'].validate((valid) => {
          if (valid) {
            if (this.formData.oldAppraisal == true) {
              this.formData.oldAppraisal='1';
              this.$refs['oldAppraisalForm'].validate((valid) => {
                if (valid) {
                  if (editType == '0') {
                    this.postHttp("registers/insert", this.formData, res => {
                      if (res.code == '0') {
                        this.setData("registerId", res.data.registerId);
                        if(this.hasAuthenticPeople == '0'){
                          this.$router.push("entrustInspection");
                        }else{
                          this.$router.push("authenticator");
                          this.setData("entrustInfoEditFlag","2");
                        }

                        this.clearImg();
                      } else {
                        this.notify_warning("操作失败");
                      }
                    });
                  } else {
                    //更新
                    this.postHttp("registers/update", this.formData, res => {
                      if (res.code == '0') {
                        if(editType == '1'){
                          this.setData("registerId", this.formData.registerId);
                          this.$router.push("entrustInfo");
                        }else if(editType == '2'){
                          this.$router.push("authenticator");
                          this.setData("entrustInfoEditFlag","2");
                        }
                        this.clearImg();
                      } else {
                        this.notify_warning("操作失败");
                      }
                    });
                  }
                } else {

                }
              })
            } else {
              this.formData.oldAppraisal='0';
              this.formData.oldAppraisalCon = '';
              this.formData.oldAppraisalOrg = '';
              this.formData.oldAppraisalDate = '';
              this.formData.oldAppraisalCaseType = '';
              if (editType == '0') {
                this.postHttp("registers/insert", this.formData, res => {
                  if (res.code == '0') {
                    this.setData("registerId", res.data.registerId);
                    this.notify_success("保存成功");
                    if(this.hasAuthenticPeople == '0'){
                          this.$router.push("entrustInspection");
                        }else{
                          this.$router.push("authenticator");
                           this.setData("entrustInfoEditFlag","2");
                        }
                        this.clearImg();
                  } else {
                    this.notify_warning("保存失败");
                  }
                });
              } else {
                //更新
                this.postHttp("registers/update", this.formData, res => {
                  if (res.code == '0') {
                    if(editType == '1'){
                        this.setData("registerId", this.formData.registerId);
                        this.notify_success("更新成功");
                        this.$router.push("entrustInfo");
                      }else if(editType == '2'){
                        this.$router.push("authenticator");
                        this.setData("entrustInfoEditFlag","2");
                      }
                      this.clearImg();
                  } else {
                    this.notify_warning("更新失败");
                  }
                });
              }
            }
          } else {
            return false;
          }
        });
      },
      getOrgInfo() {
        var data = {};
        var url = "orgsController/selectByUserId";
        if (this.formData.entrustInfoEditFlag != '0') {
          data['orgId'] = this.formData.sendOrgId;
          url = "orgsController/selectById";
        }
        console.log(data);
        this.postHttpForLogin(url, data, res => {
          if (res.code == '0') {
            //orgName orgAddr orgZip orgTel orgFax
            this.formData.orgName = res.data.orgCname;
            this.formData.orgAddr = res.data.orgAddr;
            this.formData.orgZip = res.data.orgZip;
            this.formData.orgTel = res.data.orgTel;
            this.formData.orgFax = res.data.orgFax;
            this.formData.sendOrgId = res.data.orgId;

            this.getUserList();
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      getUserList() {
        var data = {
          orgId:this.formData.sendOrgId
        };
        this.postHttpForLogin("empsController/selectEmpsByCompartment", data, res => {
          //console.log(res);
          if (res.code == '0') {
            this.userInfoListDefault = res.data;
          }
        });
      },
      sendPeopleChange(index, type) {
        var obj = {};
        for (let o in this.userInfoListDefault) {
          if (this.userInfoListDefault[o].empId == index) {
            obj = this.userInfoListDefault[o];
            break;
          }
        }
        if (type == '1') {
          this.formData.sendPeople1_name = obj.empName;
          this.formData.sendPeople1_credName = obj.empCredname;
          //this.formData.sendPeople1_credNo = obj.empCredno;
          this.formData.sendPeople1_credNo = obj.empNo;
          this.formData.sendPeople1_empTel = obj.empTel;
          this.formData.sendPeople1 = obj.empId;
          this.formData.sendPeople1_duty = obj.duty;
        } else if (type == '2') {
          this.formData.sendPeople2_name = obj.empName;
          this.formData.sendPeople2_credName = obj.empCredname;
          //this.formData.sendPeople2_credNo = obj.empCredno;
          this.formData.sendPeople2_credNo = obj.empNo;
          this.formData.sendPeople2_empTel = obj.empTel;
          this.formData.sendPeople2 = obj.empId;
          this.formData.sendPeople2_duty = obj.duty;
        }
        this.$forceUpdate();
      },
      getDictInfo() {
        /**
         * CARDTYPE 证件类型
         * CASETYPE 案（事）件类型
         * CASETYPEKEY  案（事）件类别
         * CASELEVEL 案（事）件级别
         * OLDAPPRAISALCASETYPE 原鉴定情况案件种类
         */
        var data = {
          "parentKeyList": ["CARDTYPE", "CASETYPE", "CASETYPEKEY", "CASELEVEL", "OLDAPPRAISALCASETYPE","DUTYTYPE"]
        };
        this.postHttpForLogin("dict/getDictInfo", data, res => {
          console.log("dict");
          console.log(res);
          if (res.code == '0') {
            this.cardTypeList = res.data.CARDTYPE;
            this.caseTypeList = res.data.CASETYPE;
            this.caseTypeKeyList = res.data.CASETYPEKEY;
            this.caseLevelList = res.data.CASELEVEL;
            this.oldAppraisalCaseTypeList = res.data.OLDAPPRAISALCASETYPE;
            this.dutyTypeList = res.data.DUTYTYPE
          } else {
            this.notify_warning(res.msg);
          }
        });
      },
      getEmpInfo() {
        if (this.formData.entrustInfoEditFlag == '0') {
          var data = {};
          this.postHttpForLogin("empsController/selectByUserId", data, res => {
            if (res.code == '0') {
              this.formData.sendPeople1_name = res.data.empName;
              this.formData.sendPeople1_credName = res.data.empCredname;
              //this.formData.sendPeople1_credNo = res.data.empCredno;
              this.formData.sendPeople1_credNo = res.data.empNo;
              this.formData.sendPeople1_empTel = res.data.empTel;
              this.formData.sendPeople1 = res.data.empId;
              this.formData.sendPeople1_duty = res.data.duty;
            } else {
              this.notify_warning(res.msg);
            }
          });
        } else {
          var data = {
            'empsArr': this.formData.empsArr
          }
          this.postHttpForLogin("empsController/getSendPeople", data, res => {
            if (res.code == '0') {
              this.formData.sendPeople1_name = res.data[0].empName;
              this.formData.sendPeople1_credName = res.data[0].empCredname;
              //this.formData.sendPeople1_credNo = res.data[0].empCredno;
              this.formData.sendPeople1_credNo = res.data[0].empNo;
              this.formData.sendPeople1_empTel = res.data[0].empTel;
              this.formData.sendPeople1 = res.data[0].empId;
              this.formData.sendPeople1_duty = res.data[0].duty;

              this.formData.sendPeople2_name = res.data[1].empName;
              this.formData.sendPeople2_credName = res.data[1].empCredname;
              //this.formData.sendPeople2_credNo = res.data[1].empCredno;
              this.formData.sendPeople2_credNo = res.data[1].empNo;
              this.formData.sendPeople2_empTel = res.data[1].empTel;
              this.formData.sendPeople2 = res.data[1].empId;
              this.formData.sendPeople2_duty = res.data[1].duty;
            } else {
              this.notify_warning(res.msg);
            }
          });
        }
      },
      getCaseInfo() {
        //查询案件信息
        if (this.formData.entrustInfoEditFlag != '0') {
          var caseInfo = {
            'limCaseId': this.formData.limCaseId
          }

          this.postHttp("cases/selectByCaseIdWithDict", caseInfo, res => {
            if (res.code == '0') {
              this.formData.caseType = res.data.caseType;
              if(res.data.caseTypeKey){
                this.formData.caseTypeKey = res.data.caseTypeKey;
              }
              this.formData.caseName = res.data.caseName;
              this.formData.investigationNo = res.data.investigationNo;
              this.formData.receptionNo = res.data.receptionNo;
              this.formData.caseNo = res.data.caseNo;
              this.formData.caseLevel = res.data.caseLevel;
              this.formData.sceneDetail = res.data.sceneDetail;
              this.formData.occurrenceDate = res.data.occurrenceDate;
              this.formData.registerCaseDate = res.data.registerCaseDate;
              this.formData.investigationPlace = res.data.investigationPlace;
              this.formData.caseBrief = res.data.caseBrief;
            } else {
              this.notify_warning(res.msg);
            }
          });
        }

      },
      getRegisterInfo() {
        if (this.formData.entrustInfoEditFlag != '0') {

          var data = {
            'registerId': this.formData.registerId,
          }
          this.postHttp("registers/selectInfoById", data, res => {
            if (res.code == '0') {
              if (res.data.oldAppraisal == '0') {
                this.$set(this.formData, 'oldAppraisal', false);
                this.formData.oldAppraisalCon = '';
                this.formData.oldAppraisalOrg = '';
                this.formData.oldAppraisalDate = '';
                this.formData.oldAppraisalCaseType = '';
              } else {
                this.$set(this.formData, 'oldAppraisal', true);
                this.formData.oldAppraisalCon = res.data.oldAppraisalCon;
                this.formData.oldAppraisalOrg = res.data.oldAppraisalOrg;
                this.formData.oldAppraisalDate = res.data.oldAppraisalDate;
                this.formData.oldAppraisalCaseType = res.data.oldAppraisalCaseType;
              }
            }
          })

        }
      },
      resetForm() {
        this.$refs['formInfo'].resetFields();
        this.$refs['oldAppraisalForm'].resetFields();
        this.formData = {};
        this.getParam();
        //获取字典数据
        this.getDictInfo();
        //获取用户列表
        //this.getUserList();
        //获取用户的单位信息
        this.getOrgInfo();
        //获取登录用户的empId
        this.getEmpInfo();
        //获取案件信息
        this.getCaseInfo();
        //获取送检信息
        this.getRegisterInfo();
      },
      goBack() {
        this.$refs['oldAppraisalForm'].resetFields();
        this.$refs['formInfo'].resetFields();
        let url = this.getData("entrustInfoEditFlag") == '1'?'/entrustInfo':'/entrustOrg';
        this.$router.push(url);
      },
      getParam() {
        //获取类型 0 新增 1 委托详情进入 编辑 2 上一步 编辑
        this.formData.entrustInfoEditFlag = this.getData('entrustInfoEditFlag');
        this.formData.registerId = this.getData('registerId');
        if(this.formData.entrustInfoEditFlag != '0'){
          //编辑
            var data = {
              'registerId': this.formData.registerId,
            }
            this.postHttp("registers/selectInfoById", data, res => {
              if (res.code == '0') {
                  this.formData.orgId = res.data.orgId;
                  this.formData.aucOrgId = res.data.aucOrgId;
                  this.formData.empsArr = res.data.sendPeople1 +","+ res.data.sendPeople2;
                  this.formData.limCaseId = res.data.limCaseId;
                  this.formData.sendOrgId = res.data.sendOrgId;
                  this.formData.aucOrgCname = this.getData("aucOrgCname");

                  this.getOrgInfo();

                  this.getCaseInfo();

                  //获取登录用户的empId
                  this.getEmpInfo();

                  //this.getUserList();
              }
            })

        }else{
          this.formData.orgId = this.getData('orgId');
          this.formData.aucOrgId = this.getData('aucOrgId');
          this.formData.empsArr = this.getData('empsArr');
          this.formData.limCaseId = this.getData('limCaseId');
          this.formData.sendOrgId = this.getData("sendOrgId");
          this.formData.aucOrgCname = this.getData("aucOrgCname");

          this.getOrgInfo();

          this.getCaseInfo();

          //获取登录用户的empId
          this.getEmpInfo();

          //this.getUserList();
        }
      },
      addAttacgment: function(type){
        //添加上传地址
        this.action = '/auc/upload/uploadSingle';
        if(type == '1'){
          //第一送检人
          this.imageUrl=this.formData.sendPeopleImg1;
          //打开弹窗
        this.dialogVisibleSendPeople=true;
        }else if(type == '2'){
          //第二送检人
          this.imageUrl2=this.formData.sendPeopleImg2;
          //打开弹窗
        this.dialogVisibleSendPeople2=true;
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.data.newImagepath;
        this.formData.sendPeopleImgName1=res.data.fileName;
        this.formData.sendPeopleImg1=res.data.newImagepath;
      },
      handleAvatarSuccess2(res, file) {
        this.imageUrl2 = res.data.newImagepath;
        this.formData.sendPeopleImgName2=res.data.fileName;
        this.formData.sendPeopleImg2=res.data.newImagepath;
      },
      getSendPeopleImgInfo(){
        if (this.formData.entrustInfoEditFlag != '0') {
            this.postHttp("evidencesImg/selectByObject",{'registerId':this.getData('registerId')},res =>{
            if(res.code == '0'){
                //orgName orgAddr orgZip orgTel orgFax
                res.data.forEach(item =>{
                    if(item.type == '3'){
                        this.imageUrl=item.address;
                        this.formData.sendPeopleImg1=item.address;
                    }

                    if(item.type == '4'){
                        this.imageUrl2=item.address;
                        this.formData.sendPeopleImg2=item.address;
                    }
                })
            }else{
                this.notify_warning(res.msg);
            }
        });
        }
      },
      getAucOrgInfo(){
         this.postHttp("aucOrg/selectByPrimaryKey",{'aucOrgId':this.getData('aucOrgId')},res =>{
            if(res.code == '0'){
                //orgName orgAddr orgZip orgTel orgFax
                this.hasAuthenticPeople=res.data.reserve1;
            }else{
                this.notify_warning(res.msg);
            }
        });
      },
      take_photo () {
            this.photo = this.$refs.webcam.getPhoto();
      },
      takePhotoByPeople(type){
        this.dialogVisibleTakePhotoPeople1=true;
        if(type == '1'){
          this.dialogVisibleTakePhotoTitle="送件人1拍照";
        }else{
           this.dialogVisibleTakePhotoTitle="送件人2拍照";
        }
        this.setData('takePhotoType',type);
      },
      open_photo(){
        //打开摄像头
        this.openCameraFlag=true;
        this.$refs.webcam.open();
      },
      pause_photo(){
        //摄像头暂停
        this.$refs.webcam.pause();
      },
      uploadPhotoImg(){
        if(!this.photo){
          this.notify_warning("请先拍摄照片！");
          return false;
        }
        var type=this.getData('takePhotoType');
        //拍照上传
        this.dialogVisibleTakePhotoPeople1= false;
        this.pause_photo();
        this.postHttp("upload/uploadBASE64",this.photo,res =>{
            if(res.code == '0'){
                if(type == '1'){
                  this.imageUrl = res.data.newImagepath;
                  this.formData.sendPeopleImgName1=res.data.fileName;
                  this.formData.sendPeopleImg1=res.data.newImagepath;
                }else if(type == '2'){
                    this.imageUrl2 = res.data.newImagepath;
                    this.formData.sendPeopleImgName2=res.data.fileName;
                    this.formData.sendPeopleImg2=res.data.newImagepath;
                }
            }else{
                this.notify_warning(res.msg);
            }
            this.photo = '';
        });
      },
      takePhotoHandleClose(){
        //关闭拍照弹窗
        this.dialogVisibleTakePhotoPeople1 = false;
        this.$refs.webcam.pause();
        this.photo = '';

      },
      deletePhoto(type){
        if(type == '1'){
          this.formData.sendPeopleImg1 = '';
          this.formData.sendPeopleImgName1 = '';
          this.imageUrl = '';
        }else if(type == '2'){
          this.formData.sendPeopleImg2 = '';
          this.formData.sendPeopleImgName2 = '';
          this.imageUrl2 = '';
        }
      },
      openCaseDialog(){
        this.dialogVisibleCaseType=true;
        this.caseData=CASTTYPE.content;
      },

      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(data){
        this.formData.caseTypeKey=data.label;
        this.dialogVisibleCaseType=false;
      },
      searchCase(){
        if(!this.formData.caseNo){
          this.notify_warning("请输入案事件编号");
          return;
        }
        var obj={
          caseNo:this.formData.caseNo
        }
        this.postHttp("link/getCaseInfo",obj,res =>{
          var entity = res.data.list[0];
          //FACS	发案处所
          this.formData.caseBrief = entity.JYAQ;
          this.formData.sceneDetail = entity.FACS;
          this.formData.registerCaseDate = entity.LASJ;
          this.investigationPlace = entity.AJMLXZ;
          this.formData.occurrenceDate = entity.FASJSX;
          this.formData.caseName = entity.AJMC;
        })
      }
    },
    activated: function () {
      this.$refs['formInfo'].resetFields();
      this.$refs['oldAppraisalForm'].resetFields();
      this.formData = {
        //委托相关信息
          orgName: '',
          orgAddr: '',
          orgZip: '',
          orgTel: '',
          orgFax: '',

          sendPeople1: '',
          sendPeolle2: '',
          sendPeople1_name: '',
          sendPeople1_credName: '',
          sendPeople1_credNo: '',
          sendPeople1_empTel: '',
          sendPeople1_duty: '',
          sendPeople2_name: '',
          sendPeople2_credName: '',
          sendPeople2_credNo: '',
          sendPeople2_empTel: '',
          sendPeople2_duty: '',
          // //案件相关信息
          caseType: '',
          caseTypeKey: '',
          caseName: '',
          investigationNo: '',
          receptionNo: '',
          caseNo: '',
          caseLevel: '',
          sceneDetail: '',
          occurrenceDate: '',
          registerCaseDate: '',
          investigationPlace: '',
          caseBrief: '',
          //原鉴定相关信息
          oldAppraisal: false,
          oldAppraisalCon: '',
          oldAppraisalOrg: '',
          oldAppraisalDate: '',
          oldAppraisalCaseType: '',

          orgId: '',//鉴定机构
          aucOrgId: '',//鉴定专业
          sendOrgId: '',//送检机构
          registerId: '',
          empsArr: '',
          entrustInfoEditFlag: '',
          limCaseId: '',
          aucOrgCname: '',

          sendPeopleImg1: "",
          sendPeopleImg2: "",
          sendPeopleImgName1 :"",
          sendPeopleImgName2 :"",
      };
      this.getParam();
      //获取字典数据
      this.getDictInfo();
      //获取用户列表
      //this.getUserList();
      //获取用户的单位信息
      //this.getOrgInfo();
      //获取登录用户的empId
      //this.getEmpInfo();
      //获取案件信息
      //this.getCaseInfo();
      //获取送检信息
      this.getRegisterInfo();
      //获取送检人图片信息
      this.getSendPeopleImgInfo();
      //获取鉴定专业信息
      this.getAucOrgInfo();

    },
    mounted:function(){
      this.$refs['formInfo'].resetFields();
      this.$refs['oldAppraisalForm'].resetFields();
      this.formData = {
        //委托相关信息
          orgName: '',
          orgAddr: '',
          orgZip: '',
          orgTel: '',
          orgFax: '',

          sendPeople1: '',
          sendPeolle2: '',
          sendPeople1_name: '',
          sendPeople1_credName: '',
          sendPeople1_credNo: '',
          sendPeople1_empTel: '',
          sendPeople1_duty: '',
          sendPeople2_name: '',
          sendPeople2_credName: '',
          sendPeople2_credNo: '',
          sendPeople2_empTel: '',
          sendPeople2_duty: '',
          // //案件相关信息
          caseType: '',
          caseTypeKey: '',
          caseName: '',
          investigationNo: '',
          receptionNo: '',
          caseNo: '',
          caseLevel: '',
          sceneDetail: '',
          occurrenceDate: '',
          registerCaseDate: '',
          investigationPlace: '',
          caseBrief: '',
          //原鉴定相关信息
          oldAppraisal: false,
          oldAppraisalCon: '无',
          oldAppraisalOrg: '无',
          oldAppraisalDate: '',
          oldAppraisalCaseType: '5',

          orgId: '',//鉴定机构
          aucOrgId: '',//鉴定专业
          sendOrgId: '',//送检机构
          registerId: '',
          empsArr: '',
          entrustInfoEditFlag: '',
          limCaseId: '',
          aucOrgCname: '',

          sendPeopleImg1: "",
          sendPeopleImg2: "",
          sendPeopleImgName1 :"",
          sendPeopleImgName2 :"",
      };
      this.getParam();
      //获取字典数据
      this.getDictInfo();
      //获取用户列表
      //this.getUserList();
      //获取用户的单位信息
      //this.getOrgInfo();
      //获取登录用户的empId
      //this.getEmpInfo();
      //获取案件信息
      //this.getCaseInfo();
      //获取送检信息
      this.getRegisterInfo();
      //获取送检人图片信息
      this.getSendPeopleImgInfo();
      //获取鉴定专业信息
      this.getAucOrgInfo();
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  }
</script>

<style scoped>
  * {
    font-size: 13px;
  }

  #entrustInfo {
    background-color: #f0f3fa;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  #entrustInfo .el-date-editor.el-input, #entrustInfo .el-date-editor.el-input__inner{
    width:100%;
  }
  #entrustInfo .normalRow {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: auto;
  }

  #entrustInfo .el-row {
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
  }

  #entrustInfo .normalRow .normalCol {
    height: 3em;
    line-height: 3em;
    overflow: hidden;
  }

  #entrustInfo .el-breadcrumb {
    height: 3em;
    line-height: 3em;
  }

  #entrustInfo .step div {
    display: inline;
  }

  #entrustInfo .doStep {
    color: #409EFF;
    padding-bottom: 10px;
  }

  #entrustInfo .doStepActive {
    border-bottom: solid #409EFF;
  }

  #entrustInfo .el-icon-tickets {
    color: #409EFF;
  }

  #entrustInfo .baseInfo {
    height: 4em;
    line-height: 4em;
    border-bottom: solid #f0f3fa;
    font-size: 16px;
    margin-bottom: 15px
  }

  #entrustInfo .baseInfoTop {
    height: 3em;
    line-height: 3em;
    font-size: 20px;
    font-weight: bold;
  }

  #entrustInfo .rowInfo {
    border-bottom: solid #f0f3fa
  }

  #entrustInfo .el-input__inner {
    width: 80%;
  }

  #entrustInfo .footerRow {
    padding-top: 10px;
  }


  #entrustInfo .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #entrustInfo .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #entrustInfo .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
     border: 1px dashed  black;
  }
  #entrustInfo .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  #entrustInfo .el-select.el-select--small{
    width: 100%;
  }
  #entrustInfo .el-button--small.is-circle{
    padding: 8px;
  }
</style>
