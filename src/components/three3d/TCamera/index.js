import component from './src/index.vue'
component.install = function (Vue) {
    console.log(component.name)
    Vue.component(component.name, component)
}
export default component