console.log(123)
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/styles/variable.scss";`
            }
        }
    }
}