<template>
  <div class='Login' v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.3)">
    <div class='contentBox'>
      <div class='item'><span>clientID: </span>
        <el-input type="text" v-model='clientID' class='item__input'></el-input>
      </div>
      <div class='item'><span>clientSecret: </span>
      <el-input type="text" v-model='clientSecret' class='item__input'></el-input>
      </div>

      <div @click='init' class='login'>登录</div>
    </div>
  </div>
</template>

<script lang='ts'>
  import axios from '../common/axios'
  import common from '../common/common'
  import {
    Component,
    Vue
  } from 'vue-property-decorator'
  @Component
  export default class Login extends Vue {
    clientID: string = ''
    clientSecret: string = ''
    access_token: string = ''
    loading: boolean = false
    loginText: string = ''

    created() {
      // this.init()
    }
    init() {
      let self = this
      // 获取clientID和clientSecret
      this.access_token = localStorage.getItem('access_token') || ''
      if (this.access_token) {
        self.$router.push({
          path: `/MainPage`
        })
      } else {
        if (window.location.href.indexOf(`https://zaneblbl.github.io/z-plug`) != -1) {
          self.loginListener(self.clientID, self.clientSecret)
        }
        // else {
        //   let loginBtn = document.createElement('a')
        //   loginBtn.id = 'zPlug__login__btn'
        //   loginBtn.classList.add('zPlug__login__btn')
        //   loginBtn.innerHTML = `<div>Login</div>`
        //   loginBtn.href = `https://zaneblbl.github.io/z-plug/`
        //   window.document.body.appendChild(loginBtn);
        // }
      }


    }
    toLogin(param:any) {
      let self = this
      axios('get',
        `https://github.com/login/oauth/access_token?client_id=${param.clientID}&client_secret=${param.clientSecret}&code=${param.code}`
      ).then((res:any) => {
        let token = common.getQueryVariable(res, 'access_token') || ''
        localStorage.setItem('access_token', token)
      })

    }
    loginListener(clientID:string, clientSecret:string) {
      let url = `https://github.com/login/oauth/authorize?client_id=${clientID}`
      let code = common.getQueryVariable(window.location.href,'code')
      if (code) {
        let param = {
          'clientID': clientID,
          'clientSecret': clientSecret,
          'code': code
        }
        this.toLogin(param)
      } else {
        // github第三方授权登录后返回回调页面带回code
        window.location.href = url
      }
    }
  }

</script>

<style lang="scss">
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
