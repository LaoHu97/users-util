const main = async (event, context, db, _, util, instance) => {
  const imageTranslation = new Promise((resolve, reject) => {
    let para = {
      type: encodeURI('1'),
      from: encodeURI(event.from),
      to: encodeURI(event.to),
      appKey: encodeURI('7ee8a9ca86b8dc93'),
      salt: encodeURI(Date.now()),
      q: event.q
    }
    para.sign = util.youdaoSign(para)
    para.q = encodeURI(para.q)
    console.log('--->>>图片翻译入参：' + JSON.stringify(para))
    instance.post('/ocrtransapi', para).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
  return imageTranslation
}

const getImage = async (event, context, db, _, util, instance, cloud) => {
  const fileID = event.q
  const res = await cloud.downloadFile({
    fileID,
  })
  const buffer = res.fileContent
  return buffer.toString('base64')
}

module.exports = {
  main: main,
  getImage: getImage
}