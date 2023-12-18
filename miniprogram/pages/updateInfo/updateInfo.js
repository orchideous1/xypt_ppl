
// pages/updateInfo/updateInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      //phone: '',
  },

  saveChange() {

      wx.setStorageSync('userInfo', this.data.userInfo);
      //wx.setStorageSync('phone', this.data.phone);
      wx.showToast({
        title: '修改成功',
      })
      wx.switchTab({
        url: '../person/person',
      })
  },

  updateAddress() {
      wx.navigateTo({
        url: '../address/address',
      })
  },

  // updatePhone(e) {
  //     wx.cloud.callFunction({
  //         name: 'getUserPhone',
  //         data: {
  //             cloudID: e.detail.cloudID,
  //         },
  //         success: (res) => {
  //             this.setData({
  //                 phone: res.result.list[0].data.phoneNumber,
  //             })
  //         }
  //     })
  // },
  timeId:0,
  updatexuehao(e){
    let value = e.detail.value  //拿到输入框中的值
    clearTimeout(this.timeId) //清除定时器
    this.timeId=setTimeout(()=>{
        this.updatexuehao_fd(value) //发送请求，间隔时间为1s
    },1000)
  },
  updatexuehao_fd(value){
    let userInfo = this.data.userInfo;
    userInfo.xuehao = value;
    //console(typeof value);
    this.setData({
        userInfo,
    })
  },
  updateNickName(e) {
    let value = e.detail.value  //拿到输入框中的值
    clearTimeout(this.timeId) //清除定时器
    this.timeId=setTimeout(()=>{
        this.updateNickName_fd(value) //发送请求，间隔时间为1s
    },1000)
  },
  updateNickName_fd(value){
    let userInfo = this.data.userInfo;
    userInfo.nickName = value;
    this.setData({
        userInfo,
    })
  },
  updateAvatar() {
      let userInfo = this.data.userInfo;
      wx.chooseMedia({
        count: 1,
        sizeType: ['original', 'compressed'],
        mediaType:['image'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          wx.showLoading({
            title: '加载中',
          })
          const random = Math.floor(Math.random() * 1000);
          wx.cloud.uploadFile({
              cloudPath: `avatar/${this.data.userInfo.nickName}-${random}.png`,
              filePath: res.tempFiles[0].tempFilePath,
              success: (res) => {
                  let fileID = res.fileID;
                  userInfo.avatarUrl = fileID;
                  this.setData({
                      userInfo,
                  })
                  wx.hideLoading()
              }
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var userInfo = wx.getStorageSync('userInfo');
      //const phone = wx.getStorageSync('phone');
      let hasuserInfo=!!userInfo;
      if(hasuserInfo){
        this.setData({
          userInfo,
        })
      }else{
        userInfo=new Object();
        userInfo.avatarUrl='../../images/touxiang.png';
        this.setData({
          userInfo,
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
