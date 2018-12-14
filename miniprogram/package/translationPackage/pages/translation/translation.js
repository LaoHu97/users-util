import {
  languageCode
} from './languageCode'
var lr = ''

Page({
  data: {
    languageCode: languageCode,
    imageSrc: 'https://vpssss.oss-cn-qingdao.aliyuncs.com/user-util/images/ocrtrans3.jpeg?x-oss-process=style/compression-image',
    radioGroup: false,
    fromLang: 'zh-CHS',
    toLang: 'en'
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
    wx.cloud.callFunction(callPara).then(res => {
      console.info(res)
    })
  },
  updateImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({
          imageSrc: res.tempFilePaths[0]
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log(res)
            this.updatedone(res.data)
          }
        })
      }
    })
  }
});