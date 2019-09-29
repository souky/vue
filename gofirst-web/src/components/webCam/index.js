import WebcamComponent from './webcam.vue'

const VueWebcam = {
    install:function(Vue){
        Vue.component('vue-webcam',WebcamComponent)
    }
};

export default VueWebcam;