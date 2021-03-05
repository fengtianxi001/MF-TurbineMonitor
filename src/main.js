import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
import three3d from "./components/three3d/index"
Vue.use(three3d)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
