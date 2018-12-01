


exports.main = async (event, context, db, _, util, axios) => {
  return new Promise((resolve, reject) => {
    let para = {
      RequestData: {
        LogisticCode: event.LogisticCode,
        ShipperCode: event.ShipperCode
      },
      EBusinessID: '1410112',
      RequestType: '1002',
      DataSign: '',
      DataType: '2'
    }
    let md5DataSign = encodeURI(new Buffer(util.md5Sign(JSON.stringify(para.RequestData) + '526c4803-a7c1-447a-b314-f5645133f086')).toString('base64'))
    let urlRequestData = encodeURI(JSON.stringify(para.RequestData))
    let paraAxios = `RequestData=${urlRequestData}&EBusinessID=${para.EBusinessID}&RequestType=${para.RequestType}&DataSign=${md5DataSign}&DataType=${para.DataType}`
    console.log(paraAxios);
    axios.post('/Ebusiness/EbusinessOrderHandle.aspx', paraAxios)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
