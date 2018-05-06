// pages/list/list.js
import API from '../../utils/util.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    properties:[],
    allCategories: wx.getStorageSync('allCategories'),
    price:true,
    sellSort:true,
    priceSort:1,
    salesVolumeSort:2,
    brandId:[],
    categoryId: wx.getStorageSync('allCategories')[0].id,
    brands: wx.getStorageSync('brands'),
    propertiesData:[],
    properties:{},
    filterModal:false,
    brandsModal:false,
    filterItems:[],
    key:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.post(API.fetchCategory, {
      categoryId: that.data.allCategories[0].id,
      priceSort: that.data.priceSort,
      salesVolumeSort: that.data.salesVolumeSort,
      brandId: that.data.brandId
    }, (err, res) => {
      if (res.code == 200) {
        that.setData({
          listData: res.data
        })
        app.fetch(API.fetchProductProperty.replace('{id}', that.data.allCategories[0].id),{},(err,response) => {
          if(response.code==200){
            that.setData({
              propertiesData: response.data
            })
            let propertiesData = response.data;
            let properties = {}
            if (propertiesData.length!=0){
              for (let i = 0; i < propertiesData.length; i++) {
                properties[propertiesData[i].key]=''
              }
              that.setData({
                properties: properties
              })
            }
          }
        })
      }
    })
  },
  goDetail: function (e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  filter:function(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    app.post(API.fetchCategory, {
      categoryId: id,
      priceSort: that.data.priceSort,
      salesVolumeSort: that.data.salesVolumeSort,
      brandId: that.data.brandId
    }, (err, res) => {
      if (res.code == 200) {
        that.setData({
          listData: res.data
        })
      }
    })
    app.fetch(API.fetchProductProperty.replace('{id}',id), {}, (err, response) => {
      if (response.code == 200) {
        that.setData({
          propertiesData: response.data
        })
        let propertiesData = response.data;
        let properties = {}
        if (propertiesData.length != 0) {
          for (let i = 0; i < propertiesData.length; i++) {
            properties[propertiesData[i].key] = ''
          }
          that.setData({
            properties: properties
          })
        }
      }
    })
    that.setData({
      categoryId: id
    })
  },
  togglePrice:function(){
    let that = this;
    that.setData({
      price: !that.data.price
    })
    if (that.data.price){
      that.setData({
        priceSort:1
      })
    }else{
      that.setData({
        priceSort: 2
      })
    }
    let priceSort = that.data.priceSort
    let salesVolumeSort = that.data.salesVolumeSort
    let brandId = that.data.brandId;
    let categoryId = that.data.categoryId
    let properties = that.data.properties
    let options = {
      categoryId: categoryId,
      priceSort: priceSort,
      salesVolumeSort: salesVolumeSort,
      brandId: brandId
    }
    let filterOptions = Object.assign({}, options, properties)
    app.post(API.fetchCategory, {
      ...filterOptions
    }, (err, res) => {
      if (res.code == 200) {
        that.setData({
          listData: res.data
        })
      }
    })
  },
  toggleSeller:function(){
    let that = this;
    that.setData({
      sellSort: !that.data.sellSort
    })
    if (!that.data.sellSort) {
      that.setData({
        salesVolumeSort: 1
      })
    } else {
      that.setData({
        salesVolumeSort: 2
      })
    }
    let priceSort = that.data.priceSort
    let salesVolumeSort = that.data.salesVolumeSort
    let brandId = that.data.brandId;
    let categoryId = that.data.categoryId
    let properties = that.data.properties
    let options = {
      categoryId: categoryId,
      priceSort: priceSort,
      salesVolumeSort: salesVolumeSort,
      brandId: brandId
    }
    let filterOptions = Object.assign({}, options, properties)
    app.post(API.fetchCategory, {
      ...filterOptions
    }, (err, res) => {
      if (res.code == 200) {
        that.setData({
          listData: res.data
        })
      }
    })
  },
  
  //显示筛选
  toggleBrandsModal(){
    let that = this;
    that.setData({
      brandsModal: !that.data.brandsModal
    })
  },
  brandsChange(e){
    let that = this;
    that.setData({
      brandId:e.detail.value
    })
  },
  brandsFilter(){
    let that = this;
    let priceSort = that.data.priceSort
    let salesVolumeSort = that.data.salesVolumeSort
    let brandId = that.data.brandId;
    let categoryId = that.data.categoryId
    let properties = that.data.properties
    let options = {
      categoryId: categoryId,
      priceSort: priceSort,
      salesVolumeSort: salesVolumeSort,
      brandId: brandId
    }
    let filterOptions = Object.assign({}, options, properties)
    app.post(API.fetchCategory, {
      ...filterOptions
    }, (err, res) => {
      if (res.code == 200) {
        that.setData({
          listData: res.data
        })
      }
    })
    that.toggleBrandsModal()
  },
  toggleFilterModal(){
    let that = this;
    that.setData({
      filterModal: !that.data.filterModal
    })
  },
  showModal(e){
    let that = this;
    let data = e.currentTarget.dataset;
    let key = data.key;
    let propertiesData = that.data.propertiesData
    that.setData({
      key: key
    })
    for(let i =0;i<propertiesData.length;i++){
      if (propertiesData[i].key==key){
        that.setData({
          filterItems: propertiesData[i].values
        })
      }
    }
    that.toggleFilterModal()
  },
  filtersChange(e){
    let that = this
    let key = that.data.key;
    let properties = that.data.properties
    properties[key] = e.detail.value
    console.log(e.detail.value)
  },
  filters(){
    let that = this;
    let priceSort = that.data.priceSort
    let salesVolumeSort = that.data.salesVolumeSort
    let brandId = that.data.brandId;
    let categoryId = that.data.categoryId
    let properties = that.data.properties
    let options = {
      categoryId: categoryId,
      priceSort: priceSort,
      salesVolumeSort: salesVolumeSort,
      brandId: brandId
    }
    let filterOptions = Object.assign({}, options, properties)
    app.post(API.fetchCategory, {
      ...filterOptions
    }, (err, res) => {
      if (res.code == 200) {
        that.setData({
          listData: res.data
        })
      }
    })
    that.toggleFilterModal()
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