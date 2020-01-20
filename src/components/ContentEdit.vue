<template>
  <div class='ContentEdit'>
    <textarea name="" id="" v-model="nowContent" class='textarea'></textarea>
  </div>
</template>

<script>
export default {
  props: ['content'],
  data() {
    return {
      nowContent: ''
    }
  },
  watch: {
    content(newValue, oldValue) {
      this.nowContent = JSON.parse(this.content).content
    }
  }
}
</script>

<style lang='scss'>
.ContentEdit{
width:100%;
.textarea{
  width:100%;
  height:300px;
}
}
</style>
