// pages/detail/detail.js
import API from '../../utils/util.js'
let WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:0,
    detail:null,
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.fetch(API.fetchProductDetail.replace('{id}',options.id), {}, (err, res) => {
      if (res.code == 200) {
        let content = res.data.content;
        WxParse.wxParse('content', 'html', content, that, 0);
        that.setData({
          detail: res.data,
          content: content.nodes
        })
      }
    })
  },
  addCart:function(){
    let that = this;
    app.post(API.addCard, { productId: that.data.detail.id}, (err, res) => {
      if (res.code == 200) {
        that.setData({
          number: ++that.data.number
        })
      }
    })
  },
  goCard:function(){
    wx.navigateTo({
      url: '../card/card',
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
  
  }
})