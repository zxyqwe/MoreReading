//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    wx.setStorageSync('logs', logs)
    wx.checkSession({
      fail: function () {
        //登录态过期
        this.globalData.userInfo = null
      }
    })
  },
  userLogin(res) {
    //发起网络请求
    wx.request({
      method: 'POST',
      url: 'https://app.zxyqwe.com/MoreReading/index/login',
      data: {
        code: res.code
      }, header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  checkSess(cb) {
    var that = this
    //调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          that.userLogin(res)
        }
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },
  getUserInfo: function (cb) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      this.checkSess(cb)
    }
  },
  globalData: {
    userInfo: null
  }
})