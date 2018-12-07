import { KDN } from './KDN'
Page({
  data: {
    KDN: []
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  tapExpress(event) {
    let getPages = getCurrentPages()
    let prevPage = getPages[getPages.length - 2]
    prevPage.setData({
      expressSelech: event.target.dataset.express
    }, () => {
      wx.navigateBack({
        delta: 1
      })
    })
  },
  onReady() {
    let storeCity = new Array(27);
    const words = ["*", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    KDN.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      let code = item.code;
      storeCity[index].list.push({
        name: item.name,
        key: firstName,
        code: code
      });
    })
    this.setData({
      KDN: storeCity
    })
  }
});
