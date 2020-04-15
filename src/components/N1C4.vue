<template>
  <baidu-map
    class="bm-view"
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    :mapStyle="mapStyle"
    @ready="handler"
  >
    <!-- 查询条件 -->
    <bm-control>
      <el-button
        icon="el-icon-search"
        circle
        type="primary"
        class="searchbutton"
        @click="form.show = !form.show"
        v-if="searchbuttonshow"
      ></el-button>
      <!-- 查询条件form -->
      <el-collapse-transition>
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          class="searchcontainer"
          size="mini"
          v-if="form.show"
        >
          <el-form-item label="站号">
            <el-select v-model="form.stationnum" placeholder="请选择站号">
              <el-option label="54537" value="54537"></el-option>
              <!-- <el-option label="区域二" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="要素">
            <el-select v-model="form.fea" placeholder="请选择要素">
              <el-option label="10分钟平均风速" value="10分钟平均风速"></el-option>
              <!-- <el-option label="区域二" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="起始日期">
            <el-date-picker
              type="date"
              placeholder="选择起始日期"
              v-model="form.startdate"
              style="width: 100%;"
              :default-value="form.startdefaultdate"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="起始时间">
            <el-time-select
              v-model="form.starttime"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '00:30'
              }"
              placeholder="选择起始时间"
            ></el-time-select>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker
              type="date"
              placeholder="选择结束日期"
              v-model="form.enddate"
              style="width: 100%;"
              :default-value="form.enddefaultdate"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-time-select
              v-model="form.endtime"
              :picker-options="{
                start: '23:00',
                step: '00:15',
                end: '23:30'
              }"
              placeholder="选择结束时间"
            ></el-time-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="submitbutton">查询</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-transition>
    </bm-control>

    <!-- 查询图表 -->
    <bm-control class="resultContainer">
      <div class="resultheader" v-if="chartShow">
        <el-button type="danger" icon="el-icon-close" class="closebutton" @click="chartclose"></el-button>
      </div>
      <ve-line
        class="resultContent"
        :extend="extend"
        height="400px"
        :data="chartData"
        :settings="chartSettings"
        :toolbox="toolbox"
        ref="feachart"
        v-if="chartShow"
      ></ve-line>
    </bm-control>

    <!-- 公司授权 -->
    <bm-copyright
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      :copyright="[{ id: 1, content: '南京云卫通软件技术有限公司' }]"
    ></bm-copyright>

    <!-- 按钮插件 bm-control-->
    <!-- <bm-control>
      <button @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
      <button>123</button>
    </bm-control>-->
    <!-- 
    <bm-control>
      <button @click="changeicon">换图标</button>
    </bm-control>

    <bm-control style="marginLeft:50px">
      <button @click="readPoint">读库测试</button>
    </bm-control>-->

    <!-- 画折线线查件组，只需要在polyline.paths加入经纬度数组，即可 -->

    <!-- <bm-polyline
      :path="path"
      v-for="path of polyline.paths"
      :key="path.index"
      stroke-color="#42F942"
    ></bm-polyline>-->
    <!-- <bm-polyline :path="recPath1" stroke-color="#0303FF"></bm-polyline> -->
    <!-- <bm-polyline :path="recPath2" stroke-color="#0303FF"></bm-polyline> -->
    <!-- <bm-polyline :path="recPath3" stroke-color="#0303FF"></bm-polyline>
    <bm-polyline :path="recPath4" stroke-color="#FF02FF"></bm-polyline>
    <bm-polyline :path="recPath5" stroke-color="#FF0000"></bm-polyline>-->

    <!-- 站点 -->
    <!-- <bm-point-collection
      :points="points"
      shape="BMAP_POINT_SHAPE_CIRCLE"
      color="red"
      size="BMAP_POINT_SIZE_SMALL"
      @click="clickHandler"
    ></bm-point-collection>-->

    <!-- 巡测分类图标 -->
    <bm-label
      :content="item.bridgeName"
      v-for="item in newarr1"
      :key=" 'label' + item.id"
      :position="item.point"
      :labelStyle="{color: 'black', fontSize : '16px',border:'1px solid #000',backgroundColor:'#fff',fontWeight:'bolder'}"
      :offset="{width:-35,height:-45}"
    />
    <bm-label
      :content="item.bridgeName"
      v-for="item in newarr2"
      :key=" 'label' + item.id"
      :position="item.point"
      :labelStyle="{color: 'black', fontSize : '16px',border:'1px solid #000',backgroundColor:'#fff',fontWeight:'bolder'}"
      :offset="{width:-35,height:-45}"
    />
    <bm-marker
      v-for="zuobiao in newarr1"
      :key="'station-' + zuobiao.id"
      :position="zuobiao.point"
      :dragging="false"
      :icon="{
        url: require('@/assets/icon1.png'),
        size: { width: 25, height: 25 }
      }"
      @click="carmarker(zuobiao)"
    ></bm-marker>
    <bm-marker
      v-for="zuobiao in newarr2"
      :key="'station-' + zuobiao.id"
      :position="zuobiao.point"
      :dragging="false"
      :icon="{
        url: require('@/assets/update.gif'),
        size: { width: 25, height: 25 }
      }"
      @click="carmarker(zuobiao)"
    ></bm-marker>

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
        :default-sort="{prop: 'testTime', order: 'descending'}"
      >
        <el-table-column label="测量方式" header-align="center" align="center" width="100px">
          <template slot-scope="scope">
            <img :src="deviceImg(scope.row.deviceType)" />
          </template>
        </el-table-column>
        <el-table-column prop="testTime" label="测量时间" sortable width="170"></el-table-column>
        <el-table-column prop="flowData" label="流量" sortable width="130"></el-table-column>
        <el-table-column label="流计表" header-align="center" align="center" width="160px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </bm-info-window>

    <!-- 图片显示框 -->
    <bm-control class="resultContainer" v-if="jlimgshow">
      <div class="bigger" @click="jlimgbigger">
        <img src="@/assets/bigger.png" alt />
      </div>
      <div class="jlclose" @click="jlimgclose">
        <img src="@/assets/jlclose.png" />
      </div>
      <img :src="jlimgDetail" class="jlimg" />
    </bm-control>
    <bm-control class="resultContainerBigger" v-if="jlimgBiggershow">
      <div class="jlclose" @click="jlimgBiggerclose">
        <img src="@/assets/jlclose.png" class="jlimg" />
      </div>
      <img :src="jlimgDetail" />
    </bm-control>
    <bm-control class="loadingWindow" v-if="loadingshow">
      <div class="loading_pic">
        <img src="@/assets/loading.gif" />
      </div>
      <div class="loading_text">图片获取中……</div>
    </bm-control>
  </baidu-map>
