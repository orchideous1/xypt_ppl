const db=wx.cloud.database()
// pages/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      defalutAddress: true,
      build: '',
      houseNumber: '',
      name: '',
      phone: '',
      isEdit: false,
      editNow: false,
      editIndex: 0,
  },

  saveAddress() {
    var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      const {
          build,
          houseNumber,
          name,
          phone,
          defalutAddress,
          isEdit,
          editNow,
          index,
      } = this.data;
      if (!build||!houseNumber||!name||!phone){
        wx.showToast({
          title: '请填写完整信息',
          icon:'error'
        })
        return;
      }else if (!(reg_tel.test((phone)))){
        wx.showToast({
          title: '请检查手机号',
          icon:'error'
        })
        return;
      }
      let address = wx.getStorageSync('address');
              if (!isEdit && defalutAddress && address) {
                  for (let i = 0; i < address.length; i++) {
                      if (address[i].defalutAddress) {
                          wx.showToast({
                              icon: 'none',
                              title: '已存在默认地址!',
                          })
                          return;
                      }
                  }
      }
      const form = {
          build,
          houseNumber,
          name,
          phone,
          defalutAddress,
      };
      if (!address) {
          address = [form];
      } else {
          if (editNow) {
              address[Number(index)] = form;
          } else {
              address.push(form);
          }
      }
      wx.setStorageSync('address', address);
      db.collection('user').where({
        _openid:wx.getStorageSync('openid')
      }).update({
        data:{
          userInfo:wx.getStorageSync('userInfo'),
          address:address
        }
      })
      wx.navigateBack({
          delta: 3
      })
  },

  handleChangeSwitch(e) {
      this.setData({
          defalutAddress: e.detail.value
      })
  },

  getPhone(e) {
      this.setData({
          phone: e.detail.value
      })
  },

  getName(e) {
      this.setData({
          name: e.detail.value
      })
  },

  getHouseNumber(e) {
      this.setData({
          houseNumber: e.detail.value
      })
  },

  selectBuild() {
    // wx.getLocation({
    //   type:'gcj02',
    //   success:function(res){
    //     wx.openLocation({
    //       latitude: res.latitude,
    //       longitude: res.longitude
    //     })
    //   }
    // })
      wx.navigateTo({
          url: '../selectBuild/selectBuild',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const {
          build, address, index
      } = options;
      if (address) {
          const { build: builds, houseNumber, name, phone, defalutAddress } = JSON.parse(address);
          if (defalutAddress) {
              this.setData({
                  isEdit: true
              })
          }
          this.setData({
              build: builds,
              houseNumber,
              name,
              phone,
              defalutAddress,
              index,
              editNow: true,
          })
      } else {
          this.setData({
              build,
              phone:wx.getStorageSync('phone')
          })
      }
  
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
