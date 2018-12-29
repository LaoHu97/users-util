import {
  languageCode
} from './languageCode'
var lr = ''
import Toast from '../../../../miniprogram_npm/vant-weapp/toast/toast'

Page({
  data: {
    languageCode: languageCode,
    imageSrc: 'https://vpssss.oss-cn-qingdao.aliyuncs.com/user-util/images/shili.jpg?x-oss-process=style/compression-image',
    radioGroup: false,
    fromLang: 'zh-CHS',
    toLang: 'en',
    textList: []
  },
  clickCenter() {
    let t = ''
    if (lr === 'l') {
      t = this.data.toLang
    } else {
      t = this.data.fromLang
    }
    let changed = this.checkedIndexOf(t)
    changed.fromLang = this.data.toLang
    changed.toLang = this.data.fromLang
    this.setData(changed)
  },
  clickLeft() {
    let changed = this.checkedIndexOf(this.data.fromLang)
    changed.radioGroup = true
    this.setData(changed)
    lr = 'l'
  },
  clickRight() {
    let changed = this.checkedIndexOf(this.data.toLang)
    changed.radioGroup = true
    this.setData(changed)
    lr = 'r'
  },
  radioChange(e) {
    let changed = this.checkedIndexOf(e.detail.value)
    if (lr === 'l') {
      changed.fromLang = e.detail.value
    } else {
      changed.toLang = e.detail.value
    }
    changed.radioGroup = false
    this.setData(changed)
  },
  checkedIndexOf(data) {
    let checked = data
    let changed = {}
    for (let i = 0; i < this.data.languageCode.length; i++) {
      if (checked.indexOf(this.data.languageCode[i].value) !== -1) {
        changed['languageCode[' + i + '].checked'] = true
      } else {
        changed['languageCode[' + i + '].checked'] = false
      }
    }
    return changed
  },
  // 阻止蒙层冒泡
  preventTouchMove: function () {

  },
  maskBindTap() {
    this.setData({
      radioGroup: false
    })
  },
  updatedone(data) {
    // 调用云函数
    let callPara = {
      name: 'cloudTranslation',
      data: {
        $url: 'imageTranslation',
        from: this.data.fromLang,
        to: this.data.toLang,
        q: data
      }
    }
    wx.cloud.callFunction(callPara).then(res => {
      Toast.clear()
      console.log(res);
      
      this.setData({
        textList: res.result.resRegions
      })
    }).catch(err => {
      Toast.clear()
      Toast('系统错误')
    })
  },
  updateImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({
          imageSrc: res.tempFilePaths[0]
        })
        Toast.loading({
          mask: true,
          message: '快马加鞭···',
          duration: 0
        })
        wx.cloud.uploadFile({
          cloudPath: `translationFile/${Date.now()}.jpeg`, // 上传至云端的路径
          filePath: res.tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            this.updatedone(res.fileID)
          },
          fail: console.error
        })
      }
    })
  }
});