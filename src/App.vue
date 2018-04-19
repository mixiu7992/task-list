<script>
  import config from './config'
  import qcloud from 'wafer2-client-sdk'

export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  mounted () {
    qcloud.login({
      success: (res) => {
        console.log(res)

        qcloud.request({
          url: config.service.addEventUrl,
          method: 'POST',
          data:
            { beginTime: '1988-09-29 00:00:00',
              endTime: '2020-10-20 00:00:00',
              name: '初始时间'
            },
          login: true,
          success: (res) => {
            console.log(res)
          },
          fail: (err) => {
            console.log(err)
          }
        })
        qcloud.request({
          url: config.service.eventListUrl,
          login: true,
          success: (res) => {
            console.log(res)
          },
          fail: (err) => {
            console.log(err)
          }
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
