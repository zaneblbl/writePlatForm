<template>
  <div class='Head'>
    <div class='chooseBtn' @click='showPath' title='文章列表'></div>
    <div class='addBtn' @click='showAddDialog' title='添加章节'></div>
    <div class='deleteBtn' @click='toDelete' title='删除章节'></div>

    <PathList v-if='showChoosePath' @close='showPath' @submit='choosePath' :path='path'></PathList>
  </div>
</template>

<script>
  import PathList from './PathList.vue'
  export default {
    props: ['path', 'showChoosePath'],
    data(){
      return {

      }
    },
    components:{
      PathList
    },
    methods: {
      showPath() {
        this.showChoosePath = !this.showChoosePath
      },
      choosePath(path) {
        this.$emit('choosePath', path)
      },
      showAddDialog() {
        this.$emit('showAddDialog')
      },
      toDelete() {
        this.$emit('toDelete')
      }
    }


  }
</script>

<style lang='scss'>
  @mixin image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 25px;
    height: 25px;
    margin-right: 20px;
    cursor: pointer;
  }

  .Head {
    background: #dbdddf;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 40px;

    .addBtn {
      @include image;
      background-image: url('../images/add.png')
    }

    .deleteBtn {
      @include image;
      background-image: url('../images/delete.png')
    }

    .chooseBtn {
      @include image;
      background-image: url('../images/choose.png')
    }
  }
</style>