<template>
  <div class='PathList'>
    <div class='cover' @click='close'></div>
    <!-- 内容 -->
    <div class='content'>
      <div class='content__item'>
        <!-- 添加 -->
        <div class='addList'>
          <input type="text" class='list__input' v-model='list__input__value'>
          <button  @click='addPathlist'>添加</button>
        </div>
        <!-- 列表 -->
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
    Vue,
    Prop
  } from 'vue-property-decorator'
  @Component
  export default class PathList extends Vue {
    @Prop()
    path: string
    list: any[] = []
    currentPath: string = ''
    currentIndex: number = 0
    list__input__value:string=''
    created() {
      this.getlist()
    }
    addPathlist() {
      console.log(this.list__input__value);

    }
    getlist() {
      let account = localStorage.getItem('account') || ''
      let token = localStorage.getItem('token') || ''
      githubOperate.getListFromGitHub(account, token, `${this.path}`).then((res: any) => {
        if (res.length) {
          this.list = res
          this.currentPath = this.list[0].path
        }
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
        .addList{
            >input{
                width:100px;
            }
            >button{
                        background: linear-gradient(90deg, #ffed5c, #ffce06);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        padding: 10px;
        color: #161616;

            }
        }

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
