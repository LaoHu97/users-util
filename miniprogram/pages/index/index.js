//index.js
const app = getApp()

Page({
  data: {
    userInfoShow: false
  },
  onLoad() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
            }
          })
        }else{
          this.setData({
            userInfoShow: true
          });
        }
      }
    })
    if (!app.globalData.openid) {
      this.onGetOpenid()
    }
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
  },
  onGetOpenid() {
    // 调用云函数
    let callPara = {
      name: 'login',
      data: {}
    }
    wx.cloud.callFunction(callPara).then(res => {
      app.globalData.openid = res.result.openid
    })
  },
});
