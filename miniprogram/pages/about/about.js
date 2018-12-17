// miniprogram/pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eqSrc: 'https://vpssss.oss-cn-qingdao.aliyuncs.com/user-util/images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181217120020.jpg?x-oss-process=style/compression-image'
  },

  tapImage() {
    wx.previewImage({
      urls: [this.data.eqSrc] // 需要预览的图片http链接列表
    })
  }
})