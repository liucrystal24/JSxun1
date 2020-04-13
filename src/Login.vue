<template>
  <div>
    <header>
      <div class="header">
        <div class="logo">
          <img src="./assets/spa_logo.png" />
        </div>
        <div class="headerright">
          <div class="projectname">江苏省流量巡测在线平台</div>
        </div>
      </div>
    </header>
    <div class="loginContainer">
      <div class="loginContent">
        <div class="loginHeader">江苏省流量巡测在线平台登录</div>
        <el-form
          ref="loginInfo"
          :model="loginInfo"
          label-width="80px"
          style="width:60%;margin:0 auto;"
        >
          <el-form-item label="地区">
            <el-select v-model="loginInfo.userArea" placeholder="请选择登录地区">
              <el-option label="江苏省" value="js"></el-option>
              <el-option label="南京市" value="nj"></el-option>
              <el-option label="无锡市" value="wx"></el-option>
              <el-option label="徐州市" value="xz"></el-option>
              <el-option label="常州市" value="cz"></el-option>
              <el-option label="苏州市" value="sz"></el-option>
              <el-option label="南通市" value="nt"></el-option>
              <el-option label="连云港市" value="lyg"></el-option>
              <el-option label="淮安市" value="ha"></el-option>
              <el-option label="盐城市" value="yc"></el-option>
              <el-option label="扬州市" value="yz"></el-option>
              <el-option label="镇江市" value="zj"></el-option>
              <el-option label="台州市" value="tz"></el-option>
              <el-option label="宿迁市" value="sq"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="loginInfo.userName" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input placeholder="请输入密码" v-model="loginInfo.password" show-password></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit" class="loginbutton">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginInfo: {
        userArea: "",
        userName: "",
        password: ""
      },
      loginsuccess: false
    };
  },
  mounted() {},
  methods: {
    onSubmit(){
      this.$emit('onChange',this.loginsuccess)
    }
  }
};
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  min-height: 608px;
  min-width: 1080px;
}
.logo {
  width: 100px;
  height: 80px;
  overflow: hidden;
  background-color: #324098;
  padding-top: 10px;
  float: left;
  box-sizing: border-box;
}
.logo img {
  height: 70px;
}
.pcompany {
  width: 100%;
  line-height: 50px;
  height: 50px;
  font-size: 18px;
  color: #fff;
}
.projectname {
  float: left;
  position: relative;
  left: 20px;
  line-height: 100px;
  font-weight: bolder;
  font-size: 32px;
  letter-spacing: 5px;
  text-shadow: 2px 2px #000;
}

header {
  width: 100%;
  height: 100px;
  background-color: #324098;
  float: left;
  color: #fff;
  /* line-height: 100px; */
}
.header {
  float: left;
  height: 100px;
  width: 100%;
}
.headerright {
  width: 100%;
  /* padding-left: 205px; */
  height: 100px;
  box-sizing: border-box;
  /* background-color: #e8eaf2; */
}
.loginContainer {
  height: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  background-image: url("assets/river.jpg");
  /* filter: blur(2px); */
}
.loginContent {
  width: 500px;
  height: 400px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 8px 8px 8px #1f1f1f;
  /* margin:auto; */
  position: absolute;
  left: 50% !important;
  top: 55% !important;
  transform: translate(-50%, -50%);
}
.loginHeader {
  height: 80px;
  line-height: 70px;
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 2px;
}
.el-form-item {
  height: 50px;
}
.loginbutton {
  padding: 10px 20px;
}
</style>