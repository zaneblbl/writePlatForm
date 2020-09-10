<template>
  <div class='Login'>
    <div class='contentBox'>
      <div class='item'><span>clientID: </span>
        <input type="text" v-model='clientID' class='item__input'>
      </div>
      <div class='item'><span>clientSecret: </span>
        <input type="text" v-model='clientSecret' class='item__input'>
      </div>

      <div @click='init' class='login'>登录</div>
    </div>
  </div>
</template>

<script>
  import axios from '@common/axios'
  import common from '@common/common'
  export default {
    data() {
      return {
        clientID: '3d3b51cea6b8867e0f2c',
        clientSecret: '9a9c5abf88dee6622b7175bdfae6567f002f9ef3',
        access_token: '',
        loading: false,
        loginText: ''
      }
    },


    created() {
      let code = common.getQueryVariable(window.location.href, 'code')
      if (code) {
        this.init()
      }
    },
    methods: {
      init() {
        let self = this
        console.log(this.access_token);
        // 获取clientID和clientSecret
        this.access_token = localStorage.getItem('access_token') || ''
        if (this.access_token) {
          self.$router.push({
            path: `/MainPage`
          })
        } else {
          self.loginListener(self.clientID, self.clientSecret)
        }


      },
      toLogin(param) {
        console.log(param);
        axios('get',
          `https://github.com/login/oauth/access_token?client_id=${param.clientID}&client_secret=${param.clientSecret}&code=${param.code}`
        ).then((res) => {
          console.log(res);
          let token = common.getQueryVariable(res, 'access_token') || ''
          localStorage.setItem('access_token', token)
        })

      },
      loginListener(clientID, clientSecret) {
        let url = `https://github.com/login/oauth/authorize?client_id=${clientID}`
        let code = common.getQueryVariable(window.location.href, 'code')
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