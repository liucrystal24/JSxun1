<template>
  <div>
    <div class="searchcontainer">
      <el-scrollbar native="true" noresize="true" class="scrollcontainer" wrap-style="overflow-x:hidden;">
        <el-row class="searchtitle">
          <el-col :span="6">
            <div class>
              <img src="../assets/duansearch.png" width="40px" />
            </div>
          </el-col>
          <el-col :span="18">
            <div class="titletext">断面条件筛选</div>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
          <el-form-item label="设备ID">
            <el-input v-model="form.deviceid" placeholder="请填写设备ID"></el-input>
          </el-form-item>
          <el-form-item label="截面编号">
            <el-input v-model="form.duanid" placeholder="请填写截面编号"></el-input>
          </el-form-item>
          <el-form-item label="桥梁编号">
            <el-input v-model="form.bridgeid" placeholder="请填写桥梁编号"></el-input>
            <!-- <el-select v-model="form.region" placeholder="请填写桥梁编号" style="width:100%">
            <el-option label="北斗手机" value="mobile"></el-option>
            <el-option label="测流车" value="car"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchleida">查询</el-button>
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
          <div class="titletext">断面信息统计图</div>
        </el-col>
      </el-row>
      <el-alert title="统计图显示" type="warning" description="选择左边的条件，点击查询按钮" show-icon style="width:80%;margin:0 auto;" v-if='!chartShow'></el-alert>
      <div class="tableContainer" v-if="chartShow">
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
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/scrollbar.css";
export default {
  name: "N2C1",
  data() {
    return {
      form: {
        deviceid: "",
        duanid: "",
        bridgeid: "",
        leftdis: "",
        riverheight: ""
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
      }
    };
  },
  methods: {
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
  margin: 0 auto;
}
.leftcontent {
  width: 90%;
}
</style>
