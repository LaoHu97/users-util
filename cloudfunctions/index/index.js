// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const util = require('./util/util')
const axios = require('axios')

cloud.init()
axios.defaults.baseURL = 'http://v.juhe.cn';

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  app.router('expressQueryOrder', async (ctx, next) => {
    await next()
  }, async (ctx, next) => {
    await next()
  }, async (ctx) => {
    const expressQueryOrder = require('expressQueryOrder/index.js')
    ctx.body = expressQueryOrder.main(event, context, db, _, util, axios)
  });
  return app.serve()
}