/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
let host = 'http://localhost:5757' // https://mpv5cauq.qcloud.la localhost:5757
// let host = 'https://mpv5cauq.qcloud.la'
let prefix = 'v1'

let config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,
    prefix,
    // 登录地址，用于建立会话
    loginUrl: `${host}/${prefix}/login`,

    // 添加时间
    addEventUrl: `${host}/${prefix}/addEvent`,

    // 添加时间
    eventListUrl: `${host}/${prefix}/eventList`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/${prefix}/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/${prefix}/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/${prefix}/upload`
  }
}

module.exports = config
