<template>
  <div class='MainPage'>
    <div class='mainbox'>
      <ContentList :list="list" @editContent='getContent'></ContentList>
      <ContentEdit :content='content'></ContentEdit>
    </div>

      <div class='add' @click='showAddDialog' >新增</div>
      <AddDialog @addToGithub='add' @close='showAddDialog' v-if='isShowAddDialog'></AddDialog>
  </div>
</template>

<script>
// import common from '../common/common'
import ContentList from './ContentList'
import githubOperate from '../common/githubOperate.js'
import AddDialog from './AddDialog'
import ContentEdit from './ContentEdit'
export default {
  data () {
    return {
      token: 'bb124286ed1b5400ea51e6883ba5e5070e0bb27e',
      account: 'zaneblbl',
      path: 'story/test', // story/test/test2.json
      list: [],
      isShowAddDialog: false,
      maxId: 0,
      content: ''
    }
  },
  components: {
    ContentList,
    AddDialog,
    ContentEdit
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() {
      githubOperate.getListFromGitHub(this.account, this.token, `${this.path}`).then(res => {
        this.list = res
        this.maxId = res.length
      })
    },
    add(title) {
      let obj = {}
      obj.id = this.maxId + 1
      obj.title = title
      obj.content = ''
      githubOperate.addToGitHub(this.account, this.token, `${this.path}/${title}-${obj.id}.json`, obj).then(res => {
        this.getlist()
      })
    },
    getContent(path) {
      githubOperate.getFromGitHub(this.account, this.token, `story/${path}`).then(res => {
        this.content = res
        // this.list = res
        // this.maxId = res.length
      })
    },
    save () {
      let obj = {}
      obj.id = '1'
      obj.title = 'fdsa'
      obj.content = '少时诵诗书dass'
      githubOperate.UpdateToGitHub(this.account, this.token, `${this.path}/${obj.title}-${obj.id}.json`, obj).then(res => {
        console.log(res)
      })
    },
    showAddDialog() {
      this.isShowAddDialog = !this.isShowAddDialog
    }

  }
}
</script>

<style lang='scss'>
.mainbox{
  display: flex;
}
</style>
