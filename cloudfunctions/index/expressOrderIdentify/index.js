


exports.main = async (event, context, db, _, util, axios) => {
  let expressOrderIdentify =  new Promise((resolve, reject) => {
    let para = {
      RequestData: {
        LogisticCode: event.LogisticCode
      },
      EBusinessID: '1410112',
      RequestType: '2002',
      DataSign: '',
      DataType: '2'
    }
    console.log('订单识别入参：' + JSON.stringify(util.kdniaoApi(para)))
    axios.post('/Ebusiness/EbusinessOrderHandle.aspx', util.kdniaoApi(para))
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
  return expressOrderIdentify
}
