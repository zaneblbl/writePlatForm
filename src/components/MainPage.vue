
<template>
  <div class='MainPage'>

    <Head @toDelete='toDelete' @showAddDialog='showAddDialog' @choosePath='choosePath'></Head>
    <div class='mainbox'>

      <ContentList :list="list" @editContent='getContent' v-if='list.length'></ContentList>
      <ContentEdit :content='content' @save='save' v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.3)">
      </ContentEdit>

    </div>

    <AddDialog @addToGithub='add' @close='showAddDialog' v-if='isShowAddDialog'></AddDialog>

  </div>
</template>

<script lang='ts'>
  // import common from '../common/common'
  import Head from './Head.vue'
  import ContentList from './ContentList.vue'
  import githubOperate from '../common/githubOperate'
  import AddDialog from './AddDialog.vue'
  import ContentEdit from './ContentEdit.vue'
import {Component,Vue} from 'vue-property-decorator'
@Component
export default class MainPage extends Vue{
    data() {
      return {
        token: '',
        account: 'zaneblbl',
        path: 'story/test', // story/test/test2.json
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
      this.token = localStorage.getItem('token')
      this.account = localStorage.getItem('account')
      this.getlist()
    },
    methods: {
      choosePath(path) {
        this.path = 'story/' + path
        console.log(this.path)

        this.list = []
        this.getlist()
      },
      getlist() {
        githubOperate.getListFromGitHub(this.account, this.token, `${this.path}`).then(res => {
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
        githubOperate.addToGitHub(this.account, this.token, `${this.path}/${title}-${obj.id}.json`, obj).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getlist()
          this.loading = false
        }, e => {
          this.loading = false
          this.$message.error('添加失败')
        })
      },
      toDelete() {
        this.loading = true
        githubOperate.DeleteFromGitHub(this.account, this.token, `${this.currentPath}`).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getlist()
          this.loading = false
        }, e => {
          this.loading = false
          this.$message.error('删除失败')
        })
      },
      getContent(info) {
        this.loading = true
        githubOperate.getFromGitHub(this.account, this.token, `story/${info.path}`).then(res => {
          this.content = res
          let data = JSON.parse(res)
          this.currentTitle = data.title
          this.currentId = data.id
          this.currentPath = `story/${info.path}`
          this.loading = false
        })
      },
      save(content) {
        this.loading = true
        let obj = {}
        obj.id = this.currentId
        obj.title = this.currentTitle
        obj.content = content
        githubOperate.UpdateToGitHub(this.account, this.token, `${this.path}/${obj.title}-${obj.id}.json`, obj).then(
          res => {
            this.loading = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          }, e => {
            this.loading = false
            this.$message.error('保存失败')
          })
      },
      showAddDialog() {
        this.isShowAddDialog = !this.isShowAddDialog
      }

    }
  }

</script>

<style lang='scss'>
  .MainPage {
    width: 1000px;
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
