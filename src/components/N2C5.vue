<template>
  <div>
    <div class="searchcontainer">
      <el-scrollbar
        native="true"
        noresize="true"
        class="scrollcontainer"
        wrap-style="overflow-x:hidden;"
      >
        <el-row class="searchtitle">
          <el-col :span="6">
            <div class>
              <img src="../assets/duansearch.png" width="40px" />
            </div>
          </el-col>
          <el-col :span="18">
            <div class="titletext">轨迹条件筛选</div>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
          <el-form-item label="设备ID">
            <el-select
              v-model="form.deviceid"
              placeholder="请选择设备ID"
              style="width:100%"
            >
              <el-option label="1001" value="1001"></el-option>
              <el-option label="1002" value="1002"></el-option>
              <el-option label="1003" value="1003"></el-option>
              <el-option label="1004" value="1004"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起始日期">
            <el-date-picker
              type="date"
              placeholder="请选择起始日期"
              v-model="form.startdate"
              style="width: 100%;"
              :default-value="form.defaultstartdate"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker
              type="date"
              placeholder="请选择结束日期"
              v-model="form.enddate"
              style="width: 100%;"
              :default-value="form.defaultenddate"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="deviceRouteCheck">查询</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>

    <div class="resultcontainer">
      <el-row class="searchtitle">
        <el-col :span="4">
          <div class>
            <img src="../assets/duancharts.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="20">
          <div class="titletext">测流设备历史轨迹</div>
        </el-col>
      </el-row>
      <el-alert
        title="历史轨迹显示"
        type="warning"
        description="选择左边的条件，点击查询按钮"
        show-icon
        style="width:80%;margin:0 auto;"
        v-if="!chartShow"
      ></el-alert>
      <!-- 地图控件 -->
      <div class="tableContainer" v-if="chartShow">
        <baidu-map
          class="bm-view"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          :mapStyle="mapStyle"
          @ready="handler"
        >
          <bm-marker
            v-for="zuobiao in stationPoints"
            :key="'station-' + zuobiao.id"
            :position="zuobiao.point"
            :dragging="false"
            :icon="{
              url: require('@/assets/icon1.png'),
              size: { width: 25, height: 25 }
            }"
            @click="carmarker(zuobiao)"
          ></bm-marker>
          <bm-polyline :path="route1" stroke-color="#0303FF"></bm-polyline>
          <!-- 点击出现windows -->
          <bm-info-window
            :position="infoWindow.position"
            :show="infoWindow.show"
            @close="infoWindowClose"
            @open="infoWindowOpen"
          >
            <p v-text="infoWindow.contents" style="textAlign:center;"></p>
            <el-table
              :data="flowTable"
              style="width: 100%;text-align:center"
              :default-sort="{ prop: 'testTime', order: 'descending' }"
            >
              <el-table-column
                label="测量方式"
                header-align="center"
                align="center"
                width="100px"
              >
                <template slot-scope="scope">
                  <img :src="deviceImg(scope.row.deviceType)" />
                </template>
              </el-table-column>
              <el-table-column
                prop="testTime"
                label="测量时间"
                sortable
                width="170"
              ></el-table-column>
              <el-table-column
                prop="flowData"
                label="流量"
                sortable
                width="130"
              ></el-table-column>
              <!-- <el-table-column
                label="流计表"
                header-align="center"
                align="center"
                width="160px"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column> -->
            </el-table>
          </bm-info-window>
        </baidu-map>
      </div>
    </div>
  </div>
</template>
<!-- 
<template>
  <baidu-map
    class="bm-view"
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    :mapStyle="mapStyle"
    @ready="handler"
  >
  </baidu-map>
