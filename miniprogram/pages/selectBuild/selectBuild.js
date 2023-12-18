// pages/selectBuild/selectBuild.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabList: ['宿舍楼', '教学楼'],
      tabNow: 0,
      dorm:[
        '荔园1栋',
        '荔园2栋',
        '荔园3栋',
        '荔园4栋',
        '荔园5栋',
        '荔园6栋',
        '荔园7栋',
        '荔园8栋',
        '荔园9栋',
        '荔园10栋',
      ],
      teachBuilding:[
        'T2',
        'T3',
        'T4',
        'T5',
        '主楼',
        '活动中心',
        'K栋',
        '信息楼',
        'A栋',
        'F栋',
        '操场',
        '经管楼',
      ]
  },

  selectBuild(e) {
      const index = e.currentTarget.dataset.index;
      const that = this.data;
      const build = that.tabNow?that.teachBuilding[index]:that.dorm[index];
      //`${that.tabList[that.tabNow]}-${index + 1}号楼`
      wx.navigateTo({
        url: `../addAddress/addAddress?build=${build}`
      })
  },

  selectTab(e) {
      const id = e.currentTarget.dataset.id;
      this.setData({
          tabNow: id,
      })
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

  }
})