<template>
  <div class='ContentEdit'>
    <textarea name="" id="" v-model="nowContent" class='textarea'></textarea>
    <div class='areaBar'>
      <div class='bar__areacount'>字数：{{nowContent.length}}</div>
    </div>
    <div @click='toSave' class='save'>save</div>
  </div>
</template>

<script lang='ts'>
import {Component,Vue} from 'vue-property-decorator'
@Component
export default class AddDialog extends Vue{
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
    height: 100%;

    .textarea {
      width: 100%;
      height: calc(100% - 30px);
      background: rgba(197, 197, 197, 0.98);
      border-radius: 0 15px 0 0;
      font-size: 20px;
      line-height: 24px;
      background: #ffffff;
      color: #000000;
      outline: none;
      resize: none;
      border:none;

    }

    .areaBar {
      width: 100%;
      height: 30px;

      .bar__areacount {
        font-size: 14px;
        float: right;
      }
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
