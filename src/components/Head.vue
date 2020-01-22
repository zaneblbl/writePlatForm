<template>
  <div class='Head'>
    <div class='chooseBtn' @click='showPath'></div>
    <div class='addBtn' @click='showAddDialog'></div>
    <div class='deleteBtn' @click='toDelete'></div>

    <PathList v-if='showChoosePath' @close='showPath' @submit='choosePath'></PathList>
  </div>
</template>

<script>
import PathList from './PathList'
export default {
  data() {
    return {
      showChoosePath: false
    }
  },
  components: {
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
      background-image: url('../assets/image/add.png')
    }

    .deleteBtn {
      @include image;
      background-image: url('../assets/image/delete.png')
    }

    .chooseBtn {
      @include image;
      background-image: url('../assets/image/choose.png')
    }
  }

</style>
