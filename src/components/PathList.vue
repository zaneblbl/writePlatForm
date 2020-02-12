<template>
  <div class='PathList'>
    <div class='cover' @click='close'></div>
    <div class='content'>
      <div class='content__item'>
        <div v-for="(item,index) in list" :key="index" @click='choose(item,index)'
          :class="index==currentIndex?'check':'uncheck'">
          {{item.name}}
        </div>
      </div>
      <div class='submit' @click='submit'>确定</div>
      <div class='submit' @click='close'>取消</div>
    </div>

  </div>
</template>

<script lang='ts'>
  import githubOperate from '../common/githubOperate'
  import {
    Component,
    Vue
  } from 'vue-property-decorator'
  @Component
  export default class PathList extends Vue {
    list: any[] = []
    currentPath: string = ''
    currentIndex: number = 0
    created() {
      this.getlist()
    }

    getlist() {
      let account = localStorage.getItem('account') || ''
      let token = localStorage.getItem('token') || ''
      let path = `story/`
      githubOperate.getListFromGitHub(account, token, `${path}`).then((res: any) => {
        this.list = res
        this.currentPath = this.list[0].path
      })
    }
    choose(item: any, index: number) {
      this.currentPath = item.path
      this.currentIndex = index
    }
    submit() {
      console.log(this.currentPath)

      this.$emit('submit', this.currentPath)
    }
    close() {
      this.$emit('close')
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
      opacity: 0.6;
    }
  }

  .PathList {
    .cover {
      position: fixed;
      background-color: rgba(0, 0, 0, 0.3);
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      z-index: 1000;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    position:fixed;

    .content {
      z-index: 1001;
      background: #fff;
      border-radius: 10px;
      min-width: 300px;
      min-height: 300px;
      padding: 10px;

      .content__item {
        display: flex;
        flex-direction: column;

        >span {
          margin-right: 10px;
          font-size: 18px;
        }
      }

      .submit {
        background: linear-gradient(90deg, #ffed5c, #ffce06);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        padding: 10px;
        color: #161616;
        margin-top: 15px;
      }
    }

    .check {
      @include listItem;
      background-color: #94b6d8;

    }

    .uncheck {
      @include listItem;
      color: rgb(117, 117, 117);
      background: #dbdddf;
    }
  }

</style>
