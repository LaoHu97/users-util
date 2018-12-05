exports.main = async (event, context, db, _, util, axios) => {
  const expressSuccessOrderFunction = val => {
    let expressSuccessOrder = new Promise((resolve, reject) => {
      val.date = new Date().getTime()
      console.log(val)
      
      db.collection('expressSuccessOrder').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          description: "learn cloud database",
          due: new Date("2018-09-01"),
          tags: [
            "cloud",
            "database"
          ],
          // 位置（113°E，23°N）
          location: new db.Geo.Point(113, 23),
          done: false
        }
      }).then(res => {
        console.log('--->>>更新或添加一条已签收的记录');
        
        resolve(res)
      })
    })
    return expressSuccessOrder
  }
  const expressQueryOrder = new Promise((resolve, reject) => {
    let para = {
      params: {
        no: event.no,
        type: event.type
      }
    }
    console.log('查询订单号码入参：' + JSON.stringify(para))
    axios.get('/cexpress', para).then(res => {
      resolve(res.data)
      return res.data
    }).then(res => {
      if (res.code === 'OK' && res.state === '3') {
        expressSuccessOrderFunction(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
  return expressQueryOrder
}