<template>
  <div class='Head'>
    <div class='addBtn' @click='showAddDialog'></div>
    <div class='deleteBtn' @click='toDelete'></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
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
    margin-right:20px;
    cursor:pointer;
  }

  .Head {
    background:#dbdddf;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding:0 40px;

    .addBtn {
      @include image;
      background-image: url('../assets/image/add.png')
    }

    .deleteBtn {
      @include image;
      background-image: url('../assets/image/delete.png')
    }
  }

</style>
