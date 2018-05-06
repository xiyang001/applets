// pages/card/card.js
import API from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList:[],
    paymentTypes:[],
    amount:0,
    phone:'',
    address:'',
    showModal:false,
    value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let amount=0;
    let paymentTypes=[]
    app.fetch(API.checkoutCard,{},(err,res) => {
      if(res.code==200){
        for(let i=0;i<res.data.length;i++){
          amount += res.data[i].price*res.data[i].quantity
        }
        for (let i in res.paymentTypes){
          paymentTypes.push(res.paymentTypes[i])
        }
        that.setData({
          cardList: res.data,
          paymentTypes: paymentTypes,
          amount:amount,
        })
      }
    })
  },
  addProduct:function(e){
    let that = this
    let data = e.currentTarget.dataset;
    let id = data.id
    let quantity = data.quantity
    app.post(API.updateCard.replace('{id}',id),{
      quantity: quantity + 1
    },(err,res)=>{
      if(res.code==200){
        let amount = 0;
        app.fetch(API.checkoutCard, {}, (err, res) => {
          if (res.code == 200) {
            for (let i = 0; i < res.data.length; i++) {
              amount += res.data[i].price * res.data[i].quantity
            }
            that.setData({
              cardList: res.data,
              amount: amount
            })
          }
        })
      }
    })
  },
  lessProduct:function(e){
    let that = this
    let data = e.currentTarget.dataset;
    let id = data.id
    let quantity = data.quantity
    app.post(API.updateCard.replace('{id}', id), {
      quantity: quantity-1
    }, (err, res) => {
      if (res.code == 200) {
        let amount = 0;
        app.fetch(API.checkoutCard, {}, (err, res) => {
          if (res.code == 200) {
            for (let i = 0; i < res.data.length; i++) {
              amount += res.data[i].price * res.data[i].quantity
            }
            that.setData({
              cardList: res.data,
              amount: amount
            })
          }
        })
      }
    })
  },
  deleteProduct:function(e){
    let that = this
    let data = e.currentTarget.dataset;
    let id = data.id
    app.post(API.updateCard.replace('{id}', id), {
      quantity: 0
    }, (err, res) => {
      if (res.code == 200) {
        let amount = 0;
        app.fetch(API.checkoutCard, {}, (err, res) => {
          if (res.code == 200) {
            for (let i = 0; i < res.data.length; i++) {
              amount += res.data[i].price * res.data[i].quantity
            }
            that.setData({
              cardList: res.data,
              amount: amount
            })
          }
        })
      }
    })
  },
  showModal:function(){
    if(this.data.amount){
      this.setData({
        showModal:true
      })
    }else{
      wx.showToast({
        title: '购物车为空，不能下单',
        icon:'none'
      })
    }
  },
  addressChange(e){
    this.setData({
      address:e.detail.value
    })
  },
  phoneChange(e){
    this.setData({
      phone: e.detail.value
    })
  },
  radioChange: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  createdOrder:function(e){
    let that = this;
    let address = that.data.address
    let phone = that.data.phone
    let value = that.data.value
    let cardList = that.data.cardList
    let product = []
    for(let i =0;i<cardList.length;i++){
      product.push({
        id:cardList[i].id,
        quantity: cardList[i].quantity
      })
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: API.createdOrder,
      method:'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data:{
        address: address,
        phone:phone,
        products: product,
        paymentType:value
      },
      success:function(res){
        if(res.data.code==200){
          that.setData({
            showModal:false
          })
          wx.showToast({
            title: '提交成功！',
            duration:2500
          })
          wx.navigateTo({
            url: '../index/index',
          })
        }else{
          that.setData({
            showModal: false
          })
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      },
      fail:function(err){

      },
      complete:function(){
        wx.hideLoading()
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
  
  }
})