/*
 * @description: 
 * @author: 肛肠科冯主任
 * @Date: 2020-08-27 16:36:56
 */
import Vue from 'vue'
import Vuex from 'vuex'
import path from 'path'
Vue.use(Vuex)

//自动导入
const contexts = require.context('./', true, /index.js$/);
let modules = {}
contexts.keys().forEach(key => {
  const dirname = path.dirname(key)
  if (dirname != '.'){
    const moduleName = dirname.replace(/^\.\//, '')
    modules[moduleName] = contexts(key).default || contexts(key)
  }
})
export default new Vuex.Store({
  modules
})
