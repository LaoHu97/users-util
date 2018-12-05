exports.main = async (event, context, db, _, util, axios) => {
  let expressQueryOrder = new Promise((resolve, reject) => {
    let para = {
      params: {
        no: event.no,
        type: event.type
      }
    }
    console.log('查询订单号码入参：' + JSON.stringify(para))
    axios.get('/cexpress', para).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
  })
  return expressQueryOrder
}