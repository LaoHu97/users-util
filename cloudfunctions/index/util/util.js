const crypto = require('crypto')

function md5Sign(data) {
  // 加入字符编码
  let md5 = crypto.createHash('md5').update(data, 'utf-8').digest('hex');
  return md5;
}


module.exports = {
  md5Sign: md5Sign
};