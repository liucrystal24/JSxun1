<template>
  <baidu-map
    class="bm-view"
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    :mapStyle="mapStyle"
    @ready="handler"
  >
    <bm-control class="backContainer">
      <img src="../assets/back.png" width="40px" @click="history" class="backbutton" />
    </bm-control>
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

    <!-- 更新小时 -->
    <!-- <bm-control class="updateHourContainer">
      <div style="float:left;width:120px;line-height:50px;padding-left:20px;color:#fff">流量更新时间</div>
      <div style="float:left;width:90px;padding-top:5px;">
        <el-select v-model="hourform.hour" placeholder="1小时" @change="updateHour">
          <el-option label="1小时" value="1"></el-option>
          <el-option label="2小时" value="2"></el-option>
          <el-option label="3小时" value="3"></el-option>
        </el-select>
      </div>
    </bm-control>-->

    <!-- 巡测分类图标 -->
    <!-- <bm-label
      :content="item.bridgeName"
      v-for="item in newarr1"
      :key="'label' + item.id"
      :position="item.point"
      :labelStyle="{
        color: 'black',
        fontSize: '16px',
        border: '1px solid #000',
        backgroundColor: '#fff',
        fontWeight: 'bolder'
      }"
      :offset="{ width: -35, height: -45 }"
    />
    <bm-label
      :content="item.bridgeName"
      v-for="item in newarr2"
      :key="'label' + item.id"
      :position="item.point"
      :labelStyle="{
        color: 'black',
        fontSize: '16px',
        border: '1px solid #000',
        backgroundColor: '#fff',
        fontWeight: 'bolder'
      }"
      :offset="{ width: -35, height: -45 }"
    />-->
    <!-- 没有信息绿点 -->
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
    <!-- 闪烁红点 -->
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

    <!-- 轨迹 -->
    <bm-polyline :path="recPath1" stroke-color="#0303FF"></bm-polyline>

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
      <div class="resultContainerTitle">
        <div class="jlclose" @click="jlimgBiggerclose">
          <img src="@/assets/jlclose.png" class="jlimg" />
        </div>
      </div>
      <div class="resultContainerImg">
        <img
          :src="jlimgDetail"
          class="xuanfu"
          :class="{ xuanfuinit: xuanfufirst == 1 }"
          id="moveDiv"
          @mousedown="down"
          @touchstart="down"
          @mousemove.prevent="move"
          @touchmove.prevent="move"
          @mouseup="end"
          @touchend="end"
        />
      </div>
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
      // 流计表图片移动
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
      xuanfufirst: 1,
      // 地图信息
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
        // { lng: "118.5092", lat: "32.173" },
        // { lng: "118.6552", lat: "32.1754" },
        // { lng: "118.7599", lat: "32.1735" },
        // { lng: "118.8535", lat: "32.175" },
        // { lng: "118.9556", lat: "32.177" }
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
    history() {
      this.$router.go(-1);
    },
    // 实现移动端拖拽
    down() {
      this.flags = true;
      // this.xuanfufirst = 0;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = moveDiv.offsetLeft;
      this.dy = moveDiv.offsetTop;
    },
    move() {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        moveDiv.style.left = this.xPum + "px";
        moveDiv.style.top = this.yPum + "px";
        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        document.addEventListener(
          "touchmove",
          function() {
            event.preventDefault();
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    },
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
      // 添加轨迹连线
      setTimeout(() => {
        console.log(this.stationPoints);
        this.recPath1 = [];
        for (let i = 0; i < this.stationPoints.length - 1; i++) {
          const point = this.stationPoints[i].point;
          this.recPath1.push(point);
        }
      }, 500);
    },
    toggle(name) {
      this[name].editing = !this[name].editing;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.xuanfufirst = 1;
      let url = "/jsxun/api/flowImage";
      //moveDiv.addClass('xuanfuinit')
      // console.log(row.id);
      // this.loadingshow = true;
      this.axios({
        method: "post",
        url: url,
        data: { ID: row.id }
        // responseType: "arraybuffer"
      })
        // 方法一
        .then(res => {
          //console.log(res.data.byteLength);
          this.loadingshow = true;
          //const bytelength = res.data.byteLength;
          const datacode = res.data.code;
          if (datacode == 0) {
            this.loadingshow = false;
            console.log("no photos");
            this.$alert("本次记录没有流计表", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                console.log(action);
              }
            });
          } else {
            // blob 方法一
            // --------------------------
            //console.log(res);
            //let imgbuffer = res.data;
            //console.log(imgbuffer);
            // let blob = new Blob([imgbuffer], { type: "image/jpeg" });
            // const url1 = window.URL.createObjectURL(blob);
            // console.log(url1); // 产生一个类似 blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
            // this.loadingshow = false;
            // this.jlimgDetail = url1;
            // this.jlimgBiggershow = true;
            // ---------------
            // 方法二
            console.log(res.data);
            let imgurl = "data:image/png;base64," + res.data;
            console.log(imgurl);
            this.loadingshow = false;
            this.jlimgDetail = imgurl;
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
      // console.log(route1);
      if (route1 === "n1c4") {
        this.$options.methods.readFlow.bind(this)();
      } else {
        clearInterval(this.flow10);
      }
    },
    updateHour() {
      console.log(this.hourform.hour);
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
        // console.log(nv, ov);
        // newarr1 绿 / newarr2 闪
        this.newarr1 = [];
        this.newarr2 = [];
        for (let i = 0; i < nv.length; i++) {
          const newstate = nv[i].state;
          // 判断是否为一小时内的数值，不是的话仍然放入 newarr1?
          if (newstate == "1") {
            this.newarr2 = [nv[i], ...this.newarr2];
          } else {
            this.newarr1 = [nv[i], ...this.newarr1];
          }
        }
        // console.log(this.newarr1);
        // console.log(this.newarr2);
      },
      deep: true
    },
    updateFlow: {
      handler(nv, ov) {
        // console.log(nv, ov);
        let nochange = nv.length == ov.length;
        if (!nochange) {
          if (ov.length != 0) {
            console.log("走了 ov! = 0");
            let changeIndex = nv.length - ov.length;
            console.log("----");
            console.log(nv);
            console.log(ov);
            console.log("----");
            if (changeIndex > 0) {
              nv.reverse();
              for (let i = ov.length; i < nv.length; i++) {
                console.log(nv[i].bridgeID);
                let url = "/jsxun/api/bridgeState1";
                this.axios
                  .get(url, { params: { bridgeID: nv[i].bridgeID } })
                  .then(
                    res => {
                      if (res.data.code === 1) {
                        console.log(res.data);
                        console.log("---update point---");
                        this.readPoint();
                      }
                    },
                    res => {
                      console.log("err");
                    }
                  );
              }
              //console.log("---update point---");
              //this.readPoint();
            } else {
              console.log("数据库发生手动删减！");
            }
          } else {
            console.log("第一次是否闪烁");
            console.log(nv);
            let datenow = parseInt(new Date().getTime() / 1000);
            let HourIDCookies = [];
            let HourIDOnly = [];
            for (let i = 0; i < nv.length; i++) {
              const element = nv[i];
              let date1 = parseInt(new Date(element.testTime).getTime() / 1000); //s
              let dis = datenow - date1; //s
              let uphour = parseInt(this.hourform.hour.split("小")[0]);
              if (dis <= uphour * 60 * 60) {
                HourIDCookies.push(element.bridgeID);
              }
            }
            HourIDOnly = [...new Set(HourIDCookies)];
            console.log(HourIDOnly);
            for (let i = 0; i < HourIDOnly.length; i++) {
              const element = HourIDOnly[i];
              let url = "/jsxun/api/bridgeState1";
              this.axios.get(url, { params: { bridgeID: element } }).then(
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
  width: 80%;
  height: 80%;
  box-shadow: 8px 8px 5px #888888;
  background-color: #fff;
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -55%);
  z-index: 3000;
  overflow: hidden;
}
.resultContainerTitle {
  width: 100%;
  height: 30px;
  position: absolute;
  background-color: #1d6ec7;
  z-index: 3000;
}
.resultContainerImg {
  position: relative;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.resultContainerImg .jlimg {
  width: 1012px;
  position: absolute;
  left: 50% !important;
  transform: translate(-47%, 0);
  /* width: 100%; */
}
.resultContainerImg .xuanfu {
  width: 100%;
  position: fixed;
  left: 50% !important;
  transform: translate(-50%, 0);
}

.xuanfuinit {
  left: 50% !important;
  transform: translate(-47%, 0);
}
.jlclose {
  position: absolute;
  right: 5px;
  top: 5px;
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
.updateHourContainer {
  background-color: #4b9efc;
  height: 50px;
  width: 260px;
}
.backContainer {
  padding: 20px 0 0 20px;
}
.backContainer img {
  cursor: pointer;
}
</style>
