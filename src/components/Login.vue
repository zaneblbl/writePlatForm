<template>
  <div class='Login' v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.3)">
    <div class='contentBox'>
      <div class='item'><span>token: </span>
        <el-input type="text" v-model='tokenValue' class='item__input'></el-input>
      </div>
      <div @click='toLogin' class='login'>登录</div>
      <div @click='save' class='save'>保存</div>
    </div>
  </div>
</template>

<script lang='ts'>
  import axios from '../common/axios'
  import {
    Component,
    Vue
  } from 'vue-property-decorator'
  @Component
  export default class Login extends Vue {
    tokenValue:string = ''
    loading:boolean = false
    loginText:string = ''

    created() {
      if (localStorage.getItem('token')) {
        this.tokenValue = localStorage.getItem('token')||''
      }
    }

    alert() {
      this.$alert(this.loginText, '登录', {
        confirmButtonText: '确定',
        center: true,
        callback: action => {}
      })
    }
    save() {
      if (this.tokenValue) {
        localStorage.setItem('token', this.tokenValue)
        this.loginText = '保存成功'
        this.alert()
      }
    }
    toLogin() {
      let url = `https://api.github.com/?access_token=` + this.tokenValue
      if (this.tokenValue) {
        this.loading = true
        axios('get', url).then(res => {
          this.loading = false
          localStorage.setItem('token', this.tokenValue)
          localStorage.setItem('account', 'zaneblbl')
          this.$router.push({
            path: '/MainPage'
          })
        }, error => {
          this.loading = false
          if (error.response.status === 401) {
            this.loginText = '验证失败，令牌错误'
            this.alert()
          } else {
            this.loginText = '登录失败'
            this.alert()
          }
        })
      } else {
        this.loginText = '令牌不能为空'
        this.alert()
      }
    }

  }

</script>

<style lang='scss'>
  .Login {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .contentBox {
      width: 300px;
      height: 300px;
      border: 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 30px;
      font-size: 14px;

      .item {
        display: flex;
        align-items: center;

        .item__input {
          padding: 5px;
          font-size: 14px;
        }
      }

      .login,
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
        width: 100%;

        &:hover {
          background: linear-gradient(90deg, #fde73e, #ffce06);
          cursor: pointer;
        }
      }
    }
  }

</style>
