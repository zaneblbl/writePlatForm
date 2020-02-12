<template>
  <div class='Dialog'>
    <div class='cover' @click='close'></div>
    <div class='content'>
      <div class='content__item'><span>title:</span><input type="text" v-model='title'></div>
      <div class='submit' @click='submit'>确定</div>
      <div class='submit' @click='close'>取消</div>
    </div>
  </div>
</template>

<script lang='ts'>
  import {
    Component,
    Vue
  } from 'vue-property-decorator'
  @Component
  export default class AddDialog extends Vue {
    title: string = ''
    submit() {
      this.$emit('addToGithub', this.title)
      this.$emit('close', this.title)
    }
    close() {
      this.$emit('close', this.title)
    }

  }

</script>

<style lang='scss'>
  .Dialog {
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
      min-width: 100px;
      min-height: 100px;
      padding: 10px;

      .content__item {
        display: flex;

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
  }

</style>
