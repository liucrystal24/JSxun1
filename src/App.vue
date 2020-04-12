<template>
  <div id="app">
    <header>
      <div class="header">
        <div class="logo">
          <img src="./assets/spa_logo.png" />
          <!-- <div class="pcompany">中国气象科学研究院</div> -->
        </div>
        <div class="headerright">
          <div class="projectname">江苏省流量巡测在线平台</div>
          <el-avatar :src="userimg" class="user"></el-avatar>
          <div class="headernav">
            <div class="navcontent" @click="navchange1">
              <router-link :to="{name:'n1c4'}" class="nava" :class="{nav_active:navshow == 1}">
                <img src="./assets/river.png" alt class="navimg" />
                <div class="navtext">实时数据</div>
              </router-link>
            </div>
            <div class="navcontent" @click="navchange2">
              <router-link :to="{name:'n2c1'}" class="nava" :class="{nav_active:navshow == 2}">
                <img src="./assets/workflow.png" alt class="navimg" />
                <div class="navtext">测流管理</div>
              </router-link>
            </div>
            <div class="navcontent" @click="navchange3">
              <router-link :to="{name:'n3c1'}" class="nava" :class="{nav_active:navshow == 3}">
                <img src="./assets/duanmian.png" alt class="navimg" />
                <div class="navtext">断面维护</div>
              </router-link>
            </div>
            <div class="navcontent" @click="navchange4">
              <router-link :to="{name:'n4c1'}" class="nava" :class="{nav_active:navshow == 4}">
                <img src="./assets/datatable.png" alt class="navimg" />
                <div class="navtext">数据分析</div>
              </router-link>
            </div>
            <div class="navcontent" @click="navchange5">
              <router-link :to="{name:'n5c1'}" class="nava" :class="{nav_active:navshow == 5}">
                <img src="./assets/rootsetting.png" alt class="navimg" />
                <div class="navtext">用户管理</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="projectname">人工增雨随机化试验样本数据库</div> -->
    </header>

    <router-view class="navchildren" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      navshow: 1,
      userimg:require("@/assets/user.png")
    };
  },
  methods: {
    navchange1() {
      this.navshow = 1;
    },
    navchange2() {
      this.navshow = 2;
    },
    navchange3() {
      this.navshow = 3;
    },
    navchange4() {
      this.navshow = 4;
    },
    navchange5() {
      this.navshow = 5;
    }
  },
  mounted() {
    this.navshow = this.$route.path.split('/')[1].split('nav')[1]
  },
};
</script>

<style>
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
  /* width: 100px; */
  /* line-height: 80px; */
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
.headernav {
  /* padding-left:170px; */
  width: 100%;
  /* margin-left: 170px; */
  height: 70px;
  /* background-color: #e8eaf2; */
  float: left;
}
.navcontent {
  float: left;
  width: 20%;
  height: 100%;
  line-height: 70px;
  box-sizing: border-box;
  background: linear-gradient(to top, #bfcede, #eef2f3);
}
.nava {
  height: 100%;
  width: 100%;
  display: flex;
  font-size: 15px;
  text-decoration: none;
  color: #242c67;
  /* background-color: #1d6ec7; */
  border-right: 1px solid #6f7981;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}
.navimg {
  height: 40px;
  /* line-height: 70px; */
  float: left;
  margin-right: 15px;
}
.navtext {
  float: left;
  /* font-size: 16px; */
}
.nav_active {
  background: linear-gradient(to top, #ffff6f, #ffffff) !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.navchildren {
  height: 100%;
  /* position: absolute; */
  padding-top: 150px;
  box-sizing: border-box;
}
.el-avatar{
  background-color: #fff;
}
.user{
  position: absolute;
  right:40px;
  top:20px;

}
</style>
