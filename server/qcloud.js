const fs = require('fs')
const qcloud = require('wafer-node-sdk')

const configs = require('./config')

const sdkConfig = (() => {
  const sdkConfigPath = '/data/release/sdk.config.json'

  try {
    const stats = fs.statSync(sdkConfigPath)

    if (!stats.isFile()) {
      console.log('sdk.config.json not exist, will user config.js')
      return {}
    }
  } catch (e) {
    return {}
  }

  try {
    const content = fs.readFileSync(sdkConfigPath, 'utf8')
    return JSON.parse(content)
  } catch (e) {
    console.log('sdk.config.json paser error')
    return {}
  }
})()

module.exports = qcloud(Object.assign({}, sdkConfig, configs))
