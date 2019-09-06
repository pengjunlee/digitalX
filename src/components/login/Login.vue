<template>
  <div id="login">
    <div class="top">情报中心&nbsp;·&nbsp;用数据改变未来</div>
    <div class="content">
      <div class="login">
        <div class="title">欢迎登录</div>
        <div class="line">
          <img class="smallImg" src="./icon1.png" />
          <input placeholder="请输入账号" type="text" id="name" />
        </div>
        <div class="line">
          <img class="smallImg" src="./icon2.png" />
          <input placeholder="请输入密码" type="password" id="password" />
        </div>
        <div class="error"></div>
        <button type="button" class="logBut" @click="login">登&nbsp;&nbsp;录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login: function() {
      // 进行简单地登录验证
      var name = $.trim($("#name").val());
      var password = $("#password").val();
      var $error = $(".error");
      if (name.length === 0) {
        $error.text("用户名不能为空");
        $("#name").focus();
        return false;
      } else if (password.length === 0) {
        $("#password").focus();
        $error.text("密码不能为空");
        return false;
      } else {
        // 发送登录请求，返回json格式响应数据
        this.jsonAxios
          .post("/api/v1/login", { name: name, password: password })
          .then(res => {
            if (res.code === 0) {
              // 将用户数据保存到vuex
              console.log(res.data);
              this.$store.dispatch("updateUserAction", res.data.user);
              this.$router.push("/home");
            } else {
              $error.text(res.msg);
            }
          })
          .catch(error => {
            console.log(error);
            $error.text("登录验证异常，请稍后重试！");
          });
      }
    }
  }
};
</script>

<style type="text/css" scoped>
#login {
  background-image: url(./login_bg.jpg);
  text-align: center;
  background-size: 100% 100%;
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}

.top {
  background: #f6f6f65e;
  width: 100%;
  position: absolute;
  top: 0;
  line-height: 80px;
  left: 0px;
  right: 0px;
  color: #fff;
  text-align: left;
  padding-left: 80px;
  font-size: 26px;
  font-weight: 600;
  box-sizing: border-box;
}

.login {
  background: #f6f6f6;
  width: 21%;
  min-width: 280px;
  text-align: center;
  padding: 70px 2%;
  border-radius: 2px;
  position: absolute;
  top: 23%;
  right: 5%;
}

.title {
  font-weight: 600;
  font-size: 22px;
  color: #333;
  margin-bottom: 40px;
}

.line {
  border-bottom: 1px solid #d8d8d8;
  margin: 22px 1%;
  width: 96%;
}

.line input {
  border: none;
  padding: 0px 1%;
  margin: 1%;
  background: #f6f6f6;
  width: 84%;
  font-size: 16px;
  line-height: 30px;
  outline: none;
}

.line .smallImg {
  width: 26px;
  float: left;
  vertical-align: middle;
  margin-top: 1px;
}

.logBut {
  background: #28a745;
  padding: 10px 80px;
  border: none;
  color: #fff;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
}

.error {
  height: 30px;
  color: red;
}
</style>
