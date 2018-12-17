//index.js
const app = getApp()

Page({
  data: {
    imgUrls: [
      'https://vpssss.oss-cn-qingdao.aliyuncs.com/user-util/banner/123123.jpg?x-oss-process=style/compression-image'
    ]
  },
  onShareAppMessage() {
    return {
      title: '一个会思考的工具箱',
      path: '/pages/myapp/myapp'
    }
  },
  onLoad() {

  }
});