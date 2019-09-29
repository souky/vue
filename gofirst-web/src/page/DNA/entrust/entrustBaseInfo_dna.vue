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
        <span>[{{formData.consignOrgName}}]送检登记</span>
        <i class="el-icon-minus"></i>
        <span>[{{formData.aucOrgCname}}]</span>
      </el-col>
    </el-row>
    <el-form ref="formInfo" :rules="formRule" :model="formData" label-width="130px" size="small">
      <el-row class="rowInfo">
        <el-col class="baseInfoTop">基本信息</el-col>
      </el-row>
      <el-row class="rowInfo">
        <el-col class="baseInfo">委托单位</el-col>
        <el-col :span="8">
          <el-form-item label="名称:" prop="consignOrgName">
            <el-col :span="20">
              <el-input v-model="formData.consignOrgName" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通讯地址:">
            <el-col :span="20">
              <el-input v-model="formData.consignOrgAddress" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮编:">
            <el-col :span="20">
              <el-input v-model="formData.consignOrgZipCode" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话:" prop="consignOrgPhone">
            <el-col :span="20">
              <el-input v-model="formData.consignOrgPhone" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="传真:">
            <el-col :span="20">
              <el-input v-model="formData.consignOrgFaxNo" :disabled="true"></el-input>
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
              <el-form-item label="姓名:" prop="consignerName">
                <el-col :span="20">
                  <el-select v-model="formData.consignerName" placeholder="请选择" @change="sendPeopleChange($event,'1')"  :disabled="true">
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
              <el-form-item label="职务:" prop="consignerDuty">
                <el-col :span="20">
                  <el-select v-model="formData.consignerDuty" placeholder="请选择" :disabled="true">
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
              <el-form-item label="证件类型:" prop="consignerCertificateType">
                <el-col :span="20">
                  <el-select v-model="formData.consignerCertificateType" placeholder="请选择" :disabled="true">
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
              <el-form-item label="证件号码:" prop="consignerCertificateNo">
                <el-col :span="20">
                  <el-input v-model="formData.consignerCertificateNo" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话:" prop="consignerPhone">
                <el-col :span="20">
                  <el-input v-model="formData.consignerPhone"></el-input>
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
              <el-form-item label="姓名:" prop="consignerName2">
                <el-col :span="20">
                  <el-select v-model="formData.consignerName2" filterable placeholder="请选择" @change="sendPeopleChange($event,'2')">
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
              <el-form-item label="职务:" prop="consignerDuty2">
                <el-col :span="20">
                  <el-select v-model="formData.consignerDuty2" placeholder="请选择" :disabled="true">
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
              <el-form-item label="证件类型:" prop="consignerCertificateType2">
                <el-col :span="20">
                  <el-select v-model="formData.consignerCertificateType2" placeholder="请选择" :disabled="true">
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
              <el-form-item label="证件号码:" prop="consignerCertificateNo2">
                <el-col :span="20">
                  <el-input v-model="formData.consignerCertificateNo2" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话:" prop="consignerPhone2">
                <el-col :span="20">
                  <el-input v-model="formData.consignerPhone2"></el-input>
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
          <el-form-item label="案件名称:" prop="caseName">
            <el-col :span="20">
              <el-input v-model="formData.caseName" maxlength="30"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案发时间:" prop="occurrenceDatetime">
            <el-col :span="20">
              <el-date-picker v-model="formData.occurrenceDatetime" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
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
        <el-col :span="8">
          <el-form-item label="案件性质:" prop="caseProperty">
            <el-col :span="20">
              <el-select v-model="formData.caseProperty" placeholder="请选择">
                <el-option
                  v-for="(item,index) in casePropertyList"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案发地点:" prop="sceneRegionalism">
            <el-col :span="20">
              <el-select v-model="formData.sceneRegionalism" placeholder="请选择">
                <el-option
                  v-for="(item,index) in crimeLocationList"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案发地点补充:" prop="scenePlace">
            <el-col :span="20">
              <el-input v-model="formData.scenePlace" maxlength="30"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="接警编号:" prop="caseacceptcode">
            <el-col :span="20">
              <el-input v-model="formData.caseacceptcode" maxlength="30"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button icon="el-icon-search" circle type="primary" @click="searchCase" size="small" ></el-button>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="勘验编号:">
            <el-col :span="20">
              <el-input v-model="formData.scenecode" maxlength="30"></el-input>
            </el-col>
             <el-col :span="4">
              <el-button icon="el-icon-search" circle type="primary" @click="searchCase" size="small" ></el-button>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案件编号:">
            <el-col :span="20">
              <el-input v-model="formData.caseNo" maxlength="30"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否加急:">
            <el-col :span="20">
              <template>
                <el-radio-group v-model="formData.isUrgent" @change="testChange">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </template>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="加急原因:" v-if="formData.isUrgent == 1">
            <el-col :span="20">
              <el-input v-model="formData.urgentReason" maxlength="30"></el-input>
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
      <!--原鉴定情况 start-->
      <el-row class="rowInfo">
        <el-col class="baseInfo">
          原鉴定信息
        </el-col>
        <div>
          <el-col :span="24">
            <el-form-item label="原鉴定情况:" prop="originalIdentyInfo">
              <el-col :span="20">
                <el-input type="textarea" :rows="2" v-model="formData.originalIdentyInfo"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="重新鉴定理由:" prop="reIdentyReason">
              <el-col :span="20">
                <el-input type="textarea" :rows="2" v-model="formData.reIdentyReason"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
      <!--原鉴定情况 end-->


      <el-row class="footerRow">
        <el-col :span="16" :offset="8">
          <el-form-item>
            <el-button type="primary" @click="goBack()" v-no-more-click v-if="this.getData('entrustInfoEditFlag') == '0'">上一步</el-button>
            <el-button type="primary" @click="submitForm('0')" v-no-more-click v-if="this.getData('entrustInfoEditFlag') == '0'">下一步</el-button>



            <el-button type="primary" @click="goBack()" v-no-more-click v-if="this.getData('entrustInfoEditFlag') == '2' ">上一步</el-button>
            <el-button type="primary" @click="submitForm('2')" v-no-more-click v-if="this.getData('entrustInfoEditFlag') == '2' ">下一步</el-button>



            <el-button type="primary" @click="goBack()" v-no-more-click v-if="this.getData('entrustInfoEditFlag') == '1' ">返回</el-button>
            <el-button type="primary" @click="submitForm('1')" v-no-more-click v-if="this.getData('entrustInfoEditFlag') == '1' ">更新</el-button>
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
      var validConsignerPhone = (rule, value, callback) => {
        let regP = /^1[345789]\d{9}$/;
        if (!value){
          callback(new Error('请输入电话号码'))
        }else if( regP.test(value)){
          callback();
        }else {
          callback(new Error('请输入正确电话号'));
        }
      }
      var validateSamePeople = (rule, value, callback) => {
        if(this.formData.consignerName2 == undefined || this.formData.consignerName2 == ''){
          callback(new Error('第二送检人 姓名不能为空'));
        }
        if (this.formData.consignerName == this.formData.consignerName2){
          callback(new Error('请选择不同的送检人'));
        }
        callback();
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
        if (this.formData.occurrenceDatetime) {
          var registerCaseDateT = this.formData.registerCaseDate;
          var occurrenceDatetimeT = this.formData.occurrenceDatetime;
          if (registerCaseDateT < occurrenceDatetimeT) {
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
          //委托机构相关信息
          id: '',
          consignOrgRegionalism: '',
          consignOrgName: '',
          consignOrgAddress: '',
          consignOrgZipCode: '',
          consignOrgPhone: '',
          consignOrgFaxNo: '',
          consignmentNo: '',
          originalIdentyInfo:'',
          reIdentyReason:'',
          //送检人相关信息
          sendPeople1: '',
          sendPeolle2: '',
          consignerName: '',
          consignerCertificateType: '',
          consignerCertificateNo: '',
          consignerPhone: '',
          consignerDuty: '',
          consignerName2: '',
          consignerCertificateType2: '',
          consignerCertificateNo2: '',
          consignerPhone2: '',
          consignerDuty2: '',
          // //案件相关信息
          initServerNo: '',
          caseName: '',
          occurrenceDatetime: '',
          caseType: '',
          caseProperty: '',
          sceneRegionalism: '',
          scenePlace: '',
          caseacceptcode: '',
          scenecode: '',
          caseNo: '',
          isUrgent: '0',
          urgentReason: '',
          caseBrief: '',
          //原鉴定相关信息

          //其它相关字段
          orgId: '',//鉴定机构
          aucOrgId: '',//鉴定专业
          sendOrgId: '',//送检机构
          registerId: '',
          empsArr: '',
          entrustInfoEditFlag: '',
          eventId: '',
          aucOrgCname: '',
          orgCname: '',

          sendPeopleImg1: "",
          sendPeopleImg2: "",
          sendPeopleImgName1 :"",
          sendPeopleImgName2 :"",
        },
        formRule: {
          'consignOrgName': [{required: true, message: '委托单位 名称不能为空', trigger: 'blur'}],
          //'consignOrgPhone': [{required: true, message: '委托单位 联系电话不能为空', trigger: 'blur'}],
          'consignerName': [{required: true, message: '第一送检人 姓名不能为空', trigger: 'blur'}],
          'consignerCertificateNo': [{required: true, message: '第一送检人 证件号码不能为空', trigger: 'blur'}],
          'consignerDuty': [{required: true, message: '第一送检人 职务不能为空', trigger: 'blur'}],
          'consignerCertificateType': [{required: true, message: '第一送检人 证件类型不能为空', trigger: 'blur'}],
          'consignerCertificateNo': [{required: true, message: '第一送检人 证件号码不能为空', trigger: 'blur'}],
          'consignerPhone': [{validator: validConsignerPhone, trigger: 'blur'}],

          'consignerName2': [{validator: validateSamePeople, trigger: 'change',required: true}],
          'consignerCertificateNo2': [{required: true, message: '第二送检人 证件号码不能为空', trigger: 'blur'}],
          'consignerDuty2': [{required: true, message: '第一送检人 职务不能为空', trigger: 'blur'}],
          'consignerCertificateType2': [{required: true, message: '第一送检人 证件类型不能为空', trigger: 'blur'}],
          'consignerCertificateNo2': [{required: true, message: '第一送检人 证件号码不能为空', trigger: 'blur'}],
          'consignerPhone2': [{validator: validConsignerPhone, trigger: 'blur'}],

          'caseType': [{required: true, message: '案件信息 案(事)件类型不能为空', trigger: 'blur'}],
          'caseName': [{required: true, message: '案件信息 案(事)件名称不能为空', trigger: 'blur'}],
          'investigationNo': [{required: true, message: '案件信息 现场勘验号不能为空', trigger: 'blur'}],
          'caseNo': [{required: true, message: '案件信息 案(事)件编号不能为空', trigger: 'blur'}],
          'sceneRegionalism': [{required: true, message: '案件信息 案发地点不能为空', trigger: 'blur'}],
          'occurrenceDatetime': [{required: true, message: '案件信息 案发时间不能为空', trigger: 'blur'}],
          'registerCaseDate': [{validator: validateRegisterCaseDate, trigger: 'change'}],
          'investigationPlace': [{required: true, message: '案件信息 案发地详址不能为空', trigger: 'blur'}],
          'caseBrief': [{required: true, message: '案件信息 简要案情不能为空', trigger: 'blur'}],
          //'validateSendPeopleImgName1':[{validator: validateSendPeopleImg1, trigger: 'blur'}],
          //'validateSendPeopleImgName2':[{validator: validateSendPeopleImg2, trigger: 'blur'}],
        },
        userInfoListDefault: [],
        cardTypeList: [],
        caseTypeList: [],
        //案件性质
        casePropertyList: [],
        //案发地点
        crimeLocationList: [],
        caseTypeKeyList: [],
        caseLevelList: [],
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
      testChange(value){
        if( value == '1'){
          //加急  提示加急原因

        }
      },
      clearImg(){
          this.formData.sendPeopleImg1 = '';
          this.formData.sendPeopleImgName1 = '';
          this.imageUrl = '';
          this.formData.sendPeopleImg2 = '';
          this.formData.sendPeopleImgName2 = '';
          this.imageUrl2 = '';
      },
      submitForm(editType) {
        //caseacceptcode 接警号 scenecode 勘验号
        this.setData("caseacceptcode",this.formData.caseacceptcode);
        this.setData("scenecode",this.formData.scenecode);
        //鉴定单位
        this.formData['appraisalOrg'] = this.getData("orgId");
        this.$refs['formInfo'].validate((valid) => {
          if (valid) {
              if (editType == '0') {
                this.postHttp("consignment/insertBaseInfo", this.formData, res => {
                  if (res.code == '0') {
                    this.setData("consignmentId", res.data.id);
                    this.$router.push("materInspectList");
                    this.clearImg();
                  } else {
                    this.notify_warning("操作失败");
                  }
                });
              } else {
                //更新
                this.postHttp("consignment/updateBaseInfo", this.formData, res => {
                  if (res.code == '0') {
                    if(editType == '1'){
                      this.setData("consignmentId", this.formData.consignmentId);
                      this.$router.push("entrustInfo_dna");
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
          }

        })
      },
      getOrgInfo() {
        var data = {};
        var url = "orgsController/selectByUserId";
        if (this.formData.entrustInfoEditFlag != '0') {
          data['orgId'] = this.formData.sendOrgId;
          url = "orgsController/selectById";
        }
        this.postHttpForLogin(url, data, res => {
          if (res.code == '0') {
            //consignOrgName consignOrgAddress consignOrgZipCode consignOrgPhone consignOrgFaxNo
            this.formData.consignOrgName = res.data.orgCname;
            this.formData.consignOrgAddress = res.data.orgAddr;
            this.formData.consignOrgZipCode = res.data.orgZip;
            this.formData.consignOrgPhone = res.data.orgTel;
            this.formData.consignOrgFaxNo = res.data.orgFax;
            this.formData.consignOrgRegionalism = res.data.compartmentNo;
            this.formData.sendOrgId = res.data.orgId;
            //
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
          this.formData.consignerName = obj.empName;
          this.formData.consignerCertificateType = obj.empCredname;
          //this.formData.consignerCertificateNo = obj.empCredno;
          this.formData.consignerCertificateNo = obj.empNo;
          this.formData.consignerPhone = obj.empTel;
          this.formData.sendPeople1 = obj.empId;
          this.formData.consignerDuty = obj.duty;
        } else if (type == '2') {
          this.formData.consignerName2 = obj.empName;
          this.formData.consignerCertificateType2 = obj.empCredname;
          //this.formData.consignerCertificateNo2 = obj.empCredno;
          this.formData.consignerCertificateNo2 = obj.empNo;
          this.formData.consignerPhone2 = obj.empTel;
          this.formData.sendPeople2 = obj.empId;
          this.formData.consignerDuty2 = obj.duty;
        }
        this.$forceUpdate();
      },
      getDictInfo() {
        /**
         * CARDTYPE 证件类型
         * CASETYPE 案（事）件类型
         * CASETYPEKEY  案（事）件类别
         * CASELEVEL 案（事）件级别
         * CRIMELOCATION dna 案发地点
         */
        var data = {
          "parentKeyList": ["CARDTYPE", "CASETYPE", "CASETYPEKEY", "CASELEVEL","DUTYTYPE","CASEPROPERTY","CRIMELOCATION"]
        };
        this.postHttpForLogin("dict/getDictInfo", data, res => {
          if (res.code == '0') {
            this.cardTypeList = res.data.CARDTYPE;
            this.caseTypeList = res.data.CASETYPE;
            this.caseTypeKeyList = res.data.CASETYPEKEY;
            this.caseLevelList = res.data.CASELEVEL;
            this.dutyTypeList = res.data.DUTYTYPE;
            this.casePropertyList = res.data.CASEPROPERTY;
            this.crimeLocationList = res.data.CRIMELOCATION
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
              this.formData.consignerName = res.data.empName;
              this.formData.consignerCertificateType = res.data.empCredname;
              //this.formData.consignerCertificateNo = res.data.empCredno;
              this.formData.consignerCertificateNo = res.data.empNo;
              this.formData.consignerPhone = res.data.empTel;
              this.formData.sendPeople1 = res.data.empId;
              this.formData.consignerDuty = res.data.duty;
            } else {
              this.notify_warning(res.msg);
            }
          });
        }
      },
      getCaseInfo() {
        //查询案件信息
        if (this.formData.entrustInfoEditFlag != '0') {
          this.postHttp("caseDna/selectByPrimaryKeyWithDict", this.formData.eventId, res => {
            if (res.code == '0') {
              this.formData.initServerNo = res.data.initServerNo;
              this.formData.caseName = res.data.caseName;
              this.formData.occurrenceDatetime = res.data.occurrenceDatetime;
              this.formData.caseType = res.data.caseType;
              this.formData.caseProperty = res.data.caseProperty;
              this.formData.sceneRegionalism = res.data.sceneRegionalism;
              this.formData.scenePlace = res.data.scenePlace;
              this.formData.caseacceptcode = res.data.caseacceptcode;
              this.formData.scenecode = res.data.scenecode;
              this.formData.caseNo = res.data.caseNo;
              this.formData.isUrgent = res.data.isUrgent;
              this.formData.urgentReason = res.data.urgentReason;
              this.formData.caseBrief = res.data.caseBrief;
            } else {
              this.notify_warning(res.msg);
            }
          });
        }

      },
      resetForm() {
        this.$refs['formInfo'].resetFields();
        this.formData = {};
        this.getParam();
        //获取字典数据
        this.getDictInfo();
        //获取用户的单位信息
        this.getOrgInfo();
        //获取登录用户的empId
        this.getEmpInfo();
        //获取案件信息
        this.getCaseInfo();
      },
      goBack() {
        this.$refs['formInfo'].resetFields();
        let url = this.getData("entrustInfoEditFlag") == '1'?'/entrustInfo_dna':'/entrustOrg';
        this.$router.push(url);
      },
      getParam() {
        //获取类型 0 新增 1 委托详情进入 编辑 2 上一步 编辑
        this.formData.entrustInfoEditFlag = this.getData('entrustInfoEditFlag');
        this.formData.consignmentId = this.getData('consignmentId');
        if(this.getData('entrustInfoEditFlag') != '0'){
          //编辑

            this.postHttp("consignment/selectInfoByIdWhtiExt", this.formData.consignmentId, res => {
              if (res.code == '0') {
                console.log("selectInfoByIdWhtiExt");
                console.log(res.data);
                  this.formData.id = res.data.id;
                  this.formData.eventId = res.data.eventId;
                  this.formData.consignOrgRegionalism = res.data.consignOrgRegionalism;
                  this.formData.consignOrgName = res.data.consignOrgName;
                  this.formData.consignOrgAddress = res.data.consignOrgAddress;
                  this.formData.consignOrgZipCode = res.data.consignOrgZipCode;
                  this.formData.consignOrgPhone = res.data.consignOrgPhone;
                  this.formData.consignOrgFaxNo = res.data.consignOrgFaxNo;
                  this.formData.consignmentNo = res.data.consignmentNo;
                  this.formData.originalIdentyInfo = res.data.originalIdentyInfo;
                  this.formData.reIdentyReason = res.data.reIdentyReason;
                  //送检人相关信息
                  this.formData.sendPeople1 = res.data.aucOsendPeople1rgId;
                  this.formData.sendPeolle2 = res.data.sendPeolle2;
                  this.formData.consignerName = res.data.consignerName;
                  this.formData.consignerCertificateType = res.data.consignerCertificateType;
                  this.formData.consignerCertificateNo = res.data.consignerCertificateNo;
                  this.formData.consignerPhone = res.data.consignerPhone;
                  this.formData.consignerDuty = res.data.consignerDuty;
                  this.formData.consignerName2 = res.data.consignerName2;
                  this.formData.consignerCertificateType2 = res.data.consignerCertificateType2;
                  this.formData.consignerCertificateNo2 = res.data.consignerCertificateNo2;
                  this.formData.consignerPhone2 = res.data.consignerPhone2;
                  this.formData.consignerDuty2 = res.data.consignerDuty2;



                  this.formData.aucOrgId = res.data.aucOrgId;
                  this.formData.eventId = res.data.eventId;
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
          //this.formData.empsArr = this.getData('empsArr');
          this.formData.eventId = this.getData('eventId');
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
        if (this.getData('entrustInfoEditFlag') != '0') {
            this.postHttp("evidencesImg/selectByObject",{'registerId':this.getData('consignmentId')},res =>{
            if(res.code == '0'){
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
          this.formData.sceneRegionalism = entity.FACS;
          this.formData.registerCaseDate = entity.LASJ;
          this.investigationPlace = entity.AJMLXZ;
          this.formData.occurrenceDatetime = entity.FASJSX;
          this.formData.caseName = entity.AJMC;
        })
      }
    },
    activated: function () {
      this.$refs['formInfo'].resetFields();
      this.formData = {
        //委托机构相关信息
          id: '',
          consignOrgRegionalism: '',
          consignOrgName: '',
          consignOrgAddress: '',
          consignOrgZipCode: '',
          consignOrgPhone: '',
          consignOrgFaxNo: '',
          consignmentNo: '',
          originalIdentyInfo:'',
          reIdentyReason:'',
          //送检人相关信息
          sendPeople1: '',
          sendPeolle2: '',
          consignerName: '',
          consignerCertificateType: '',
          consignerCertificateNo: '',
          consignerPhone: '',
          consignerDuty: '',
          consignerName2: '',
          consignerCertificateType2: '',
          consignerCertificateNo2: '',
          consignerPhone2: '',
          consignerDuty2: '',
          // //案件相关信息
          initServerNo: '',
          caseName: '',
          occurrenceDatetime: '',
          caseType: '',
          caseProperty: '',
          sceneRegionalism: '',
          scenePlace: '',
          caseacceptcode: '',
          scenecode: '',
          caseNo: '',
          isUrgent: '0',
          urgentReason: '',
          caseBrief: '',
          //原鉴定相关信息

          //其它相关字段
          orgId: '',//鉴定机构
          aucOrgId: '',//鉴定专业
          sendOrgId: '',//送检机构
          registerId: '',
          empsArr: '',
          entrustInfoEditFlag: '',
          eventId: '',
          aucOrgCname: '',
          orgCname: '',

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
      //获取送检人图片信息
      this.getSendPeopleImgInfo();

    },
    mounted:function(){
      this.$refs['formInfo'].resetFields();
      this.formData = {
        //委托机构相关信息
          id: '',
          consignOrgRegionalism: '',
          consignOrgName: '',
          consignOrgAddress: '',
          consignOrgZipCode: '',
          consignOrgPhone: '',
          consignOrgFaxNo: '',
          consignmentNo: '',
          originalIdentyInfo:'',
          reIdentyReason:'',
          //送检人相关信息
          sendPeople1: '',
          sendPeolle2: '',
          consignerName: '',
          consignerCertificateType: '',
          consignerCertificateNo: '',
          consignerPhone: '',
          consignerDuty: '',
          consignerName2: '',
          consignerCertificateType2: '',
          consignerCertificateNo2: '',
          consignerPhone2: '',
          consignerDuty2: '',
          // //案件相关信息
          initServerNo: '',
          caseName: '',
          occurrenceDatetime: '',
          caseType: '',
          caseProperty: '',
          sceneRegionalism: '',
          scenePlace: '',
          caseacceptcode: '',
          scenecode: '',
          caseNo: '',
          isUrgent: '0',
          urgentReason: '',
          caseBrief: '',
          //原鉴定相关信息

          //其它相关字段
          orgId: '',//鉴定机构
          aucOrgId: '',//鉴定专业
          sendOrgId: '',//送检机构
          registerId: '',
          empsArr: '',
          entrustInfoEditFlag: '',
          eventId: '',
          aucOrgCname: '',
          orgCname: '',

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
      //获取送检人图片信息
      this.getSendPeopleImgInfo();
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
