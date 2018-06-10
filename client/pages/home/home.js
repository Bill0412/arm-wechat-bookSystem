// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    points: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkSession({
     success: ({userInfo})=> {
       this.setData({
         userInfo: userInfo
       })
     },
     error: () => {}
   })
  },

  checkSession({ success, error }) {
    wx.checkSession({
      success: () => {
        this.getUserInfo({ success, error })
      },
      fail: () => {
        error && error()
      }
    })
  },

  onTapLogin: function() {
    qcloud.setLoginUrl(config.service.loginUrl)
    // qcloud.setLoginUrl("https://tcnh5ryo.qcloud.la/weapp/login")
    this.doQcloudLogin({
      success: ({userInfo}) => {
        this.setData({
          userInfo:userInfo
        })
      }
    })
  },

  doQcloudLogin: function ({ success, error }) {
    qcloud.login({
      success: result => {
        if (result) {
          let userInfo = result
          console.log(userInfo)
          success && success({
            userInfo
          })
        } else {
          this.getUserInfo({ success, error })
        }
      },
      fail: () => {
        error && error()
      }
    })
  },

  getUserInfo: function({ success, error }) {
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success: result => {
        let data = result.data

        if (!data.code) {
          let userInfo = data.data

          success && success({
            userInfo
          })
        } else {
          error && error()
        }
      },
      fail: () => {
        error && error()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // Tap to scan the book bar code
  tapScan: function (event) {
    console.log(event)
  }
})

