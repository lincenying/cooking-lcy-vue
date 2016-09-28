# cooking-lcy-vue

> A cooking plugin to extend vue config.
> 集成less, sass, postcss, 也可以支持stylus和styl, 不过loader请自行安装

使用方法:
```
{
  extends: ['lcy-vue', 'eslint'] // 使用lcy-vue后无需再用less, sass
}
```

postcss配置参考官方

css配置:
```
{
  css: '-autoprefixer'
}
```
```
{
  css: ['-autoprefixer', 'other']
}
```

## include
- "vue-hot-reload-api": "^1.3.2",
- "vue-html-loader": "^1.2.2",
- "vue-loader": "^8.2.3",
- "vue-style-loader": "^1.0.0",
- "less": "^2.7.1",
- "less-loader": "^2.2.3",
- "node-sass": "^3.4.2",
- "sass-loader": "^3.1.2"

## License
MIT
