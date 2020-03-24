<template>
  <div>
    <div class="titlecontainer">
      <img src="../assets/notebook.png" alt class="searchtitle" />
      <div class="titletext">测流任务列表</div>
    </div>
    <div class="tableContainer">
      <el-table :data="tableData" style="text-align:center">
        <el-table-column label="任务状态" header-align="center" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" :type="taskstate(scope.row.state)">{{ scope.row.state }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" header-align="center" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="测流地址" header-align="center" align="center">
          <template slot-scope="scope">
            <!-- <div slot="reference" class="name-wrapper"> -->
            <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
            <span style="margin-left:10px">{{ scope.row.address }}</span>
            <!-- </div> -->
          </template>
        </el-table-column>
        <el-table-column label="设备类型" header-align="center" align="center">
          <template slot-scope="scope">
            <!-- <div slot="reference" class="name-wrapper"> -->
            <span style="margin-left:10px">{{ scope.row.device }}</span>
            <!-- <el-tag size="medium">{{ scope.row.device }}</el-tag> -->
            <!-- </div> -->
          </template>
        </el-table-column>
        <el-table-column label="承包单位" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目负责人" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.proleader }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布人员" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.subleader }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <router-link :to="{name:'TaskPercent'}">123</router-link> -->
  </div>
</template>

<script>
export default {
  name: "N2C3",
  data() {
    return {
      tableData: [
        {
          address: "苏州市吴中区",
          device: "北斗手机",
          company: "南京中网卫星",
          proleader: "吴爱国",
          date: "2019-02-03",
          defaultdate: new Date(2014, 8, 10),
          subleader: "林动",
          state: "已发布" //已发布-一审中-二审中-正在执行-已完成
        },
        {
          address: "苏州市吴中区",
          device: "测流车",
          company: "南京中网卫星",
          proleader: "吴爱国",
          date: "2019-02-03",
          defaultdate: new Date(2014, 8, 10),
          subleader: "林动",
          state: "一审中" //已发布-一审中-二审中-正在执行-已完成
        },
        {
          address: "苏州市吴中区",
          device: "北斗手机",
          company: "南京中网卫星",
          proleader: "吴爱国",
          date: "2019-02-03",
          defaultdate: new Date(2014, 8, 10),
          subleader: "林动",
          state: "二审中" //已发布-一审中-二审中-正在执行-已完成
        },
        {
          address: "苏州市吴中区",
          device: "北斗手机",
          company: "南京中网卫星",
          proleader: "吴爱国",
          date: "2019-02-03",
          defaultdate: new Date(2014, 8, 10),
          subleader: "林动",
          state: "正在执行" //已发布-一审中-二审中-正在执行-已完成
        },
        {
          address: "苏州市吴中区",
          device: "北斗手机",
          company: "南京中网卫星",
          proleader: "吴爱国",
          date: "2019-02-03",
          defaultdate: new Date(2014, 8, 10),
          subleader: "林动",
          state: "已完成" //已发布-一审中-二审中-正在执行-已完成
        }
      ]
    };
  },
  methods: {
    taskstate(i) {
      switch (i) {
        case "已发布":
          return "";
        case "一审中":
          return "danger";
        case "二审中":
          return "danger";
        case "正在执行":
          return "warning";
        case "已完成":
          return "success";
      }
    },
    handleEdit(i, row) {
      this.$router.push({
        name: "TaskPercent",
        params: {
          address: row.address,
          device: row.device,
          company: row.company,
          proleader: row.proleader,
          date: row.date,
          subleader: row.subleader,
          state: row.state
        }
      });
      console.log(i, row);
    },
    handleDelete(i, row) {
      console.log(i, row);
    }
  }
};
</script>

<style scoped>
.titlecontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.searchtitle {
  float: left;
  line-height: 100px;
  /* padding-top: 20px; */
  /* padding-left: 10px; */
  height: 50px;
}
.titletext {
  float: left;
  font-size: 20px;
  padding-left: 20px;
}
.tableContainer {
  border: 1px solid #ddd;
  width: 90%;
  margin: 0 auto;
}
</style>