import common from './common'
import axios from './axios'
var operate = {
  // 增
  addToGitHub(userName: string, accessToken: string, path: string, msg: any = null): Promise < any > {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
    let params: any = {}
    return new Promise((resolve, reject) => {
      // // 需要获取文件sha
      params.message = `create${msg['title']}`
      // content内容需转成base64
      params.content = common.Base64.encode(JSON.stringify(msg))
      let json_params: string = ''
      if (params != null || params != undefined) {
        json_params = JSON.stringify(params)
        axios('put', url, json_params).then((res: any) => {
          resolve(res)
        }, (fail: any) => {
          reject(fail)
        })
      }

    })

  },
  // 查
  getFromGitHub(userName: string, accessToken: string, path: string) {
    return new Promise((resolve, reject) => {
      let url = `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
      axios('get', url).then((res: any) => {
        let result = common.Base64.decode(res.content)
        resolve(result)
      }, (fail: any) => {
        reject(fail)
      })
    })

  },
  // 查列表
  getListFromGitHub(userName: string, accessToken: string, path: string) {
    return new Promise((resolve, reject) => {
      let url = `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
      axios('get', url).then((res: any) => {
        let result = res
        resolve(result)
      }, (fail: any) => {
        reject(fail)
      })
    })

  },
  // 获取sha
  getShaFromGitHub(userName: string, accessToken: string, path: string) {
    return new Promise((resolve, reject) => {
      let url = `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
      axios('get', url).then((res: any) => {
        console.log(res);

        if (res.message == 'Not Found') {
          operate.addToGitHub(userName, accessToken, path)
        } else {
          let result = res.sha
          resolve(result)
        }

      }, (fail: any) => {
        reject(fail)
      })
    })

  },
  // 改
  UpdateToGitHub(userName: string, accessToken: string, path: string, msg: string) {
    let url = `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
    let params: any = {}

    return new Promise((resolve, reject) => {
      operate.getShaFromGitHub(userName, accessToken, path).then((data) => {
        // // 需要获取文件sha
        params.sha = data
        params.message = 'upload note'
        // content内容需转成base64
        params.content = common.Base64.encode(JSON.stringify(msg))
        axios('put', url, JSON.stringify(params)).then((res: any) => {
          resolve(res)
        }, (fail: any) => {
          console.log(fail);
          reject(fail)
        })
      }, fail => {
        reject(fail)
      })

    })
  },
  // 删
  DeleteFromGitHub(userName: string, accessToken: string, path: string) {
    return new Promise((resolve, reject) => {
      let url = `https://api.github.com/repos/${userName}/${path.substring(0,
  path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
      let params: any = {}
      operate.getShaFromGitHub(userName, accessToken, path).then((data) => {
        // // 需要获取文件sha
        params.sha = data
        params.message = 'delete note'
        url += `&message=${params.message}&sha=${params.sha}`

        axios('delete', url).then((res: any) => {
          resolve(res)
        }, (fail: any) => {
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
