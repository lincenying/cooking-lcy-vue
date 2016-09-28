var utils = require('./css-loader')
var toString = Object.prototype.toString
var isFunction = function(val) {
    return toString.call(val) === '[object Function]'
}

/**
 * @param  {object} cooking - provide add, remove, config, _userConfig method
 * @param  {object} [options]
 */
module.exports = function(cooking) {
    var SOURCE_MAP = cooking.config.devtool

    cooking.config.vue = cooking.config.vue || {}

    // add loader
    cooking.add('loader.vue', {
        test: /\.vue$/,
        loaders: ['vue-loader']
    })

    // add extension
    cooking.config.resolve.extensions.push('.vue')

    var plugins = cooking.config.postcss
    var css = cooking._userConfig.css

    if (Array.isArray(plugins)) {
        cooking.config.vue.postcss = function(webpack) {
            return plugins.map(plugin => isFunction(plugin) ? plugin(webpack) : plugin)
        }
    } else if (plugins) {
        cooking.config.vue.postcss = plugins
    }

    // add vue config
    cooking.config.vue.loaders = Object.assign({}, {
        js: 'babel-loader'
    },
    cooking.config.vue.loaders,
    utils.cssLoader({
        css: css,
        postcss: plugins,
        sourceMap: SOURCE_MAP ? '#source-map' : false,
        extract: !!cooking.config.extractCSS
    }))

    // 删除cooking配置的各种css加载器
    moduleLoaders = cooking.config.module.loaders
    moduleLoaders.css && delete moduleLoaders.css
    moduleLoaders.less && delete moduleLoaders.less
    moduleLoaders.sass && delete moduleLoaders.sass
    moduleLoaders.scss && delete moduleLoaders.scss
    moduleLoaders.stylus && delete moduleLoaders.stylus
    moduleLoaders.styl && delete moduleLoaders.styl

    cooking.config.module.loaders = Object.assign({},
    moduleLoaders,
    utils.styleLoaders({
        css: css,
        postcss: plugins,
        sourceMap: SOURCE_MAP ? '#source-map' : false,
        extract: !!cooking.config.extractCSS
    }))
}
