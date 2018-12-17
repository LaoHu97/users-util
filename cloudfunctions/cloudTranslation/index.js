// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const util = require('./util/util')
const axios = require('axios')

cloud.init()

const instance = axios.create({
  baseURL: 'http://openapi.youdao.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
});

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
  // 图片翻译
  const ocrtran = require('ocrtran/index.js')
  app.router('imageTranslation', async (ctx, next) => {
    await ocrtran.getImage(event, context, db, _, util, instance, cloud).then(async res => {
      event.q = res
      ctx.body = await ocrtran.main(event, context, db, _, util, instance)
    })
  })
  return app.serve()
}