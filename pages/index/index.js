var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    isbn: '',
    reslist: [],
  },
  bindViewTap: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        var isbn = res.result;
        that.setData({
          isbn: isbn, 
          reslist: []
        })
        that.searchISBN(isbn)
      }
    })
  },
  searchISBN: function (isbn) {
    var that = this
    wx.request({
      method: 'POST',
      url: 'https://app.zxyqwe.com/MoreReading/index/isbn',
      data: {
        code: isbn
      }, header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.setStorageSync('logs', res.data)
        var reslist = []
        if (res.data.hasOwnProperty('EditorialReviews')) {
          reslist.push(util.extract_aws(res.data))
        } else {
          for (var i in res.data) {
            reslist.push(util.extract_aws(res.data[i]))
          }
        }
        that.setData({
          reslist: reslist,
        })
      },
      fail: function (res) {
        that.setData({
          isbn: isbn + JSON.stringify(res)
        })
      }
    })
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
