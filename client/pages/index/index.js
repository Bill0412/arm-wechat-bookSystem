// pages/index/index.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scannedCode: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    let self = this
    wx.scanCode({
      onlyFromCamera:true,
      scanType: ['barCode'],
      success: function(res){
        let barCode = res.result
        self.setData({
          scannedCode: barCode
        })
      }
    })

    // a simpified process, take in the book directly
    this.deposit(this.data.scannedCode)
  },

  deposit: function(isbn){
    wx.showLoading({
      title: '存入请求处理中...'
    })

    // check before deposit
    qcloud.request({
      url: config.service.booksUrl,
      login:false,
      method: 'GET',
      data: {
        isbn: isbn
      },
      success: result => {
        let isInBooklist = result.data
        if(!isInBooklist){
          wx.showToast({
            title: '对不起，该书本暂时无法存入',
          })
          wx.hideLoading()
          return
        }
      }
    })

    // do deposit
    qcloud.request({
      url: config.service.depositUrl,
      login: true,
      method: 'POST',
      data: {
        isbn: isbn
      },
      success: result => {
        wx.hideLoading()

        let data = result.data
        if(!data.code){
          wx.showToast({
            title: '书本存入成功'
          })

        } else {
          wx.showToast({
            title: '书本存入失败'
          })
        }
      },
      fail: result => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '书本存入失败',
        })
      }
    })
  }, 

  openArmDoor: function(){

  }
  
})