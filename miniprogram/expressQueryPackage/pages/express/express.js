const app = getApp()
const db = wx.cloud.database()
const expressHistoryQuery = db.collection('expressHistoryQuery')
const _ = db.command

Page({
  data: {
    expressNumber: '',
    historyList: [],
    history_view: true,
    steps: []
  },
  onShow() {
    this.getExpressHistory()
  },
  onQueryClick() {
    // 调用云函数
    let callPara = {
      name: 'index',
      data: {
        $url: 'expressQueryOrder',
        com: 'ems',
        no: this.data.expressNumber,
        key: '799aaae9a1f4c9a468f5334e151cea4b'
      }
    }
    this.addExpressHistory()
    wx.cloud.callFunction(callPara).then(res => {
      if (res.result.resultcode === '200') {
        let list = []
        for (let i = 0; i < res.result.result.list.length; i++) {
          const element = res.result.result.list[i];
          list.push({text: element.datetime, desc: element.remark})
        }
        this.setData({
          history_view: false,
          steps: list
        })
      }
    })
  },
  ////添加一条当前用户的历史纪录
  addExpressHistory() {
    let dbPara = {
      data: {
        id: this.data.expressNumber,
        com: 'ems',
        no: this.data.expressNumber,
        date: new Date()
      }
    }
    expressHistoryQuery.doc(this.data.expressNumber).set(dbPara).then(res => {
      console.log(res);

    })
  },
  //获取当前用户的历史纪录
  getExpressHistory() {
    expressHistoryQuery.where({
      _openid: app.globalData.openid// 填入当前用户 openid
    }).limit(5).get().then(res => {
      this.setData({
        historyList: res.data
      })
    })
  },
  onChange(event) {
    this.setData({
      expressNumber: event.detail
    })
  }
})