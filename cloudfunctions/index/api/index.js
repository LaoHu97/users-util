const axios = require('axios')

exports.instance = axios.create({
  baseURL: 'http://v.juhe.cn',
  timeout: 40000
})