const app = getApp()
const db = wx.cloud.database()
const expressHistoryQuery = db.collection('expressHistoryQuery')
const _ = db.command

import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast'
import { KDN } from '../expressSelech/KDN'

Page({
  data: {
    expressNumber: '',
    historyList: [],
    buttomView: 0,
    steps: [],
    expressSelech: {
      name: '自动',
      code: ''
    }
  },
  onLoad(query) {

  },
  onShow() {
    wx.getClipboardData({
      success: res => {
        if (/^[a-zA-Z0-9]{6,18}$/.test(res.data)) {
          this.setData({
            expressNumber: res.data
          }) 
        }
      }
    })
  },
  onReady() {
    this.getExpressHistory()
  },
  bindClearClick() {
    this.getExpressHistory()
  },
  expressSelechClick() {
    wx.navigateTo({
      url: '/expressQueryPackage/pages/expressSelech/expressSelech'
    })
  },
  historyClick(item) {
    console.log(item);
    this.setData({
      expressNumber: item.target.dataset.item.LogisticCode
    }, () => {
      this.onQueryClick()
    })
  },
  onQueryClick() {
    if (!this.data.expressNumber) {
      this.getExpressHistory()
      Toast('请输入快递单号')
      return
    }
    // 调用云函数
    let callPara = {
      name: 'index',
      data: {
        $url: 'expressQueryOrder',
        ShipperCode: this.data.expressSelech.code,
        LogisticCode: this.data.expressNumber,
      }
    }
    Toast.loading({ mask: true, message: '请稍后...' });
    wx.cloud.callFunction(callPara).then(res => {
      Toast.clear()
      console.info(res)
      if (!res.result.Success) {
        this.getExpressHistory()
        Toast(res.result.Reason)
        return
      }
      let list = res.result.Traces.map(item => {
        return {
          text: item.AcceptTime,
          desc: item.AcceptStation
        }
      })
      this.setData({
        buttomView: 2,
        steps: list
      })
      this.addExpressHistory(res.result)
    })
  },
  //更新或添加一条当前用户的历史纪录
  addExpressHistory(val) {
    let dbPara = {
      data: val
    }
    dbPara.data.id = this.data.expressNumber
    dbPara.data.name = KDN.filter(item => item.code === val.ShipperCode)[0].name
    dbPara.data.date = new Date().getTime()
    expressHistoryQuery.doc(this.data.expressNumber).set(dbPara).then(res => {
      console.log('历史记录更新或添加成功');
    })
  },
  //获取当前用户的历史纪录
  getExpressHistory() {
    expressHistoryQuery.limit(5).orderBy('date', 'desc').get().then(res => {
      this.setData({
        historyList: res.data,
        buttomView: 1
      })
    })
  },
  onChange(event) {
    this.setData({
      expressNumber: event.detail
    })
  },
  onConfirm() {
    this.onQueryClick()
  }
})