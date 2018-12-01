const app = getApp()
const db = wx.cloud.database()
const expressHistoryQuery = db.collection('expressHistoryQuery')
const _ = db.command

import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    expressNumber: '',
    historyList: [],
    history_view: true,
    steps: []
  },
  onShow() {
    wx.getClipboardData({
      success: res => {
        console.log(res.data)
      }
    })
  },
  onReady() {
    this.getExpressHistory()
  },
  onQueryClick() {
    if (!this.data.expressNumber) {
      return Toast('请输入快递单号')
    }
    // 调用云函数
    let callPara = {
      name: 'index',
      data: {
        $url: 'expressQueryOrder',
        ShipperCode: 'YZPY',
        LogisticCode: this.data.expressNumber,
      }
    }
    Toast.loading({ mask: true, message: '请稍后...' });
    wx.cloud.callFunction(callPara).then(res => {
      Toast.clear()
      console.log(res);
      if (!res.result.Success) {
        this.setData({
          history_view: true
        })
        Toast(res.result.Reason)
        return
      }
      let list = []
      for (let i = 0; i < res.result.Traces.length; i++) {
        const element = res.result.Traces[i];
        list.push({ text: element.AcceptTime, desc: element.AcceptStation })
      }
      this.setData({
        history_view: false,
        steps: list
      })
      // this.addExpressHistory(res.result.result.company)
    })
  },
  //更新或添加一条当前用户的历史纪录
  addExpressHistory(val) {
    let dbPara = {
      data: {
        id: this.data.expressNumber,
        com: 'ems',
        no: this.data.expressNumber,
        date: new Date(),
        company: val
      }
    }
    expressHistoryQuery.doc(this.data.expressNumber).set(dbPara).then(res => {
      console.log('历史记录更新或添加成功');
    })
  },
  //获取当前用户的历史纪录
  getExpressHistory() {
    expressHistoryQuery.where({
      _openid: app.globalData.openid// 填入当前用户 openid
    }).limit(5).orderBy('date', 'desc').get().then(res => {
      this.setData({
        historyList: res.data
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