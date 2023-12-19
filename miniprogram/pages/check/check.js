// pages/check/check.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['学生认证', '接单员认证'],
    tabNow: 0,
    studentVerify: [],
    receiverVerify: []
  },

  addkey() {
    var i = 0;
    let receiverVerify = this.data.receiverVerify
    let studentVerify = this.data.studentVerify
    console.log(this.data.studentVerify)
    while (i < receiverVerify.length) {
      receiverVerify[i]['unfold'] = false
      i++
    }
    while (i < studentVerify.length) {
      studentVerify[i]['unfold'] = false
      i++
    }
    console.log(studentVerify)
    this.setData({
      receiverVerify,
      studentVerify
    })
  },
  accept(e) {
    let idx = e.currentTarget.dataset.id
    let state=e.currentTarget.dataset.result
    if (this.data.tabNow == 1) {
      let receiverVerify = this.data.receiverVerify
      console.log(receiverVerify[idx]._id)
      // receiverVerify[idx]['state']="通过"
      db.collection("orderReceive").where({
        _id: receiverVerify[idx]._id
      }).update({
        data: {
          state,
        },
        success: (res) => {
          this.onLoad()
        },
        fail: (res) => {
          console.log(res)
        }
      })
    } else {
      let receiverVerify = this.data.studentVerify
      console.log(receiverVerify[idx]._id)
      // receiverVerify[idx]['state']="通过"
      db.collection("studentVerify").where({
        _id: receiverVerify[idx]._id
      }).update({
        data: {
          state,
        },
        success: (res) => {
          this.onLoad()
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }

  },
  imgDetail(e) {
    let tmp = e.currentTarget.dataset.url
    // console.log(tmp)
    wx.previewImage({
      urls: [tmp],
    })
  },
  unfold(e) {
    if (this.data.tabNow == 1) {
      let receiverVerify = this.data.receiverVerify
      // console.log(e)
      let idx = e.currentTarget.dataset.id
      receiverVerify[idx]['unfold'] = !receiverVerify[idx]['unfold']
      this.setData({
        receiverVerify
      })
    }else{
      let studentVerify = this.data.studentVerify
      // console.log(e)
      let idx = e.currentTarget.dataset.id
      studentVerify[idx]['unfold'] = !studentVerify[idx]['unfold']
      this.setData({
        studentVerify
      })
    }

  },
  selectTab(e) {
    const {
      id
    } = e.currentTarget.dataset;
    this.setData({
      tabNow: id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getStudentVerify() {
    const that = this
    let studentVerify = []
    db.collection('studentVerify').where({
      state: "待审核"
    }).get({
      success: (res) => {
        studentVerify = res.data
        console.log(studentVerify)
        that.setData({
          studentVerify,
        })
      },

    })
  },
  onLoad(options) {
    let receiverVerify = []
    let that = this
    var i;
    this.getStudentVerify()
    db.collection('orderReceive').where({
      // _openid:wx.getStorageSync('openid'),
      state: "待审核"
    }).get({
      success: (res) => {
        receiverVerify = res.data
        // console.log(res)
        that.setData({
          receiverVerify,
        })
        that.addkey()
      },

    })
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