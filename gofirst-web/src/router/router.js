import Vue from 'vue';

//配置路由
import Router from 'vue-router'

Vue.use(Router)

// 测试页面
const Test = r => require.ensure([], () => r(require('@/page/test')), 'Test');

//1.创建组件
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
// 新登录页面
const loginJD = r => require.ensure([], () => r(require('@/page/loginJD')), 'loginJD');
const loginWT = r => require.ensure([], () => r(require('@/page/loginWT')), 'loginWT');

// 组件
const mainContent = r => require.ensure([], () => r(require('@/components/mainContent')), 'mainContent');

// 配置相关
const dictManage = r => require.ensure([], () => r(require('@/page/setting/dictManage')), 'dictManage');
const processManage = r => require.ensure([], () => r(require('@/page/setting/processManage')), 'processManage');
const permission = r => require.ensure([], () => r(require('@/page/setting/permission')), 'permission');
const sysFunction = r => require.ensure([], () => r(require('@/page/setting/sysFunction')), 'sysFunction');
const entrustOrgManage = r => require.ensure([], () => r(require('@/page/setting/entrustOrgManage')), 'entrustOrgManage');
const mechanism = r => require.ensure([], () => r(require('@/page/setting/mechanism')), 'mechanism');
const authenticateItemEdit = r => require.ensure([], () => r(require('@/page/setting/authenticateItemEdit')), 'authenticateItemEdit');
const authenticateItem = r => require.ensure([], () => r(require('@/page/setting/authenticateItem')), 'authenticateItem');
const instrRecord = r => require.ensure([], () => r(require('@/page/setting/instrRecord')), 'instrRecord');
const holidays = r => require.ensure([], () => r(require('@/page/setting/holidays')), 'holidays');


// 委托相关
const entrustOrg = r => require.ensure([], () => r(require('@/page/entrust/entrustOrg')), 'entrustOrg');
const entrustChoice = r => require.ensure([], () => r(require('@/page/entrust/entrustChoice')), 'entrustChoice');
const entrustInspection = r => require.ensure([], () => r(require('@/page/entrust/entrustInspection')), 'entrustInspection');
const entrustInfo = r => require.ensure([], () => r(require('@/page/entrust/entrustInfo')), 'entrustInfo');
const entrustBaseInfo = r => require.ensure([], () => r(require('@/page/entrust/entrustBaseInfo')), 'entrustBaseInfo');
const entrustList = r => require.ensure([], () => r(require('@/page/entrust/entrustList')), 'entrustList');
const authenticator = r => require.ensure([], () => r(require('@/page/entrust/authenticator')), 'authenticator');
const authRequ = r => require.ensure([], () => r(require('@/page/entrust/authRequ')), 'authRequ');

// 鉴定
const examine = r => require.ensure([], () => r(require('@/page/check/examine')), 'examine');
// 鉴定列表
const appraisal = r => require.ensure([], () => r(require('@/page/check/appraisal')), 'appraisal');
// 鉴定完成
const appComplete = r => require.ensure([], () => r(require('@/page/check/appComplete')), 'appComplete');
//申请列表
const applyList = r => require.ensure([], () => r(require('@/page/check/applyList')), 'applyList');
// 流程回退
const backup = r => require.ensure([], () => r(require('@/page/check/backup')), 'backup');

//DNA列表
const dnaList = r => require.ensure([], () => r(require('@/page/DNA/entrust/dnaList')), 'dnaList');
//DNA物证检材信息
const materInspectList = r => require.ensure([], () => r(require('@/page/DNA/entrust/materInspectList')), 'materInspectList');

//DNA 委托基本信息
const entrustBaseInfo_dna = r => require.ensure([], () => r(require('@/page/DNA/entrust/entrustBaseInfo_dna')), 'entrustBaseInfo_dna');
//DNA 委托详情
const entrustInfo_dna = r => require.ensure([], () => r(require('@/page/DNA/entrust/entrustInfo_dna')), 'entrustInfo_dna');
//机构选择
const entrustChoice_dna = r => require.ensure([], () => r(require('@/page/DNA/entrust/entrustChoice_dna')), 'entrustChoice_dna');
//鉴定要求
const authRequ_dna = r => require.ensure([], () => r(require('@/page/DNA/entrust/authRequ_dna')), 'authRequ_dna');
// 鉴定列表
const appraisal_dna = r => require.ensure([], () => r(require('@/page/DNA/check/appraisal_dna')), 'appraisal_dna');