</template>

<script>
export default {
  name: "N1C4",
  data() {
    return {
      center: { lng: 119.29035, lat: 26.1039 },
      zoom: 9,
      iconurl: require("@/assets/car1.png"),
      jlimgDetail: "",
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
      recPath1: [
        { lng: "118.5092", lat: "32.173" },
        { lng: "118.6552", lat: "32.1754" },
        { lng: "118.7599", lat: "32.1735" },
        { lng: "118.8535", lat: "32.175" },
        { lng: "118.9556", lat: "32.177" }
      ],
      recPath2: [
        { lng: "120.681396", lat: "31.704139" },
        { lng: "120.625551", lat: "31.682505" },
        { lng: "120.880729", lat: "31.462468" },
        { lng: "120.758183", lat: "31.629683" }
      ],
      recPath3: [
        { lng: 118.744392, lat: 26.337109 },
        { lng: 118.969759, lat: 26.092324 },
        { lng: 119.376799, lat: 26.446884 },
        { lng: 119.128436, lat: 26.661986 },
        { lng: 118.748991, lat: 26.339181 }
      ],
      recPath4: [
        { lng: 118.433938, lat: 26.860179 },
        { lng: 118.905368, lat: 26.357829 },
        { lng: 119.080143, lat: 26.51932 },
        { lng: 118.583416, lat: 26.985931 },
        { lng: 118.436237, lat: 26.864304 }
      ],
      recPath5: [
        { lng: 118.822581, lat: 26.948839 },
        { lng: 119.041048, lat: 26.738414 },
        { lng: 119.353803, lat: 27.027131 },
        { lng: 119.112338, lat: 27.226732 },
        { lng: 118.822581, lat: 26.948839 }
      ],
      polyline: {
        editing: false,
        paths: [
          [
            { lng: 119.539067, lat: 26.076305 },
            { lng: 117.9477, lat: 26.076305 },
            { lng: 117.9477, lat: 27.406037 },
            { lng: 119.539067, lat: 27.406037 },
            { lng: 119.539067, lat: 26.076305 }
          ],
          []
        ]
      },
      //searchdialog
      searchdialog: false,
      searchbuttonshow: false,
      form: {
        stationnum: "",
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2014, 6, 12),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 6, 12),
        show: false,
        fea: ""
      },
      stationPoints: [
        // {
        //   point: { lng: "118.5092", lat: "32.1732" },
        //   id: "jd01",
        //   state: false
        // },
      ],
      flowList: [],
      flowListLength: 0,
      newarr1: [],
      newarr2: [],
      infoWindow: {
        show: false,
        position: {},
        contents: ""
      },
      chartShow: false,
      // SELECT `观测时间`,`10分钟平均风速` FROM `fujian`.`fujian_zidongzhan` WHERE `区站号` LIKE '%54537%' AND `观测时间` BETWEEN '2014-07-13 00:00:00' AND '2014-07-13 23:59:59' AND `2分钟平均风向` NOT LIKE '%/%'
      chartData: {
        columns: ["时间", "风速"],
        rows: [
          {
            时间: "2014-07-13 23:00:00",
            风速: "31"
          },
          {
            时间: "2014-07-13 23:05:00",
            风速: "31"
          },
          {
            时间: "2014-07-13 23:10:00",
            风速: "30"
          },
          {
            时间: "2014-07-13 23:15:00",
            风速: "25"
          },
          {
            时间: "2014-07-13 23:20:00",
            风速: "26"
          },
          {
            时间: "2014-07-13 23:25:00",
            风速: "30"
          },
          {
            时间: "2014-07-13 23:30:00",
            风速: "27"
          },
          {
            时间: "2014-07-13 23:35:00",
            风速: "23"
          },
          {
            时间: "2014-07-13 23:40:00",
            风速: "27"
          },
          {
            时间: "2014-07-13 23:45:00",
            风速: "31"
          },
          {
            时间: "2014-07-13 23:50:00",
            风速: "28"
          },
          {
            时间: "2014-07-13 23:55:00",
            风速: "29"
          }
        ]
      },
      chartSettings: {
        yAxisName: ["风速"],
        xAxisName: ["时间"]
      },
      toolbox: {
        feature: {
          magicType: { type: ["line", "bar"] },
          saveAsImage: {}
        }
      },
      extend: {
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
      flow10: ""
    };
  },
  methods: {
    //drawer
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },

    handler({ BMap, map }) {
      // console.log(BMap, map);
      this.center.lng = 119.556871;
      this.center.lat = 32.433553;
      this.zoom = 15;
      this.$options.methods.readPoint.bind(this)();
    },
    toggle(name) {
      this[name].editing = !this[name].editing;
    },
    handleEdit(index, row) {
      console.log(index, row);
      let url = "/jsxun/api/flowImage";
      // console.log(row.id);
      // this.loadingshow = true;
      this.axios({
        method: "post",
        url: url,
        data: { ID: row.id },
        responseType: "arraybuffer"
      })
        // 方法一
        .then(res => {
          console.log(res.data.byteLength);
          this.loadingshow = true;
          const bytelength = res.data.byteLength;
          if (bytelength < 100) {
            this.loadingshow = false;
            console.log("no photos");
            this.$alert("本次记录没有计流表", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                console.log(action);
              }
            });
          } else {
            let imgbuffer = res.data;
            console.log(imgbuffer);
            let blob = new Blob([imgbuffer], { type: "image/jpeg" });
            const url1 = window.URL.createObjectURL(blob);
            console.log(url1); // 产生一个类似 blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
            this.loadingshow = false;
            this.jlimgDetail = url1;
            // this.loadingshow = false;
            // this.jlimgshow = true;
            this.jlimgBiggershow = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    syncPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        return;
      }
      const path = paths[paths.length - 1];
      if (!path.length) {
        return;
      }
      if (path.length === 1) {
        path.push(e.point);
      }
      //path 是临时点
      this.$set(path, path.length - 1, e.point);
    },
    newPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      if (!paths.length) {
        paths.push([]);
      }
      const path = paths[paths.length - 1];
      path.pop();
      if (path.length) {
        paths.push([]);
      }
    },
    paintPolyline(e) {
      if (!this.polyline.editing) {
        return;
      }
      const { paths } = this.polyline;
      !paths.length && paths.push([]);
      paths[paths.length - 1].push(e.point);
    },
    clickHandler(e) {
      console.log(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
      // console.log(e);
      // console.log(points);
    },
    infoWindowClose(e) {
      this.infoWindow.show = false;
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true;
    },
    onSubmit() {
      this.chartShow = true;
      // this.$refs[`feachart`].echarts.resize();
      // let url = "";
      // this.axios.get(url, {}).then(
      //   res => {
      //     console.log(res.data.info);
      //   },
      //   res => {
      //     console.log("err");
      //   }
      // );
    },
    chartclose() {
      this.chartShow = false;
    },
    carmarker(data) {
      //table 数据处理
      console.log(data);
      console.log(this.flowList);

      //图标重新分组变化
      let url = "/jsxun/api/bridgeState0";
      this.axios.get(url, { params: { bridgeID: data.id } }).then(
        res => {
          if (res.data.code === 1) {
            console.log(res.data);
            this.$options.methods.readPoint.bind(this)();
          }
        },
        res => {
          console.log("err");
        }
      );

      this.flowTable = [];
      for (let i = 0; i < this.flowList.length; i++) {
        const element = this.flowList[i];
        if (element.bridgeID === data.id) {
          this.flowTable.push(element);
        }
      }
      console.log(this.flowTable);
      // table展示
      this.infoWindow.show = true;
      this.infoWindow.position = { lng: data.point.lng, lat: data.point.lat };
      this.infoWindow.contents = data.bridgeName;
    },
    changeicon() {
      setTimeout(() => {
        // this.carpoints[2].state = true;
        // this.carpoints[3].state = true;
        this.stationPoints[5].state = false;
        this.stationPoints[6].state = false;
      }, 3000);
    },
    readPoint() {
      let url = "/jsxun/api/bridgeRead";
      this.axios.get(url, {}).then(
        res => {
          if (res.data.code === 1) {
            console.log(res.data);
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
            console.log(res.data);
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
              flowCookie.fileUpload = flowsArr[i].fileUpload;
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
    deviceImg(device) {
      console.log(device);
      if (device === "Mobile") {
        return require("@/assets/Mobile.png");
      } else if (device === "ADCP") {
        return require("@/assets/ADCP.jpg");
      } else {
        return require("@/assets/Car.png");
      }
    },
    jlimgclose() {
      this.jlimgshow = false;
    },
    jlimgbigger() {
      this.jlimgBiggershow = true;
    },
    jlimgBiggerclose() {
      this.jlimgBiggershow = false;
    },
    flowUpdate10() {
      this.flow10 = setInterval(
        this.$options.methods.flowupdateson.bind(this),
        10000
      );
    },
    flowupdateson() {
      let route1 = this.$route.name;
      console.log(new Date());
      console.log(route1);
      if (route1 === "n1c4") {
        this.$options.methods.readFlow.bind(this)();
      } else {
        clearInterval(this.flow10);
      }
    }
  },
  computed: {
    updateStation() {
      return JSON.parse(JSON.stringify(this.stationPoints));
    },
    updateFlow() {
      return JSON.parse(JSON.stringify(this.flowList));
    }
  },
  mounted() {
    this.readFlow();
    // setInterval(() => {
    // console.log(new Date());
    // this.readFlow();
    this.flowUpdate10();
    // }, 10000);
  },
  watch: {
    updateStation: {
      handler(nv, ov) {
        console.log(nv, ov);
        this.newarr1 = [];
        this.newarr2 = [];
        for (let i = 0; i < nv.length; i++) {
          const newstate = nv[i].state;
          if (newstate == "1") {
            this.newarr2 = [nv[i], ...this.newarr2];
          } else {
            this.newarr1 = [nv[i], ...this.newarr1];
          }
        }
        console.log(this.newarr1);
        console.log(this.newarr2);
      },
      deep: true
    },
    updateFlow: {
      handler(nv, ov) {
        console.log(nv, ov);
        let nochange = nv.length == ov.length;
        if (!nochange) {
          let changeIndex = nv.length - ov.length;
          if (changeIndex > 0) {
            for (let i = ov.length; i < nv.length; i++) {
              console.log(nv[i].bridgeID);
              let url = "/jsxun/api/bridgeState1";
              this.axios
                .get(url, { params: { bridgeID: nv[i].bridgeID } })
                .then(
                  res => {
                    if (res.data.code === 1) {
                      console.log(res.data);
                    }
                  },
                  res => {
                    console.log("err");
                  }
                );
            }
            this.readPoint();
          } else {
            console.log("数据库发生手动删减！");
          }
        } else {
          console.log("nochange");
        }
      }
    }
  }
};
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 100%;
  /* position: relative; */
  /* overflow: hidden; */
}
.searchcontainer {
  background-color: #fff;
  padding: 25px;
  padding-left: 0;
  padding-bottom: 20px;
  border: 1px solid #1d6ec7;
  position: fixed;
  right: 80px;
  top: 180px;
}
.searchbutton {
  position: fixed;
  right: 30px;
  top: 180px;
}
.submitbutton {
  margin-left: 70px;
}
.resultContainer {
  /* width: 800px; */
  height: 95%;
  box-shadow: 8px 8px 5px #888888;
  background-color: #fff;
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%);
  z-index: 2500;
}
.resultContainer .jlimg {
  height: 100%;
}
.resultContainerBigger {
  width: 1014px;
  height: 95%;
  box-shadow: 8px 8px 5px #888888;
  background-color: #fff;
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%);
  z-index: 3000;
  overflow-y: auto;
}
.resultContainerBigger .jlimg {
  width: 100%;
}
.jlclose {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
}
.bigger {
  position: absolute;
  right: 10px;
  top: 50px;
  width: 30px;
  height: 30px;
}
.bigger > img {
  width: 100%;
  cursor: pointer;
}
.jlclose > img {
  width: 100%;
  cursor: pointer;
}
.resultheader {
  background-color: #4b9efc;
  height: 25px;
}
.resultContent {
  border: 1px solid #ddd;
  border-top: 0;
  /* height:750px; */
}
.closebutton {
  width: 30px;
  height: 22px;
  padding: 0px;
  margin-top: 1px;
  float: right;
  margin-right: 5px;
}
.loadingWindow {
  width: 250px;
  height: 90px;
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%);
  border: 1px solid #777777;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;
  z-index: 2000;
}
.loading_pic {
  height: 60px;
  line-height: 75px;
}
.loading_text {
  height: 30px;
  line-height: 10px;
}
</style>
