<template>
  <div class='ContentEdit'>
    <textarea name="" id="" v-model="nowContent" class='textarea'></textarea>
    <div @click='toSave' class='save'>save</div>
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
  },
  methods: {
    toSave() {
      this.$emit('save', this.nowContent)
    }
  }
}

</script>

<style lang='scss'>
  .ContentEdit {
    width: 100%;

    .textarea {
      width: 100%;
      height: 100%;
    }

    .save {
      background: linear-gradient(90deg, #ffed5c, #ffce06);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      font-size: 15px;
      padding: 10px;
      color: #161616;
      margin-top: 15px;
      width: 100px;

      &:hover {
        background: linear-gradient(90deg, #fde73e, #ffce06);
        cursor: pointer;
      }
    }
  }

</style>
