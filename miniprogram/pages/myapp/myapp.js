//index.js
const app = getApp()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog'

Page({
  data: {
    avatarUrl: '',
    userInfo: '',
    logged: false
  },

  onLoad() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  serviceClick() {
    Dialog.alert({
      message: '如果长时间未回复，请留言说明问题并留下联系方式',
      confirmButtonOpenType: 'contact'
    }).then(() => {
      // on close
    });
  },
  onGetUserInfo(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  }
})