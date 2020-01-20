<template>
  <div class='MainPage'>
      <ContentList></ContentList>
  </div>
</template>

<script>
// import common from '../common/common'
import ContentList from './ContentList'
import githubOperate from '../common/githubOperate.js'
export default {
  data () {
    return {

    }
  },
  components: {
    ContentList
  },
  created() {
    this.submit()
  },
  methods: {
    submit () {
      let result = githubOperate.UpdateToGitHub('zaneblbl', 'b03b144fbd1f10cb1ac033d994358c9190f67728', 'story/test/test.json', 'erqer')
      console.log(result)
    }

  }
}
</script>

<style lang='scss'>

</style>
