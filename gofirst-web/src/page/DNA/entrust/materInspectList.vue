<template>
  <div id="materInspectList" style="height: 100%;">

    <div class="mainItem breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>您的位置</el-breadcrumb-item>
        <el-breadcrumb-item>网上送检</el-breadcrumb-item>
        <el-breadcrumb-item>物证检材</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="bodss" class="mainItem">
      <div class="text">
        &emsp;物证检材信息
      </div>
      <div class="btn">
        <el-button type="primary" @click="open()" size="small">现勘提取案件</el-button>
        <el-button type="primary" @click="addPerson()" size="small">添加人员</el-button>
        <el-button type="primary" @click="addIndividual()" size="small">添加身份不明个体</el-button>
        <el-button type="primary" @click="addPhysical()" size="small">添加物证</el-button>
      </div>
    </div>
    <el-tabs type="border-card" class="mainItem" @tab-click="handleClick" value="1">
      <el-tab-pane label="物证列表" name="1">
        <div id="tabb">
          <el-table class="tabb"
                    :data="physicalData"
                    style="width: 100%; margin-top: 20px">

            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.sampleInfoVO" class="orgin">
                  <el-table-column align="center"
                                   prop="DnaCode"
                                   label="DNA编号">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="样本名称">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="与对象关系">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="同步国家库lims">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="上报Mis">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="入库时间">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="常+Y数量">
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="样本操作"
                    width="160">
                    <template slot-scope="scope">
                      <i class="el-icon-search addicon" style="color:#409EFF;cursor:pointer" title="查看"
                         @click="seeMaterial(scope.row,'physical')"></i>
                      <i class="el-icon-edit addicon" style="color:#409EFF;cursor:pointer" title="修改"
                         @click="updateMaterial(scope.row,'physical')"></i>
                      <i class="el-icon-delete addicon" style="color:#f56c6c;cursor:pointer" title="删除"
                         @click="deleteMaterial(scope.row,'physical')"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>

            <el-table-column
              prop="physicalEvidenceName"
              label="物证名称">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="physicalEvidenceNo"
              label="现勘物证号">
            </el-table-column>
            <el-table-column
              prop="physicalEvidenceType"
              label="物证类型">
            </el-table-column>
            <el-table-column
              align='center'
              label="物证操作"
              show-overflow-tooltip
              width="180px">
              <template slot-scope="scope">
                <i class="el-icon-search addicon" style="color:#409EFF;cursor:pointer" title="查看"
                   @click="seePhysical(scope.row,'physical')"></i>
                <i class="el-icon-circle-plus-outline addicon" style="color:#409EFF;cursor:pointer" title="拆解"
                   @click="dismantPhysical(scope.row,'physical')"></i>
                <i class="el-icon-edit addicon" style="color:#409EFF;cursor:pointer" title="修改"
                   @click="editPhysical(scope.row,'physical')"></i>
                <i class="el-icon-delete addicon" style="color:#f56c6c;cursor:pointer" title="删除"
                   @click="deletePhysical(scope.row,'physical')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="人员列表" name="2">
        <div id="table1">
          <el-table class="tabb"
                    :data="personData"
                    style="width: 100%; margin-top: 20px">

            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.sampleInfoVO" class="orgin">
                  <el-table-column align="center"
                                   prop="DnaCode"
                                   label="DNA编号">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="样本名称">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="与对象关系">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="同步国家库lims">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="上报Mis">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="入库时间">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="常+Y数量">
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="样本操作"
                    width="160">
                    <template slot-scope="scope">
                      <i class="el-icon-search addicon" style="color:#409EFF;cursor:pointer" title="查看"
                         @click="seeMaterial(scope.row,'person')"></i>
                      <i class="el-icon-edit addicon" style="color:#409EFF;cursor:pointer" title="修改"
                         @click="updateMaterial(scope.row,'person')"></i>
                      <i class="el-icon-delete addicon" style="color:#f56c6c;cursor:pointer" title="删除"
                         @click="deleteMaterial(scope.row,'person')"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>

            <el-table-column
              prop="personName"
              label="人员名称">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="gender"
              :formatter="formatterArray"
              label="性别">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="idCardNo"
              label="身份证号">
            </el-table-column>
            <el-table-column
              prop="inputCategory"
              :formatter="formattertype"
              label="人员类型">
            </el-table-column>
            <el-table-column
              align='center'
              label="人员操作"
              show-overflow-tooltip
              width="180px">
              <template slot-scope="scope">
                <i class="el-icon-search addicon" style="color:#409EFF;cursor:pointer" title="查看"
                   @click="seePhysical(scope.row,'person')"></i>
                <i class="el-icon-circle-plus-outline addicon" style="color:#409EFF;cursor:pointer" title="拆解"
                   @click="dismantPhysical(scope.row,'person')"></i>
                <i class="el-icon-edit addicon" style="color:#409EFF;cursor:pointer" title="修改"
                   @click="editPhysical(scope.row,'person')"></i>
                <i class="el-icon-delete addicon" style="color:#f56c6c;cursor:pointer" title="删除"
                   @click="deletePhysical(scope.row,'person')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="身份不明个体列表" name="3">
        <div id="table2">
          <el-table class="tabb"
                    :data="Individual"
                    style="width: 100%; margin-top: 20px">

            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.sampleInfoVO" class="orgin">
                  <el-table-column align="center"
                                   prop="DnaCode"
                                   label="DNA编号">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="样本名称">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="与对象关系">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="同步国家库lims">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="上报Mis">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="入库时间">
                  </el-table-column>
                  <el-table-column align="center"
                                   prop="sampleName"
                                   label="常+Y数量">
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="样本操作"
                    width="160">
                    <template slot-scope="scope">
                      <i class="el-icon-search addicon" style="color:#409EFF;cursor:pointer" title="查看"
                         @click="seeMaterial(scope.row,'individual')"></i>
                      <i class="el-icon-edit addicon" style="color:#409EFF;cursor:pointer" title="修改"
                         @click="updateMaterial(scope.row,'individual')"></i>
                      <i class="el-icon-delete addicon" style="color:#f56c6c;cursor:pointer" title="删除"
                         @click="deleteMaterial(scope.row,'individual')"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>

            <el-table-column
              prop="personName"
              label="人员名称">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="gender"
              :formatter="formatterArray"
              label="性别">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="idCardNo"
              label="身份证号">
            </el-table-column>
            <el-table-column
              prop="inputCategory"
              :formatter="formattertype"
              label="人员类型">
            </el-table-column>
            <el-table-column
              align='center'
              label="人员操作"
              show-overflow-tooltip
              width="180px">
              <template slot-scope="scope">
                <i class="el-icon-search addicon" style="color:#409EFF;cursor:pointer" title="查看"
                   @click="seePhysical(scope.row,'individual')"></i>
                <i v-if="reserve4" class="el-icon-circle-plus-outline addicon"
                   style="color:#409EFF;cursor:pointer" title="拆解"
                   @click="dismantPhysical(scope.row,'individual')"></i>
                <i class="el-icon-edit addicon" style="color:#409EFF;cursor:pointer" title="修改"
                   @click="editPhysical(scope.row,'individual')"></i>
                <i class="el-icon-delete addicon" style="color:#f56c6c;cursor:pointer" title="删除"
                   @click="deletePhysical(scope.row,'individual')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="nextMove" v-if="flag != '1'">
      <el-button type="primary" @click="goback">上一步</el-button>
      <el-button type="primary" @click="nextStep">下一步</el-button>
    </div>

    <!--查询现勘物证弹窗开始-->
    <el-dialog :title="inquire" width="1452px" :visible.sync="dialogQuery">
      <div class="mainItem">
        <el-form ref="form" :rules="rules" :model="queryScene" label-width="120px" size='small'>
          <div class="form-body">
            <el-form-item class="form-items" label="勘验编号:">
              <el-input v-model="queryScene.sceneCode" clearable></el-input>
            </el-form-item>
            <el-form-item class="form-items" label="接警号:">
              <el-input v-model="queryScene.caseacceptcode" clearable></el-input>
            </el-form-item>
            <el-form-item class="form-items">
              <el-button size="small" type="primary" style="" @click="querys()">搜&emsp;&emsp;索</el-button>
              <el-button size="small" type="info" style="" @click="clear()">重&emsp;&emsp;置</el-button>
            </el-form-item>
          </div>
          <div id="table" class="tabb mainItem">
            <el-table
              @row-dblclick="storageDetail"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%" highlight-current-row
              @selection-change="handleSelectionChange">
              <el-table-column
                align='center'
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                align='center'
                prop="evidenceWzno"
                label="勘验物证编号">
              </el-table-column>
              <el-table-column
                align='center'
                prop="evidencename"
                label="物证名称"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                align='center'
                prop="aucOrgCname"
                label="操作"
                show-overflow-tooltip
                width="120">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="extract(scope.row)" plain>提取</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pages">
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="pageSizeChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.pageSize"
                :current-page.sync="page.pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
              </el-pagination>
            </div>
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!--拆解证弹窗开始-->
    <el-dialog :title="dismant" width="50%" :visible.sync="dialogDismant" class="dynamicForm compact">
      <el-form class="doubleLine" :rules="rules" :model="SampleInfoPto" ref="SampleInfoPto" style="width:85%">
        <el-form-item label="所属物证" prop="physicalEvidenceName" label-width="150px">
          <el-input v-model="SampleInfoPto.physicalEvidenceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="DNA编号" prop="DnaCode" label-width="150px">
          <el-input v-model="SampleInfoPto.DnaCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本名称" prop="sampleName" label-width="150px">
          <el-input v-model="SampleInfoPto.sampleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本类型" prop="sampleType" label-width="150px">
          <el-select v-model="SampleInfoPto.sampleType">
            <el-option size="small" v-for="item in DNAOptions.sampleType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="amount" label-width="150px">
          <el-input v-model="SampleInfoPto.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="短编号" prop="shortCode" label-width="150px">
          <el-input v-model="SampleInfoPto.shortCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性状" prop="shape" label-width="150px">
          <el-input v-model="SampleInfoPto.shape" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="取样部位" prop="collectPos" label-width="150px">
          <el-input v-model="SampleInfoPto.collectPos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="取样方法" prop="collectMethod" label-width="150px">
          <el-input v-model="SampleInfoPto.collectMethod" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本描述" prop="collectDesc" label-width="150px">
          <el-input v-model="SampleInfoPto.collectDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分型" prop="typing" label-width="150px">
          <el-input v-model="SampleInfoPto.typing" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="sampleSerialNo" label-width="150px">
          <el-input v-model="SampleInfoPto.sampleSerialNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="存储位置" prop="storageLocation" label-width="150px">
          <el-input v-model="SampleInfoPto.storageLocation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort" label-width="150px">
          <el-input v-model="SampleInfoPto.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="150px">
          <el-input v-model="SampleInfoPto.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDismant = false">取 消</el-button>
        <el-button type="primary" v-if="samDisabled" @click="saveDismant">确 定</el-button>
      </div>
    </el-dialog>

    <!--人员样本图片上传弹窗开始 紧凑型 compact doubleLine-->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!--添加人员基本信息弹窗开始 紧凑型 compact doubleLine-->
    <el-dialog id="addPersonnel" class="dynamicForm compact" :title="addPersonnel" width="50%"
               :visible.sync="dialogAddPerson">
      <el-form class="doubleLine" :rules="rules" :model="PersonInfo" ref="addForm" style="width:85%">
        <el-form-item label="人员样本照片添加" label-width="150px" class="img_rows">
          <el-upload action="1" ref="imgUploads" :auto-upload="false" :file-list="photoList"
                     :http-request="uploadImgs"
                     list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                     :multiple="true">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="personName" label-width="150px">
          <el-input v-model="PersonInfo.personName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="人员类别" prop="inputCategory" label-width="150px">
          <el-select v-model="PersonInfo.inputCategory">
            <el-option size="small" v-for="item in DNAOptions.inputCategory" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender" label-width="150px">
          <el-select v-model="PersonInfo.gender">
            <el-option size="small" v-for="item in DNAOptions.gender" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCardNo" label-width="150px">
          <el-input v-model="PersonInfo.idCardNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="其他证件" prop="certificateType" label-width="150px">
          <el-select v-model="PersonInfo.certificateType">
            <el-option size="small" v-for="item in DNAOptions.documents" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificateNo" label-width="150px">
          <el-input v-model="PersonInfo.certificateNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="race" label-width="150px">
          <el-select v-model="PersonInfo.race">
            <el-option size="small" v-for="item in DNAOptions.nationality" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国籍" prop="nationality" label-width="150px">
          <el-select v-model="PersonInfo.nationality">
            <el-option size="small" v-for="item in DNAOptions.country" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthDateFrom" label-width="150px">
          <el-col>
            <el-date-picker v-model="PersonInfo.birthDateFrom" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="别名/绰号" prop="alias" label-width="150px">
          <el-input v-model="PersonInfo.alias" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="检材领回" prop="typing" label-width="150px">
          <el-input v-model="PersonInfo.typing" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现堪物证号" prop="reserve6" label-width="150px">
          <el-input v-model="PersonInfo.reserve6" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特殊属性" prop="specialSign" label-width="150px">
          <el-input v-model="PersonInfo.specialSign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物证袋编号" prop="sampleName" label-width="150px">
          <el-input v-model="PersonInfo.sampleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="户籍地" prop="nativePlaceAddr" label-width="150px" class="rowsInline">
          <el-cascader class="inlineItem" v-model="PersonInfo.nativePlaceAddr" :options="options"
                       :props="props"></el-cascader>
          <el-input class="inlineItem" v-model="PersonInfo.nativePlaceAddr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现住址" prop="residenceAddr" label-width="150px" class="rowsInline">
          <el-cascader class="inlineItem" v-model="PersonInfo.residenceAddr" :options="options"
                       :props="props"></el-cascader>
          <el-input class="inlineItem" v-model="PersonInfo.residenceAddr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="150px" class="rows">
          <el-input v-model="PersonInfo.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddPerson = false">取 消</el-button>
        <el-button type="primary" @click="savePerson" v-if="perDisabled">确 定</el-button>
      </div>
    </el-dialog>

    <!--人员类别：受害人/嫌疑人/案件其他人员 紧凑型 compact doubleLine-->
    <el-dialog :title="victim" width="50%" :visible.sync="dialogVictim" class="dynamicForm compact">
      <el-form class="doubleLine" :rules="rules" :model="SampleInfoPto" ref="addForm" style="width:85%">
        <el-form-item label="DNA编号" prop="DnaCode" label-width="150px">
          <el-input v-model="SampleInfoPto.DnaCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本名称" prop="sampleName" label-width="150px">
          <el-input v-model="SampleInfoPto.sampleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本类型" prop="sampleType" label-width="150px">
          <el-select v-model="SampleInfoPto.sampleType">
            <el-option size="small" v-for="item in DNAOptions.sampleType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员关系" prop="personRelation" label-width="150px">
          <el-select v-model="SampleInfoPto.personRelation">
            <el-option size="small" v-for="item in DNAOptions.personRelation" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="amount" label-width="150px">
          <el-input v-model="SampleInfoPto.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性状" prop="shape" label-width="150px">
          <el-input v-model="SampleInfoPto.shape" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装" prop="packageMethod" label-width="150px">
          <el-select v-model="SampleInfoPto.packageMethod">
            <el-option size="small" v-for="item in DNAOptions.packing" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取样部位" prop="collectPos" label-width="150px">
          <el-input v-model="SampleInfoPto.collectPos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="取样方法" prop="collectMethod" label-width="150px">
          <el-select v-model="SampleInfoPto.collectMethod">
            <el-option size="small" v-for="item in DNAOptions.sampleMethod" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流水号" prop="sampleSerialNo" label-width="150px">
          <el-input v-model="SampleInfoPto.sampleSerialNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本描述" prop="collectDesc" label-width="150px">
          <el-select v-model="SampleInfoPto.collectDesc">
            <el-option size="small" v-for="item in DNAOptions.sampleDescrip" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分型" prop="typing" label-width="150px">
          <el-input v-model="SampleInfoPto.typing" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="存储位置" prop="storageLocation" label-width="150px">
          <el-input v-model="SampleInfoPto.storageLocation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="150px">
          <el-input v-model="SampleInfoPto.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVictim = false">取 消</el-button>
        <el-button type="primary" @click="saveVictim">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加物证弹窗开始 紧凑型 compact doubleLine-->
    <el-dialog id="addDismant" class="dynamicForm compact" :title="addDismant" width="50%"
               :visible.sync="dialogAddPhysical">
      <el-form class="doubleLine" :rules="rules" :model="PhysicalEvidence" ref="PhysicalEvidence" style="width:85%">
        <el-form-item label="物证名称" prop="physicalEvidenceName" label-width="150px">
          <el-input v-model="PhysicalEvidence.physicalEvidenceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物证类型" prop="physicalEvidenceType" label-width="150px">
          <el-select v-model="PhysicalEvidence.physicalEvidenceType">
            <el-option size="small" v-for="item in DNAOptions.physicalEvidenceType" :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物证袋编号" prop="physicalEvidenceNo" label-width="150px">
          <el-input v-model="PhysicalEvidence.physicalEvidenceNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物证描述" prop="description" label-width="150px">
          <el-select v-model="PhysicalEvidence.description">
            <el-option size="small" v-for="item in DNAOptions.sampleDescrip" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="amount" label-width="150px">
          <el-input v-model="PhysicalEvidence.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装" prop="packageMethod" label-width="150px">
          <el-select v-model="PhysicalEvidence.packageMethod">
            <el-option size="small" v-for="item in DNAOptions.packing" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提取位置" prop="extractLocation" label-width="150px">
          <el-input v-model="PhysicalEvidence.extractLocation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提取方法" prop="extractMethod" label-width="150px">
          <el-select v-model="PhysicalEvidence.extractMethod">
            <el-option size="small" v-for="item in DNAOptions.extractMethod" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检材领回" prop="materialCollection" label-width="150px">
          <el-checkbox v-model="PhysicalEvidence.materialCollection">检材已当场领回</el-checkbox>
        </el-form-item>
        <el-form-item label="现勘物证号" prop="reserve6" label-width="150px">
          <el-input v-model="PhysicalEvidence.reserve6" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="150px">
          <el-input v-model="PhysicalEvidence.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddPhysical = false">取 消</el-button>
        <el-button type="primary" @click="savePhysical" v-if="butDisabled">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加人员样本类型选择弹窗-->
    <el-dialog :title="personType" class="dynamicForm compact" width="30%" :visible.sync="dialogPersonType">
      <div style="display: flex;justify-content: center;">
        <el-button type="primary" @click="selfSample()" plain>自身样本</el-button>
        <el-button type="primary" @click="relativeSample()" :disabled="isdisabled" plain>亲属样本</el-button>
      </div>
    </el-dialog>

    <!--添加/修改身份不明个体-->
    <el-dialog :title="addIndividuals" class="dynamicForm compact" width="50%" :visible.sync="dialogAddIndividuals">
      <el-form class="doubleLine" :rules="rules" :model="Individuals" ref="Individuals" style="width:85%">
        <el-form-item label="样本名称" prop="sampleName" label-width="150px">
          <el-input v-model="Individuals.sampleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="人员类别" prop="inputCategory" label-width="150px">
          <el-select v-model="Individuals.inputCategory">
            <el-option size="small" v-for="item in DNAOptions.personType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="DNA编号" prop="DnaCode" label-width="150px">
          <el-input v-model="Individuals.DnaCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本类型" prop="sampleType" label-width="150px">
          <el-select v-model="Individuals.sampleType">
            <el-option size="small" v-for="item in DNAOptions.sampleType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender" label-width="150px">
          <el-select v-model="Individuals.gender">
            <el-option size="small" v-for="item in DNAOptions.gender" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="大致年龄" prop="roughAge" label-width="150px">
          <el-input v-model="Individuals.roughAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物证袋编号" prop="physicalEvidenceNo" label-width="150px">
          <el-input v-model="Individuals.physicalEvidenceNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个体特征" prop="specialSign" label-width="150px">
          <el-input v-model="Individuals.specialSign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="amount" label-width="150px">
          <el-input v-model="Individuals.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性状" prop="shape" label-width="150px">
          <el-input v-model="Individuals.shape" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装" prop="samplePackaging" label-width="150px">
          <el-select v-model="Individuals.samplePackaging">
            <el-option size="small" v-for="item in DNAOptions.packing" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提取部位" prop="collectPos" label-width="150px">
          <el-input v-model="Individuals.collectPos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提取方法" prop="collectMethod" label-width="150px">
          <el-select v-model="Individuals.collectMethod">
            <el-option size="small" v-for="item in DNAOptions.extractMethod" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分型" prop="typing" label-width="150px">
          <el-checkbox v-model="Individuals.typing">未检出</el-checkbox>
        </el-form-item>
        <el-form-item label="检材领回" prop="specimenRetrieval" label-width="150px">
          <el-checkbox v-model="PhysicalEvidence.specimenRetrieval">检材已当场领回</el-checkbox>
        </el-form-item>
        <el-form-item label="失踪编号" prop="missingCode" label-width="150px">
          <el-input v-model="Individuals.missingCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="sampleSerialNo" label-width="150px">
          <el-input v-model="Individuals.sampleSerialNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="存储位置" prop="storageLocation" label-width="150px">
          <el-input v-model="Individuals.storageLocation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本描述" prop="collectDesc" label-width="150px">
          <el-select v-model="Individuals.collectDesc">
            <el-option size="small" v-for="item in DNAOptions.sampleDescrip" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="150px">
          <el-input v-model="Individuals.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddIndividuals = false">取 消</el-button>
        <el-button type="primary" @click="saveIndividuals">确 定</el-button>
      </div>
    </el-dialog>


    <!--人员样本图片上传弹窗开始 紧凑型 compact doubleLine-->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!--添加人员亲属样本弹窗开始 紧凑型 compact doubleLine-->
    <el-dialog id="addPersonnel" class="dynamicForm compact" :title="addRelativePerson" width="50%"
               :visible.sync="dialogAddRelativePerson">
      <el-form class="doubleLine" :rules="rules" :model="RelativePerson" ref="RelativePerson" style="width:85%">
        <el-form-item label="人员样本照片添加" label-width="150px" class="img_rows">
          <el-upload action="1" ref="imgUploads" :auto-upload="false" :file-list="photoList"
                     :http-request="uploadImgs"
                     list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                     :multiple="true">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="personName" label-width="150px">
          <el-input v-model="RelativePerson.personName" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="人员类别" prop="inputCategory" label-width="150px">
           <el-select v-model="PersonInfo.inputCategory">
             <el-option size="small" v-for="item in DNAOptions.inputCategory" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
           </el-select>
         </el-form-item>-->
        <el-form-item label="身份证号" prop="idCardNo" label-width="150px">
          <el-input v-model="RelativePerson.idCardNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" label-width="150px">
          <el-select v-model="RelativePerson.gender">
            <el-option size="small" v-for="item in DNAOptions.gender" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族" prop="race" label-width="150px">
          <el-select v-model="RelativePerson.race">
            <el-option size="small" v-for="item in DNAOptions.nationality" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
          <el-input v-model="RelativePerson.race" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="其他证件" prop="certificateType" label-width="150px">
          <el-select v-model="RelativePerson.certificateType">
            <el-option size="small" v-for="item in DNAOptions.documents" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificateNo" label-width="150px">
          <el-input v-model="RelativePerson.certificateNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthDateFrom" label-width="150px">
          <el-col>
            <el-date-picker v-model="RelativePerson.birthDateFrom" type="datetime"
                            placeholder="选择日期时间"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="国籍" prop="nationality" label-width="150px">
          <el-select v-model="RelativePerson.nationality">
            <el-option size="small" v-for="item in DNAOptions.country" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物证袋编号" prop="physicalEvidenceNo" label-width="150px">
          <el-input v-model="RelativePerson.physicalEvidenceNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名/绰号" prop="alias" label-width="150px">
          <el-input v-model="RelativePerson.alias" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特殊属性" prop="caseProperty" label-width="150px" class="rows">
          <el-checkbox-group v-model="checkList" autocomplete="off">
            <el-checkbox label="涉黑"></el-checkbox>
            <el-checkbox label="涉枪"></el-checkbox>
            <el-checkbox label="涉疆"></el-checkbox>
            <el-checkbox label="涉藏"></el-checkbox>
            <el-checkbox label="涉港"></el-checkbox>
            <el-checkbox label="涉澳"></el-checkbox>
            <el-checkbox label="涉台"></el-checkbox>
            <el-checkbox label="涉外"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--  <el-form-item label="检材领回" prop="typing" label-width="150px">
            <el-input v-model="PersonInfo.typing" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现堪物证号" prop="reserve6" label-width="150px">
            <el-input v-model="PersonInfo.reserve6" autocomplete="off"></el-input>
          </el-form-item>-->
        <el-form-item label="户籍地" prop="nativePlaceAddr" label-width="150px" class="rowsInline">
          <el-cascader class="inlineItem" v-model="RelativePerson.nativePlaceAddr" :options="options"
                       :props="props"></el-cascader>
          <el-input class="inlineItem" v-model="RelativePerson.nativePlaceAddr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现住址" prop="residenceAddr" label-width="150px" class="rowsInline">
          <el-cascader class="inlineItem" v-model="RelativePerson.residenceAddr" :options="options"
                       :props="props"></el-cascader>
          <el-input class="inlineItem" v-model="RelativePerson.residenceAddr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="150px" class="rows">
          <el-input v-model="RelativePerson.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!--人员类别：受害人/嫌疑人/案件其他人员 紧凑型 compact doubleLine-->
      <el-form class="doubleLine" :rules="rules" :model="RelativePerson" ref="addForm" style="width:85%">
        <el-form-item label="DNA编号" prop="DnaCode" label-width="150px">
          <el-input v-model="RelativePerson.DnaCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本名称" prop="sampleName" label-width="150px">
          <el-input v-model="RelativePerson.sampleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本类型" prop="sampleType" label-width="150px">
          <el-select v-model="RelativePerson.sampleType">
            <el-option size="small" v-for="item in DNAOptions.sampleType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员关系" prop="personRelation" label-width="150px">
          <el-select v-model="RelativePerson.personRelation">
            <el-option size="small" v-for="item in DNAOptions.personRelation" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="amount" label-width="150px">
          <el-input v-model="RelativePerson.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性状" prop="shape" label-width="150px">
          <el-input v-model="RelativePerson.shape" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装" prop="samplePackaging" label-width="150px">
          <el-select v-model="RelativePerson.samplePackaging">
            <el-option size="small" v-for="item in DNAOptions.packing" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取样部位" prop="collectPos" label-width="150px">
          <el-input v-model="RelativePerson.collectPos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="取样方法" prop="collectMethod" label-width="150px">
          <el-select v-model="RelativePerson.collectMethod">
            <el-option size="small" v-for="item in DNAOptions.sampleMethod" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流水号" prop="sampleSerialNo" label-width="150px">
          <el-input v-model="RelativePerson.sampleSerialNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="样本描述" prop="collectDesc" label-width="150px">
          <el-select v-model="RelativePerson.collectDesc">
            <el-option size="small" v-for="item in DNAOptions.sampleDescrip" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分型" prop="typing" label-width="150px">
          <el-input v-model="RelativePerson.typing" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="存储位置" prop="storageLocation" label-width="150px">
          <el-input v-model="RelativePerson.storageLocation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark2" label-width="150px">
          <el-input v-model="RelativePerson.remark2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddRelativePerson = false">取 消</el-button>
        <el-button type="primary" @click="saveRelativePerson">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import Region from "@/js/common/regions"
  import DNAOptions from "@/js/common/DNAOptions"

  export default {
    data() {
      return {
        //第一鉴定人
        dialogVisibleSendPeople: false,
        formData: {},
        imageUrl: "",
        //图片上传地址
        action: '',
        DNAOptions: {},
        ruleForm: {
          physicalEvidenceName: '',
          physicalEvidenceType: '',
          description: '',
          packing: '',
          sampleName: '',
          sampleType: ''
        },
        rules: {
          //添加人员表单验证
          personRelation: [
            {required: true, message: '请选择人员关系', trigger: 'blur'}
          ],
          personName: [
            {required: true, message: '请输入人员姓名', trigger: 'blur'}
          ],
          inputCategory: [
            {required: true, message: '请输入人员类别', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请输入人员性别', trigger: 'blur'}
          ],
          idCardNo: [
            {required: true, message: '请输入身份证号', trigger: 'blur'}
          ],
          certificateType: [
            {required: true, message: '请输入其他证件', trigger: 'blur'}
          ],
          certificateNo: [
            {required: true, message: '请输入证件号码', trigger: 'blur'}
          ],
          //添加物证表单验证
          physicalEvidenceName: [
            {required: true, message: '请输入物证名称', trigger: 'blur'}
          ],
          physicalEvidenceType: [
            {required: true, message: '请选择物证类型', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请选择物证描述', trigger: 'blur'}
          ],
          packageMethod: [
            {required: true, message: '请选择包装方法', trigger: 'blur'}
          ],
          //添加样本表单验证
          sampleName: [
            {required: true, message: '请输入样本名称', trigger: 'blur'}
          ],
          sampleType: [
            {required: true, message: '请选择样本类型', trigger: 'blur'}
          ]
        },
        options: Region.region,
        props: {
          lazy: false,
          emitPath: false,
        },
        //物证id
        physicalEvidenceId: '',
        //委托id
        consignmentId: '',
        queryScene: {
          sceneCode: '',
          caseacceptcode: ''
        },
        addRelativePerson: '添加/修改亲属样本',
        dialogAddRelativePerson: false,
        inquire: '现勘提取案件',
        dialogQuery: false,
        addPersonnel: '添加人员',
        dialogAddPerson: false,
        dismant: '拆解物证',
        dialogDismant: false,
        addDismant: '添加物证',
        dialogAddPhysical: false,
        addIndividuals: '添加/修改身份不明个体',
        dialogAddIndividuals: false,
        personType: '添加样本',
        dialogPersonType: false,
        victim: '添加/修改样本',
        dialogVictim: false,
        value: [],
        physicalList: [],
        loading: false,
        loadingUser: false,
        page: {
          pageNum: 1,
          pageSize: 10,
        },
        //亲属样本
        RelativePerson: {
          personName: '',
          idCardNo: '',
          gender: '',
          race: '',
          certificateType: '',
          certificateNo: '',
          birthDateFrom: '',
          nationality: '',
          physicalEvidenceNo: '',
          alias: '',
          caseProperty: '',
          nativePlaceAddr: '',
          residenceAddr: '',
          remark: '',
          DnaCode: '',
          sampleName: '',
          sampleType: '',
          personRelation: '',
          amount: '',
          shape: '',
          samplePackaging: '',
          collectPos: '',
          collectMethod: '',
          sampleSerialNo: '',
          collectDesc: '',
          typing: '',
          storageLocation: '',
          remark2: ''
        },
        //身份不明个体
        Individuals: {
          sampleName: '',
          inputCategory: '',
          DnaCode: '',
          sampleType: '',
          gender: '',
          roughAge: '',
          physicalEvidenceNo: '',
          specialSign: '',
          amount: '',
          shape: '',
          collectPos: '',
          collectMethod: '',
          typing: '',
          specimenRetrieval: '',
          missingCode: '',
          sampleSerialNo: '',
          storageLocation: '',
          collectDesc: '',
          remark: ''
        },
        //物证
        PhysicalEvidence: {
          physicalEvidenceName: '',
          physicalEvidenceType: '',
          consignmentId: '',
          physicalEvidenceNo: '',
          description: '',
          packageMethod: '',
          extractLocation: '',
          extractMethod: '',
          materialCollection: '',
          reserve6: '',
          remark: '',
        },
        //人员id
        id: '',
        //人员信息
        PersonInfo: {
          inputCategory: '',
          personName: '',
          personType: '',
          gender: '',
          idCardNo: '',
          certificateType: '',
          certificateNo: '',
          race: '',
          nationality: '',
          nativePlaceAddr: '',
          residenceAddr: '',
          birthDateFrom: '',
          alias: '',
          reserve6: '',
          specialSign: '',
          remark: ''
        },
        //样本
        SampleInfoPto: {
          physicalEvidenceName: '',
          physicalEvidenceId: '',
          subordinateMaterial: '',
          consignmentId: '',
          DnaCode: '',
          sampleName: '',
          sampleType: '',
          amount: '',
          shortCode: '',
          shape: '',
          collectPos: '',
          collectMethod: '',
          sampleDesc: '',
          typing: '',
          sampleSerialNo: '',
          storageLocation: '',
          remark: '',
        },
        checkList: [],
        reserve4: true,
        isdisabled: false,
        butDisabled: true,
        perDisabled: true,
        samDisabled: true,
        flag: '',
        edit: '',
        savePer: '',
        saveInd: '',
        physicalData: [],
        personData: [],
        tableData: [],
        Individual: [],
        multipleSelection: [],
        dialogImageUrl: '',
        dialogVisible: false,
        photoList: [],
        fileList: [],
      }
    },
    created: function () {
      this.DNAOptions = DNAOptions;
    },
    activated: function () {
      this.setData("edit", 0);
      //caseacceptcode 接警号
      this.queryScene.caseacceptcode = this.getData("caseacceptcode");
      //scenecode 现勘号
      this.queryScene.scenecode = this.getData("scenecode");
      //委托编号
      this.consignmentId = this.getData("consignmentId");
      this.loadData();
    },
    methods: {
      handleCurrentChange(val) {
        this.page.pageNum = val;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      pageSizeChange(val) {
        this.page.pageSize = val;
      },
      storageDetail(row) {
        if (row.sort > 2) {
          this.setData("edit", 1);
        }
        this.setData("registerId", row.registerId);
        this.setData("aucOrgId", row.aucOrgId);
        this.$router.push("entrustInfo");
      },
      //打开弹窗
      open() {
        this.getMaterial();
        this.dialogQuery = true;
      },
      reminder() {
        this.$router.push('/authenticator');
      },
      //样本列表重置
      reSet() {
        this.query = {};
      },
      //弹窗重置
      reSet() {
        this.queryScene = {};
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.data.newImagepath;
        this.formData.sendPeopleImgName1 = res.data.fileName;
        this.formData.sendPeopleImg1 = res.data.newImagepath;
      },
      addAttacgment: function (type) {
        //添加上传地址
        this.action = '/auc/upload/uploadSingle';
        if (type == '1') {
          //第一送检人
          this.imageUrl = this.formData.sendPeopleImg1;
          //打开弹窗
          this.dialogVisibleSendPeople = true;
        } else if (type == '2') {
          //第二送检人
          this.imageUrl2 = this.formData.sendPeopleImg2;
          //打开弹窗
          this.dialogVisibleSendPeople2 = true;
        }
      },
      deletePhoto(type) {
        if (type == '1') {
          this.formData.sendPeopleImg1 = '';
          this.formData.sendPeopleImgName1 = '';
          this.imageUrl = '';
        } else if (type == '2') {
          this.formData.sendPeopleImg2 = '';
          this.formData.sendPeopleImgName2 = '';
          this.imageUrl2 = '';
        }
      },
      // 删除图片
      handleRemove(file) {

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //保存人员基本信息
      uploadImgs() {
        // 传入表单对象名称和 type  url需要自己改
        this.httpUpload('PersonInfo', 1, 'imgUploads');
      },
      httpUpload(objname, type, uploadName) {
        let url;
        let fileData = new FormData();
        // 文件
        let fileArray = this.$refs[uploadName].uploadFiles;
        for (let x in fileArray) {
          fileData.append('files', fileArray[x].raw);
        }
        fileData.append('type', type);
        let obj = this[objname];
        for (let x in obj) {
          // 表单数据
          fileData.append(x, obj[x]);
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        fileData.append('consignmentId', this.consignmentId);
        if (this.savePer == 0) {
          url = "/auc/personInfo/savePersonInfo";
        } else if (this.savePer == 1) {
          url = "/auc/personInfo/savePersonInfo";
        }
        this.$axios.post(url, fileData, config).then(response => {
          if (response.data.code == '0') {
            this.fileList = [];
            this.loadData();
          } else {
            this.notify_error(response.data.msg);
          }
        }, response => {
          this.notify_error('网络错误');
        })
      },

      // 提取物证
      getMaterial() {
        var data = {};
        //接警号
        data['caseacceptcode'] = this.queryScene.caseacceptcode;
        //现勘号
        data['scenecode'] = this.queryScene.sceneCode;
        this.btnLoading = true;
        this.postHttp('link/getPhysical', data, res => {
          this.btnLoading = false;
          if (res.code == '0') {
            this.tableData = res.data.data;
            this.notify_success('提取成功');
          } else {
            this.notify_error(res.msg);
          }
        })
      },
      //点击提取把弹窗内容填充到表格一行，保存到数据库
      extract(row) {
        let data = row;
        data['type'] = '0';
        data['consignmentId'] = this.consignmentId;
        this.postHttp("physical/savePhysical", data, res => {
          if (res.code == '0') {
            this.loadData();
            this.notify_success("提取成功");
            this.dialogQuery = false;
          } else {
            this.notify_warning(res.msg);
          }
        })
      },
      //查询提取之后的物证
      loadData() {
        var data = this.queryScene;
        data['consignmentId'] = this.consignmentId;
        data['pageNum'] = this.page.pageNum;
        data['pageSize'] = this.page.pageSize;
        this.postHttp("physical/queryPhysical", data, res => {
          this.physicalData = res.data.physicalList;
          this.personData = res.data.personInfos;
          this.Individual = res.data.individuals;
          this.loading = false;
        });
      },
      //查看物证
      seePhysical(row, type) {
        if (type === 'physical') {
          this.addDismant = '查看物证';
          this.dialogAddPhysical = true;
          this.PhysicalEvidence = row;
          this.butDisabled = false;
        } else if (type === 'person') {
          if (row.inputCategory === '020201' || row.inputCategory === '020203' || row.inputCategory === '020205') {
            this.PersonInfo.inputCategory = row.inputCategory;
            this.PersonInfo = row;
            this.addPersonnel = '查看人员';
            this.dialogAddPerson = true;
            this.perDisabled = false;
          } else if (row.inputCategory === '020202' || row.inputCategory === '020204') {
            this.PersonInfo = row;
            this.addPersonnel = '查看人员';
            this.dialogAddPerson = true;
            this.perDisabled = false;
          }
        } else if (type === 'individual') {
          this.addIndividuals = '查看身份不明个体';
          this.dialogAddIndividuals = true;
          this.Individuals = row;
        }
      },
      //修改物证/人员/不明个体
      editPhysical(row, type) {
        if (type === 'physical') {
          this.addDismant = '修改物证';
          this.dialogAddPhysical = true;
          this.PhysicalEvidence = row;
          this.flag = 1;
          this.edit = 1;
          this.setData('physicalEvidenceId', row.physicalEvidenceId);
          this.butDisabled = true;
        } else if (type === 'person') {
          this.PersonInfo.inputCategory = row.inputCategory;
          this.PersonInfo = row;
          this.savePer = 1;
          this.personType = '修改人员';
          this.dialogAddPerson = true;
          this.perDisabled = true;
        } else if (type === 'individual') {
          this.setData('indId', row.id);
          this.addIndividuals = '修改身份不明个体';
          this.dialogAddIndividuals = true;
          this.saveInd = 1;
          this.Individuals = row;
        }
      },
      //点击添加物证/人员图标
      dismantPhysical(row, type) {
        if (type === 'physical') {
          this.SampleInfoPto = {};
          this.SampleInfoPto.physicalEvidenceId = row.physicalEvidenceId;
          this.SampleInfoPto.physicalEvidenceName = row.physicalEvidenceName;
          this.dismant = '拆解物证';
          this.flag = 0;
          this.dialogDismant = true;
          this.butDisabled = true;
        } else if (type === 'person') {
          this.PersonInfo = {};
          if (row.inputCategory === '020201' || row.inputCategory === '020203' || row.inputCategory === '020205') {
            this.PersonInfo.inputCategory = row.inputCategory;
            this.setData('id', row.id);
            this.personType = '添加自身样本';
            this.isdisabled = true;
            this.dialogPersonType = true;
          } else if (row.inputCategory === '020202' || row.inputCategory === '020204') {
            this.setData('id', row.id);
            this.personType = '添加亲属样本';
            this.isdisabled = false;
            this.dialogPersonType = true;
          }
        }
      },
      //删除物证/人员/不明个体
      deletePhysical(row, type) {
        let url;
        let id;
        if (type === 'physical') {
          url = "physical/deletePhysical";
          id = row.physicalEvidenceId;
        } else if (type === 'person') {
          url = "personInfo/deletePerson";
          id = row.id;
        } else if (type === 'individual') {
          url = "personInfo/deletePerson";
          id = row.id;
        }
        this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postHttp(url, id, res => {
            if (res.code == '0') {
              //删除成功之后从新调用查询方法
              this.loadData();
            } else {
              this.notify_warning(res.msg);
            }
          })
        }).catch(() => {
          //取消
        });
      },
      //控制添加图标隐藏/显示
      handleClick(tab, event) {
        if (tab.name == '3') {
          this.reserve4 = false;
        } else {
          this.reserve4 = true;
        }
      },
      //点击自身样本
      selfSample() {
        if (this.PersonInfo.inputCategory === '020201' || this.PersonInfo.inputCategory === '020203' || this.PersonInfo.inputCategory === '020205') {
          this.notify_warning("您已经添加了该人员的自身样本！");
          return;
        } else {
          this.PersonInfo = {};
          this.dialogVictim = true;
        }
      },
      //点击亲属样本
      relativeSample() {
        this.RelativePerson = {};
        this.addRelativePerson = '添加/修改亲属样本';
        this.dialogAddRelativePerson = true;
      },
      //保存人员亲属样本弹窗信息
      saveRelativePerson() {
        var data = this.RelativePerson;
        data['id'] = this.getData("id");
        data['type'] = '2';
        data['consignmentId'] = this.consignmentId;
        this.postHttp("personInfo/saveRelativePerson", data, res => {
          if (res.code == '0') {
            this.loadData();
            this.notify_success("保存成功!");
            this.dialogAddRelativePerson = false;
            this.dialogPersonType = false;
            this.loadData();
          } else {
            this.notify_warning(res.msg);
          }
        })
      },
      //保存人员自身样本弹窗信息
      saveVictim() {
        var data = this.SampleInfoPto;
        data['id'] = this.getData("id");
        data['type'] = '1';
        data['consignmentId'] = this.consignmentId;
        this.postHttp("sampleInfo/saveSampleInfo", data, res => {
          if (res.code == '0') {
            this.loadData();
            this.notify_success("保存成功!");
            this.dialogVictim = false;
            this.dialogPersonType = false;
            this.loadData();
          } else {
            this.notify_warning(res.msg);
          }
        })
      },
      //保存拆解物证的样本
      saveDismant() {
        var data = this.SampleInfoPto;
        data['consignmentId'] = this.consignmentId;
        let url;
        if (this.flag == 0) {
          url = "sampleInfo/saveSampleInfo";
        } else if (this.flag == 1) {
          url = "sampleInfo/updateSampleInfo";
        }
        this.postHttp(url, data, res => {
          if (res.code == '0') {
            this.notify_success("保存成功");
            this.dialogDismant = false;
            this.loadData();
          } else {
            this.notify_warning("保存失败");
          }
        });
      },
      //查看样本
      seeMaterial(row, type) {
        if (type === 'physical') {
          this.samDisabled = false;
          this.dismant = '查看样本';
          this.dialogDismant = true;
          this.SampleInfoPto = row;
        }
      },
      //修改样本
      updateMaterial(row, type) {
        if (type === 'physical') {
          this.flag = 1;
          this.samDisabled = true;
          this.dismant = '修改样本';
          this.dialogDismant = true;
          this.SampleInfoPto = row;
        }
      },
      //删除样本
      deleteMaterial(row) {
        let url;
        let id;
        url = "sampleInfo/deleteSampleInfo";
        id = row.sampleInfoId;
        this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postHttp(url, id, res => {
            if (res.code == '0') {
              //删除成功之后从新调用查询方法
              this.loadData();
            } else {
              this.notify_warning(res.msg);
            }
          })
        }).catch(() => {
          //取消
        });
      },
      //添加人员
      addPerson() {
        this.savePer = 0;
        this.photoList = [];
        this.PersonInfo = {};
        this.dialogAddPerson = true;
      },
      //保存人员
      savePerson() {
        this.uploadImgs();
        this.dialogAddPerson = false;
      },
      //添加身份不明个体
      addIndividual() {
        this.saveInd = 0;
        this.dialogAddIndividuals = true;
        this.Individuals = {};
      },
      //保存身份不名个体
      saveIndividuals() {
        let url;
        var data = this.Individuals;
        //委托id
        data['consignmentId'] = this.consignmentId;
        //现勘号
        data['scenecode'] = this.getData("scenecode");
        data['id'] = this.getData("indId");
        if (this.saveInd == 0) {
          url = "personInfo/saveIndividuals";
        } else if (this.saveInd == 1) {
          url = "personInfo/updateIndividuals";
        }
        this.postHttp(url, data, res => {
          if (res.code == '0') {
            this.loadData();
            this.notify_success("保存成功!");
            this.dialogAddIndividuals = false;
            this.loadData();
          } else {
            this.notify_warning(res.msg);
          }
        })
      },
      //添加物证
      addPhysical() {
        this.edit = 0;
        this.PhysicalEvidence = {};
        this.dialogAddPhysical = true;
      },
      //保存物证
      savePhysical() {
        let url;
        var data = this.PhysicalEvidence;
        data['consignmentId'] = this.consignmentId;
        //类型是1,添加物证页面保存;0,从现勘获取物证保存
        data['type'] = '1';
        data['physicalEvidenceId'] = this.getData("physicalEvidenceId");
        this.$refs['PhysicalEvidence'].validate((valid) => {
          if (valid) {
            if (this.edit == 0) {
              url = "physical/savePhysical";
            } else if (this.edit == 1) {
              url = "physical/updatePhysical";
            }
            this.postHttp(url, data, res => {
              if (res.code == '0') {
                this.loadData();
                this.notify_success("保存成功!");
                this.dialogAddPhysical = false;
                this.loadData();
              } else {
                this.notify_warning(res.msg);
              }
            });
          } else {
            return false;
          }
        });
      },
      goback() {
        this.$router.push("/entrustBaseInfo_dna");
      },
      //下一步
      nextStep() {
        //1是编辑
        /* let url = this.getData('entrustInfoEditFlag') == '1' ? 'entrustInfo' : 'entrustInspection';*/
        this.$router.push("/authRequ_dna");
      },
      formatterArray(row, column, cellValue, index) {
        let reStr = '';
        switch (cellValue) {
          case '0':
            reStr = '未知';
            break;
          case '1':
            reStr = '男';
            break;
          case '2':
            reStr = '女';
            break;
          case '9':
            reStr = '未知';
            break;
        }
        return reStr;
      },
      formattertype(row, column, cellValue, index) {
        let reStr = '';
        switch (cellValue) {
          case '020201':
            reStr = '受害人';
            break;
          case '020202':
            reStr = '失踪受害人';
            break;
          case '020203':
            reStr = '嫌疑人';
            break;
          case '020204':
            reStr = '失踪嫌疑人';
            break;
          case '020205':
            reStr = '案件其他人员';
            break;
        }
        return reStr;
      },

      dateFormat(row, column, cellValue, index) {
        var date = cellValue;
        if (date == undefined || date == '') {
          return "";
        }
        return this.timeF(date).format("YYYY-MM-DD HH:mm:ss");
      },

    }
  }
</script>

<style>

  #materInspectList .yourAddress .el-input--prefix .el-input__inner {
    padding-left: 30px;
    margin-top: 4px;
  }

  #materInspectList .yourAddress .el-input--suffix .el-input__inner {
    padding-right: 30px;
    margin-top: 4px;
  }

  .normalColen .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 225px;
  }

  #materInspectList {
    background-color: #f0f3fa;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #materInspectList .el-row .normalCol {
    height: 3em;
    line-height: 3em;
    font-size: 14px;
  }

  #materInspectList .yourAddress .ban {

  }

  #materInspectList .el-row {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
    background-color: #ffffff;
    overflow: hidden;
  }

  #materInspectList .sousuo {
    position: absolute;
    right: 58px;
    top: 7.6px;
  }

  .shanchu {
    position: absolute;
    right: 57px;
    top: 4.6px;
  }

  .tishi {
    position: absolute;
    right: 59px;
    top: 4.6px;
  }

  .dengji {
    position: absolute;
    right: 187px;
    top: 4.6px;
  }

  #materInspectList .el-col-4 {
    width: 14%;
  }

  /**设置点击事件变为小手*/
  #materInspectList .hand {
    cursor: pointer;
  }

  #materInspectList #tabb {
    padding-bottom: 10px;
  }

  #materInspectList .tabb .addicon {
    font-size: 18px;
    margin: auto 2px;
  }

  #materInspectList .tabb .el-table th div {
    height: 29px;
    line-height: 29px;
  }

  #materInspectList .tabb .el-table__header tr,
  #materInspectList .tabb .el-table__header th {
    padding: 0;
    height: 40px;
    background-color: RGB(85, 136, 254);
    color: white;
    /* border-bottom: 1px rgb(72, 169, 224) solid; */
  }

  #materInspectList .orgin .el-table__body tr,
  #materInspectList .orgin .el-table__body td {
    padding: 0;
    height: 30px;
  }

  #materInspectList .orgin .el-table th div {
    height: 19px;
    line-height: 19px;
  }

  #materInspectList .orgin .el-table__header tr,
  #materInspectList .orgin .el-table__header th {
    padding: 0;
    height: 30px;
    background: #fff;
    color: #666;
  }

  #materInspectList .orgin .el-table__body tr,
  #materInspectList .orgin .el-table__body td {
    padding: 0;
    height: 30px;
  }


  #materInspectList .mainItem {
    width: 98%;
    margin: 10px auto;
    box-sizing: border-box;
  }

  #materInspectList .form-body {
    padding: 10px 0;
  }

  #materInspectList .search {
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 1%;
    width: 100%;
  }

  #materInspectList #bodss {
    display: flex;
    justify-content: space-between;
    height: 50px;
  }

  #materInspectList #bodss .text {
    text-align: left;
    width: 200px;
    font-size: 14px;
    line-height: 50px;
    padding-left: 10px;
  }

  #materInspectList #bodss .btn {
    width: 190px;
    display: flex;
    height: 32px;
    margin-top: 9px;
    margin-right: 1%;
    justify-content: flex-end;
  }

  #materInspectList .nextMove {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    margin-top: 20px;
  }

  #materInspectList .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  #materInspectList .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  #materInspectList .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed black;
  }

  #materInspectList .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  #materInspectList .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 86px;
  }

  #materInspectList .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
    line-height: 86px;
  }

  .el-checkbox {
    margin-right: 28px;
  }
</style>
