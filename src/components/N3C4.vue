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
          <el-button type="primary" @click="duanSearch">查询</el-button>
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
          <div class="titletext">断面历史信息</div>
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
        <el-table
          :data="tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )"
          style="text-align:center"
          border
        >
          <!-- <el-table-column label="数据文件名" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.FileName }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="航向" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.FlowDirection }}</span>
            </template>
          </el-table-column>
          <el-table-column label="左岸水边距离（m）" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.LeftDistance }}</span>
            </template>
          </el-table-column>
          <el-table-column label="右岸水边距离（m）" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.RightDistance }}</span>
            </template>
          </el-table-column>
          <el-table-column label="断面流量（m3/s）" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.TotalQ }}</span>
            </template>
          </el-table-column>
          <el-table-column label="断面面积（m2）" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.TotalArea }}</span>
            </template>
          </el-table-column>
          <el-table-column label="平均流速（m/s）" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.QperArea }}</span>
            </template>
          </el-table-column>
          <el-table-column label="平均水深（m）" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.MeanWaterDepth }}</span>
            </template>
          </el-table-column>
          <el-table-column label="最大水深（m）" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.MaxWaterDepth }}</span>
            </template>
          </el-table-column>
          <el-table-column label="水面宽（m）" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.Width }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.StartTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束时间" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.EndTime }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" header-align="center" align="center" width="160px">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>-->
        </el-table>
      </div>
      <el-pagination
        class="page_list"
        background
        layout="sizes,prev, pager, next"
        :page-sizes="[5,10]"
        :page-size="pageSize"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :hide-on-single-page="true"
      ></el-pagination>
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
        startdefaultdate: new Date(2019, 4, 1),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2019, 5, 1)
      },
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
      //分页
      tableData: [],
      currentPage: 1,
      pageSize: 5
    };
  },
  methods: {
    duanSearch() {
      let url = "/jsxun/api/duanSearch";
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
  width: 90%;
  margin: 0 auto;
}
</style>
