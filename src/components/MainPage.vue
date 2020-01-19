<template>
  <div class='MainPage'>
      <ContentList></ContentList>
  </div>
</template>

<script>
// import common from '../common/common'
import ContentList from './ContentList'
import githubOperate from '../common/githubOperate.js'
export default {
  data () {
    return {

    }
  },
  components: {
    ContentList
  },
  created() {
    this.submit()
  },
  methods: {
    // get_github_content (userName, accessToken, path) {
    //   let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
    //   return new Promise((resolve, reject) => {
    //     try {
    //       let xhr = new XMLHttpRequest()
    //       xhr.onreadystatechange = function () {
    //         if (xhr.status === 200 && xhr.readyState === 4) {
    //           resolve(xhr.responseText)
    //         }
    //       }
    //       xhr.open('get', url, true)
    //       xhr.send()
    //     } catch (e) {
    //       reject(e)
    //     }
    //   })
    // },
    // update_github_marks (userName, accessToken, path, msg) {
    //   let url = `https://api.github.com/repos/${userName}/${path.substring(0, path.indexOf('/'))}/contents/${path.substring(path.indexOf('/') + 1)}?access_token=${accessToken}`
    //   let params = {}
    //   this.get_github_content(userName, accessToken, path).then((data) => {
    //     params.sha = JSON.parse(data).sha
    //     params.message = 'upload note'
    //     // content内容需转成base64
    //     params.content = common.Base64.encode(JSON.stringify(msg))
    //     return new Promise((resolve, reject) => {
    //       try {
    //         let xhr = new XMLHttpRequest()
    //         xhr.onreadystatechange = function () {
    //           if (xhr.status === 200 && xhr.readyState === 4) {
    //             resolve(xhr.responseText)
    //           }
    //         }
    //         xhr.open('put', url, true)
    //         xhr.send(JSON.stringify(params))
    //       } catch (e) {
    //         reject(e)
    //       }
    //     })
    //   })
    // },
    submit () {
      // update_github_marks('zaneblbl', '9e869d2d1736e843d42d254dc690e5c26a753f8b','BookMark/noteBook.json', document.getElementById('note__textarea').value);
      let result = githubOperate.getFromGitHub('zaneblbl', '9e869d2d1736e843d42d254dc690e5c26a753f8b', 'story/noteBook.json')
      console.log(result)
    }

  }
}
</script>

<style lang='scss'>

</style>
