<template>
  <div class='ContentList'>
    <div v-for="(item,index) in list" :key="index" @click='editContent(item,index)'
      :class="index==currentIndex?'check':'uncheck'">
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
    created() {
      this.editContent(this.list[0], 0)
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

  .ContentList {
    background: #dbdddf;
    width: 150px;
    height: 100%;
    overflow: auto;

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