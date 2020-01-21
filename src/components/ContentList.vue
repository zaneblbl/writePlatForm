<template>
  <div class='ContentList'>
    <div v-for="(item,index) in list" :key="index" @click='editContent(item,index)' :class="index==currentIndex?'check':'uncheck'">
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
    editContent(item, index) {
      this.currentPath = item.path
      this.currentIndex = index
      this.$emit('editContent', item)
    }
  }
}
</script>

<style lang='scss'>
  .ContentList{
    border:1px solid ;
    width:150px;
    height:100%;
    overflow: scroll;
    .check{
      background-color:#ffd410
    }
    .uncheck{
      background-color: #fff
    }
  }
</style>