const examine_dna = r => require.ensure([], () => r(require('@/page/DNA/check/examine_dna')), 'examine_dna');
// DNA收检
const proAccredDNA = r => require.ensure([], () => r(require('@/model/DNA/proAccredDNA')), 'proAccredDNA');

// DNA报告编写
const appraisalRecordDNA = r => require.ensure([], () => r(require('@/model/DNA/appraisalRecordDNA')), 'appraisalRecordDNA');

const acceptCheckDNA = r => require.ensure([], () => r(require('@/model/DNA/acceptCheckDNA')), 'acceptCheckDNA');







// 模板配置
// 检验记录主路由
const inspectionRecord = r => require.ensure([], () => r(require('@/model/inspectionRecord')), 'inspectionRecord');
// 枪弹识别检验记录
const bulletRecognitionI = r => require.ensure([], () => r(require('@/model/inspection/bullet_recognition')), 'bulletRecognitionI');
// 一氧化碳定性检验记录
const coQualitative = r => require.ensure([], () => r(require('@/model/inspection/co_qualitative')), 'coQualitative');
// 柴油残留物定性检验记录
const dieselQualitative = r => require.ensure([], () => r(require('@/model/inspection/diesel_qualitative')), 'dieselQualitative');
// 毒品定性检验记录表
const drugsQualitative = r => require.ensure([], () => r(require('@/model/inspection/drugs_qualitative')), 'drugsQualitative');
// 毒品定量检验记录表
const drugsRation = r => require.ensure([], () => r(require('@/model/inspection/drugs_ration')), 'drugsRation');
// 乙醇定量检验记录
const ethanolQualitativeI = r => require.ensure([], () => r(require('@/model/inspection/ethanol_qualitative')), 'ethanolQualitativeI');
// 文件检验记录
const filesI = r => require.ensure([], () => r(require('@/model/inspection/files')), 'filesI');
// 手印检验记录
const fingerprintI = r => require.ensure([], () => r(require('@/model/inspection/fingerprint')), 'fingerprintI');
// 法医临床检验记录表
const forensicClinicI = r => require.ensure([], () => r(require('@/model/inspection/forensic_clinic')), 'forensicClinicI');
// 汽油残留物定性检验记录表
const gasolineQualitative = r => require.ensure([], () => r(require('@/model/inspection/gasoline_qualitative')), 'gasolineQualitative');
// 海洛因检验记录表
const heroinI = r => require.ensure([], () => r(require('@/model/inspection/heroin')), 'heroinI');
// 印章印文检验记录
const stamp = r => require.ensure([], () => r(require('@/model/inspection/stamp')), 'stamp');
// 常见毒物定性检验记录
const poisonQualitative = r => require.ensure([], () => r(require('@/model/inspection/poison_qualitative')), 'poisonQualitative');

// 报告和鉴定书主路由
const appraisalRecord = r => require.ensure([], () => r(require('@/model/appraisalRecord')), 'appraisalRecord');
// 枪支性能检验
const bulletRecognitionA = r => require.ensure([], () => r(require('@/model/appraisal/bullet_recognition')), 'bulletRecognitionA');
// 汽油柴油检验报告
const dieselGasoline = r => require.ensure([], () => r(require('@/model/appraisal/diesel_gasoline')), 'dieselGasoline');
// 毒品检验报告
const drugs = r => require.ensure([], () => r(require('@/model/appraisal/drugs')), 'drugs');
// 毒物检验报告
const ethanolQualitativeA = r => require.ensure([], () => r(require('@/model/appraisal/ethanol_qualitative')), 'ethanolQualitativeA');
// 文检鉴定书
const filesA = r => require.ensure([], () => r(require('@/model/appraisal/files')), 'filesA');
// 指纹鉴定书
const fingerprintA = r => require.ensure([], () => r(require('@/model/appraisal/fingerprint')), 'fingerprintA');
// 法医学人体损伤程度鉴定书
const forensicClinicA = r => require.ensure([], () => r(require('@/model/appraisal/forensic_clinic')), 'forensicClinicA');
// 法医物证检验报告
const forensicEvidence = r => require.ensure([], () => r(require('@/model/appraisal/forensic_evidence')), 'forensicEvidence');
// 法医学尸体检验鉴定书
const forensicPathologyA = r => require.ensure([], () => r(require('@/model/appraisal/forensic_pathology')), 'forensicPathologyA');
// 海洛因鉴定书
const heroinA = r => require.ensure([], () => r(require('@/model/appraisal/heroin')), 'heroinA');


