const crypto = require('crypto')
const youdaoID = 'qJlYc0IS5buu1qkte0IfwFuLXlGg64aY'
function md5Sign(data) {
  // 加入字符编码
  let md5 = crypto.createHash('md5').update(data, 'utf-8').digest('hex');
  return md5;
}

function youdaoSign(para) {
  return md5Sign(para.appKey + para.q + para.salt + youdaoID)
}

module.exports = {
  md5Sign: md5Sign,
  youdaoSign: youdaoSign
};