


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
    console.log('查询订单号码入参：' + JSON.stringify(util.kdniaoApi(para)))
    axios.post('/Ebusiness/EbusinessOrderHandle.aspx', util.kdniaoApi(para))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