//程序受理
const programAccept = r => require.ensure([], () => r(require('@/model/programAccept')), 'programAccept');
//收检
const acceptCheck = r => require.ensure([], () => r(require('@/model/acceptCheck')), 'acceptCheck');
//鉴定复核
const identifyReview = r => require.ensure([], () => r(require('@/model/identifyReview')), 'identifyReview');
//授权人签字
const authorizeSign = r => require.ensure([], () => r(require('@/model/authorizeSign')), 'authorizeSign');
//中心主任签名
const directSign = r => require.ensure([], () => r(require('@/model/directSign')), 'directSign');
//打印报告
const printReport = r => require.ensure([], () => r(require('@/model/printReport')), 'printReport');
//提交归档
const filing = r => require.ensure([], () => r(require('@/model/filing')), 'filing');

const proAccred = r => require.ensure([], () => r(require('@/model/proAccred')), 'proAccred');
// 报告发放
const sendReport = r => require.ensure([], () => r(require('@/model/sendReport')), 'sendReport');
//确认归档
const confirmFile = r => require.ensure([], () => r(require('@/model/confirmFile')), 'confirmFile');

const exEntrustInfo = r => require.ensure([], () => r(require('@/model/exEntrustInfo')), 'exEntrustInfo');
const exEntrustInfo_dna = r => require.ensure([], () => r(require('@/model/exEntrustInfo_dna')), 'exEntrustInfo_dna');


//延期申请
const delayed = r => require.ensure([], () => r(require('@/page/applyAction/delayed')), 'delayed');
const delayedApprove = r => require.ensure([], () => r(require('@/page/applyAction/delayedApprove')), 'delayedApprove');
//中止
const pause = r => require.ensure([], () => r(require('@/page/applyAction/pause')), 'pause');
const pauseApprove = r => require.ensure([], () => r(require('@/page/applyAction/pauseApprove')), 'pauseApprove');
//终止
const end = r => require.ensure([], () => r(require('@/page/applyAction/end')), 'end');
const endApprove = r => require.ensure([], () => r(require('@/page/applyAction/endApprove')), 'endApprove');
//鉴定文书修改申请
const entrustUpdateApply = r => require.ensure([], () => r(require('@/page/applyAction/entrustUpdateApply')), 'entrustUpdateApply');

const entrustUpdateList = r => require.ensure([], () => r(require('@/page/applyAction/entrustUpdateList')), 'entrustUpdateList');
const entrustUpdateApplyList = r => require.ensure([], () => r(require('@/page/applyAction/entrustUpdateApplyList')), 'entrustUpdateApplyList');

const recover = r => require.ensure([], () => r(require('@/page/applyAction/recover')), 'recover');
const recoverApprove = r => require.ensure([], () => r(require('@/page/applyAction/recoverApprove')), 'recoverApprove');

const docList = r => require.ensure([], () => r(require('@/page/applyAction/docList')), 'docList');
const checkEntrustUpdateApply = r => require.ensure([], () => r(require('@/page/applyAction/checkEntrustUpdateApply')), 'checkEntrustUpdateApply');
const checkEntrustUpdateApplyApprove = r => require.ensure([], () => r(require('@/page/applyAction/checkEntrustUpdateApplyApprove')), 'checkEntrustUpdateApplyApprove');

