const path = require('path')
const production = process.env.NODE_ENV !== 'development'
const publicPath = process.env.PUBLIC_PATH

// const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-pxtorem');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath,
  css: {
    extract: {
      filename: `css/[name].css${production ? '?t=[contenthash]' : ''}`,
      chunkFilename: `css/[name].css${production ? '?t=[contenthash]' : ''}`
    },
  },
  transpileDependencies: ['webpack-dev-server/client'],
  chainWebpack: config => {
    // 删除静态资源预加载
    config.plugins.delete('prefetch')

    config.entry.app = ['babel-polyfill', './src/main.js'];
    
    config.resolve.alias
      .set('@', resolve('/src'))
      .set('@pages', resolve('/src/pages/'))
      .set('@js', resolve('/src/assets/js/'))
      .set('@images', resolve('/src/assets/images/'))
      .set('@api', resolve('/src/api/'))
      .set('@common', resolve('/src/common/'))
      .set('@components', resolve('./src/components/'))
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('file-loader')
      .options({
        name: `img/[name].[hash:8].[ext]${production ? '?t=[contenthash]' : ''}`
      })
    config.module.rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: `img/[name].[hash:8].[ext]${production ? '?t=[contenthash]' : ''}`
      })
  },
  configureWebpack: config => {
    config.output.filename = `js/[name].js${production ? '?t=[chunkhash]' : ''}`
    config.output.chunkFilename = `js/[name].js${production ? '?t=[chunkhash]' : ''}`

  },
  productionSourceMap: false,
  devServer: {
    proxy:'http://m.youxiake.test/'
  }
}