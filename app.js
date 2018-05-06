//app.js
import API from './utils/util.js'
App({
  onLaunch: function () {
    
  },
  showLoading: function (options) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      mask: true,
      duration: 2000,
      fail: function (e) {
        // console.log(e);
      }
    });
  },
  // 封装公用方法
  request: function (url, data, method) {
    var method = method || 'GET'
    let that = this
    that.showLoading()
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data,
        method,
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        },
        fail: function (err) {
          reject(err)
        },
        complete: function () {
          wx.hideToast();
        }
      });
    })
  }, 
  // 发起get请求
  fetch(url, data, callback) {
    let that = this
    that.showLoading()
    wx.request({
      url: url,
      data,
      header: {
        'Content-Type': 'application/json',
        'vendorKey': 'xxyy',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (!res.data) {
         
        }
        if (res.data.code === 200) {
          callback(null, res.data, 'success');
        } else {
          callback(null, res.data, 'fail');
        }
      },
      fail(e) {
        callback(e)
      },
      complete: function () {
        wx.hideToast();
      }
    })
  }, 
  post(url, data, callback) {
    let that = this
    that.showLoading()
    wx.request({
      url: url,
      data,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'vendorKey': 'xxyy',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        //callback 最后一字符表示下一步的动作
        //缺省或者为 ‘success’是表示成功
        if (res.data.code == 200) {
          callback(null, res.data, 'success');
        } else {
          callback(null, res.data, 'fail');
        }
      },
      fail(e) {
        callback(e)
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
})