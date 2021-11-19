import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import Fragment from 'vue-fragment'// 作为根结点使用但不渲染标签
import 'ant-design-vue/dist/antd.css'
import '@/permission'// 权限
import 'animate.css'// 动画库
import '@/icons'// svg图标

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(Antd)
Vue.use(Fragment.Plugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
