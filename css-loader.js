var ExtractTextPlugin = require('extract-text-webpack-plugin')
var isNextWebpack = false
try {
    isNextWebpack = require('cooking/util/check').isNextWebpack
} catch (_) {}

exports.cssLoader = function(options) {
    options = options || {}
    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }
    // generate loader string to be used with extract text plugin
    function generateLoaders(loaders) {
        var sourceLoader = loaders.map(function(loader) {
            var extraParamChar
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')

        if (options.extract) {
            return isNextWebpack ?
                ExtractTextPlugin.extract({
                    fallbackLoader: 'vue-style-loader',
                    loader: sourceLoader
                }) :
                ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
        } else {
            return ['vue-style-loader', sourceLoader].join('!')
        }
    }
    var cssConfig = []
    if (options.css) {
        if (isArray(options.css)) {
            cssConfig = ['css?' + options.css.join('&')]
        } else {
            cssConfig = ['css?' + options.css]
        }
    } else {
        cssConfig = ['css']
    }
    if (options.postcss) {
        cssConfig = cssConfig.concat(['postcss'])
    }
    // http://vuejs.github.io/vue-loader/configurations/extract-css.html
    return {
        css: generateLoaders(cssConfig),
        less: generateLoaders(cssConfig.concat(['less'])),
        sass: generateLoaders(cssConfig.concat(['sass?indentedSyntax'])),
        scss: generateLoaders(cssConfig.concat(['sass'])),
        stylus: generateLoaders(cssConfig.concat(['stylus'])),
        styl: generateLoaders(cssConfig.concat(['stylus']))
    }
}
exports.styleLoaders = function(options) {
    var output = []
    var loaders = exports.cssLoader(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader
        })
    }
    return output
}
