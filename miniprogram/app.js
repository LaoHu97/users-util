//app.js
import Dialog from './miniprogram_npm/vant-weapp/dialog/dialog';
import Notify from './miniprogram_npm/vant-weapp/notify/notify';

const updateManager = wx.getUpdateManager()
const updateTitle = 'v1.0.0版本发布'
const updateMessage = '1、优化了某些异常错误<br>2、啊啊撒撒反对犯得上豆腐干豆腐干'

App({
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true
    })
    this.updateMiniApp()
  },
  updateMiniApp() {
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log('===>>>请求完新版本信息' + JSON.stringify(res))
    })

    updateManager.onUpdateReady(function () {
      wx.hideTabBar({
        animation: true,
        complete: () => {
          Dialog.alert({
            title: updateTitle,
            message: updateMessage,
            confirmButtonText: '立即更新'
          }).then(() => {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          })
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      Notify({
        text: 'sorry，新版本加载失败！',
        duration: 3000
      });
    })
  },
  globalData: {
    userInfo: null
  }
})