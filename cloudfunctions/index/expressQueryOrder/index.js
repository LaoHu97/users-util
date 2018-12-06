const main = async (event, context, db, _, util, axios) => {
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
    }).catch(err => {
      reject(err)
    })
  })
  return expressQueryOrder
}

const setSuccessOrder = async (event, context, db, _, util, axios) => {
  try {
    if (event.state === '3') {
      event.date = new Date().getTime()
      event.id = event.no
      return new Promise((resolve, reject) => {
        db.collection('expressSuccessOrder').doc(event.no).set({
          data: event
        }).then(res => {
          console.log('--->>>更新或添加一条已签收的记录')
          resolve(res)
        })
      })
    }
  } catch (error) {
    console.error(error)
  }
}
const querySuccessOrder = async (event, context, db, _, util, axios) => {
  try {
    return new Promise((resolve, reject) => {
      db.collection('expressSuccessOrder').doc(event.no).get().then(res => {
        console.log('--->>>获取一条已签收的记录')
        resolve(res.data)
      }).catch(err => {
        resolve({code: 'FAIL'})
      })
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  main: main,
  setSuccessOrder: setSuccessOrder,
  querySuccessOrder: querySuccessOrder
}