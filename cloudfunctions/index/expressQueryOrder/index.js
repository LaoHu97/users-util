

// module.exports = {
//   main: async (event, context, db, _, util, axios) => {
//     return new Promise((resolve, reject) => {
//       axios.get('/exp/index', {
//         params: {
//           ID: 12345
//         }
//       })
//         .then(function (response) {
//           console.log(response);
//           resolve(response)
//         })
//         .catch(function (error) {
//           console.log(error);
//           reject(error)
//         });
//     })
//   }
// }
exports.main = async (event, context, db, _, util, axios) => {
  return new Promise((resolve, reject) => {
    axios.get('/exp/index', {
      params: event
    })
      .then(function (response) {
        console.log(response.data);
        
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
