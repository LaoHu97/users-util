import {languageCode} from './languageCode'

Page({
  data: {
    bottomShow: false,
    areaList: {}
  },
  onShow() {
    this.setData({
      loading: false,
      areaList: languageCode
    });
  },
  toggleBottomPopup() {
    this.setData({
      bottomShow: !this.data.bottomShow
    });
  }
});