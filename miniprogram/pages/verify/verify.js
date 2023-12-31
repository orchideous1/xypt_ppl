// pages/verify/verify.js
const db=wx.cloud.database()
import { getTimeNow } from '../../utils/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateIndex:0,
    dateArray:['2023级','2022级','2021级','2020级'],
    imageUrl:"/images/身份证正面.png"
  },
  uploadImg(){
    let that=this
    wx.chooseImage({
      success(e){
        console.log(e)
        that.setData({
          imageUrl:e.tempFilePaths[0]
        })
      }
    })
  },
  submit(){
    let that=this
    if (this.data.imageUrl=="/images/身份证正面.png"){
      wx.showToast({
        title: '请上传学生证明',
        icon:"none"
      })
      return;
    }
    db.collection("studentVerify").add({
      data:{
        state:"待审核",
        userInfo:wx.getStorageSync('userInfo'),
        year:that.data.dateArray[that.data.dateIndex],
        imageUrl:that.data.imageUrl,
        time: getTimeNow(),
      },
      success:(res)=>{
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
  selectDate(e){
    this.setData({
      dateIndex:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})