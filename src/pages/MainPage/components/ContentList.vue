<template>
  <div class='ContentList' v-if='dirList.length'>
    <div v-for="(item,index) in dirList" :key="index" @click='editContent(item,index)'
      :class="index==currentIndex?'check':'uncheck'">
      <i :style="{backgroundImage:item.type=='dir'?`url(${require('../images/dir.png')})`:``}"></i>
      <span>{{item.name}}</span>
    </div>
    <div class='ContentList__contain' v-if="isOpenDir">
      <ContentList :list="dirList[currentIndex].list" v-if='dirList.length && dirList[currentIndex].list'></ContentList>
    </div>
  </div>
</template>

<script>
  import githubOperate from '@common/githubOperate'
  import common from '@common/common'
  import {
    mapMutations
  } from 'vuex'
  export default {
    name: "ContentList",
    props: ['list'],
    data() {
      return {
        currentPath: '',
        currentIndex: 0
      }
    },
    created() {
      // this.editContent(this.list[0], 0)
    },
    computed: {
      isOpenDir() {
        let current = this.list[this.currentIndex]
        return current.type == 'dir' && current.isOpen
      },
      dirList() {
        let list = this.list
        list.forEach(res => {
          if (res.type == 'dir') {
            res.isOpen = false
          }
        })
        return this.list
      }
    },
    methods: {
      ...mapMutations({
        setCurrentPage: 'setCurrentPage'
      }),
      getContent(url) {
        githubOperate.getFromGitHub(url, this.account).then((res) => {
          let data = res
          let currentData = {}
          currentData.title = data.name
          currentData.id = data.id
          currentData.content = common.Base64.decode(data.content)
          this.setCurrentPage(currentData)
        })
      },
      getlist(url) {
        let account=localStorage.getItem('account')
        // this.dirList[this.currentIndex].list = [{
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
        githubOperate.getListFromGitHub(url,account).then((res) => {
          this.dirList[this.currentIndex].list = res
        })
      },
      editContent(item, index) {
        this.currentPath = item.path
        this.currentIndex = index
        if (item.type == 'dir') {
          this.dirList[this.currentIndex].isOpen = true
          this.getlist(this.dirList[this.currentIndex].url)
        } else if (item.type == 'file') {
          this.getContent(this.dirList[this.currentIndex].url)
        }
      }
    }


  }
</script>

<style lang='scss'>
  @mixin listItem {
    cursor: pointer;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.7;
    }

    >i {
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      width: 20px;
      height: 20px;
      display: inline-block;
    }

  }

  .ContentList {
    background: #dbdddf;
    min-width: 150px;
    height: 100%;
    overflow: auto;

    .check {
      @include listItem;
      background-color: #76aadf;

    }

    .uncheck {
      @include listItem;

      >span {
        color: rgb(117, 117, 117);
      }

      background: #dbdddf;
    }
  }
</style>