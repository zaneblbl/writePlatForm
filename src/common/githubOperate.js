import common from './common.js'
import axios from './axios.js'
/* eslint-disable */
var operate = {
  // 增
  addToGitHub() {

  },
  // 删
  deleteToGitHub() {

  },
  // 查
  getFromGitHub(userName, accessToken, path) {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`

    axios('get', url).then(res => {
      let data=JSON.parse(res)
      let result=common.Base64.decode(data.content)
      return result
    },fail=>{
      console.log(fail);
    })
  },
  // 改
  UpdateToGitHub() {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
    let params = {}
    operate.getFromGitHub(userName, accessToken, path).then((data) => {
      params.sha = JSON.parse(data).sha
      params.message = 'upload note'
      // content内容需转成base64
      params.content = common.Base64.encode(JSON.stringify(msg))
      axios('put', url,JSON.stringify(params)).then(res => {
        return res
      },fail=>{
        console.log(fail);
      })
    })
  }
}
export default operate