</template> 
-->
<script>
import "@/assets/css/scrollbar.css";
export default {
  name: "N2C5",
  data() {
    return {
      form: {
        deviceid: "",
        startdate: "",
        defaultstartdate: "2020-1-1",
        enddate: "",
        defaultenddate: "2020-6-1"
      },
      fileList: [],
      tableData: [
        {
          deviceid: "0",
          duanid: "v1",
          bridgeid: "nj11",
          leftdis: "10",
          riverheight: "17"
        },
        {
          deviceid: "0",
          duanid: "v1",
          bridgeid: "nj11",
          leftdis: "10",
          riverheight: "17"
        },
        {
          deviceid: "0",
          duanid: "v1",
          bridgeid: "nj12",
          leftdis: "15",
          riverheight: "30"
        },
        {
          deviceid: "0",
          duanid: "v1",
          bridgeid: "nj12",
          leftdis: "20",
          riverheight: "29"
        }
      ],
      chartShow: false,
      chartcontainershow: false,
      chartData: {
        columns: ["左水边距离", "河底高层"],
        rows: [
          {
            左水边距离: "0",
            河底高层: "21.1"
          },
          {
            左水边距离: "10",
            河底高层: "17"
          },
          {
            左水边距离: "15",
            河底高层: "14.5"
          },
          {
            左水边距离: "20",
            河底高层: "14"
          },
          {
            左水边距离: "25",
            河底高层: "13.8"
          },
          {
            左水边距离: "30",
            河底高层: "13.5"
          },
          {
            左水边距离: "35",
            河底高层: "14.2"
          },
          {
            左水边距离: "40",
            河底高层: "16"
          },
          {
            左水边距离: "45",
            河底高层: "21.1"
          }
        ]
      },
      chartSettings: {
        yAxisName: ["河底高层(m)"],
        xAxisName: ["左水边距离(m)"]
      },
      toolbox: {
        feature: {
          magicType: { type: ["line", "bar"] },
          saveAsImage: {}
        }
      },
      extend: {
        color: ["cornflowerblue"],
        series: {
          label: {
            normal: {
              // show: true
            }
          }
          // markLine: {
          //   data: [{ type: "average", name: "平均值" }]
          // }
        }
      },
      mapStyle: {
        styleJson: [
          {
            featureType: "road",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "city",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          }
        ]
      },
      // 地图
      center: { lng: 119.29035, lat: 26.1039 },
      zoom: 9,
      stationPoints: [],
      route1: [],
      flowList: [],
      flowListLength: 0,
      newarr1: [],
      newarr2: [],
      infoWindow: {
        show: false,
        position: {},
        contents: ""
      },
      tableData: [
        {
          date: "2019-05-29 11:00",
          cesuyi: "0.038",
          adcp: "0.123"
        },
        {
          date: "2019-05-29 17:00",
          cesuyi: "0.097",
          adcp: "0.076"
        },
        {
          date: "2019-05-29 17:30",
          cesuyi: "0.048",
          adcp: "0.044"
        },
        {
          date: "2019-05-29 18:00",
          cesuyi: "0.025",
          adcp: "0.039"
        }
      ],
      flowTable: [],
      jlimgshow: false,
      jlimgBiggershow: false,
      loadingshow: false,
      flow10: "",
      hourform: {
        hour: "1小时"
      }
    };
  },
  methods: {
    deviceRouteCheck() {
      if (
        this.form.deviceid === "" ||
        this.form.startdate === "" ||
        this.form.enddate === ""
      ) {
        this.$alert("请选择筛选条件", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            console.log(action);
          }
        });
      } else {
        this.chartShow = true;
        this.$options.methods.routeDraw.bind(this)();
        this.$options.methods.readFlow.bind(this)();
      }
    },
    searchleida() {
      console.log(1);
      this.chartShow = true;
      // this.chartcontainershow = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    //上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 地图
    handler({ BMap, map }) {
      console.log("map init");
      this.center.lng = 119.556871;
      this.center.lat = 32.433553;
      this.zoom = 14;
    },
    // 读点 + 绘制路径
    routeDraw() {
      console.log("draw");
      let url = "/jsxun/api/bridgeRead";
      this.axios.get(url, {}).then(
        res => {
          if (res.data.code === 1) {
            // console.log("重写 station");
            let bridgesArr = res.data.info.bridgeInfo;
            let bridgesCookie = [];
            for (let i = 0; i < bridgesArr.length; i++) {
              const element = bridgesArr[i];
              let bridgeCookie = {};
              bridgeCookie.point = {
                lng: bridgesArr[i].lon,
                lat: bridgesArr[i].lat
              };
              bridgeCookie.id = bridgesArr[i].bridgeID;
              bridgeCookie.bridgeName = bridgesArr[i].bridgeName;
              // 读点时候不能赋值，应该一开始赋值好 0/1
              bridgeCookie.state = bridgesArr[i].state;
              bridgesCookie.push(bridgeCookie);
            }
            this.stationPoints = bridgesCookie;
            console.log(this.stationPoints);
            this.route1 = [];
            for (let i = 0; i < this.stationPoints.length - 1; i++) {
              const point = this.stationPoints[i].point;
              this.route1.push(point);
            }
          }
        },
        res => {
          console.log("err");
        }
      );
    },
    readPoint() {
      let url = "/jsxun/api/bridgeRead";
      this.axios.get(url, {}).then(
        res => {
          if (res.data.code === 1) {
            // 排查 jd01 亮
            // console.log('---jd01---')
            // console.log(res.data);
            console.log("重写 station");
            let bridgesArr = res.data.info.bridgeInfo;
            let bridgesCookie = [];
            for (let i = 0; i < bridgesArr.length; i++) {
              const element = bridgesArr[i];
              let bridgeCookie = {};
              bridgeCookie.point = {
                lng: bridgesArr[i].lon,
                lat: bridgesArr[i].lat
              };
              bridgeCookie.id = bridgesArr[i].bridgeID;
              bridgeCookie.bridgeName = bridgesArr[i].bridgeName;
              // 读点时候不能赋值，应该一开始赋值好 0/1
              bridgeCookie.state = bridgesArr[i].state;
              bridgesCookie.push(bridgeCookie);
            }
            this.stationPoints = bridgesCookie;
            console.log(this.stationPoints);
          }
        },
        res => {
          console.log("err");
        }
      );
    },
    readFlow() {
      let url = "/jsxun/api/flowRead";
      this.axios.get(url, {}).then(
        res => {
          if (res.data.code === 1) {
            // console.log(res.data);
            let flowsArr = res.data.info.flowInfo;
            let flowsCookie = [];
            for (let i = 0; i < flowsArr.length; i++) {
              const element = flowsArr[i];
              let flowCookie = {};
              flowCookie.id = flowsArr[i].ID;
              flowCookie.bridgeID = flowsArr[i].bridgeID;
              flowCookie.flowData = flowsArr[i].flowData;
              flowCookie.testTime = flowsArr[i].testTime;
              flowCookie.deviceType = flowsArr[i].deviceType;
              // flowCookie.fileUpload = flowsArr[i].fileUpload;
              //state 留白
              flowCookie.state = false;
              flowsCookie.push(flowCookie);
            }
            this.flowList = flowsCookie;
            this.flowListLength = flowsCookie.length;
          }
        },
        res => {
          console.log("err");
        }
      );
    },
    carmarker(data) {
      this.flowTable = [];
      let flowTableCookies = [];
      let flowIDCookies = [];
      let flowHisCookies = [];
      let dateNow = parseInt(new Date().getTime() / 1000); //s

      // 取出当前ID所有记录放入 flowTableCookies;
      for (let i = 0; i < this.flowList.length; i++) {
        const element = this.flowList[i];
        if (element.bridgeID === data.id) {
          flowTableCookies.push(element);
        }
      }

      // flowHisCookies : 最新三条，用于补齐/flowIDCookies : 一小时最新
      for (let i = 0; i < flowTableCookies.length; i++) {
        const element = flowTableCookies[i];
        if (i < 3) {
          flowHisCookies.push(element);
        }
        let date1 = parseInt(new Date(element.testTime).getTime() / 1000); //s
        let dis = dateNow - date1; //s
        let uphour = parseInt(this.hourform.hour.split("小")[0]);
        if (dis <= uphour * 60 * 60) {
          flowIDCookies.push(element);
        }
      }

      // 如果一小时内有3条及以上数据，则显示一小时内的数据，否则显示最新的三条
      if (flowIDCookies.length >= 3) {
        this.flowTable = flowIDCookies;
      } else {
        this.flowTable = flowHisCookies;
      }
      console.log(this.flowTable);
      // table展示
      this.infoWindow.show = true;
      this.infoWindow.position = { lng: data.point.lng, lat: data.point.lat };
      // 轨迹点
      this.infoWindow.contents = "任务路径";
    },
    infoWindowClose(e) {
      this.infoWindow.show = false;
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true;
    },
    deviceImg(device) {
      console.log(device);
      if (device === "Mobile") {
        return require("@/assets/Mobile.png");
      } else if (device === "ADCP") {
        return require("@/assets/ADCP.jpg");
      } else if (device === "Car") {
        return require("@/assets/car.png");
      } else {
        return require("@/assets/ljdefault.png");
      }
    }
  }
};
</script>

<style scoped>
.searchcontainer {
  float: left;
  width: 35%;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #324098;
  /* overflow-y: auto; */
}
.scrollcontainer {
  height: 100%;
}
.resultcontainer {
  float: left;
  width: 65%;
  box-sizing: border-box;
}
.searchtitle {
  padding-top: 20px;
  padding-left: 10px;
  height: 80px;
}
.titletext {
  line-height: 44px;
  text-align: left;
}
.tableContainer {
  border: 1px solid #ddd;
  width: 90%;
  height: 500px;
  margin: 0 auto;
}
.leftcontent {
  width: 90%;
}
.bm-view {
  width: 100%;
  height: 100%;
  /* position: relative; */
  /* overflow: hidden; */
}
</style>
