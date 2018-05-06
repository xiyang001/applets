//index.js
//获取应用实例
import API from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    indexData:null,
    isShowInput:false
  },
  onLoad: function (option) {
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: API.getToken,
            data: {
              accessToken: res.code
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              'vendorKey': 'xxyy'
            },
            success: function (response) {

              if (response.data.code == 200) {
                wx.setStorageSync('token', response.data.data.token)
                app.fetch(API.fetchIndex, {}, (err, res) => {
                  if (res.code == 200) {
                    that.setData({
                      indexData: res.data
                    })
                    wx.setStorageSync('allCategories', res.data.allCategories)
                    wx.setStorageSync('brands', res.data.brands)
                  }
                })
              }
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  showInput:function(){
    let that = this;
    that.setData({
      isShowInput:true
    })
  },
  callHotLine:function(){
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.indexData.vendor.phone
    })
  },
  goDetail:function(e){
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  brandsGoList:function(e){
    let id = e.currentTarget.dataset.id
    wx.switchTab({
      url:`/pages/list/list`
    })
  }
})
