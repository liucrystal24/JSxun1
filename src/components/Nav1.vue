<template>
  <div class="hello">
    <div class="leftnav">
      <!-- <div class="lefttitle">
        <i class="el-icon-s-data"></i>
        水文数据
      </div>-->
      <!-- <div :class="{ leftactive: leftnum == 1 }" class="leftnavitem" @click="leftnav1">
        <router-link :to="{ name: 'n1c1' }" class="lefta">站点管理</router-link>
      </div>
      <div :class="{ leftactive: leftnum == 4 }" class="leftnavitem" @click="leftnav4">
        <router-link :to="{ name: 'n1c4' }" class="lefta">地图总览</router-link>
      </div>-->
      <!-- <div :class="{ leftactive: leftnum == 5 }" @click="leftnav5" class="leftnavitem">
        <router-link :to="{ name: 'n1c5' }" class="lefta">报警设置</router-link>
      </div>-->
      <el-scrollbar
        native="true"
        noresize="true"
        class="scrollcontainer"
        wrap-style="overflow-x:hidden;"
      >
        <el-menu
          default-active="n1c4"
          class="el-menu-vertical-demo"
          background-color="#6995EB"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened="true"
          router="true"
        >
          <el-menu-item index="n1c1">
            <span class="navBlank"></span>
            <i class="el-icon-menu navicon"></i>
            <span slot="title">站点管理</span>
          </el-menu-item>
          <el-submenu index="nav1">
            <template slot="title">
              <span class="navBlank"></span>
              <i class="el-icon-location navicon"></i>
              <span>地区选择</span>
            </template>
            <el-menu-item index="n1c4">江苏省</el-menu-item>
            <el-menu-item index="n1c2" disabled>南京市</el-menu-item>
            <el-menu-item index="n1c3" disabled>无锡市</el-menu-item>
            <el-menu-item index="n1c6" disabled>徐州市</el-menu-item>
            <el-menu-item index="n1c7" disabled>常州市</el-menu-item>
            <el-menu-item index="n1c8" disabled>苏州市</el-menu-item>
            <el-menu-item index="n1c9" disabled>南通市</el-menu-item>
            <el-menu-item index="n1c9" disabled>连云港市</el-menu-item>
            <el-menu-item index="n1c9" disabled>淮安市</el-menu-item>
            <el-menu-item index="n1c9" disabled>盐城市</el-menu-item>
            <el-menu-item index="n1c4" disabled>扬州市</el-menu-item>
            <el-menu-item index="n1c9" disabled>镇江市</el-menu-item>
            <el-menu-item index="n1c9" disabled>泰州市</el-menu-item>
            <el-menu-item index="n1c9" disabled>宿迁市</el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- <div class="footer">
          <div class="comlogo">
            <img src="../assets/comlogo.png" />
          </div>
          <div class="leftcompany">南京中网卫星通信股份有限公司</div>
        </div>-->
      </el-scrollbar>
    </div>
    <router-view class="rightchild"></router-view>
  </div>
</template>

<script>
export default {
  name: "Nav1",
  data() {
    return {
      leftnum: 2
    };
  },
  methods: {
    leftnav1() {
      this.leftnum = 1;
    },
    leftnav2() {
      this.leftnum = 2;
    },
    leftnav3() {
      this.leftnum = 3;
    },
    leftnav4() {
      this.leftnum = 4;
    },
    leftnav5() {
      this.leftnum = 5;
    }
  },
  mounted() {
    let inum = this.$route.name.split("c")[1];
    // console.log(inum);
    // console.log(this.$route.name);
    switch (inum) {
      case "1":
      case "4":
      case "5":
        this.leftnum = inum;
        break;
      default:
        this.leftnum = 4;
        break;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #fff;
  /* height: 100px;
  display: block; */
}
.hello {
  height: 100%;
}
.lefttitle {
  color: #fff;
  height: 40px;
  text-align: left;
  padding-left: 15px;
  padding-top: 20px;
  background-color: #409eff;
}
.leftnav {
  height: 100%;
  width: 205px;
  /* min-height: 100%; */
  /* display: flex; */
  /* flex-direction: column; */
  background-color: #6995eb;
  float: left;
}
.scrollcontainer {
  height: 100%;
}
.leftnavitem {
  height: 40px;
  line-height: 40px;
}
.lefta {
  height: 100%;
  width: 100%;
  display: block;
  text-decoration: none;
}
.leftactive {
  background-color: #324098;
}
.footer {
  height: 120px;
  margin-top: auto;
}
.comlogo {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  overflow: hidden;
  margin-left: 65px;
  /* position: absolute; */
  /* bottom: 55px; */
  /* left: 45px; */
}
.comlogo img {
  widows: 100%;
  height: 100%;
  position: relative;
  /* left: -15px; */
  /* position: absolute;
  left: 5px; */
}
.leftcompany {
  width: 205px;
  color: #fff;
  font-size: 12px;
  margin-top: 5px;
  /* position: absolute; */
  /* bottom: 30px; */
}
.rightchild {
  width: 100%;
  padding-left: 205px;
  box-sizing: border-box;
  height: 100%;
  /* position: relative; */
}
.el-menu-item {
  /* text-align: left; */
  height: 40px;
  line-height: 40px;
}
.navicon {
  color: #fff;
}
</style>
