<template>
  <div>
    <div class="searchcontainer">
      <el-row class="searchtitle">
        <el-col :span="6">
          <div class>
            <img src="../assets/search.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="18">
          <div class="titletext">条件筛选</div>
        </el-col>
      </el-row>
      <el-form ref="dateselect" :model="dateselect" label-width="30%">
        <el-form-item label="起始日期">
          <el-date-picker
            type="date"
            placeholder="选择起始日期"
            v-model="dateselect.startdate"
            :default-value="dateselect.startdefaultdate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-select v-model="dateselect.starttime" placeholder="请选起始时间">
            <el-option label="08:00" value="08:00"></el-option>
            <el-option label="20:00" value="20:00"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="结束日期">
          <el-date-picker
            type="date"
            placeholder="选择结束日期"
            v-model="dateselect.enddate"
            :default-value="dateselect.enddefaultdate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-select v-model="dateselect.endtime" placeholder="请选结束时间">
            <el-option label="08:00" value="08:00"></el-option>
            <el-option label="20:00" value="20:00"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchleida">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="resultcontainer">
      <el-row class="searchtitle">
        <el-col :span="4">
          <div class>
            <img src="../assets/duancharts.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="20">
          <div class="titletext">瞬时单位线率定</div>
        </el-col>
      </el-row>
      <el-alert
        title="统计图显示"
        type="warning"
        description="选择左边的条件，点击查询按钮"
        show-icon
        style="width:80%;margin:0 auto;"
        v-if="!chartShow"
      ></el-alert>
      <div class="tableContainer" v-if="chartShow">
        <ve-radar
          class="resultContent"
          :extend="extend"
          height="400px"
          :data="chartData"
          :settings="chartSettings"
          :toolbox="toolbox"
          ref="feachart"
          v-if="chartShow"
        ></ve-radar>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/scrollbar.css";
export default {
  name: "N4C1",
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
      tableData: [
        {
          date: "2016-05-02 08:00",
          name: "雷达1",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04 08:00",
          name: "雷达2",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01 08:00",
          name: "雷达3",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03 08:00",
          name: "雷达4",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      chartShow: false,
      chartcontainershow: false,
      chartData: {
        columns: ["日期", "平均流速", "平均水深", "断面流量"],
        rows: [
          { 日期: "1/1", 平均流速: 1393, 平均水深: 1093, 断面流量: 0.32 },
          { 日期: "1/2", 平均流速: 3530, 平均水深: 3230, 断面流量: 0.26 },
          { 日期: "1/3", 平均流速: 2923, 平均水深: 2623, 断面流量: 0.76 },
          { 日期: "1/4", 平均流速: 1723, 平均水深: 1423, 断面流量: 0.49 },
          { 日期: "1/5", 平均流速: 3792, 平均水深: 3492, 断面流量: 0.323 },
          { 日期: "1/6", 平均流速: 4593, 平均水深: 4293, 断面流量: 0.78 }
        ]
      },
      chartSettings: {
        // yAxisName: [""],
        // showLine:"平均流速",
        // xAxisName: ["左水边距离(m)"]
      },
      toolbox: {
        feature: {
          // magicType: { type: ["line", "bar"] },
          saveAsImage: {}
        }
      },
      extend: {
        // color: ["cornflowerblue"],
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
      }
    };
  },
  methods: {
    searchleida() {
      console.log(1);
      this.chartShow = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
</style>
