<template>
  <div class='MainPage'>

    <Head @toDelete='toDelete' @showAddDialog='showAddDialog' @choosePath='choosePath' :path='path'></Head>
    <div class='mainbox'>

      <ContentList :list="list"></ContentList>
      <ContentEdit :content='content' @save='save'>
      </ContentEdit>

    </div>

    <AddDialog @addToGithub='add' @close='showAddDialog' v-if='isShowAddDialog'></AddDialog>

  </div>
</template>

<script>
  // import common from '../common/common'
  import Head from './components/Head.vue'
  import ContentList from './components/ContentList.vue'
  import githubOperate from '@common/githubOperate'
  import AddDialog from './components/AddDialog.vue'
  import ContentEdit from './components/ContentEdit.vue'

  export default {

    data() {
      return {
        token: '',
        account: 'zaneblbl',
        path: 'test/', // story/test/test2.json
        list: [],
        isShowAddDialog: false,
        maxId: 0,
        content: '',
        loading: false,
        currentTitle: '',
        currentId: '',
        currentPath: ''
      }
    },
    components: {
      ContentList,
      AddDialog,
      ContentEdit,
      Head
    },
    created() {
      this.token = localStorage.getItem('access_token') || ''
      this.account=localStorage.getItem('account') || ''
      this.getlist()
    },
    methods: {
      choosePath(path) {
        this.path = path
        this.list = []
        this.getlist()
      },
      getlist() {
//         let res=[
//   {
//     "name": "123.txt",
//     "path": "123.txt",
//     "sha": "bed0947afddd46bafb89cf1503b48ed9edc17196",
//     "size": 14,
//     "url": "https://api.github.com/repos/zaneblbl/test/contents/123.txt?ref=master",
//     "html_url": "https://github.com/zaneblbl/test/blob/master/123.txt",
//     "git_url": "https://api.github.com/repos/zaneblbl/test/git/blobs/bed0947afddd46bafb89cf1503b48ed9edc17196",
//     "download_url": "https://raw.githubusercontent.com/zaneblbl/test/master/123.txt?token=ALHE3JUA3RFCUVQ5WNKSWHC7LMZ52",
//     "type": "file",
//     "_links": {
//       "self": "https://api.github.com/repos/zaneblbl/test/contents/123.txt?ref=master",
//       "git": "https://api.github.com/repos/zaneblbl/test/git/blobs/bed0947afddd46bafb89cf1503b48ed9edc17196",
//       "html": "https://github.com/zaneblbl/test/blob/master/123.txt"
//     }
//   },
//   {
//     "name": "README.md",
//     "path": "README.md",
//     "sha": "00bcb6e3738c7392875d6c3e65c22d569eaff069",
//     "size": 6,
//     "url": "https://api.github.com/repos/zaneblbl/test/contents/README.md?ref=master",
//     "html_url": "https://github.com/zaneblbl/test/blob/master/README.md",
//     "git_url": "https://api.github.com/repos/zaneblbl/test/git/blobs/00bcb6e3738c7392875d6c3e65c22d569eaff069",
//     "download_url": "https://raw.githubusercontent.com/zaneblbl/test/master/README.md?token=ALHE3JQI5LSYBVD2CVKJKFK7LMZ52",
//     "type": "file",
//     "_links": {
//       "self": "https://api.github.com/repos/zaneblbl/test/contents/README.md?ref=master",
//       "git": "https://api.github.com/repos/zaneblbl/test/git/blobs/00bcb6e3738c7392875d6c3e65c22d569eaff069",
//       "html": "https://github.com/zaneblbl/test/blob/master/README.md"
//     }
//   },
//   {
//     "name": "common",
//     "path": "common",
//     "sha": "5a4095bed314a01d00062c88a096188526d3a6cb",
//     "size": 0,
//     "url": "https://api.github.com/repos/zaneblbl/test/contents/common?ref=master",
//     "html_url": "https://github.com/zaneblbl/test/tree/master/common",
//     "git_url": "https://api.github.com/repos/zaneblbl/test/git/trees/5a4095bed314a01d00062c88a096188526d3a6cb",
//     "download_url": null,
//     "type": "dir",
//     "_links": {
//       "self": "https://api.github.com/repos/zaneblbl/test/contents/common?ref=master",
//       "git": "https://api.github.com/repos/zaneblbl/test/git/trees/5a4095bed314a01d00062c88a096188526d3a6cb",
//       "html": "https://github.com/zaneblbl/test/tree/master/common"
//     }
//   }
// ]

//           this.list = res
//           this.maxId = res.length
        githubOperate.getListFromGitHub('',this.account, `${this.path}`).then((res) => {

          this.list = res
          this.maxId = res.length
        })
      },
      add(title) {
        this.loading = true
        let obj = {}
        obj.id = this.maxId + 1
        obj.title = title
        obj.content = ''
        githubOperate.addToGitHub(this.account, `${this.path}/${title}-${obj.id}.json`, obj).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getlist()
          this.loading = false
        }, ()=> {
          this.loading = false
          this.$message.error('添加失败')
        })
      },
      toDelete() {
        this.loading = true
        githubOperate.DeleteFromGitHub(this.account, `${this.currentPath}`).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getlist()
          this.loading = false
        }, () => {
          this.loading = false
          this.$message.error('删除失败')
        })
      },
      save(content) {
        this.loading = true
        let obj = {}
        obj.id = this.currentId
        obj.title = this.currentTitle
        obj.content = content
        githubOperate.UpdateToGitHub(this.account, `${this.path}/${obj.title}-${obj.id}.json`, obj).then(
          () => {
            this.loading = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          }, () => {
            this.loading = false
            this.$message.error('保存失败')
          })
      },
      showAddDialog() {
        this.isShowAddDialog = !this.isShowAddDialog
      }

    },


  }
</script>

<style lang='scss'>
  .MainPage {
    max-width: 1000px;
    height: 600px;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    box-shadow: 5px 10px 15px 2px rgba(0, 0, 0, 0.1);
  }

  .mainbox {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>