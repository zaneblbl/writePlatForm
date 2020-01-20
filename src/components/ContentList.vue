<template>
  <div class='ContentList'>
    <div v-for="(item,index) in list" :key="index" @click='editContent(item.path,index)' :class="index==currentIndex?'check':'uncheck'">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      currentPath: '',
      currentIndex: 0
    }
  },
  methods: {
    editContent(path, index) {
      this.currentPath = path
      this.currentIndex = index
      this.$emit('editContent', path)
    }
  }
}
</script>

<style lang='scss'>
  .ContentList{
    border:1px solid ;
    width:150px;
    height:300px;
    overflow: scroll;
    .check{
      background-color:#ffd410
    }
    .uncheck{
      background-color: #fff
    }
  }
</style>
