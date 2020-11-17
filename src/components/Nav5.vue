<template>
  <div class="hello">
    <div class="leftnav">
      <div class="lefttitle">
        <i class="el-icon-s-data"></i>
        用户管理
      </div>
      <div :class="{ leftactive: leftnum == 1 }" class="leftnavitem" @click="leftnav1">
        <router-link :to="{ name: 'n5c1' }" class="lefta">管理员权限</router-link>
      </div>
      <div :class="{ leftactive: leftnum == 3 }" class="leftnavitem" @click="leftnav3">
        <router-link :to="{ name: 'n5c3' }" class="lefta">测流人员权限</router-link>
      </div>
      <div :class="{ leftactive: leftnum == 2 }" @click="leftnav2" class="leftnavitem">
        <router-link :to="{ name: 'n5c2' }" class="lefta">用户轨迹</router-link>
      </div>
      <!-- <div :class="{ leftactive: leftnum == 3 }" class="leftnavitem" @click="leftnav3">
        <router-link :to="{ name: 'n2c3' }" class="lefta">测流信息审核</router-link>
      </div>-->
      <!-- <div class="footer">
        <div class="comlogo">
          <img src="../assets/comlogo.png" />
        </div>
        <div class="leftcompany">南京中网卫星通信股份有限公司</div>
      </div>-->
    </div>
    <router-view class="rightchild"></router-view>
  </div>
</template>

<script>
export default {
  name: "Nav2",
  data() {
    return {
      leftnum: 1
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
    }
  },
  mounted() {
    let inum = this.$route.name.split("c")[1];
    console.log(inum);
    switch (inum) {
      case "1":
      case "2":
      case "3":
        this.leftnum = inum;
        break;
      default:
        this.leftnum = 3;
        break;
    }
    // this.leftnum = this.$route.name.split("c")[1];
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
  display: flex;
  flex-direction: column;

  background-color: cornflowerblue;
  float: left;
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
</style>
