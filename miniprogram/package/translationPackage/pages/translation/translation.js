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
    var checked = ''
    if (lr === 'l') {
      checked = this.data.toLang
    } else {
      checked = this.data.fromLang
    }
    var changed = {}
    for (var i = 0; i < this.data.languageCode.length; i++) {
      if (checked.indexOf(this.data.languageCode[i].value) !== -1) {
        changed['languageCode[' + i + '].checked'] = true
      } else {
        changed['languageCode[' + i + '].checked'] = false
      }
    }
    changed.fromLang = this.data.toLang
    changed.toLang = this.data.fromLang
    this.setData(changed)
  },
  clickLeft() {
    var checked = this.data.fromLang
    var changed = {}
    for (var i = 0; i < this.data.languageCode.length; i++) {
      if (checked.indexOf(this.data.languageCode[i].value) !== -1) {
        changed['languageCode[' + i + '].checked'] = true
      } else {
        changed['languageCode[' + i + '].checked'] = false
      }
    }
    changed.radioGroup = true
    this.setData(changed)
    lr = 'l'
  },
  clickRight() {
    var checked = this.data.toLang
    var changed = {}
    for (var i = 0; i < this.data.languageCode.length; i++) {
      if (checked.indexOf(this.data.languageCode[i].value) !== -1) {
        changed['languageCode[' + i + '].checked'] = true
      } else {
        changed['languageCode[' + i + '].checked'] = false
      }
    }
    changed.radioGroup = true
    this.setData(changed)
    lr = 'r'
  },
  radioChange(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.languageCode.length; i++) {
      if (checked.indexOf(this.data.languageCode[i].value) !== -1) {
        changed['languageCode[' + i + '].checked'] = true
      } else {
        changed['languageCode[' + i + '].checked'] = false
      }
    }
    changed.radioGroup = false
    if (lr === 'l') {
      changed.fromLang = checked
    } else {
      changed.toLang = checked
    }
    this.setData(changed)
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
    console.log(callPara);
    wx.cloud.callFunction(callPara).then(res => {
      console.info(res)
      Toast.clear()
      this.setData({
        textList: res.result.resRegions
      })
    }).catch(err => {
      Toast.clear()
      Toast('系统错误')
      console.log(err)
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
            console.log(res.fileID)
            this.updatedone(res.fileID)
          },
          fail: console.error
        })
      }
    })
  }
});