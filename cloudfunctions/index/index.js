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
  const app = new TcbRouter({ event })

  // 单号查询
  app.router('expressQueryOrder', async (ctx, next) => {
    await next()
  }, async (ctx, next) => {
    await next()
  }, async (ctx) => {
    const expressQueryOrder = require('expressQueryOrder/index.js')
    ctx.body = expressQueryOrder.main(event, context, db, _, util, axios)
    // if (event.tracking_number) {
    //   ctx.body = expressQueryOrder.main(event, context, db, _, util, axios) 
    // }else{
    //   const expressOrderIdentify = require('expressOrderIdentify/index.js')
    //   console.log('调用订单识别');
    //   let c = await expressOrderIdentify.main(event, context, db, _, util, axios)
    //   console.info('传入订单所属快递公司' + JSON.stringify(c));
    //   if (!c.Shippers || !c.Shippers.length) {
    //     return ctx.body = {
    //       Success: false,
    //       Reason: '快递单号不存在或输入错误'
    //     }
    //   }
    //   event.ShipperCode = c.Shippers[0].ShipperCode
    //   ctx.body = await expressQueryOrder.main(event, context, db, _, util, axios)
    // }
  });
  // 单号识别
  app.router('expressOrderIdentify', async (ctx, next) => {
    await next()
  }, async (ctx, next) => {
    await next()
  }, async (ctx) => {
    const expressOrderIdentify = require('expressOrderIdentify/index.js')
    ctx.body = expressOrderIdentify.main(event, context, db, _, util, axios)
  });
  return app.serve()
}