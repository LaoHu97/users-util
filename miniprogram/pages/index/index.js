//index.js
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://vpssss.oss-cn-qingdao.aliyuncs.com/123123.png'
    ]
  },
  onShareAppMessage() {
    return {
      title: '一个会说话的工具箱',
      path: '/pages/myapp/myapp'
    }
  },
  onLoad() {

  }
});