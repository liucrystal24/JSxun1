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
        <el-form-item label="截面选择">
          <el-select v-model="dateselect.SectionNum" placeholder="请选择设备" style="width:220px;">
            <el-option
              v-for="item in SectionNumArr"
              :key="item.SectionNum"
              :label="item.SectionNum"
              :value="item.SectionNum"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始日期">
          <el-date-picker
            type="date"
            placeholder="选择起始日期"
            v-model="dateselect.startdate"
            :default-value="dateselect.startdefaultdate"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="起始时间">
          <el-select v-model="dateselect.starttime" placeholder="请选起始时间">
            <el-option label="08:00" value="08:00"></el-option>
            <el-option label="20:00" value="20:00"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="结束日期">
          <el-date-picker
            type="date"
            placeholder="选择结束日期"
            v-model="dateselect.enddate"
            :default-value="dateselect.enddefaultdate"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="结束时间">
          <el-select v-model="dateselect.endtime" placeholder="请选结束时间">
            <el-option label="08:00" value="08:00"></el-option>
            <el-option label="20:00" value="20:00"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="DepthSearch">查询</el-button>
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
          <div class="titletext">水位历史信息</div>
        </el-col>
      </el-row>
      <el-alert
        title="历史信息显示"
        type="warning"
        description="选择左边的条件，点击查询按钮"
        show-icon
        style="width:80%;margin:0 auto;"
        v-if="!chartShow"
      ></el-alert>
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
        <!--<el-table
          :data="tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )"
          style="text-align:center"
        >-->
        <!-- <el-table-column label="数据文件名" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.FileName }}</span>
            </template>
        </el-table-column>-->
        <!--<el-table-column label="测流开始时间" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px;">{{ scope.row.StartTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="测流结束时间" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.EndTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="流量" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.Flow }}</span>
            </template>
          </el-table-column>
          <el-table-column label="水位" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.WaterLine }}</span>
            </template>
          </el-table-column>
          <el-table-column label="截面编号" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.SectionNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="桥梁编号" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.BridgeNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="测流设备类型" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.DeviceType }}</span>
            </template>
        </el-table-column>-->
        <!-- <el-table-column label="操作" header-align="center" align="center" width="160px">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>-->
        <!-- </el-table> -->
      </div>
      <!-- <el-pagination
        class="page_list"
        background
        layout="sizes,prev, pager, next"
        :page-sizes="[5]"
        :page-size="pageSize"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :hide-on-single-page="true"
      ></el-pagination>-->
    </div>
  </div>
</template>

<script>
import "@/assets/css/scrollbar.css";
export default {
  name: "N4C1",
  data() {
    return {
      SectionNumArr: [],
      dateselect: {
        SectionNum: "",
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2019, 8, 1),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2020, 3, 1)
      },
      chartShow: false,
      chartcontainershow: false,
      chartData: {
        columns: ["时间", "水位高度"],
        rows: []
      },
      chartSettings: {
        yAxisName: ["水位"],
        xAxisName: ["时间"]
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
          //markLine: {
          //data: [{ type: "average", name: "平均值" }]
          //}
        }
      },
      //分页
      tableData: [],
      currentPage: 1,
      pageSize: 5
    };
  },
  methods: {
    DepthSearch() {
      let url = "/jsxun/api/SectionDepth";
      console.log(
        this.dateselect.startdate,
        this.dateselect.enddate,
        this.dateselect.SectionNum
      );
      if (this.dateselect.startdate !== "" && this.dateselect.enddate !== "") {
        this.axios
          .get(url, {
            params: {
              startdate: this.dateselect.startdate,
              enddate: this.dateselect.enddate,
              sectionNum: this.dateselect.SectionNum
            }
          })
          .then(
            res => {
              console.log(res.data);
              if (res.data.code === 1) {
                console.log(res.data.info);
                let AvgDepthArr = [];
                res.data.info.forEach(element => {
                  if (element.AveDepth != null) {
                    console.log(1);
                    let depthObj = {};
                    depthObj["水位高度"] = element.AveDepth;
                    depthObj["时间"] = element.EndTime;
                    AvgDepthArr.push(depthObj);
                  }
                });
                console.log(AvgDepthArr);
                this.chartData.rows = AvgDepthArr;
                this.chartShow = true;
              } else {
                this.$alert("该段时间没有数据，请重新选择日期", "提示", {
                  confirm: "确定"
                });
              }
            },
            res => {
              console.log("error");
            }
          );
      } else {
        this.$alert("请正确选择日期", "提示", {
          confirm: "确定"
        });
      }
    },
    dataSearch() {
      let url = "/jsxun/api/waterflowSearch";
      if (this.dateselect.startdate !== "" && this.dateselect.enddate !== "") {
        this.axios
          .get(url, {
            params: {
              startdate: this.dateselect.startdate,
              enddate: this.dateselect.enddate
            }
          })
          .then(
            res => {
              console.log(res.data);
              if (res.data.code === 1) {
                this.tableData = res.data.info;
                this.chartShow = true;
              } else {
                this.$alert("该段时间没有数据，请重新选择日期", "提示", {
                  confirm: "确定"
                });
              }
            },
            res => {
              console.log("error");
            }
          );
      } else {
        this.$alert("请正确选择日期", "提示", {
          confirm: "确定"
        });
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    duanRead() {
      let url = "/jsxun/api/duanRead";
      this.axios.get(url, {}).then(
        res => {
          if (res.data.code === 1) {
            console.log(res.data.info);
            this.tableData = res.data.info;
          }
        },
        res => {
          console.log("err");
        }
      );
    },
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    sectionNumRead() {
      let url = "/jsxun/api/SectionNumRead";
      this.axios.get(url).then(
        res => {
          // console.log(res.data.info);
          if (res.data.code === 1) {
            this.SectionNumArr = res.data.info;
            console.log(this.SectionNumArr);
          } else {
            console.log("没有截面");
          }
        },
        res => {
          console.log("error");
        }
      );
    }
  },
  mounted() {
    this.sectionNumRead();
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
  width: 90%;
  margin: 0 auto;
}
</style>
