<template>
  <div class="tps">
    <p>{{sontitle}}</p>
    <div class="tps_charts">
      <v-chart
        ref="chart_creditChart"
        class="credit-chart"
        :style="{ width: '100%', height: '100%' }"
        :options="chart_options"
      ></v-chart>
    </div>
    <div class="wariningContainer">
      <!-- <div class="warningitem">
        <label for>报警开关:</label>
        <el-switch v-model="warningshow" active-text="开" inactive-text="关"></el-switch>
      </div>-->
      <div class="warningitem">
        <label for>数值:</label>
        <el-input v-model="warningNum" style="width:30%;"></el-input>
        <el-button type="primary" size="mini" @click="warningChange(warningNum)">修改</el-button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "charttest",
  props: {
    title: {
      type: String,
      required: true
    },
    defaultNum: {
      required: true
    }
  },
  data() {
    return {
      warningshow: true,
      warningNum: this.$props.defaultNum,
      chartWarningData: "",
      sontitle: this.$props.title,
      chart_options: {
        tooltip: {
          formatter: "{a} : {c} m"
        },
        series: [
          {
            name: this.$props.title,
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
                value: this.$props.defaultNum
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
      }
    };
  },
  methods: {
    warningChange(e) {
      let updateData = e;
      // 对流量进行监控
      if (this.$props.title === "流量") {
        // 此处 bridgeID写死,看具体需求
        let url = "/jsxun/api/flowWarningUpdate";
        let updateType = "flowMaxNum";
        this.axios({
          method: "post",
          url: url,
          data: { type: updateType, updateData: updateData }
        })
          .then(res => {
            const datacode = res.data.code;
            if (datacode == 1) {
              this.chart_options.series[0].data[0].value = updateData;
              this.$alert("修改成功", "提示", {
                confirm: "确定"
              });
            } else {
              console.log("error");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    resizeTheChart() {
      if (this.$refs.chart_creditChart) {
        this.$refs.chart_creditChart.resize();
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeTheChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeTheChart);
  },
  watch: {
    // defaultNum: function(nv) {
    //   console.log("val监听:", nv);
    //   this.$props.defaultNum = nv;
    //   this.warningNum = nv;
    // }
  }
};
</script>

<style scoped>
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