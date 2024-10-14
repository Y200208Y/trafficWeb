import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import axios from 'axios'
import '@/api'
import '@/assets/font/iconfont.css'//阿里图标
import '@/assets/css/index.css'//全局CSS
import 'element-ui/lib/theme-chalk/index.css'// 加载 element 组件库的样式

Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.prototype.$message = ElementUI.Message

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api' 

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
