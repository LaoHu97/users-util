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
  app.router('expressQueryOrder', async (ctx, next) => {
    await next()
  }, async (ctx, next) => {
    await next()
  }, async (ctx) => {
    const expressQueryOrder = require('expressQueryOrder/index.js')
    let c = await expressQueryOrder.querySuccessOrder(event, context, db, _, util, axios)
    console.log(c);
    if (c.code !== 'FAIL') {
      ctx.body = c
    } else {
      ctx.body = await expressQueryOrder.main(event, context, db, _, util, axios)
      await expressQueryOrder.setSuccessOrder(ctx.body, context, db, _, util, axios)
    }
  })

  return app.serve()
}