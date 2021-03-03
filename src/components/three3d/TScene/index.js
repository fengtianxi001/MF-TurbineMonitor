import component from './src/index.vue'
component.install = function (Vue) {
    Vue.component(component.name, component)
}
export default component