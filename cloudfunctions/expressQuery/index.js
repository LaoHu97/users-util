// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const util = require('./util/util')
const axios = require('axios')

cloud.init()
axios.defaults.baseURL = 'https://cexpress.market.alicloudapi.com'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=UTF-8'
axios.defaults.headers.common['Authorization'] = 'APPCODE c184641fd8da4274a43ee955dfc71405'

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  // 单号查询
  const expressQueryOrder = require('expressQueryOrder/index.js')

  app.router('expressQueryOrder', async (ctx, next) => {
    await expressQueryOrder.querySuccessOrder(event, context, db, _, util, axios).then(res => {
      console.log("--->>>获取到数据库记录")
      ctx.body = res
    }).catch(async err => {
      console.log("--->>>没有获取到数据库记录，并请求API查询")
      ctx.body = await expressQueryOrder.main(event, context, db, _, util, axios)
      console.log("--->>>请求API查询并set一条成功记录");
      await expressQueryOrder.setSuccessOrder(ctx.body, context, db, _, util, axios)
    })
  })
  return app.serve()
}