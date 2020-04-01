<template>
  <div>
    <div class="searchcontainer">
      <!-- <el-row class="searchtitle">
        <el-col :span="2">
          <div style="textAlign:right;padding-right:25px;">
            <img src="../assets/warning.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="22">
          <div class="titletext">报警设置</div>
        </el-col>
      </el-row> -->
      <!-- <div class="chartcontainer">
        <div class="chartcontent" id="test">
          <ve-gauge
            :data="shuiweichart.chartData"
            :settings="shuiweichart.chartSettings"
            class="vg"
          ></ve-gauge>
        </div>
        <div>水位：123</div>
      </div>
      <div class="chartcontainer">
        <ve-gauge :data="shuiweichart.chartData" :settings="shuiweichart.chartSettings"></ve-gauge>
      </div>
      <div class="chartcontainer">
        <ve-gauge :data="shuiweichart.chartData" :settings="shuiweichart.chartSettings"></ve-gauge>
      </div>
      <div class="chartcontainer">
        <ve-gauge :data="shuiweichart.chartData" :settings="shuiweichart.chartSettings"></ve-gauge>
      </div>-->
      <div class="tps">
        <p>水位</p>
        <div class="tps_charts">
          <v-chart
            ref="height_creditChart"
            class="credit-chart"
            :style="{ width: '100%', height: '100%' }"
            :options="shuiwei_options"
          ></v-chart>
        </div>
        <div class="wariningContainer">
          <div class="warningitem">
            <label for="">报警开关:</label>
            <el-switch
              v-model="warningSettings.shuiwei.watch"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </div>
          <div class="warningitem">
            <label for="">数值:</label>
            <el-input
              v-model="warningSettings.shuiwei.num"
              style="width:30%;"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              @click="shuiweiChange(warningSettings.shuiwei.num)"
              >修改</el-button
            >
          </div>
        </div>
      </div>
      <div class="tps">
        <p>流量</p>
        <div class="tps_charts">
          <v-chart
            ref="flowNum_creditChart"
            class="credit-chart"
            :style="{ width: '100%', height: '100%' }"
            :options="flowNum_options"
          ></v-chart>
        </div>
        <div class="wariningContainer">
          <div class="warningitem">
            <label for="">报警开关:</label>
            <el-switch
              v-model="warningSettings.flowNum.watch"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </div>
          <div class="warningitem">
            <label for="">数值:</label>
            <el-input
              v-model="warningSettings.flowNum.num"
              style="width:30%;"
            ></el-input>
            <el-button type="primary" size="mini" @click="flowNumChange(warningSettings.flowNum.num)">修改</el-button>
          </div>
        </div>
      </div>
      <div class="tps">
        <p>流速</p>
        <div class="tps_charts">
          <v-chart
            ref="flowSpeed_creditChart"
            class="credit-chart"
            :style="{ width: '100%', height: '100%' }"
            :options="flowSpeed_options"
          ></v-chart>
        </div>
        <div class="wariningContainer">
          <div class="warningitem">
            <label for="">报警开关:</label>
            <el-switch
              v-model="warningSettings.flowSpeed.watch"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </div>
          <div class="warningitem">
            <label for="">数值:</label>
            <el-input
              v-model="warningSettings.flowSpeed.num"
              style="width:30%;"
            ></el-input>
            <el-button type="primary" size="mini" @click="flowSpeedChange(warningSettings.flowSpeed.num)">修改</el-button>
          </div>
        </div>
      </div>
      <div class="tps">
        <p>测流后水位</p>
        <div class="tps_charts">
          <v-chart
            ref="flowHeight_creditChart"
            class="credit-chart"
            :style="{ width: '100%', height: '100%' }"
            :options="flowHeight_options"
          ></v-chart>
        </div>
        <div class="wariningContainer">
          <div class="warningitem">
            <label for="">报警开关:</label>
            <el-switch
              v-model="warningSettings.flowHeight.watch"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </div>
          <div class="warningitem">
            <label for="">数值:</label>
            <el-input
              v-model="warningSettings.flowHeight.num"
              style="width:30%;"
            ></el-input>
            <el-button type="primary" size="mini" @click="flowHeightChange(warningSettings.flowHeight.num)">修改</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "N1C5",
  data() {
    return {
      dateselect: {
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2014, 8, 10),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 8, 15)
      },
      form: {
        stationnum: "",
        date: "",
        defaultdate: new Date(2014, 4, 8),
        show: false,
        fea: ""
      },
      tableData: [
        {
          date: "2016-05-02 08:00",
          name: "探空1",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04 08:00",
          name: "探空2",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01 08:00",
          name: "探空3",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03 08:00",
          name: "探空4",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      shuiweichart: {
        chartSettings: {
          labelMap: {
            speed: "水位"
          },
          dataName: {
            speed: "m"
          }
        },
        chartData: {
          columns: ["type", "value"],
          rows: [{ type: "speed", value: 5 }]
        }
      },
      shuiwei_options: {
        tooltip: {
          formatter: "{a} : {c} m"
        },
        series: [
          {
            name: "水位",
            type: "gauge",
            min: 0,
            max: 100,
            // center: ['50%', '45%'],
            detail: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 14,
                color: "#ffffff"
              },
              borderRadius: 3,
              backgroundColor: "#5576f6",
              // width: 100,
              offsetCenter: ["5%", "90%"], // x, y，单位px
              formatter: "{value} m"
            },
            data: [
              {
                value: 23
              }
            ],
            // itemStyle: {
            //   //指针样式
            //   color: "#000"
            // },
            pointer: {
              width: 3, //指针的宽度
              length: "80%", //指针长度，按照半圆半径的百分比
              shadowColor: "#ccc", //默认透明
              shadowBlur: 5
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "333", //更改坐标轴文字颜色
                fontSize: 10 //更改坐标轴文字大小
              }
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 6,
                color: [
                  [0.33333, "#69C242"],
                  [0.66666, "#E3A245"],
                  [1, "#F26A6F"]
                ],
                shadowColor: "#ccc",
                shadowBlur: 5
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto",
                width: 4
              }
            }
          }
        ]
      },
      flowNum_options: {
        tooltip: {
          formatter: "{a} : {c} m"
        },
        series: [
          {
            name: "流量",
            type: "gauge",
            min: 0,
            max: 300,
            // center: ['50%', '45%'],
            detail: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 14,
                color: "#ffffff"
              },
              borderRadius: 3,
              backgroundColor: "#5576f6",
              // width: 100,
              offsetCenter: ["5%", "95%"], // x, y，单位px
              formatter: `{value} 立方米`
            },
            data: [
              {
                value: 159
              }
            ],
            // itemStyle: {
            //   //指针样式
            //   color: "#000"
            // },
            pointer: {
              width: 3, //指针的宽度
              length: "80%", //指针长度，按照半圆半径的百分比
              shadowColor: "#ccc", //默认透明
              shadowBlur: 5
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "333", //更改坐标轴文字颜色
                fontSize: 10 //更改坐标轴文字大小
              }
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 6,
                color: [
                  [0.33333, "#69C242"],
                  [0.66666, "#E3A245"],
                  [1, "#F26A6F"]
                ],
                shadowColor: "#ccc",
                shadowBlur: 5
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto",
                width: 4
              }
            }
          }
        ]
      },
      flowSpeed_options: {
        tooltip: {
          formatter: "{a} : {c} m"
        },
        series: [
          {
            name: "水位",
            type: "gauge",
            min: 0,
            max: 100,
            // center: ['50%', '45%'],
            detail: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 14,
                color: "#ffffff"
              },
              borderRadius: 3,
              backgroundColor: "#5576f6",
              // width: 100,
              offsetCenter: ["5%", "95%"], // x, y，单位px
              formatter: "{value} 立方米/秒"
            },
            data: [
              {
                value: 15
              }
            ],
            // itemStyle: {
            //   //指针样式
            //   color: "#000"
            // },
            pointer: {
              width: 3, //指针的宽度
              length: "80%", //指针长度，按照半圆半径的百分比
              shadowColor: "#ccc", //默认透明
              shadowBlur: 5
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "333", //更改坐标轴文字颜色
                fontSize: 10 //更改坐标轴文字大小
              }
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 6,
                color: [
                  [0.33333, "#69C242"],
                  [0.66666, "#E3A245"],
                  [1, "#F26A6F"]
                ],
                shadowColor: "#ccc",
                shadowBlur: 5
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto",
                width: 4
              }
            }
          }
        ]
      },
      flowHeight_options: {
        tooltip: {
          formatter: "{a} : {c} m"
        },
        series: [
          {
            name: "水位",
            type: "gauge",
            min: 0,
            max: 100,
            // center: ['50%', '45%'],
            detail: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 14,
                color: "#ffffff"
              },
              borderRadius: 3,
              backgroundColor: "#5576f6",
              // width: 100,
              offsetCenter: ["5%", "90%"], // x, y，单位px
              formatter: "{value} m"
            },
            data: [
              {
                value: 80
              }
            ],
            // itemStyle: {
            //   //指针样式
            //   color: "#000"
            // },
            pointer: {
              width: 3, //指针的宽度
              length: "80%", //指针长度，按照半圆半径的百分比
              shadowColor: "#ccc", //默认透明
              shadowBlur: 5
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "333", //更改坐标轴文字颜色
                fontSize: 10 //更改坐标轴文字大小
              }
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 6,
                color: [
                  [0.33333, "#69C242"],
                  [0.66666, "#E3A245"],
                  [1, "#F26A6F"]
                ],
                shadowColor: "#ccc",
                shadowBlur: 5
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto",
                width: 4
              }
            }
          }
        ]
      },
      warningSettings: {
        shuiwei: {
          watch: true,
          num: 23
        },
        flowNum: {
          watch: true,
          num: 159
        },
        flowSpeed: {
          watch: true,
          num: 15
        },
        flowHeight: {
          watch: true,
          num: 80
        }
      },
      testnum: 10
    };
  },
  methods: {
    searchleida() {
      console.log(1);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    resizeTheChart() {
      if (this.$refs.height_creditChart) {
        this.$refs.height_creditChart.resize();
      }
      if (this.$refs.flowNum_creditChart) {
        this.$refs.flowNum_creditChart.resize();
      }
      if (this.$refs.flowSpeed_creditChart) {
        this.$refs.flowSpeed_creditChart.resize();
      }
      if (this.$refs.flowHeight_creditChart) {
        this.$refs.flowHeight_creditChart.resize();
      }
    },
    shuiweiChange(e) {
      this.shuiwei_options.series[0].data[0].value = e;
    },
    flowNumChange(e) {
      this.flowNum_options.series[0].data[0].value = e;
    },
    flowSpeedChange(e) {
      this.flowSpeed_options.series[0].data[0].value = e;
    },
    flowHeightChange(e) {
      this.flowHeight_options.series[0].data[0].value = e;
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeTheChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeTheChart);
  },
  computed: {
    // testnum() {
    //   return 13;
    // }
  }
};
</script>

<style scoped>
.searchcontainer {
  /* float: left; */
  width: 80%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  /* border-right: 1px solid #324098; */
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
  width: 80%;
  margin: 0 auto;
}
.chartcontainer {
  float: left;
  width: 50%;
  height: 45%;
}
.chartcontent {
  height: 90%;
  width: 100%;
}
.vg {
  height: 100% !important;
}
.tps {
  width: 50%;
  float: left;
  height: 50%;
  padding-top: 10px;
  box-sizing: border-box;
}
.tps_charts {
  height: 65%;
}
.wariningContainer {
  /* height: 20%; */
  width: 100%;
  overflow: hidden;
}
.warningitem {
  height: 30px;
  /* line-height: 10px; */
}
/deep/ .el-input__inner {
  width: 60px;
  height: 28px;
}
</style>
