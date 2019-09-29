<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
      :init="init">
    </editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table wordcount'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    }
  },
  data () {
    return {
      init: {
        language_url: 'static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: 'static/tinymce/skins/ui/oxide',
        content_css:'static/tinymce/skins/ui/oxide/content.css',
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {

          let action = '/auc/upload/uploadSingle';
          let regRow = JSON.parse(this.getData("regRow"));
          let fileData = new FormData();
					fileData.append('registerId', regRow.registerId);
          fileData.append('exPath', "appraisal");
          fileData.append('file', blobInfo.blob());
					let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
					this.$axios.post(action,fileData,config).then(response => {
				  		if(response.data.code == '0'){
                success(response.data.data.newImagepath);
							}else{
                failure(response.data.msg);
							}
				    },response => {
              failure('网络错误');
					})
        }
      },
      myValue: this.value
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
  },
  watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}

</script>
