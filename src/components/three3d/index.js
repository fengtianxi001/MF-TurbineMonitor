
let ThreeComponents = {}
const requireComponent = require.context('./', true, /index.js$/);
requireComponent.keys().forEach(fileName => {
    if (fileName.split('/').length !== 2) {
        const componentConfig = requireComponent(fileName)
        let cache = componentConfig.default || componentConfig
        ThreeComponents[cache.name] = cache
    }
})

ThreeComponents.install = function (Vue) {
    for (let component in ThreeComponents) {
        if (!(ThreeComponents[component] instanceof Function)) {
            Vue.use(ThreeComponents[component])
        }
    }
}
// 全量导出
export default ThreeComponents
//按需导出
// export let Alert = ElementUI.ElAlert