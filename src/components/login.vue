<template>
  <div id="login">
    <header>
      <div class="header">
        <div class="logo">
          <!-- <img src="./assets/spa_logo.png" /> -->
        </div>
        <div class="headerright">
          <div class="projectname">江苏省流量巡测在线平台</div>
        </div>
      </div>
    </header>
    <div class="loginContainer"></div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
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
  padding-top: 5px;
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
  line-height: 80px;
  font-weight: bolder;
  font-size: 32px;
  letter-spacing: 5px;
  text-shadow: 2px 2px #000;
}

header {
  width: 100%;
  height: 150px;
  background-color: #324098;
  float: left;
  color: #fff;

  /* line-height: 100px; */
}
.header {
  float: left;
  height: 150px;
  width: 100%;
}
.headerright {
  width: 100%;
  /* padding-left: 205px; */
  height: 150px;
  box-sizing: border-box;
  /* background-color: #e8eaf2; */
}
.loginContainer {
  height: 100%;
  padding-top: 150px;
  box-sizing: border-box;
}
</style>