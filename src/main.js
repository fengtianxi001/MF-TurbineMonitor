import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import loading from './components/loading/index.vue'
Vue.config.productionTip = false
import three3d from "./components/three3d/index"
Vue.use(three3d)
Vue.component("loading", loading)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
