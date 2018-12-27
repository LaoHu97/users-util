const crypto = require('crypto')
const kdniaoKey = '526c4803-a7c1-447a-b314-f5645133f086'

function md5Sign(data) {
  // 加入字符编码
  let md5 = crypto.createHash('md5').update(data, 'utf-8').digest('hex');
  return md5;
}

function kdniaoApi(para) {
  let md5DataSign = encodeURI(new Buffer(md5Sign(JSON.stringify(para.RequestData) + kdniaoKey)).toString('base64'))
  let urlRequestData = encodeURI(JSON.stringify(para.RequestData))
  return `RequestData=${urlRequestData}&EBusinessID=${para.EBusinessID}&RequestType=${para.RequestType}&DataSign=${md5DataSign}&DataType=${para.DataType}`
}

module.exports = {
  md5Sign: md5Sign,
  kdniaoApi: kdniaoApi
};