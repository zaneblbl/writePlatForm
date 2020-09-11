import common from './common'
import axios from './axios'
var operate = {
  // 增
  addToGitHub(userName, path, msg = null) {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
    let params = {}
    return new Promise((resolve, reject) => {
      // // 需要获取文件sha
      params.message = `create${msg['title']}`
      // content内容需转成base64
      params.content = common.Base64.encode(JSON.stringify(msg))
      let json_params = ''
      if (params != null || params != undefined) {
        json_params = JSON.stringify(params)
        axios('put', url, json_params).then((res) => {
          resolve(res)
        }, (fail) => {
          reject(fail)
        })
      }

    })

  },
  // 查
  getFromGitHub(reqirectUrl,userName, path) {
    return new Promise((resolve, reject) => {
      let url = reqirectUrl || `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
      axios('get', url).then((res) => {

        resolve(res)
      }, (fail) => {
        reject(fail)
      })
    })

  },
  // 查列表
  getListFromGitHub(reqirectUrl,userName, path) {
    return new Promise((resolve, reject) => {
      let url = reqirectUrl || `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents${path.substring(path.indexOf('/') + 1)?'/'+path.substring(path.indexOf('/') + 1):path.substring(path.indexOf('/') + 1)}`
      axios('get', url).then((res) => {
        let result = res
        resolve(result)
      }, (fail) => {
        reject(fail)
      })
    })

  },
  // 获取sha
  getShaFromGitHub(reqirectUrl,userName, path) {
    return new Promise((resolve, reject) => {
      let url = reqirectUrl || `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
      axios('get', url).then((res) => {
        console.log(res);

        if (res.message == 'Not Found') {
          operate.addToGitHub(userName, path)
        } else {
          let result = res.sha
          resolve(result)
        }

      }, (fail) => {
        reject(fail)
      })
    })

  },
  // 改
  UpdateToGitHub(userName, path, msg) {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
    let params = {}

    return new Promise((resolve, reject) => {
      operate.getShaFromGitHub(userName, path).then((data) => {
        // // 需要获取文件sha
        params.sha = data
        params.message = 'upload note'
        // content内容需转成base64
        params.content = common.Base64.encode(JSON.stringify(msg))
        axios('put', url, JSON.stringify(params)).then((res) => {
          resolve(res)
        }, (fail) => {
          console.log(fail);
          reject(fail)
        })
      }, fail => {
        reject(fail)
      })

    })
  },
  // 删
  DeleteFromGitHub(userName, path) {
    return new Promise((resolve, reject) => {
      let url = `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}`
      let params = {}
      operate.getShaFromGitHub(userName, path).then((data) => {
        // // 需要获取文件sha
        params.sha = data
        params.message = 'delete note'
        url += `&message=${params.message}&sha=${params.sha}`

        axios('delete', url).then((res) => {
          resolve(res)
        }, (fail) => {
          console.log(fail);
          reject(fail)
        })
      }, fail => {
        reject(fail)
      })

    })

  },
}
export default operate