//2.配置路由   注意：名字

const routes = [
  {
    path: '/test',
    component: Test
  },
  {
    path: '/loginJD',
    component: loginJD
  },
  {
    path: '/loginWT',
    component: loginWT
  },
  {
    path: '/mainContent',
    component: mainContent,
    name: '',
    children: [
      {
        path: '/entrustInfo',
        component: entrustInfo,
        props: (route) => ({registerId: route.query.registerId})
      },
      {
        path: '/entrustBaseInfo',
        component: entrustBaseInfo,
        props: (route) => ({
          registerId: route.query.registerId,
          orgId: route.query.orgId,
          aucOrgId: route.query.aucOrgId
        })
      },
      {
        path: '/entrustList',
        component: entrustList
      },
      {
        path: '/mechanism',
        component: mechanism
      },
      {
        path: '/entrustOrg',
        component: entrustOrg,
        props: (route) => ({orgId: route.query.orgId})
      },
      {
        path: '/entrustChoice',
        component: entrustChoice
      },
      {
        path: '/authenticator',
        component: authenticator
      },
      {
        path: '/authRequ',
        component: authRequ
      },
      {
        path: '/dictManage',
        component: dictManage
      },
      {
        path:'/entrustOrgManage',
        component: entrustOrgManage
      },
      {
        path: '/processManage',
        component: processManage
      },
      {
        path: '/entrustInspection',
        component: entrustInspection
      },
      {
        path: '/authenticateItem',
        component: authenticateItem
      },
      {
        path: '/authenticateItemEdit',
        component: authenticateItemEdit
      },
      {
        path: '/appraisal',
        component: appraisal
      },
      {
        path: '/applyList',
        component: applyList
      },
      {
        path: '/dnaList',
        component: dnaList
      },
      {
        path: '/materInspectList',
        component: materInspectList
      },
      {
        path: '/appComplete',
        component: appComplete
      },
      {
        path: '/backup',
        component: backup
      },
      {
        path: '/permission',
        component: permission
      },
      {
        path: '/sysFunction',
        component: sysFunction
      },
      {
        path: '/sysFunction',
        component: sysFunction
      },
      {
        path: '/examine',
        component: examine,
        children:[
          {
            path: '/exEntrustInfo',
            component: exEntrustInfo,
          },
          {
            path: '/proAccred',
            component: proAccred
          },
          {
            path: '/programAccept',
            component: programAccept
          },
          {
            path: '/acceptCheck',
            component: acceptCheck
          },
          {
            path: '/identifyReview',
            component: identifyReview
          },
          {
            path: '/authorizeSign',
            component: authorizeSign
          },
          {
            path: '/directSign',
            component: directSign
          },
          {
            path: '/printReport',
            component: printReport
          },
          {
            path: '/filing',
            component: filing
          },
          {
            path: '/sendReport',
            component: sendReport
          },
          {
            path: '/confirmFile',
            component: confirmFile
          },
          {
            // 检验记录
            path: '/inspectionRecord',
            component: inspectionRecord,
            children:[
              {
                path: '/bulletRecognitionI',
                component: bulletRecognitionI
              },
              {
                path: '/coQualitative',
                component: coQualitative
              },
              {
                path: '/dieselQualitative',
                component: dieselQualitative
              },
              {
                path: '/drugsQualitative',
                component: drugsQualitative
              },
              {
                path: '/drugsRation',
                component: drugsRation
              },
              {
                path: '/ethanolQualitativeI',
                component: ethanolQualitativeI
              },
              {
                path: '/filesI',
                component: filesI
              },
              {
                path: '/fingerprintI',
                component: fingerprintI
              },
              {
                path: '/forensicClinicI',
                component: forensicClinicI
              },
              {
                path: '/gasolineQualitative',
                component: gasolineQualitative
              },
              {
                path: '/heroinI',
                component: heroinI
              },
              {
                path: '/stamp',
                component: stamp
              },
              {
                path: '/poisonQualitative',
                component: poisonQualitative
              },
            ]
          },
          {
            // 鉴定书和报告
            path: '/appraisalRecord',
            component: appraisalRecord,
            children:[
              {
                path: '/bulletRecognitionA',
                component: bulletRecognitionA
              },
              {
                path: '/dieselGasoline',
                component: dieselGasoline
              },
              {
                path: '/drugs',
                component: drugs
              },
              {
                path: '/ethanolQualitativeA',
                component: ethanolQualitativeA
              },
              {
                path: '/filesA',
                component: filesA
              },
              {
                path: '/fingerprintA',
                component: fingerprintA
              },
              {
                path: '/forensicClinicA',
                component: forensicClinicA
              },
              {
                path: '/forensicEvidence',
                component: forensicEvidence
              },
              {
                path: '/forensicPathologyA',
                component: forensicPathologyA
              },
              {
                path: '/heroinA',
                component: heroinA
              },
            ]
          },
          // DNA列表
          {
            path: '/exEntrustInfo_dna',
            component: exEntrustInfo_dna,
          },
          {
            // 鉴定书和报告
            path: '/appraisalRecord_dna',
            component: appraisalRecordDNA,
          },
          {
            path: '/proAccred_dna',
            component: proAccredDNA
          },
          {
            path: '/acceptCheck_dna',
            component: acceptCheckDNA
          },

        ]
      },
      {
        path: '/instrRecord',
        component: instrRecord
      },
      {
        path: '/holidays',
        component: holidays
      },
      {
        path: '/delayed',
        component: delayed
      },
      {
        path: '/delayedApprove',
        component: delayedApprove
      },
      {
        path: '/pause',
        component: pause
      },
      {
        path: '/pauseApprove',
        component: pauseApprove
      },
      {
        path: '/end',
        component: end
      },
      {
        path: '/endApprove',
        component: endApprove
      },
      {
        path: '/entrustUpdateApply',
        component: entrustUpdateApply
      },
      {
        path: '/entrustUpdateList',
        component: entrustUpdateList
      },
      {
        path: '/entrustUpdateApplyList',
        component: entrustUpdateApplyList
      },
      {
        path: '/recover',
        component: recover
      },
      {
        path: '/recoverApprove',
        component: recoverApprove
      },
      {
        path: '/docList',
        component: docList
      },
      {
        path: '/checkEntrustUpdateApply',
        component: checkEntrustUpdateApply
      },
      {
        path: '/checkEntrustUpdateApplyApprove',
        component: checkEntrustUpdateApplyApprove
      },
      {
        path: '/entrustBaseInfo_dna',
        component: entrustBaseInfo_dna
      },
      {
        path: '/entrustInfo_dna',
        component: entrustInfo_dna
      },
      {
        path: '/entrustChoice_dna',
        component:entrustChoice_dna
      },
      {
        path: '/authRequ_dna',
        component:authRequ_dna
      },
      {
        path: '/appraisal_dna',
        component:appraisal_dna
      },
      {
        path: '/examine_dna',
        component:examine_dna,
        children:[

          {
            path: '/programAccept_dna',
            component: programAccept
          },
          {
            path: '/acceptCheck_dna',
            component: acceptCheckDNA
          },
          {
            path: '/identifyReview_dna',
            component: identifyReview
          },
          {
            path: '/authorizeSign_dna',
            component: authorizeSign
          },
          {
            path: '/directSign_dna',
            component: directSign
          },
          {
            path: '/printReport_dna',
            component: printReport
          },
          {
            path: '/filing_dna',
            component: filing
          },
          {
            path: '/sendReport_dna',
            component: sendReport
          },
          {
            path: '/confirmFile_dna',
            component: confirmFile
          },
        ]
      },
      {
        path: '/exEntrustInfo_dna',
        component:exEntrustInfo_dna
      },
    ]
  }

]


//3.实例化VueRouter  注意：名字

// const router = new VueRouter({
//     //mode: 'history',   /*hash模式改为history*/
//     routes // （缩写）相当于 routes: routes
// })


//5 <router-view></router-view> 放在 App.vue

// export default router;

export default new Router({
  routes,
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
})
