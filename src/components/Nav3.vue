<template>
  <div class="hello">
    <div class="leftnav">
      <div class="lefttitle">
        <i class="el-icon-s-data"></i>
        断面维护
      </div>
      <div :class="{ leftactive: leftnum == 1 }" class="leftnavitem" @click="leftnav1">
        <router-link :to="{ name: 'n3c1' }" class="lefta">断面信息管理</router-link>
      </div>
      <!-- <div :class="{ leftactive: leftnum == 2 }" @click="leftnav2" class="leftnavitem">
        <router-link :to="{ name: 'n3c2' }" class="lefta">断面图统计</router-link>
      </div> -->
      <div :class="{ leftactive: leftnum == 6 }" @click="leftnav6" class="leftnavitem">
        <router-link :to="{ name: 'n3c6' }" class="lefta">断面水位查询</router-link>
      </div>     
      <div :class="{ leftactive: leftnum == 7 }" @click="leftnav7" class="leftnavitem">
        <router-link :to="{ name: 'n3c7' }" class="lefta">断面流量查询</router-link>
      </div>      
      <div :class="{ leftactive: leftnum == 4 }" @click="leftnav4" class="leftnavitem">
        <router-link :to="{ name: 'n3c4' }" class="lefta">断面历史查询</router-link>
      </div>
      <div :class="{ leftactive: leftnum == 5 }" @click="leftnav5" class="leftnavitem">
        <router-link :to="{ name: 'n3c5' }" class="lefta">报警设置</router-link>
      </div>

      <!-- <div class="footer">
        <div class="comlogo">
          <img src="../assets/comlogo.png" />
        </div>
        <div class="leftcompany">南京中网卫星通信股份有限公司</div>
      </div> -->
    </div>
    <router-view class="rightchild"></router-view>
  </div>
</template>

<script>
export default {
  name: "Nav3",
  data() {
    return {
      leftnum: 6
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
    },
    leftnav6() {
      this.leftnum = 6;
    },    
    leftnav7() {
      this.leftnum = 7;
    }
  },
  mounted() {
    let inum = this.$route.name.split("c")[1];
    console.log(inum);
    switch (inum) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
        this.leftnum = inum;
        break;
      default:
        this.leftnum = 6;
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
